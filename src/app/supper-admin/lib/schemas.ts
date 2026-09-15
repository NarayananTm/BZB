// Schema validators for API responses

export interface DashboardStats {
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
  levels: Array<{
    name: string;
    members_count: number;
    percentage: number;
  }>;
}

export interface FinancialStats {
  total_income: number;
  pending_withdrawals: number;
  pending_topups: number;
  completed_withdrawals: number;
  completed_topups: number;
  total_platform_balance: number;
}

export interface TopMember {
  id: string;
  name: string;
  level_name: string;
  status: 'Active' | 'Pending' | 'Suspended';
  joining_date: string;
}

export interface DashboardData {
  dashboardStats: DashboardStats;
  financialStats: FinancialStats;
  topMembers: TopMember[];
}

export interface PendingMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  joining_date: string;
  referral_id: string;
  referrer_name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  bank_account: string;
  ifsc_code: string;
  total_referrals: number;
  days_pending: number;
  pan?: string;
  aadhar?: string;
  amount?: number;
  utr_number?: string;
  transaction_proof_name?: string;
  transaction_proof_type?: string;
}

export interface MemberDetails extends PendingMember {
  pan: string;
  aadhar: string;
  amount: number;
  utr_number: string;
  transaction_proof_name: string;
  transaction_proof_type: string;
  sponsor_name: string;
  sponsor_mobile: string;
}

/**
 * Validates dashboard data structure
 */
export function validateDashboardData(data: any): DashboardData {
  if (!data.dashboardStats || !data.financialStats) {
    throw new Error('Missing required dashboard data fields');
  }

  if (typeof data.dashboardStats.total_members !== 'number') {
    throw new Error('Invalid dashboard stats: total_members must be a number');
  }

  return data;
}

/**
 * Validates pending member structure
 */
export function validatePendingMember(member: any): PendingMember {
  if (!member.id || !member.name || !member.email) {
    throw new Error('Invalid member data: missing required fields');
  }

  if (typeof member.days_pending !== 'number') {
    throw new Error('Invalid member data: days_pending must be a number');
  }

  return member;
}

/**
 * Validates member details structure
 */
export function validateMemberDetails(details: any): MemberDetails {
  if (!details.id || !details.name) {
    throw new Error('Invalid member details: missing required fields');
  }

  return details;
}

/**
 * Formats currency in Indian Rupees
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats numbers with commas in Indian format
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Formats date to readable format
 */
export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Invalid date';
  }
}

/**
 * Calculates percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}
