import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getAllTopups, getTopupById, createTopup, updateTopupStatus, getTopupSummary } from '@/services/topupService';
import type { CreateTopupDto } from '@/models';

export async function listTopups(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    if (new URL(request.url).searchParams.get('summary') === 'true') {
      return NextResponse.json({ success: true, data: await getTopupSummary() });
    }
    const topups = await getAllTopups();
    return NextResponse.json({ success: true, data: topups, total: topups.length });
  } catch (err) {
    console.error('[topupController.listTopups]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch topups' }, { status: 500 });
  }
}

export async function getTopup(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const topup = await getTopupById(id);
    if (!topup) return NextResponse.json({ success: false, message: 'Topup not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: topup });
  } catch (err) {
    console.error('[topupController.getTopup]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch topup' }, { status: 500 });
  }
}

export async function addTopup(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const body: CreateTopupDto = await request.json();
    if (!body.id || !body.amount || !body.topup_date) {
      return NextResponse.json({ success: false, message: 'id, amount and topup_date are required' }, { status: 400 });
    }
    const topup = await createTopup({
      id: body.id,
      member_id: body.member_id ?? null,
      member_name: body.member_name ?? null,
      amount: Number(body.amount),
      method: body.method ?? null,
      topup_date: body.topup_date,
      status: body.status ?? 'Pending',
    });
    return NextResponse.json({ success: true, data: topup }, { status: 201 });
  } catch (err) {
    console.error('[topupController.addTopup]', err);
    return NextResponse.json({ success: false, message: 'Failed to create topup' }, { status: 500 });
  }
}

export async function patchTopup(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const { status } = await request.json();
    if (!status) return NextResponse.json({ success: false, message: 'status is required' }, { status: 400 });
    const topup = await updateTopupStatus(id, status);
    if (!topup) return NextResponse.json({ success: false, message: 'Topup not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: topup });
  } catch (err) {
    console.error('[topupController.patchTopup]', err);
    return NextResponse.json({ success: false, message: 'Failed to update topup' }, { status: 500 });
  }
}
