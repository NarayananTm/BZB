import { query, queryOne, isDbConfigured } from '@/lib/postgres';
import { adminWithdrawals, type AdminWithdrawal } from '@/data/admin/withdrawals';

export interface Withdrawal {
  id: string;
  member_id: string | null;
  member_name: string | null;
  amount: number;
  requested_date: string;
  approved_date: string | null;
  status: 'Pending' | 'Approved' | 'Rejected';
  payout_method: string | null;
  remarks: string | null;
  created_at: string;
  updated_at: string;
}

function adaptMockWithdrawal(w: AdminWithdrawal): Withdrawal {
  const parseRs = (s: string) => Number(s.replace(/[^0-9.]/g, '')) || 0;
  return {
    id: w.id,
    member_id: w.memberId ?? null,
    member_name: w.memberName ?? null,
    amount: parseRs(w.amount ?? '0'),
    requested_date: w.requestedDate,
    approved_date: w.approvedDate ?? null,
    status: w.status,
    payout_method: w.payoutMethod ?? null,
    remarks: null,
    created_at: w.requestedDate,
    updated_at: w.requestedDate,
  };
}

export async function getAllWithdrawals(): Promise<Withdrawal[]> {
  if (!isDbConfigured()) return adminWithdrawals.map(adaptMockWithdrawal);
  const rows = await query<Withdrawal>('SELECT * FROM withdrawals ORDER BY requested_date DESC');
  return rows.length ? rows : adminWithdrawals.map(adaptMockWithdrawal);
}

export async function getWithdrawalById(id: string): Promise<Withdrawal | null> {
  return queryOne<Withdrawal>('SELECT * FROM withdrawals WHERE id = $1', [id]);
}

export async function getWithdrawalsByMember(memberId: string): Promise<Withdrawal[]> {
  if (!isDbConfigured()) return adminWithdrawals.filter((w) => w.memberId === memberId).map(adaptMockWithdrawal);
  return query<Withdrawal>('SELECT * FROM withdrawals WHERE member_id = $1 ORDER BY requested_date DESC', [memberId]);
}

export async function createWithdrawal(data: Omit<Withdrawal, 'approved_date' | 'created_at' | 'updated_at'>): Promise<Withdrawal> {
  const rows = await query<Withdrawal>(
    `INSERT INTO withdrawals (id, member_id, member_name, amount, requested_date, status, payout_method, remarks)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [data.id, data.member_id, data.member_name, data.amount, data.requested_date, data.status, data.payout_method, data.remarks],
  );
  return rows[0];
}

export async function approveWithdrawal(id: string, remarks?: string): Promise<Withdrawal | null> {
  return queryOne<Withdrawal>(
    `UPDATE withdrawals
     SET status = 'Approved', approved_date = CURRENT_DATE, remarks = COALESCE($2, remarks), updated_at = NOW()
     WHERE id = $1 RETURNING *`,
    [id, remarks ?? null],
  );
}

export async function rejectWithdrawal(id: string, remarks?: string): Promise<Withdrawal | null> {
  return queryOne<Withdrawal>(
    `UPDATE withdrawals
     SET status = 'Rejected', remarks = COALESCE($2, remarks), updated_at = NOW()
     WHERE id = $1 RETURNING *`,
    [id, remarks ?? null],
  );
}

export async function getWithdrawalSummary() {
  const rows = await query<{ total_amount: string; approved: string; pending: string; rejected: string }>(
    `SELECT
       COALESCE(SUM(amount), 0)                                    AS total_amount,
       COALESCE(SUM(amount) FILTER (WHERE status='Approved'),  0)  AS approved,
       COALESCE(SUM(amount) FILTER (WHERE status='Pending'),   0)  AS pending,
       COALESCE(SUM(amount) FILTER (WHERE status='Rejected'),  0)  AS rejected
     FROM withdrawals`,
  );
  return rows[0];
}
