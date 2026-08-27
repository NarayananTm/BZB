import { adminPayouts, AdminPayout } from '@/data/admin/payouts';
import { adminWithdrawals, AdminWithdrawal } from '@/data/admin/withdrawals';
import { readCollection } from '@/lib/db';

export function getAdminPayouts(): Promise<AdminPayout[]> {
  return readCollection('admin_payouts', adminPayouts);
}

export function getAdminWithdrawals(): Promise<AdminWithdrawal[]> {
  return readCollection('admin_withdrawals', adminWithdrawals);
}