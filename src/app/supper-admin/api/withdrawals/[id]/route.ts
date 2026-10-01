import { NextRequest, NextResponse } from 'next/server';
import { requireSuperAdmin } from '@/lib/adminAuth';
import {
  approveWithdrawal,
  getMbdWalletWithdrawalBalance,
  getWithdrawalById,
  rejectWithdrawal,
  InsufficientMbdWalletError,
} from '@/services/withdrawalService';
import { queryOne } from '@/lib/postgres';
import { createAuditLog, generateAuditId } from '@/services/auditLogService';

type RouteContext = { params: { id: string } };
type BankDetails = {
  account_holder: string | null;
  bank_name: string | null;
  account_number: string | null;
  ifsc_code: string | null;
  branch: string | null;
  upi_id: string | null;
  account_type: string | null;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { error } = requireSuperAdmin(request);
  if (error) return error;

  try {
    const withdrawal = await getWithdrawalById(params.id);
    if (!withdrawal) {
      return NextResponse.json({ success: false, message: 'Withdrawal request not found' }, { status: 404 });
    }
    if (!withdrawal.member_id) {
      return NextResponse.json({ success: false, message: 'Member account not found' }, { status: 404 });
    }

    const balance = await getMbdWalletWithdrawalBalance(withdrawal.member_id);
    if (!balance) {
      return NextResponse.json({ success: false, message: 'Member account not found' }, { status: 404 });
    }
    const bankDetails = await queryOne<BankDetails>(
      `SELECT account_holder, bank_name, account_number, ifsc_code, branch, upi_id, account_type
       FROM bank_accounts
       WHERE member_id = $1
       ORDER BY is_primary DESC, updated_at DESC, id
       LIMIT 1`,
      [withdrawal.member_id],
    );
    return NextResponse.json({ success: true, data: { ...balance, bank_details: bankDetails } });
  } catch (err) {
    console.error('[super-admin.withdrawals.balance.GET]', err);
    return NextResponse.json({ success: false, message: 'Unable to load MBD Wallet balance' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const { admin, error } = requireSuperAdmin(request);
  if (error) return error;

  try {
    const body = await request.json();
    const action = body.action;
    if (action !== 'approve' && action !== 'reject') {
      return NextResponse.json({ success: false, message: 'Action must be approve or reject' }, { status: 400 });
    }

    const withdrawal = action === 'approve'
      ? await approveWithdrawal(params.id, body.remarks)
      : await rejectWithdrawal(params.id, body.remarks);

    if (!withdrawal) {
      return NextResponse.json({ success: false, message: 'Withdrawal request not found' }, { status: 404 });
    }

    await createAuditLog({
      id: generateAuditId(),
      user_name: admin.name,
      action: `${action === 'approve' ? 'Approved' : 'Rejected'} withdrawal request`,
      target: params.id,
      status: 'Success',
    });

    return NextResponse.json({ success: true, data: withdrawal });
  } catch (err) {
    if (err instanceof InsufficientMbdWalletError) {
      return NextResponse.json({ success: false, message: err.message }, { status: 409 });
    }
    console.error('[super-admin.withdrawals.PATCH]', err);
    return NextResponse.json({ success: false, message: 'Unable to update withdrawal request' }, { status: 500 });
  }
}