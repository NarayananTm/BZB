import { query, queryOne, isDbConfigured } from '@/lib/postgres';
import { adminLevels, type AdminLevel } from '@/data/admin/levels';

export interface Level {
  id: string;
  name: string;
  required_referrals: number;
  reward: string | null;
  members_count: number;
  completion_pct: number;
  status: 'Active' | 'Inactive';
  description: string | null;
  created_at: string;
  updated_at: string;
}

function adaptMockLevel(l: AdminLevel): Level {
  return {
    id: l.id,
    name: l.name,
    required_referrals: l.requiredReferrals,
    reward: l.reward ?? null,
    members_count: l.members ?? 0,
    completion_pct: l.completion ?? 0,
    status: l.status,
    description: l.description ?? null,
    created_at: '',
    updated_at: '',
  };
}

export async function getAllLevels(): Promise<Level[]> {
  if (!isDbConfigured()) return adminLevels.map(adaptMockLevel);
  const rows = await query<Level>('SELECT * FROM levels ORDER BY required_referrals ASC');
  return rows.length ? rows : adminLevels.map(adaptMockLevel);
}

export async function getLevelById(id: string): Promise<Level | null> {
  return queryOne<Level>('SELECT * FROM levels WHERE id = $1', [id]);
}

export async function createLevel(data: Omit<Level, 'created_at' | 'updated_at'>): Promise<Level> {
  const rows = await query<Level>(
    `INSERT INTO levels (id, name, required_referrals, reward, members_count, completion_pct, status, description)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [data.id, data.name, data.required_referrals, data.reward, data.members_count, data.completion_pct, data.status, data.description],
  );
  return rows[0];
}

export async function updateLevel(id: string, data: Partial<Omit<Level, 'id' | 'created_at' | 'updated_at'>>): Promise<Level | null> {
  const keys = Object.keys(data);
  if (!keys.length) return getLevelById(id);
  const set = keys.map((k, i) => `${k} = $${i + 2}`).join(', ');
  const vals = keys.map((k) => (data as Record<string, unknown>)[k]);
  return queryOne<Level>(
    `UPDATE levels SET ${set}, updated_at = NOW() WHERE id = $1 RETURNING *`,
    [id, ...vals],
  );
}

export async function deleteLevel(id: string): Promise<boolean> {
  const rows = await query('DELETE FROM levels WHERE id = $1 RETURNING id', [id]);
  return rows.length > 0;
}
