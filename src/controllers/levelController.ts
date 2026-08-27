import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getAllLevels, getLevelById, createLevel, updateLevel, deleteLevel } from '@/services/levelService';
import type { CreateLevelDto } from '@/models';

export async function listLevels(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    return NextResponse.json({ success: true, data: await getAllLevels() });
  } catch (err) {
    console.error('[levelController.listLevels]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch levels' }, { status: 500 });
  }
}

export async function getLevel(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const level = await getLevelById(id);
    if (!level) return NextResponse.json({ success: false, message: 'Level not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: level });
  } catch (err) {
    console.error('[levelController.getLevel]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch level' }, { status: 500 });
  }
}

export async function addLevel(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const body: CreateLevelDto = await request.json();
    if (!body.id || !body.name || !body.required_referrals) {
      return NextResponse.json({ success: false, message: 'id, name and required_referrals are required' }, { status: 400 });
    }
    const level = await createLevel({
      id: body.id,
      name: body.name,
      required_referrals: Number(body.required_referrals),
      reward: body.reward ?? null,
      members_count: body.members_count ?? 0,
      completion_pct: body.completion_pct ?? 0,
      status: body.status ?? 'Active',
      description: body.description ?? null,
    });
    return NextResponse.json({ success: true, data: level }, { status: 201 });
  } catch (err) {
    console.error('[levelController.addLevel]', err);
    return NextResponse.json({ success: false, message: 'Failed to create level' }, { status: 500 });
  }
}

export async function editLevel(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const body = await request.json();
    const level = await updateLevel(id, body);
    if (!level) return NextResponse.json({ success: false, message: 'Level not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: level });
  } catch (err) {
    console.error('[levelController.editLevel]', err);
    return NextResponse.json({ success: false, message: 'Failed to update level' }, { status: 500 });
  }
}

export async function removeLevel(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const deleted = await deleteLevel(id);
    if (!deleted) return NextResponse.json({ success: false, message: 'Level not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Level deleted' });
  } catch (err) {
    console.error('[levelController.removeLevel]', err);
    return NextResponse.json({ success: false, message: 'Failed to delete level' }, { status: 500 });
  }
}
