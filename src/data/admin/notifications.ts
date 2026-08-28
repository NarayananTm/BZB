export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'System' | 'Member' | 'Alert';
  createdDate: string;
  read: boolean;
}

export const adminNotifications: AdminNotification[] = [
  {
    id: 'NT-20260720-001',
    title: 'Pending withdrawal approval',
    message: 'A withdrawal request from Vetrivel N requires review.',
    type: 'Alert',
    createdDate: '2026-07-20',
    read: false,
  },
  {
    id: 'NT-20260719-002',
    title: 'New referral added',
    message: 'Nisha Menon joined through Kavi.',
    type: 'Member',
    createdDate: '2026-07-19',
    read: true,
  },
  {
    id: 'NT-20260718-003',
    title: 'System maintenance scheduled',
    message: 'Scheduled downtime is planned for 2026-07-25 02:00 AM.',
    type: 'System',
    createdDate: '2026-07-18',
    read: false,
  },
];
