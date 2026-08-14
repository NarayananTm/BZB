import { adminLevels, AdminLevel } from '@/data/admin/levels';

export function getAdminLevels(): Promise<AdminLevel[]> {
  return Promise.resolve(adminLevels);
}
