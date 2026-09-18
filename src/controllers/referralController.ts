import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getAllReferrals, getReferralById, createReferral, updateReferralStatus, getReferralStats } from '@/services/referralService';
import type { CreateReferralDto } from '@/models';

export async function listReferrals(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    if (new URL(request.url).searchParams.get('stats') === 'true') {
      return NextResponse.json({ success: true, data: await getReferralStats() });
    }
    const referrals = await getAllReferrals();
    return NextResponse.json({ success: true, data: referrals, total: referrals.length });
  } catch (err) {
    console.error('[referralController.listReferrals]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch referrals' }, { status: 500 });
  }
}

export async function getReferral(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const referral = await getReferralById(id);
    if (!referral) return NextResponse.json({ success: false, message: 'Referral not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: referral });
  } catch (err) {
    console.error('[referralController.getReferral]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch referral' }, { status: 500 });
  }
}

export async function addReferral(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const body: CreateReferralDto = await request.json();
    if (!body.id || !body.sponsor_name || !body.member_name) {
      return NextResponse.json({ success: false, message: 'id, sponsor_name and member_name are required' }, { status: 400 });
    }
    const referral = await createReferral({
      id: body.id,
      sponsor_id: body.sponsor_id ?? null,
      sponsor_name: body.sponsor_name,
      member_id: body.member_id ?? null,
      member_name: body.member_name,
      level_name: body.level_name ?? null,
      join_date: body.join_date ?? new Date().toISOString().slice(0, 10),
      status: body.status ?? 'Pending',
      reward_amount: body.reward_amount ?? 0,
    });
    return NextResponse.json({ success: true, data: referral }, { status: 201 });
  } catch (err) {
    console.error('[referralController.addReferral]', err);
    return NextResponse.json({ success: false, message: 'Failed to create referral' }, { status: 500 });
  }
}

export async function updateStatus(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const { status } = await request.json();
    if (!status) return NextResponse.json({ success: false, message: 'status is required' }, { status: 400 });
    const referral = await updateReferralStatus(id, status);
    if (!referral) return NextResponse.json({ success: false, message: 'Referral not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: referral });
  } catch (err) {
    console.error('[referralController.updateStatus]', err);
    return NextResponse.json({ success: false, message: 'Failed to update referral' }, { status: 500 });
  }
}
