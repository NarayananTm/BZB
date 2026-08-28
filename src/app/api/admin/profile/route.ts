import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/adminAuth';
import { getMemberProfile, updateMemberProfile } from '@/lib/postgres';

export async function GET(request: NextRequest) {
  if (!getAdminFromRequest(request)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ success: true, profile: await getMemberProfile() });
}

export async function PATCH(request: NextRequest) {
  if (!getAdminFromRequest(request)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  try {
    const profile = await updateMemberProfile(await request.json());
    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('[admin/profile]', error);
    return NextResponse.json({ success: false, message: 'Unable to update profile' }, { status: 500 });
  }
}