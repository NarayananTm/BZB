import { queryOne } from '@/lib/postgres';

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
  return row!;
}
