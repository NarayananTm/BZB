import { getPool, query, queryOne, isDbConfigured } from '@/lib/postgres';
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

export class InsufficientMbdWalletError extends Error {
  constructor() {
    super('Insufficient available balance in your MBD Wallet (Referral Income).');
    this.name = 'InsufficientMbdWalletError';
  }
}

export async function getMbdWalletWithdrawalBalance(memberId: string) {
  const rows = await query<{ id: string; name: string; mbd_wallet: string | number; pending_amount: string | number }>(
    `SELECT m.id, m.name, m.mbd_wallet,
       COALESCE(SUM(w.amount) FILTER (WHERE w.status = 'Pending'), 0) AS pending_amount
     FROM members m
     LEFT JOIN withdrawals w ON w.member_id = m.id
     WHERE m.id = $1
     GROUP BY m.id, m.name, m.mbd_wallet`,
    [memberId],
  );
  if (!rows[0]) return null;
  const walletBalance = Number(rows[0].mbd_wallet) || 0;
  const pendingAmount = Number(rows[0].pending_amount) || 0;
  return {
    member_id: rows[0].id,
    name: rows[0].name,
    wallet_balance: walletBalance,
    pending_amount: pendingAmount,
    available_balance: Math.max(0, walletBalance - pendingAmount),
  };
}

export async function createMbdWalletWithdrawal(memberId: string, amount: number): Promise<Withdrawal> {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const memberResult = await client.query<{ name: string; mbd_wallet: string | number }>(
      'SELECT name, mbd_wallet FROM members WHERE id = $1 FOR UPDATE', [memberId],
    );
    const member = memberResult.rows[0];
    if (!member) throw new Error('Member not found');

    const pendingResult = await client.query<{ pending_amount: string | number }>(
      "SELECT COALESCE(SUM(amount), 0) AS pending_amount FROM withdrawals WHERE member_id = $1 AND status = 'Pending'",
      [memberId],
    );
    const availableBalance = (Number(member.mbd_wallet) || 0) - (Number(pendingResult.rows[0]?.pending_amount) || 0);
    if (amount > availableBalance) throw new InsufficientMbdWalletError();

    const id = `WDR-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    const result = await client.query<Withdrawal>(
      `INSERT INTO withdrawals (id, member_id, member_name, amount, requested_date, status, payout_method)
       VALUES ($1, $2, $3, $4, CURRENT_DATE, 'Pending', 'MBD Wallet (Referral Income)') RETURNING *`,
      [id, memberId, member.name, amount],
    );
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
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
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const withdrawalResult = await client.query<Withdrawal>(
      'SELECT * FROM withdrawals WHERE id = $1 FOR UPDATE', [id],
    );
    const withdrawal = withdrawalResult.rows[0];
    if (!withdrawal) {
      await client.query('COMMIT');
      return null;
    }
    if (withdrawal.status !== 'Pending') {
      await client.query('COMMIT');
      return withdrawal;
    }

    if (withdrawal.member_id) {
      const memberUpdate = await client.query(
        `UPDATE members SET mbd_wallet = mbd_wallet - $2, updated_at = NOW()
         WHERE id = $1 AND mbd_wallet >= $2 RETURNING id`,
        [withdrawal.member_id, withdrawal.amount],
      );
      if (!memberUpdate.rows[0]) throw new InsufficientMbdWalletError();
    }

    const result = await client.query<Withdrawal>(
      `UPDATE withdrawals
       SET status = 'Approved', approved_date = CURRENT_DATE, remarks = COALESCE($2, remarks), updated_at = NOW()
       WHERE id = $1 RETURNING *`,
      [id, remarks ?? null],
    );
    await client.query('COMMIT');
    return result.rows[0] ?? null;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
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
