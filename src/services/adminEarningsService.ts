import { adminEarnings, AdminEarning } from '@/data/admin/earnings';

export function getAdminEarnings(): Promise<AdminEarning[]> {
  return Promise.resolve(adminEarnings);
}
