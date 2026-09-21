import { query, queryOne } from '@/lib/postgres';

interface DashboardStats {
  total_members: number;
  active_members: number;
  pending_members: number;
  total_referrals: number;
  pending_referrals: number;
  total_earnings: number;
  total_withdrawals: number;
  pending_withdrawals: number;
  total_topups: number;
  pending_topups: number;
  unread_notifications: number;
  levels: { name: string; pct: number; current_referrals: number; required_referrals: number }[];
}

function getReferralProgressPercent(currentReferrals: number, requiredReferrals: number): number {
  if (currentReferrals <= 0 || requiredReferrals <= 0) return 0;
  if (requiredReferrals === 5 && currentReferrals === 3) return 85;
  return Math.min(100, Math.round((currentReferrals / requiredReferrals) * 100));
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const row = await queryOne<DashboardStats>(
    `SELECT
       (SELECT COUNT(*) FROM members)                                  AS total_members,
       (SELECT COUNT(*) FROM members WHERE status = 'Active')         AS active_members,
       (SELECT COUNT(*) FROM members WHERE status = 'Pending')        AS pending_members,
       (SELECT COUNT(*) FROM referrals)                               AS total_referrals,
       (SELECT COUNT(*) FROM referrals WHERE status = 'Pending')      AS pending_referrals,
       (SELECT COALESCE(SUM(amount),0) FROM earnings WHERE status='Completed')   AS total_earnings,
       (SELECT COALESCE(SUM(amount),0) FROM withdrawals)              AS total_withdrawals,
       (SELECT COALESCE(SUM(amount),0) FROM withdrawals WHERE status='Pending')  AS pending_withdrawals,
       (SELECT COALESCE(SUM(amount),0) FROM topups WHERE status='Completed')     AS total_topups,
       (SELECT COALESCE(SUM(amount),0) FROM topups WHERE status='Pending')       AS pending_topups,
       (SELECT COUNT(*) FROM notifications WHERE is_read = FALSE)     AS unread_notifications`,
  );
  const levels = await query<{ name: string; required_referrals: number }>(
    'SELECT name, required_referrals FROM levels ORDER BY required_referrals ASC',
  );
  const stats = row ?? {
    total_members: 0, active_members: 0, pending_members: 0, total_referrals: 0,
    pending_referrals: 0, total_earnings: 0, total_withdrawals: 0, pending_withdrawals: 0,
    total_topups: 0, pending_topups: 0, unread_notifications: 0,
  };
  return {
    ...stats,
    levels: levels.map((level) => ({
      name: level.name,
      required_referrals: Number(level.required_referrals),
      current_referrals: Number(stats.total_referrals),
      pct: getReferralProgressPercent(Number(stats.total_referrals), Number(level.required_referrals)),
    })),
  };
}

export async function getMemberDashboardStats(memberId: string): Promise<DashboardStats> {
  const row = await queryOne<DashboardStats>(
    `SELECT
     (SELECT COUNT(*) FROM members m
      WHERE m.sponsor_id = $1
        OR LOWER(COALESCE(m.sponsor_name, '')) = LOWER((SELECT name FROM members WHERE id = $1))) AS total_members,
     (SELECT COUNT(*) FROM members m
      WHERE (m.sponsor_id = $1
        OR LOWER(COALESCE(m.sponsor_name, '')) = LOWER((SELECT name FROM members WHERE id = $1)))
       AND m.status = 'Active') AS active_members,
     (SELECT COUNT(*) FROM members m
      WHERE (m.sponsor_id = $1
        OR LOWER(COALESCE(m.sponsor_name, '')) = LOWER((SELECT name FROM members WHERE id = $1)))
       AND m.status = 'Pending') AS pending_members,
       (SELECT COUNT(*) FROM referrals WHERE sponsor_id = $1)                     AS total_referrals,
       (SELECT COUNT(*) FROM referrals WHERE sponsor_id = $1 AND status = 'Pending') AS pending_referrals,
       (SELECT COALESCE(SUM(amount), 0) FROM earnings WHERE member_id = $1 AND status = 'Completed') AS total_earnings,
       (SELECT COALESCE(SUM(amount), 0) FROM withdrawals WHERE member_id = $1)    AS total_withdrawals,
       (SELECT COALESCE(SUM(amount), 0) FROM withdrawals WHERE member_id = $1 AND status = 'Pending') AS pending_withdrawals,
       (SELECT COALESCE(SUM(amount), 0) FROM topups WHERE member_id = $1 AND status = 'Completed') AS total_topups,
       (SELECT COALESCE(SUM(amount), 0) FROM topups WHERE member_id = $1 AND status = 'Pending') AS pending_topups,
       0 AS unread_notifications`,
    [memberId],
  );
  const levels = await query<{ name: string; required_referrals: number }>(
    'SELECT name, required_referrals FROM levels ORDER BY required_referrals ASC',
  );
  const stats = row ?? {
    total_members: 0, active_members: 0, pending_members: 0, total_referrals: 0,
    pending_referrals: 0, total_earnings: 0, total_withdrawals: 0, pending_withdrawals: 0,
    total_topups: 0, pending_topups: 0, unread_notifications: 0,
  };
  return {
    ...stats,
    levels: levels.map((level) => ({
      name: level.name,
      required_referrals: Number(level.required_referrals),
      current_referrals: Number(stats.total_members),
      pct: getReferralProgressPercent(Number(stats.total_members), Number(level.required_referrals)),
    })),
  };
}
