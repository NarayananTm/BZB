import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/adminAuth';
import { getMemberProfile, updateMemberProfile } from '@/lib/postgres';

export async function GET(request: NextRequest) {
  const admin = getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ success: true, profile: await getMemberProfile(admin.email) });
}

export async function PATCH(request: NextRequest) {
  const admin = getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  try {
    const currentProfile = await getMemberProfile(admin.email);
    if (!currentProfile) return NextResponse.json({ success: false, message: 'Member profile not found for this account' }, { status: 404 });
    const profile = await updateMemberProfile({ ...(await request.json()), id: currentProfile.id });
    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('[admin/profile]', error);
    return NextResponse.json({ success: false, message: 'Unable to update profile' }, { status: 500 });
  }
}