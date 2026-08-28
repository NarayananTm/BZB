import { adminEarnings, AdminEarning } from '@/data/admin/earnings';
import { readCollection } from '@/lib/db';

export function getAdminEarnings(): Promise<AdminEarning[]> {
  return readCollection('admin_earnings', adminEarnings);
}
