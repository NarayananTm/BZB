import { query, queryOne } from '@/lib/postgres';

export interface AdminMember {
  id: string;
  name: string;
  email: string;
  mobile: string;
  sponsor: string;
  sponsor_id: string;
  level: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Approved' | 'Rejected';
  joiningDate: string;
  totalEarnings: string;
  walletBalance: string;
  referralCount: number;
  teamCount: number;
  avatar?: string;
}

export async function getAdminMembers(): Promise<AdminMember[]> {
  const members = await query<AdminMember>(
    `SELECT 
      id,
      name,
      email,
      mobile,
      COALESCE(sponsor_name, '') as sponsor,
      COALESCE(sponsor_id, '') as sponsor_id,
      COALESCE(level_name, 'Level 1') as level,
      status,
      joining_date as joiningDate,
      CONCAT('Rs. ', FORMAT(total_earnings, 0)) as totalEarnings,
      CONCAT('Rs. ', FORMAT(wallet_balance, 0)) as walletBalance,
      COALESCE(referral_count, 0) as referralCount,
      COALESCE(team_count, 0) as teamCount,
      avatar
     FROM members 
     ORDER BY created_at DESC`,
  );
  return members;
}

export async function getAdminMemberById(id: string): Promise<AdminMember | undefined> {
  const member = await queryOne<AdminMember>(
    `SELECT 
      id,
      name,
      email,
      mobile,
      COALESCE(sponsor_name, '') as sponsor,
      COALESCE(sponsor_id, '') as sponsor_id,
      COALESCE(level_name, 'Level 1') as level,
      status,
      joining_date as joiningDate,
      CONCAT('Rs. ', FORMAT(total_earnings, 0)) as totalEarnings,
      CONCAT('Rs. ', FORMAT(wallet_balance, 0)) as walletBalance,
      COALESCE(referral_count, 0) as referralCount,
      COALESCE(team_count, 0) as teamCount,
      avatar
     FROM members 
     WHERE id = $1`,
    [id]
  );
  return member || undefined;
}
