export interface AdminEarning {
  id: string;
  memberId: string;
  memberName: string;
  source: string;
  level: string;
  amount: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export const adminEarnings: AdminEarning[] = [
  {
    id: 'EARN-20260719-001',
    memberId: 'BZB9601381',
    memberName: 'Kavi',
    source: 'Referral Reward',
    level: 'Level 1',
    amount: 'Rs. 1,200',
    date: '2026-07-19',
    status: 'Completed',
  },
  {
    id: 'EARN-20260718-002',
    memberId: 'BZB9899333',
    memberName: 'Vetrivel N',
    source: 'Top-up Bonus',
    level: 'Level 2',
    amount: 'Rs. 2,650',
    date: '2026-07-18',
    status: 'Completed',
  },
  {
    id: 'EARN-20260715-003',
    memberId: 'BZB9827341',
    memberName: 'Mahimai Dass J',
    source: 'Level Completion',
    level: 'Level 3',
    amount: 'Rs. 4,750',
    date: '2026-07-15',
    status: 'Completed',
  },
  {
    id: 'EARN-20260714-004',
    memberId: 'BZB9635120',
    memberName: 'Priya Srinivasan',
    source: 'Referral Reward',
    level: 'Direct',
    amount: 'Rs. 650',
    date: '2026-07-14',
    status: 'Pending',
  },
];
