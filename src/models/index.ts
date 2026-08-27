// ─── Auth ────────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  password?: string;
  role: 'admin' | 'superadmin';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminTokenPayload {
  id: number;
  email: string;
  name: string;
  role: string;
}

// ─── Member ──────────────────────────────────────────────────────────────────

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

export interface CreateMemberDto {
  id: string;
  name: string;
  email: string;
  mobile: string;
  sponsor_id?: string | null;
  sponsor_name?: string | null;
  level_name?: string;
  status?: Member['status'];
  joining_date?: string;
  avatar?: string | null;
}

// ─── Referral ────────────────────────────────────────────────────────────────

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

export interface CreateReferralDto {
  id: string;
  sponsor_id?: string | null;
  sponsor_name: string;
  member_id?: string | null;
  member_name: string;
  level_name?: string | null;
  join_date?: string | null;
  status?: Referral['status'];
  reward_amount?: number;
}

// ─── Earning ─────────────────────────────────────────────────────────────────

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

export interface CreateEarningDto {
  id: string;
  member_id?: string | null;
  member_name?: string | null;
  source?: string | null;
  level_name?: string | null;
  amount: number;
  earn_date: string;
  status?: Earning['status'];
}

// ─── Top-up ──────────────────────────────────────────────────────────────────

export interface Topup {
  id: string;
  member_id: string | null;
  member_name: string | null;
  amount: number;
  method: string | null;
  topup_date: string;
  status: 'Pending' | 'Completed' | 'Failed';
  created_at: string;
  updated_at: string;
}

export interface CreateTopupDto {
  id: string;
  member_id?: string | null;
  member_name?: string | null;
  amount: number;
  method?: string | null;
  topup_date: string;
  status?: Topup['status'];
}

// ─── Withdrawal ──────────────────────────────────────────────────────────────

export interface Withdrawal {
  id: string;
  member_id: string | null;
  member_name: string | null;
  amount: number;
  requested_date: string;
  approved_date: string | null;
  status: 'Pending' | 'Approved' | 'Rejected';
  payout_method: string | null;
  remarks: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateWithdrawalDto {
  id: string;
  member_id: string;
  member_name?: string | null;
  amount: number;
  requested_date?: string;
  payout_method?: string | null;
  remarks?: string | null;
}

// ─── Payout ──────────────────────────────────────────────────────────────────

export interface Payout {
  id: string;
  member_id: string | null;
  member_name: string | null;
  plan: string | null;
  amount: number;
  payout_date: string | null;
  status: 'Completed' | 'Scheduled' | 'Failed';
  created_at: string;
  updated_at: string;
}

export interface CreatePayoutDto {
  id: string;
  member_id: string;
  member_name?: string | null;
  plan?: string | null;
  amount: number;
  payout_date?: string | null;
  status?: Payout['status'];
}

// ─── Level ───────────────────────────────────────────────────────────────────

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

export interface CreateLevelDto {
  id: string;
  name: string;
  required_referrals: number;
  reward?: string | null;
  members_count?: number;
  completion_pct?: number;
  status?: Level['status'];
  description?: string | null;
}

// ─── Notification ────────────────────────────────────────────────────────────

export interface Notification {
  id: string;
  title: string;
  message: string | null;
  type: 'System' | 'Member' | 'Alert';
  is_read: boolean;
  created_date: string;
  created_at: string;
}

export interface CreateNotificationDto {
  id: string;
  title: string;
  message?: string | null;
  type?: Notification['type'];
}

// ─── Audit Log ───────────────────────────────────────────────────────────────

export interface AuditLog {
  id: string;
  user_name: string | null;
  action: string;
  target: string | null;
  log_date: string;
  status: 'Success' | 'Failure' | null;
  created_at: string;
}

export interface CreateAuditLogDto {
  id: string;
  user_name: string;
  action: string;
  target?: string;
  status: 'Success' | 'Failure';
}

// ─── Report ──────────────────────────────────────────────────────────────────

export interface Report {
  id: string;
  title: string;
  category: 'Members' | 'Earnings' | 'Referral' | 'Compliance' | 'Activity';
  created_date: string;
  owner: string | null;
  status: 'Ready' | 'Generating' | 'Scheduled';
  created_at: string;
}

export interface CreateReportDto {
  id: string;
  title: string;
  category: Report['category'];
  created_date?: string;
  owner?: string | null;
  status?: Report['status'];
}

// ─── Setting ─────────────────────────────────────────────────────────────────

export interface Setting {
  key: string;
  value: string;
  description: string | null;
  updated_at: string;
}

// ─── API Response wrapper ────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  total?: number;
}
