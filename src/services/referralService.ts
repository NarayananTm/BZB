import { query, queryOne, isDbConfigured } from '@/lib/postgres';

export interface Referral {
  id: string;
  sponsor_id: string | null;
  sponsor_name: string | null;
  member_id: string | null;
  member_name: string | null;
  level_name: string | null;
  join_date: string | null;
  status: 'Active' | 'Pending' | 'Approved' | 'Rejected';
  reward_amount: number;
  created_at: string;
  updated_at: string;
}

export async function getAllReferrals(): Promise<Referral[]> {
  if (!isDbConfigured()) return [];
  const rows = await query<Referral>('SELECT * FROM referrals ORDER BY created_at DESC');
  return rows;
}

export async function getReferralById(id: string): Promise<Referral | null> {
  return queryOne<Referral>('SELECT * FROM referrals WHERE id = $1', [id]);
}

export async function getReferralsBySponsor(sponsorId: string): Promise<Referral[]> {
  if (!isDbConfigured()) return [];
  const referrals = await query<Referral>('SELECT * FROM referrals WHERE sponsor_id = $1 ORDER BY created_at DESC', [sponsorId]);
  if (referrals.length) return referrals;
  return query<Referral>(
    `SELECT
       'REF-' || m.id AS id,
       m.sponsor_id,
       m.sponsor_name,
       m.id AS member_id,
       m.name AS member_name,
       m.level_name,
       m.joining_date AS join_date,
       CASE WHEN m.status IN ('Active', 'Pending', 'Approved', 'Rejected')
            THEN m.status ELSE 'Pending' END AS status,
       0 AS reward_amount,
       m.created_at,
       m.updated_at
     FROM members m
     WHERE m.sponsor_id = $1
     ORDER BY m.created_at DESC`,
    [sponsorId],
  );
}

export async function getReferralsBySponsorName(sponsorName: string): Promise<Referral[]> {
  if (!isDbConfigured()) return [];

  const referrals = await query<Referral>(
    `SELECT *
     FROM referrals
     WHERE LOWER(COALESCE(sponsor_name, '')) = LOWER($1)
     ORDER BY created_at DESC`,
    [sponsorName],
  );
  if (referrals.length) return referrals;
  return query<Referral>(
    `SELECT
       'REF-' || m.id AS id,
       m.sponsor_id,
       m.sponsor_name,
       m.id AS member_id,
       m.name AS member_name,
       m.level_name,
       m.joining_date AS join_date,
       CASE WHEN m.status IN ('Active', 'Pending', 'Approved', 'Rejected')
            THEN m.status ELSE 'Pending' END AS status,
       0 AS reward_amount,
       m.created_at,
       m.updated_at
     FROM members m
     WHERE LOWER(COALESCE(m.sponsor_name, '')) = LOWER($1)
     ORDER BY m.created_at DESC`,
    [sponsorName],
  );
}

export async function createReferral(data: Omit<Referral, 'created_at' | 'updated_at'>): Promise<Referral> {
  const rows = await query<Referral>(
    `INSERT INTO referrals
       (id, sponsor_id, sponsor_name, member_id, member_name, level_name, join_date, status, reward_amount)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [
      data.id, data.sponsor_id, data.sponsor_name, data.member_id,
      data.member_name, data.level_name, data.join_date, data.status, data.reward_amount,
    ],
  );
  return rows[0];
}

export async function updateReferralStatus(
  id: string,
  status: Referral['status'],
): Promise<Referral | null> {
  return queryOne<Referral>(
    `UPDATE referrals SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [status, id],
  );
}

export async function getReferralStats() {
  const rows = await query<{ total: string; active: string; pending: string; approved: string }>(
    `SELECT
       COUNT(*)                                          AS total,
       COUNT(*) FILTER (WHERE status = 'Active')        AS active,
       COUNT(*) FILTER (WHERE status = 'Pending')       AS pending,
       COUNT(*) FILTER (WHERE status = 'Approved')      AS approved
     FROM referrals`,
  );
  return rows[0];
}
