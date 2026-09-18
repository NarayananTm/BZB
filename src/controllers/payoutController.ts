import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getAllPayouts, getPayoutById, createPayout, updatePayoutStatus, getPayoutSummary } from '@/services/payoutService';
import type { CreatePayoutDto } from '@/models';

export async function listPayouts(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    if (new URL(request.url).searchParams.get('summary') === 'true') {
      return NextResponse.json({ success: true, data: await getPayoutSummary() });
    }
    const payouts = await getAllPayouts();
    return NextResponse.json({ success: true, data: payouts, total: payouts.length });
  } catch (err) {
    console.error('[payoutController.listPayouts]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch payouts' }, { status: 500 });
  }
}

export async function getPayout(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const payout = await getPayoutById(id);
    if (!payout) return NextResponse.json({ success: false, message: 'Payout not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: payout });
  } catch (err) {
    console.error('[payoutController.getPayout]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch payout' }, { status: 500 });
  }
}

export async function addPayout(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const body: CreatePayoutDto = await request.json();
    if (!body.id || !body.amount || !body.member_id) {
      return NextResponse.json({ success: false, message: 'id, amount and member_id are required' }, { status: 400 });
    }
    const payout = await createPayout({
      id: body.id,
      member_id: body.member_id,
      member_name: body.member_name ?? null,
      plan: body.plan ?? null,
      amount: Number(body.amount),
      payout_date: body.payout_date ?? null,
      status: body.status ?? 'Scheduled',
    });
    return NextResponse.json({ success: true, data: payout }, { status: 201 });
  } catch (err) {
    console.error('[payoutController.addPayout]', err);
    return NextResponse.json({ success: false, message: 'Failed to create payout' }, { status: 500 });
  }
}

export async function patchPayout(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const { status } = await request.json();
    if (!status) return NextResponse.json({ success: false, message: 'status is required' }, { status: 400 });
    const payout = await updatePayoutStatus(id, status);
    if (!payout) return NextResponse.json({ success: false, message: 'Payout not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: payout });
  } catch (err) {
    console.error('[payoutController.patchPayout]', err);
    return NextResponse.json({ success: false, message: 'Failed to update payout' }, { status: 500 });
  }
}
