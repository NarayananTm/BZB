import { adminReferrals, AdminReferral } from '@/data/admin/referrals';
import { readCollection } from '@/lib/db';

export function getAdminReferrals(): Promise<AdminReferral[]> {
  return readCollection('admin_referrals', adminReferrals);
}
