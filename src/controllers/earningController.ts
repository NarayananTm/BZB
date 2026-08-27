import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getAllEarnings, getEarningById, createEarning, updateEarningStatus, getEarningsSummary } from '@/services/earningService';
import type { CreateEarningDto } from '@/models';

export async function listEarnings(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    if (new URL(request.url).searchParams.get('summary') === 'true') {
      return NextResponse.json({ success: true, data: await getEarningsSummary() });
    }
    const earnings = await getAllEarnings();
    return NextResponse.json({ success: true, data: earnings, total: earnings.length });
  } catch (err) {
    console.error('[earningController.listEarnings]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch earnings' }, { status: 500 });
  }
}

export async function getEarning(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const earning = await getEarningById(id);
    if (!earning) return NextResponse.json({ success: false, message: 'Earning not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: earning });
  } catch (err) {
    console.error('[earningController.getEarning]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch earning' }, { status: 500 });
  }
}

export async function addEarning(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const body: CreateEarningDto = await request.json();
    if (!body.id || !body.amount || !body.earn_date) {
      return NextResponse.json({ success: false, message: 'id, amount and earn_date are required' }, { status: 400 });
    }
    const earning = await createEarning({
      id: body.id,
      member_id: body.member_id ?? null,
      member_name: body.member_name ?? null,
      source: body.source ?? null,
      level_name: body.level_name ?? null,
      amount: Number(body.amount),
      earn_date: body.earn_date,
      status: body.status ?? 'Pending',
    });
    return NextResponse.json({ success: true, data: earning }, { status: 201 });
  } catch (err) {
    console.error('[earningController.addEarning]', err);
    return NextResponse.json({ success: false, message: 'Failed to create earning' }, { status: 500 });
  }
}

export async function patchEarning(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const { status } = await request.json();
    if (!status) return NextResponse.json({ success: false, message: 'status is required' }, { status: 400 });
    const earning = await updateEarningStatus(id, status);
    if (!earning) return NextResponse.json({ success: false, message: 'Earning not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: earning });
  } catch (err) {
    console.error('[earningController.patchEarning]', err);
    return NextResponse.json({ success: false, message: 'Failed to update earning' }, { status: 500 });
  }
}
