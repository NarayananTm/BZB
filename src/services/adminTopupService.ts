import { adminTopups, AdminTopup } from '@/data/admin/topups';

export function getAdminTopups(): Promise<AdminTopup[]> {
  return Promise.resolve(adminTopups);
}
