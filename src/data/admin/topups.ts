export interface AdminTopup {
  id: string;
  memberId: string;
  memberName: string;
  amount: string;
  method: string;
  date: string;
  status: 'Pending' | 'Completed' | 'Failed';
}

export const adminTopups: AdminTopup[] = [
  {
    id: 'TOP-20260719-001',
    memberId: 'BZB9601381',
    memberName: 'Kavi',
    amount: 'Rs. 5,000',
    method: 'UPI',
    date: '2026-07-19',
    status: 'Completed',
  },
  {
    id: 'TOP-20260718-002',
    memberId: 'BZB9899333',
    memberName: 'Vetrivel N',
    amount: 'Rs. 10,000',
    method: 'Bank Transfer',
    date: '2026-07-18',
    status: 'Pending',
  },
  {
    id: 'TOP-20260717-003',
    memberId: 'BZB9827341',
    memberName: 'Mahimai Dass J',
    amount: 'Rs. 2,500',
    method: 'UPI',
    date: '2026-07-17',
    status: 'Completed',
  },
  {
    id: 'TOP-20260716-004',
    memberId: 'BZB9635120',
    memberName: 'Priya Srinivasan',
    amount: 'Rs. 1,000',
    method: 'Wallet',
    date: '2026-07-16',
    status: 'Failed',
  },
];
