import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/adminAuth';
import { getMemberProfile, updateMemberProfile, getPool } from '@/lib/postgres';

export async function GET(request: NextRequest) {
  const admin = getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ success: true, profile: await getMemberProfile(admin.id?.toString()) });
}

export async function POST(request: NextRequest) {
  const admin = getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  try {
    const existingProfile = await getMemberProfile(admin.id?.toString());
    if (existingProfile) {
      return NextResponse.json({ success: false, message: 'Profile already exists for this account' }, { status: 400 });
    }

    const profileData = await request.json();
    const userId = admin.id?.toString();

    // Create new member with all required fields
    await getPool().query(
      `INSERT INTO members (id, email, name, mobile, level_id, level_name, status, joining_date) 
       VALUES ($1, $2, $3, $4, 'level-1', 'Level 1', 'Active', CURRENT_DATE)`,
      [userId, admin.email, profileData.name || '', profileData.mobile || '']
    );

    // Create member profile with provided details
    const profile = await updateMemberProfile({ ...profileData, id: userId });
    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('[admin/profile POST]', error);
    return NextResponse.json({ success: false, message: 'Unable to create profile' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const admin = getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  try {
    const currentProfile = await getMemberProfile(admin.id?.toString());
    if (!currentProfile) return NextResponse.json({ success: false, message: 'Member profile not found for this account' }, { status: 404 });
    
    const profileData = await request.json();
    
    // Update name and mobile in members table if provided
    if (profileData.name || profileData.mobile) {
      const updates = [];
      const values = [];
      let paramCount = 1;
      
      if (profileData.name) {
        updates.push(`name = $${paramCount++}`);
        values.push(profileData.name);
      }
      if (profileData.mobile) {
        updates.push(`mobile = $${paramCount++}`);
        values.push(profileData.mobile);
      }
      
      values.push(currentProfile.id);
      
      if (updates.length > 0) {
        await getPool().query(
          `UPDATE members SET ${updates.join(', ')} WHERE id = $${paramCount}`,
          values
        );
      }
    }
    
    const profile = await updateMemberProfile({ ...profileData, id: currentProfile.id });
    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('[admin/profile]', error);
    return NextResponse.json({ success: false, message: 'Unable to update profile' }, { status: 500 });
  }
}