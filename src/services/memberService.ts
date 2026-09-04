import { query, queryOne, isDbConfigured } from '@/lib/postgres';

export interface Member {
  id: string;
  name: string;
  email: string;
  mobile: string;
  sponsor_id: string | null;
  sponsor_name: string | null;
  level_name: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Approved' | 'Rejected';
  joining_date: string;
  total_earnings: number;
  wallet_balance: number;
  referral_count: number;
  team_count: number;
  avatar: string | null;
  created_at: string;
  updated_at: string;
}

export async function getAllMembers(): Promise<Member[]> {
  const rows = await query<Member>('SELECT * FROM members ORDER BY created_at DESC');
  return rows;
}

export async function getMembersReferredBy(adminName: string, adminEmail: string): Promise<Member[]> {
  return query<Member>(
    `SELECT m.*
     FROM members m
     WHERE LOWER(COALESCE(m.sponsor_name, '')) = LOWER($1)
        OR m.sponsor_id IN (
          SELECT id::varchar FROM members WHERE LOWER(email) = LOWER($2)
        )
     ORDER BY m.created_at DESC`,
    [adminName, adminEmail],
  );
}

export async function getMemberById(id: string): Promise<Member | null> {
  return queryOne<Member>('SELECT * FROM members WHERE id = $1', [id]);
}

export async function getMemberByEmail(email: string): Promise<Member | null> {
  return queryOne<Member>('SELECT * FROM members WHERE LOWER(email) = LOWER($1)', [email]);
}

export async function getTeamMembers(sponsorId: string): Promise<Member[]> {
  return query<Member>('SELECT * FROM members WHERE sponsor_id = $1 ORDER BY joining_date DESC', [sponsorId]);
}

export async function createMember(data: Omit<Member, 'created_at' | 'updated_at'>): Promise<Member> {
  const rows = await query<Member>(
    `INSERT INTO members
       (id, name, email, mobile, sponsor_id, sponsor_name, level_name, status,
        joining_date, total_earnings, wallet_balance, referral_count, team_count, avatar)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
     RETURNING *`,
    [
      data.id, data.name, data.email, data.mobile, data.sponsor_id,
      data.sponsor_name, data.level_name, data.status, data.joining_date,
      data.total_earnings, data.wallet_balance, data.referral_count,
      data.team_count, data.avatar,
    ],
  );
  return rows[0];
}

export async function updateMemberStatus(id: string, status: Member['status']): Promise<Member | null> {
  return queryOne<Member>(
    `UPDATE members SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [status, id],
  );
}

export async function updateMember(id: string, data: Partial<Member>): Promise<Member | null> {
  const fields = Object.keys(data)
    .filter((k) => !['id', 'created_at', 'updated_at'].includes(k))
    .map((k, i) => `${k} = $${i + 2}`)
    .join(', ');
  const values = Object.keys(data)
    .filter((k) => !['id', 'created_at', 'updated_at'].includes(k))
    .map((k) => (data as Record<string, unknown>)[k]);

  if (!fields) return getMemberById(id);
  return queryOne<Member>(
    `UPDATE members SET ${fields}, updated_at = NOW() WHERE id = $1 RETURNING *`,
    [id, ...values],
  );
}

export async function deleteMember(id: string): Promise<boolean> {
  const rows = await query('DELETE FROM members WHERE id = $1 RETURNING id', [id]);
  return rows.length > 0;
}

export async function getMemberStats() {
  const rows = await query<{ total: string; active: string; pending: string; inactive: string }>(
    `SELECT
       COUNT(*)                                          AS total,
       COUNT(*) FILTER (WHERE status = 'Active')        AS active,
       COUNT(*) FILTER (WHERE status = 'Pending')       AS pending,
       COUNT(*) FILTER (WHERE status = 'Inactive')      AS inactive
     FROM members`,
  );
  return rows[0];
}
