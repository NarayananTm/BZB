export interface AdminWithdrawal {
  id: string;
  memberId: string;
  memberName: string;
  amount: string;
  requestedDate: string;
  approvedDate?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  payoutMethod: 'Bank Transfer' | 'UPI' | 'Wallet';
}

export const adminWithdrawals: AdminWithdrawal[] = [
  {
    id: 'WD-20260719-001',
    memberId: 'BZB9827341',
    memberName: 'Mahimai Dass J',
    amount: 'Rs. 25,000',
    requestedDate: '2026-07-19',
    approvedDate: '2026-07-20',
    status: 'Approved',
    payoutMethod: 'Bank Transfer',
  },
  {
    id: 'WD-20260718-002',
    memberId: 'BZB9899333',
    memberName: 'Vetrivel N',
    amount: 'Rs. 8,500',
    requestedDate: '2026-07-18',
    status: 'Pending',
    payoutMethod: 'UPI',
  },
  {
    id: 'WD-20260716-003',
    memberId: 'BZB9635120',
    memberName: 'Priya Srinivasan',
    amount: 'Rs. 3,200',
    requestedDate: '2026-07-16',
    approvedDate: '2026-07-17',
    status: 'Approved',
    payoutMethod: 'Wallet',
  },
];
