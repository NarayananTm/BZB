export interface AdminPayout {
  id: string;
  memberId: string;
  memberName: string;
  plan: string;
  amount: string;
  payoutDate: string;
  status: 'Completed' | 'Scheduled' | 'Failed';
}

export const adminPayouts: AdminPayout[] = [
  {
    id: 'PT-20260720-001',
    memberId: 'BZB9601381',
    memberName: 'Kavi',
    plan: 'Gold Referral Bonus',
    amount: 'Rs. 12,000',
    payoutDate: '2026-07-20',
    status: 'Completed',
  },
  {
    id: 'PT-20260720-002',
    memberId: 'BZB9899333',
    memberName: 'Vetrivel N',
    plan: 'Level 2 Reward',
    amount: 'Rs. 5,500',
    payoutDate: '2026-07-22',
    status: 'Scheduled',
  },
  {
    id: 'PT-20260718-003',
    memberId: 'BZB9635120',
    memberName: 'Priya Srinivasan',
    plan: 'Referral Commission',
    amount: 'Rs. 1,200',
    payoutDate: '2026-07-18',
    status: 'Failed',
  },
];
