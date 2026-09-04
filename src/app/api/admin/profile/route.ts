import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/adminAuth';
import { getMemberProfile, updateMemberProfile, getPool } from '@/lib/postgres';
import { findAdminByUsername } from '@/services/adminUserService';

export async function GET(request: NextRequest) {
  const admin = getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  
  try {
    const profile = await getMemberProfile(admin.id?.toString());
    
    // Fetch admin data to get mobile if not in token
    let adminMobile = admin.mobile || '';
    if (!adminMobile) {
      try {
        const adminData = await getPool().query(
          'SELECT mobile FROM admin_users WHERE id = $1',
          [admin.id]
        );
        if (adminData.rows && adminData.rows[0]) {
          adminMobile = adminData.rows[0].mobile || '';
        }
      } catch (err) {
        console.error('[admin/profile GET] Error fetching admin mobile:', err);
      }
    }
    
    // If profile exists, return it with email and mobile auto-populated from admin session
    if (profile) {
      return NextResponse.json({ 
        success: true, 
        profile: {
          ...profile,
          email: profile.email || admin.email, // Auto-populate email from session if not in profile
          mobile: profile.mobile || adminMobile // Auto-populate mobile if available
        }
      });
    }
    
    // If no profile exists, return an empty profile with email pre-filled
    return NextResponse.json({ 
      success: true, 
      profile: {
        id: admin.id?.toString() || '',
        name: admin.name || '',
        email: admin.email || '', // Pre-populate with admin email
        mobile: adminMobile || '', // Pre-populate with admin mobile
        avatar: null,
        dateOfBirth: null,
        gender: null,
        address: null,
        district: null,
        pincode: null,
        state: null,
        nomineeName: null,
        nomineeRelation: null,
        bankName: null,
        accountNumber: null,
        accountHolder: null,
        branch: null,
        ifscCode: null,
        pan: null,
        upiId: null,
      }
    });
  } catch (error) {
    console.error('[admin/profile GET]', error);
    return NextResponse.json({ success: false, message: 'Unable to fetch profile' }, { status: 500 });
  }
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