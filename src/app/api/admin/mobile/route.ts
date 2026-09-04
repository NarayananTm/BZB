import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/adminAuth';
import { updateMember, getMemberByEmail } from '@/services/memberService';

export async function PATCH(request: NextRequest) {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { mobile } = await request.json();

    if (!mobile || typeof mobile !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Mobile number is required and must be a string' },
        { status: 400 }
      );
    }

    // Get the current member
    const member = await getMemberByEmail(admin.email);
    if (!member) {
      return NextResponse.json(
        { success: false, message: 'Member profile not found' },
        { status: 404 }
      );
    }

    // Update the mobile number
    const updatedMember = await updateMember(member.id, { mobile });

    if (!updatedMember) {
      return NextResponse.json(
        { success: false, message: 'Failed to update mobile number' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Mobile number updated successfully',
      member: updatedMember,
    });
  } catch (error) {
    console.error('[admin/mobile] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update mobile number' },
      { status: 500 }
    );
  }
}
