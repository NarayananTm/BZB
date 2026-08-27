import { query, queryOne, isDbConfigured } from '@/lib/postgres';
import { adminMembers, type AdminMember } from '@/data/admin/members';

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

function adaptMockMember(m: AdminMember): Member {
  const parseRs = (s: string) => Number(s.replace(/[^0-9.]/g, '')) || 0;
  return {
    id: m.id,
    name: m.name,
    email: m.email,
    mobile: m.mobile,
    sponsor_id: null,
    sponsor_name: m.sponsor ?? null,
    level_name: m.level ?? 'Level 1',
    status: m.status,
    joining_date: m.joiningDate,
    total_earnings: parseRs(m.totalEarnings ?? '0'),
    wallet_balance: parseRs(m.walletBalance ?? '0'),
    referral_count: m.referralCount ?? 0,
    team_count: m.teamCount ?? 0,
    avatar: m.avatar ?? null,
    created_at: m.joiningDate,
    updated_at: m.joiningDate,
  };
}

export async function getAllMembers(): Promise<Member[]> {
  if (!isDbConfigured()) return adminMembers.map(adaptMockMember);
  const rows = await query<Member>('SELECT * FROM members ORDER BY created_at DESC');
  return rows.length ? rows : adminMembers.map(adaptMockMember);
}

export async function getMemberById(id: string): Promise<Member | null> {
  if (!isDbConfigured()) {
    const m = adminMembers.find((x) => x.id === id);
    return m ? adaptMockMember(m) : null;
  }
  return queryOne<Member>('SELECT * FROM members WHERE id = $1', [id]);
}

export async function getMemberByEmail(email: string): Promise<Member | null> {
  if (!isDbConfigured()) {
    const m = adminMembers.find((x) => x.email.toLowerCase() === email.toLowerCase());
    return m ? adaptMockMember(m) : null;
  }
  return queryOne<Member>('SELECT * FROM members WHERE LOWER(email) = LOWER($1)', [email]);
}

export async function getTeamMembers(sponsorId: string): Promise<Member[]> {
  if (!isDbConfigured()) {
    return adminMembers
      .filter((m) => m.sponsor?.toLowerCase().includes(sponsorId.toLowerCase()) || m.id !== sponsorId)
      .map(adaptMockMember);
  }
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
