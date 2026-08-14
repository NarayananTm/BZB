export interface AdminAuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  date: string;
  status: 'Success' | 'Failure';
}

export const adminAuditLogs: AdminAuditLog[] = [
  {
    id: 'AL-20260720-001',
    user: 'Admin',
    action: 'Approved withdrawal request',
    target: 'WD-20260718-002',
    date: '2026-07-20 11:12',
    status: 'Success',
  },
  {
    id: 'AL-20260719-002',
    user: 'Admin',
    action: 'Updated referral reward settings',
    target: 'Referral Program',
    date: '2026-07-19 09:48',
    status: 'Success',
  },
  {
    id: 'AL-20260718-003',
    user: 'Superadmin',
    action: 'Failed payout due to invalid bank details',
    target: 'PT-20260718-003',
    date: '2026-07-18 14:30',
    status: 'Failure',
  },
];
