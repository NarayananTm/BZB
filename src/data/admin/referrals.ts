export interface AdminReferral {
  id: string;
  sponsor: string;
  memberName: string;
  level: string;
  joinDate: string;
  status: 'Active' | 'Pending' | 'Approved' | 'Rejected';
  reward: string;
}

export const adminReferrals: AdminReferral[] = [
  {
    id: 'REF-20260712-001',
    sponsor: 'Kavi',
    memberName: 'Nisha Menon',
    level: 'Level 1',
    joinDate: '2026-07-12',
    status: 'Active',
    reward: 'Rs. 1,200',
  },
  {
    id: 'REF-20260630-002',
    sponsor: 'Vetrivel N',
    memberName: 'Sanjay Agarwal',
    level: 'Level 2',
    joinDate: '2026-06-30',
    status: 'Approved',
    reward: 'Rs. 2,500',
  },
  {
    id: 'REF-20260705-003',
    sponsor: 'Mahimai Dass J',
    memberName: 'Priya Patel',
    level: 'Level 3',
    joinDate: '2026-07-05',
    status: 'Pending',
    reward: 'Rs. 3,500',
  },
  {
    id: 'REF-20260718-004',
    sponsor: 'Kavi',
    memberName: 'Anil Kumar',
    level: 'Direct',
    joinDate: '2026-07-18',
    status: 'Active',
    reward: 'Rs. 850',
  },
];
