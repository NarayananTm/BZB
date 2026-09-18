import { query, queryOne, isDbConfigured } from '@/lib/postgres';
import { adminEarnings, type AdminEarning } from '@/data/admin/earnings';

export interface Earning {
  id: string;
  member_id: string | null;
  member_name: string | null;
  source: string | null;
  level_name: string | null;
  amount: number;
  earn_date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  created_at: string;
}

function adaptMockEarning(e: AdminEarning): Earning {
  const parseRs = (s: string) => Number(s.replace(/[^0-9.]/g, '')) || 0;
  return {
    id: e.id,
    member_id: e.memberId ?? null,
    member_name: e.memberName ?? null,
    source: e.source ?? null,
    level_name: e.level ?? null,
    amount: parseRs(e.amount ?? '0'),
    earn_date: e.date,
    status: e.status,
    created_at: e.date,
  };
}

export async function getAllEarnings(): Promise<Earning[]> {
  if (!isDbConfigured()) return adminEarnings.map(adaptMockEarning);
  const rows = await query<Earning>('SELECT * FROM earnings ORDER BY earn_date DESC');
  return rows.length ? rows : adminEarnings.map(adaptMockEarning);
}

export async function getEarningById(id: string): Promise<Earning | null> {
  return queryOne<Earning>('SELECT * FROM earnings WHERE id = $1', [id]);
}

export async function getEarningsByMember(memberId: string): Promise<Earning[]> {
  if (!isDbConfigured()) return adminEarnings.filter((e) => e.memberId === memberId).map(adaptMockEarning);
  return query<Earning>('SELECT * FROM earnings WHERE member_id = $1 ORDER BY earn_date DESC', [memberId]);
}

export async function createEarning(data: Omit<Earning, 'created_at'>): Promise<Earning> {
  const rows = await query<Earning>(
    `INSERT INTO earnings (id, member_id, member_name, source, level_name, amount, earn_date, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [data.id, data.member_id, data.member_name, data.source, data.level_name, data.amount, data.earn_date, data.status],
  );
  return rows[0];
}

export async function updateEarningStatus(id: string, status: Earning['status']): Promise<Earning | null> {
  return queryOne<Earning>(
    `UPDATE earnings SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id],
  );
}

export async function getEarningsSummary() {
  const rows = await query<{ total_amount: string; completed: string; pending: string; failed: string }>(
    `SELECT
       COALESCE(SUM(amount), 0)                                   AS total_amount,
       COALESCE(SUM(amount) FILTER (WHERE status='Completed'), 0) AS completed,
       COALESCE(SUM(amount) FILTER (WHERE status='Pending'),   0) AS pending,
       COALESCE(SUM(amount) FILTER (WHERE status='Failed'),    0) AS failed
     FROM earnings`,
  );
  return rows[0];
}
