import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import {
  getAllMembers, getMemberById, createMember,
  updateMember, updateMemberStatus, deleteMember, getMemberStats,
} from '@/services/memberService';
import type { CreateMemberDto } from '@/models';

export async function listMembers(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get('stats') === 'true') {
      return NextResponse.json({ success: true, data: await getMemberStats() });
    }
    const members = await getAllMembers();
    return NextResponse.json({ success: true, data: members, total: members.length });
  } catch (err) {
    console.error('[memberController.listMembers]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function getMember(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const member = await getMemberById(id);
    if (!member) return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: member });
  } catch (err) {
    console.error('[memberController.getMember]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch member' }, { status: 500 });
  }
}

export async function addMember(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const body: CreateMemberDto = await request.json();
    if (!body.id || !body.name || !body.email || !body.mobile) {
      return NextResponse.json({ success: false, message: 'id, name, email and mobile are required' }, { status: 400 });
    }
    const member = await createMember({
      id: body.id,
      name: body.name,
      email: body.email,
      mobile: body.mobile,
      sponsor_id: body.sponsor_id ?? null,
      sponsor_name: body.sponsor_name ?? null,
      level_name: body.level_name ?? 'Level 1',
      status: body.status ?? 'Pending',
      joining_date: body.joining_date ?? new Date().toISOString().slice(0, 10),
      total_earnings: 0,
      wallet_balance: 0,
      referral_count: 0,
      team_count: 0,
      avatar: body.avatar ?? null,
    });
    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (err) {
    console.error('[memberController.addMember]', err);
    return NextResponse.json({ success: false, message: 'Failed to create member' }, { status: 500 });
  }
}

export async function editMember(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const body = await request.json();
    const member =
      body.status && Object.keys(body).length === 1
        ? await updateMemberStatus(id, body.status)
        : await updateMember(id, body);
    if (!member) return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: member });
  } catch (err) {
    console.error('[memberController.editMember]', err);
    return NextResponse.json({ success: false, message: 'Failed to update member' }, { status: 500 });
  }
}

export async function removeMember(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const deleted = await deleteMember(id);
    if (!deleted) return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Member deleted' });
  } catch (err) {
    console.error('[memberController.removeMember]', err);
    return NextResponse.json({ success: false, message: 'Failed to delete member' }, { status: 500 });
  }
}
