import { query, queryOne } from '@/lib/postgres';

/**
 * Super Admin Dashboard Data Models
 */

export interface SuperAdminStats {
  total_members: number;
  active_members: number;
  pending_members: number;
  suspended_members: number;
  total_referrals: number;
  pending_referrals: number;
  total_earnings: number;
  total_withdrawals: number;
  pending_withdrawals: number;
  total_topups: number;
  pending_topups: number;
  unread_notifications: number;
  levels: LevelDistribution[];
}

export interface LevelDistribution {
  name: string;
  reward: string | null;
  members_count: number;
  percentage: number;
}

export interface MemberStats {
  total_members: number;
  active_members: number;
  pending_members: number;
  suspended_members: number;
  verified_members: number;
  new_members_this_month: number;
}

export interface FinancialStats {
  total_income: number;
  pending_withdrawals: number;
  pending_topups: number;
  completed_withdrawals: number;
  completed_topups: number;
  total_platform_balance: number;
}

export interface PendingRequest {
  id: string;
  member_id: string;
  member_name: string;
  type: 'member_registration' | 'withdrawal' | 'topup' | 'referral';
  amount?: number;
  status: string;
  requested_date: string;
  days_pending: number;
}

export interface RecentActivity {
  id: string;
  type: string;
  description: string;
  member_name: string;
  timestamp: string;
  status: string;
}

/**
 * Get comprehensive super admin dashboard statistics
 */
export async function getSuperAdminDashboardStats(): Promise<SuperAdminStats> {
  const row = await queryOne<SuperAdminStats>(
    `SELECT
       (SELECT COUNT(*) FROM members) AS total_members,
       (SELECT COUNT(*) FROM members WHERE status = 'Active') AS active_members,
       (SELECT COUNT(*) FROM members WHERE status = 'Pending') AS pending_members,
       (SELECT COUNT(*) FROM members WHERE status = 'Suspended') AS suspended_members,
       (SELECT COUNT(*) FROM referrals) AS total_referrals,
       (SELECT COUNT(*) FROM referrals WHERE status = 'Pending') AS pending_referrals,
       (SELECT COALESCE(SUM(amount), 0) FROM earnings WHERE status = 'Completed') AS total_earnings,
       (SELECT COALESCE(SUM(amount), 0) FROM withdrawals) AS total_withdrawals,
       (SELECT COALESCE(SUM(amount), 0) FROM withdrawals WHERE status = 'Pending') AS pending_withdrawals,
       (SELECT COALESCE(SUM(amount), 0) FROM topups WHERE status = 'Completed') AS total_topups,
       (SELECT COALESCE(SUM(amount), 0) FROM topups WHERE status = 'Pending') AS pending_topups,
       (SELECT COUNT(*) FROM notifications WHERE is_read = FALSE) AS unread_notifications`
  );

  const levels = await query<LevelDistribution>(
    `SELECT 
       name,
       reward,
       members_count,
       CASE 
         WHEN (SELECT COUNT(*) FROM members) = 0 THEN 0
         ELSE ROUND((members_count::NUMERIC / (SELECT COUNT(*) FROM members) * 100)::NUMERIC, 2)::INTEGER
       END AS percentage
     FROM levels 
     ORDER BY required_referrals ASC`
  );

  return {
    ...(row || {
      total_members: 0,
      active_members: 0,
      pending_members: 0,
      suspended_members: 0,
      total_referrals: 0,
      pending_referrals: 0,
      total_earnings: 0,
      total_withdrawals: 0,
      pending_withdrawals: 0,
      total_topups: 0,
      pending_topups: 0,
      unread_notifications: 0,
    }),
    levels,
  };
}

/**
 * Get member-related statistics
 */
export async function getMemberStats(): Promise<MemberStats> {
  const stats = await queryOne<MemberStats>(
    `SELECT
       (SELECT COUNT(*) FROM members) AS total_members,
       (SELECT COUNT(*) FROM members WHERE status = 'Active') AS active_members,
       (SELECT COUNT(*) FROM members WHERE status = 'Pending') AS pending_members,
       (SELECT COUNT(*) FROM members WHERE status = 'Suspended') AS suspended_members,
       (SELECT COUNT(*) FROM members WHERE status = 'Active') AS verified_members,
       (SELECT COUNT(*) FROM members WHERE joining_date >= DATE_TRUNC('month', NOW())) AS new_members_this_month`
  );

  return stats || {
    total_members: 0,
    active_members: 0,
    pending_members: 0,
    suspended_members: 0,
    verified_members: 0,
    new_members_this_month: 0,
  };
}

/**
 * Get financial statistics
 */
export async function getFinancialStats(): Promise<FinancialStats> {
  const stats = await queryOne<FinancialStats>(
    `SELECT
       COALESCE(SUM(CASE WHEN e.status = 'Completed' THEN e.amount ELSE 0 END), 0) AS total_income,
       COALESCE(SUM(CASE WHEN w.status = 'Pending' THEN w.amount ELSE 0 END), 0) AS pending_withdrawals,
       COALESCE(SUM(CASE WHEN t.status = 'Pending' THEN t.amount ELSE 0 END), 0) AS pending_topups,
       COALESCE(SUM(CASE WHEN w.status = 'Completed' THEN w.amount ELSE 0 END), 0) AS completed_withdrawals,
       COALESCE(SUM(CASE WHEN t.status = 'Completed' THEN t.amount ELSE 0 END), 0) AS completed_topups,
       COALESCE(SUM(m.wallet_balance), 0) AS total_platform_balance
     FROM earnings e
     FULL OUTER JOIN withdrawals w ON TRUE
     FULL OUTER JOIN topups t ON TRUE
     FULL OUTER JOIN members m ON TRUE`
  );

  return stats || {
    total_income: 0,
    pending_withdrawals: 0,
    pending_topups: 0,
    completed_withdrawals: 0,
    completed_topups: 0,
    total_platform_balance: 0,
  };
}

/**
 * Get pending requests across the platform
 */
export async function getPendingRequests(limit: number = 10): Promise<PendingRequest[]> {
  const requests = await query<PendingRequest>(
    `SELECT 
       m.id,
       m.id AS member_id,
       m.name AS member_name,
       'member_registration' AS type,
       NULL AS amount,
       m.status,
       m.created_at::TEXT AS requested_date,
       EXTRACT(DAY FROM NOW() - m.created_at)::INTEGER AS days_pending
     FROM members m
     WHERE m.status = 'Pending'
     UNION ALL
     SELECT 
       w.id,
       w.member_id,
       w.member_name,
       'withdrawal' AS type,
       w.amount,
       w.status,
       w.requested_date::TEXT,
       EXTRACT(DAY FROM NOW() - w.requested_date)::INTEGER AS days_pending
     FROM withdrawals w
     WHERE w.status = 'Pending'
     UNION ALL
     SELECT 
       t.id,
       t.member_id,
       t.member_name,
       'topup' AS type,
       t.amount,
       t.status,
       t.created_at::TEXT,
       EXTRACT(DAY FROM NOW() - t.created_at)::INTEGER AS days_pending
     FROM topups t
     WHERE t.status = 'Pending'
     UNION ALL
     SELECT 
       r.id,
       r.member_id,
       r.member_name,
       'referral' AS type,
       r.reward_amount,
       r.status,
       r.created_at::TEXT,
       EXTRACT(DAY FROM NOW() - r.created_at)::INTEGER AS days_pending
     FROM referrals r
     WHERE r.status = 'Pending'
     ORDER BY days_pending DESC
     LIMIT $1`,
    [limit]
  );

  return requests;
}

/**
 * Get recent platform activities
 */
export async function getRecentActivities(limit: number = 15): Promise<RecentActivity[]> {
  const activities = await query<RecentActivity>(
    `SELECT 
       m.id,
       'member_joined' AS type,
       CONCAT(m.name, ' joined as ', COALESCE(m.level_name, 'Level 1')) AS description,
       m.name AS member_name,
       m.created_at::TEXT AS timestamp,
       m.status
     FROM members m
     UNION ALL
     SELECT 
       r.id,
       'referral_created' AS type,
       CONCAT(r.member_name, ' was referred by ', r.sponsor_name) AS description,
       r.member_name,
       r.created_at::TEXT,
       r.status
     FROM referrals r
     UNION ALL
     SELECT 
       e.id,
       'earning_created' AS type,
       CONCAT(e.member_name, ' earned ', e.amount, ' from ', e.source) AS description,
       e.member_name,
       e.created_at::TEXT,
       e.status
     FROM earnings e
     UNION ALL
     SELECT 
       w.id,
       'withdrawal_requested' AS type,
       CONCAT(w.member_name, ' requested withdrawal of ', w.amount) AS description,
       w.member_name,
       w.created_at::TEXT,
       w.status
     FROM withdrawals w
     ORDER BY timestamp DESC
     LIMIT $1`,
    [limit]
  );

  return activities;
}

/**
 * Get top performing members
 */
export async function getTopPerformingMembers(limit: number = 5) {
  const members = await query(
    `SELECT 
       id,
       name,
       email,
       level_name,
       total_earnings,
       wallet_balance,
       referral_count,
       team_count,
       joining_date
     FROM members
     WHERE status = 'Active'
     ORDER BY total_earnings DESC
     LIMIT $1`,
    [limit]
  );

  return members;
}

/**
 * Get member count by status
 */
export async function getMemberCountByStatus() {
  const counts = await query<{ status: string; count: number }>(
    `SELECT 
       status,
       COUNT(*) AS count
     FROM members
     GROUP BY status
     ORDER BY count DESC`
  );

  return counts;
}

/**
 * Get referral statistics
 */
export async function getReferralStats() {
  const stats = await queryOne(
    `SELECT 
       COUNT(*) AS total_referrals,
       SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) AS active_referrals,
       SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pending_referrals,
       SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) AS rejected_referrals,
       COALESCE(SUM(reward_amount), 0) AS total_reward_amount
     FROM referrals`
  );

  return stats;
}

/**
 * Get earning statistics
 */
export async function getEarningStats() {
  const stats = await queryOne(
    `SELECT 
       COUNT(*) AS total_earnings,
       SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completed_earnings,
       SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pending_earnings,
       SUM(CASE WHEN status = 'Failed' THEN 1 ELSE 0 END) AS failed_earnings,
       COALESCE(SUM(CASE WHEN status = 'Completed' THEN amount ELSE 0 END), 0) AS total_completed_amount
     FROM earnings`
  );

  return stats;
}

/**
 * Get withdrawal statistics
 */
export async function getWithdrawalStats() {
  const stats = await queryOne(
    `SELECT 
       COUNT(*) AS total_withdrawals,
       SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) AS approved_withdrawals,
       SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pending_withdrawals,
       SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) AS rejected_withdrawals,
       COALESCE(SUM(amount), 0) AS total_withdrawal_amount
     FROM withdrawals`
  );

  return stats;
}

/**
 * Get topup statistics
 */
export async function getTopupStats() {
  const stats = await queryOne(
    `SELECT 
       COUNT(*) AS total_topups,
       SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completed_topups,
       SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pending_topups,
       SUM(CASE WHEN status = 'Failed' THEN 1 ELSE 0 END) AS failed_topups,
       COALESCE(SUM(CASE WHEN status = 'Completed' THEN amount ELSE 0 END), 0) AS total_completed_amount
     FROM topups`
  );

  return stats;
}

/**
 * Get member growth data (for charts)
 */
export async function getMemberGrowthData() {
  const growthData = await query(
    `SELECT 
       DATE_TRUNC('day', joining_date)::DATE AS date,
       COUNT(*) AS new_members,
       SUM(COUNT(*)) OVER (ORDER BY DATE_TRUNC('day', joining_date)) AS cumulative_members
     FROM members
     WHERE joining_date >= NOW() - INTERVAL '30 days'
     GROUP BY DATE_TRUNC('day', joining_date)
     ORDER BY date ASC`
  );

  return growthData;
}

/**
 * Get income distribution by source
 */
export async function getIncomeDistribution() {
  const distribution = await query(
    `SELECT 
       source,
       COUNT(*) AS transaction_count,
       COALESCE(SUM(amount), 0) AS total_amount
     FROM earnings
     WHERE status = 'Completed'
     GROUP BY source
     ORDER BY total_amount DESC`
  );

  return distribution;
}
