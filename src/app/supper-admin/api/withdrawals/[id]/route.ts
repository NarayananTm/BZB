import { NextRequest, NextResponse } from 'next/server';
import { requireSuperAdmin } from '@/lib/adminAuth';
import { approveWithdrawal, rejectWithdrawal, InsufficientMbdWalletError } from '@/services/withdrawalService';
import { createAuditLog, generateAuditId } from '@/services/auditLogService';

type RouteContext = { params: { id: string } };

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