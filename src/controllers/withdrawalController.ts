import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import {
  getAllWithdrawals, getWithdrawalById, createWithdrawal,
  approveWithdrawal, rejectWithdrawal, getWithdrawalSummary,
} from '@/services/withdrawalService';
import { createAuditLog, generateAuditId } from '@/services/auditLogService';
import type { CreateWithdrawalDto } from '@/models';

export async function listWithdrawals(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    if (new URL(request.url).searchParams.get('summary') === 'true') {
      return NextResponse.json({ success: true, data: await getWithdrawalSummary() });
    }
    const withdrawals = await getAllWithdrawals();
    return NextResponse.json({ success: true, data: withdrawals, total: withdrawals.length });
  } catch (err) {
    console.error('[withdrawalController.listWithdrawals]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch withdrawals' }, { status: 500 });
  }
}

export async function getWithdrawal(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const w = await getWithdrawalById(id);
    if (!w) return NextResponse.json({ success: false, message: 'Withdrawal not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: w });
  } catch (err) {
    console.error('[withdrawalController.getWithdrawal]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch withdrawal' }, { status: 500 });
  }
}

export async function addWithdrawal(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const body: CreateWithdrawalDto = await request.json();
    if (!body.id || !body.amount || !body.member_id) {
      return NextResponse.json({ success: false, message: 'id, amount and member_id are required' }, { status: 400 });
    }
    const w = await createWithdrawal({
      id: body.id,
      member_id: body.member_id,
      member_name: body.member_name ?? null,
      amount: Number(body.amount),
      requested_date: body.requested_date ?? new Date().toISOString().slice(0, 10),
      status: 'Pending',
      payout_method: body.payout_method ?? null,
      remarks: body.remarks ?? null,
    });
    return NextResponse.json({ success: true, data: w }, { status: 201 });
  } catch (err) {
    console.error('[withdrawalController.addWithdrawal]', err);
    return NextResponse.json({ success: false, message: 'Failed to create withdrawal' }, { status: 500 });
  }
}

export async function processWithdrawal(request: NextRequest, id: string) {
  const { admin, error } = requireAdmin(request);
  if (error) return error;

  try {
    const { action, remarks } = await request.json();
    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ success: false, message: 'action must be approve or reject' }, { status: 400 });
    }

    const w =
      action === 'approve'
        ? await approveWithdrawal(id, remarks)
        : await rejectWithdrawal(id, remarks);

    if (!w) return NextResponse.json({ success: false, message: 'Withdrawal not found' }, { status: 404 });

    await createAuditLog({
      id: generateAuditId(),
      user_name: admin!.name,
      action: `${action === 'approve' ? 'Approved' : 'Rejected'} withdrawal request`,
      target: id,
      status: 'Success',
    });

    return NextResponse.json({ success: true, data: w });
  } catch (err) {
    console.error('[withdrawalController.processWithdrawal]', err);
    return NextResponse.json({ success: false, message: 'Failed to update withdrawal' }, { status: 500 });
  }
}
