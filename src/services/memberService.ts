import { query, queryOne } from '@/lib/postgres';

export interface Member {
  id: string;
  name: string;
  email: string;
  mobile: string;
  password?: string;
  original_password?: string;
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
  pan?: string;
  aadhar?: string;
  amount?: number;
  utr_number?: string;
  transaction_proof_name?: string;
  transaction_proof_type?: string;
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

export async function getPendingMembers(filters: {
  limit: number;
  offset: number;
  search?: string;
  level?: number;
  status?: string;
}): Promise<Member[]> {
  let sql = 'SELECT * FROM members WHERE status = $1';
  const params: unknown[] = [filters.status || 'Pending'];

  if (filters.search) {
    sql += ` AND (LOWER(name) LIKE LOWER($${params.length + 1}) OR 
                  LOWER(email) LIKE LOWER($${params.length + 2}) OR 
                  LOWER(mobile) LIKE LOWER($${params.length + 3}) OR 
                  id LIKE $${params.length + 4})`;
    const searchTerm = `%${filters.search}%`;
    params.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }

  if (filters.level) {
    sql += ` AND level_name = 'Level ${filters.level}'`;
  }

  sql += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
  params.push(filters.limit, filters.offset);

  return query<Member>(sql, params);
}

export async function getPendingMembersCount(filters: {
  search?: string;
  level?: number;
  status?: string;
}): Promise<number> {
  let sql = 'SELECT COUNT(*) as count FROM members WHERE status = $1';
  const params: unknown[] = [filters.status || 'Pending'];

  if (filters.search) {
    sql += ` AND (LOWER(name) LIKE LOWER($${params.length + 1}) OR 
                  LOWER(email) LIKE LOWER($${params.length + 2}) OR 
                  LOWER(mobile) LIKE LOWER($${params.length + 3}) OR 
                  id LIKE $${params.length + 4})`;
    const searchTerm = `%${filters.search}%`;
    params.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }

  if (filters.level) {
    sql += ` AND level_name = 'Level ${filters.level}'`;
  }

  const rows = await query<{ count: string }>(sql, params);
  return rows[0] ? parseInt(rows[0].count) : 0;
}

export async function getPendingStats() {
  const rows = await query<{
    pending_review: string;
    todays_submissions: string;
    this_week: string;
    rejected_7days: string;
  }>(
    `SELECT
       COUNT(*) FILTER (WHERE status = 'Pending')                                      AS pending_review,
       COUNT(*) FILTER (WHERE status = 'Pending' AND DATE(created_at) = CURRENT_DATE)  AS todays_submissions,
       COUNT(*) FILTER (WHERE status = 'Pending' AND created_at >= NOW() - INTERVAL '7 days') AS this_week,
       COUNT(*) FILTER (WHERE status = 'Rejected' AND created_at >= NOW() - INTERVAL '7 days') AS rejected_7days
     FROM members`,
  );
  return rows[0]
    ? {
        pendingReview: parseInt(rows[0].pending_review) || 0,
        todaysSubmissions: parseInt(rows[0].todays_submissions) || 0,
        thisWeek: parseInt(rows[0].this_week) || 0,
        rejected7Days: parseInt(rows[0].rejected_7days) || 0,
      }
    : {
        pendingReview: 0,
        todaysSubmissions: 0,
        thisWeek: 0,
        rejected7Days: 0,
      };
}
