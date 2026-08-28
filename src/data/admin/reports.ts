export interface AdminReport {
  id: string;
  title: string;
  category: 'Members' | 'Earnings' | 'Referral' | 'Compliance' | 'Activity';
  createdDate: string;
  owner: string;
  status: 'Ready' | 'Generating' | 'Scheduled';
}

export const adminReports: AdminReport[] = [
  {
    id: 'RP-20260701-001',
    title: 'Monthly Earnings Summary',
    category: 'Earnings',
    createdDate: '2026-07-01',
    owner: 'Admin Team',
    status: 'Ready',
  },
  {
    id: 'RP-20260708-002',
    title: 'Active Member Growth',
    category: 'Members',
    createdDate: '2026-07-08',
    owner: 'Operations',
    status: 'Ready',
  },
  {
    id: 'RP-20260715-003',
    title: 'Referral Campaign Performance',
    category: 'Referral',
    createdDate: '2026-07-15',
    owner: 'Marketing',
    status: 'Scheduled',
  },
];
