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

export const adminMembers: AdminMember[] = [
  {
    id: 'BZB9601381',
    name: 'Kavi',
    email: 'kavi@bzbgroup.com',
    mobile: '9876543210',
    sponsor: 'Mahimai Dass J',
    level: 'Level 2',
    status: 'Active',
    joiningDate: '2026-07-01',
    totalEarnings: 'Rs. 12,850',
    walletBalance: 'Rs. 2,400',
    referralCount: 18,
    teamCount: 30,
    avatar: '/images/admin/avatar-1.png',
  },
  {
    id: 'BZB9899333',
    name: 'Vetrivel N',
    email: 'vetrivel@bzbgroup.com',
    mobile: '6381612345',
    sponsor: 'Mahimai Dass J',
    level: 'Level 3',
    status: 'Active',
    joiningDate: '2026-06-26',
    totalEarnings: 'Rs. 18,760',
    walletBalance: 'Rs. 4,010',
    referralCount: 25,
    teamCount: 48,
    avatar: '/images/admin/avatar-2.png',
  },
  {
    id: 'BZB9899333',
    name: 'Vetrivel N',
    email: 'vetrivel@bzbgroup.com',
    mobile: '6381612345',
    sponsor: 'Mahimai Dass J',
    level: 'Level 3',
    status: 'Active',
    joiningDate: '2026-06-26',
    totalEarnings: 'Rs. 18,760',
    walletBalance: 'Rs. 4,010',
    referralCount: 25,
    teamCount: 48,
    avatar: '/images/admin/avatar-2.png',
  },
  {
    id: 'BZB9899333',
    name: 'Vetrivel N',
    email: 'vetrivel@bzbgroup.com',
    mobile: '6381612345',
    sponsor: 'Mahimai Dass J',
    level: 'Level 3',
    status: 'Active',
    joiningDate: '2026-06-26',
    totalEarnings: 'Rs. 18,760',
    walletBalance: 'Rs. 4,010',
    referralCount: 25,
    teamCount: 48,
    avatar: '/images/admin/avatar-2.png',
  },
  {
    id: 'BZB9827341',
    name: 'Mahimai Dass J',
    email: 'mahimai@bzbgroup.com',
    mobile: '6381987654',
    sponsor: 'Company',
    level: 'Level 3',
    status: 'Approved',
    joiningDate: '2026-05-18',
    totalEarnings: 'Rs. 28,540',
    walletBalance: 'Rs. 9,100',
    referralCount: 32,
    teamCount: 64,
    avatar: '/images/admin/avatar-3.png',
  },
  {
    id: 'BZB9635120',
    name: 'Priya Srinivasan',
    email: 'priya.s@bzbgroup.com',
    mobile: '9123456780',
    sponsor: 'Kavi',
    level: 'Level 1',
    status: 'Pending',
    joiningDate: '2026-07-15',
    totalEarnings: 'Rs. 1,750',
    walletBalance: 'Rs. 880',
    referralCount: 8,
    teamCount: 12,
  },
  {
    id: 'BZB9700291',
    name: 'Rahul Mehta',
    email: 'rahul@bzbgroup.com',
    mobile: '9156782340',
    sponsor: 'Vetrivel N',
    level: 'Level 2',
    status: 'Inactive',
    joiningDate: '2026-06-30',
    totalEarnings: 'Rs. 6,320',
    walletBalance: 'Rs. 1,120',
    referralCount: 13,
    teamCount: 22,
  },
];
