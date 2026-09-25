export interface AdminReferral {
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

export const adminReferrals: AdminReferral[] = [];
