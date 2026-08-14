import { adminReferrals, AdminReferral } from '@/data/admin/referrals';

export function getAdminReferrals(): Promise<AdminReferral[]> {
  return Promise.resolve(adminReferrals);
}
