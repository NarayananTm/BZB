import { adminTopups, AdminTopup } from '@/data/admin/topups';
import { readCollection } from '@/lib/db';

export function getAdminTopups(): Promise<AdminTopup[]> {
  return readCollection('admin_topups', adminTopups);
}
