import { adminLevels, AdminLevel } from '@/data/admin/levels';
import { readCollection } from '@/lib/db';

export function getAdminLevels(): Promise<AdminLevel[]> {
  return readCollection('admin_levels', adminLevels);
}
