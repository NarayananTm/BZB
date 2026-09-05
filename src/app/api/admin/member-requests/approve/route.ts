import { NextRequest, NextResponse } from 'next/server';
import { getMemberRequestById, updateMemberRequestStatus } from '@/services/memberRequestService';
import { createMember, getMemberById } from '@/services/memberService';
import { createReferral } from '@/services/referralService';
import { sendCredentialsSMS } from '@/lib/smsService';
import { verifyAdminAuth } from '@/lib/adminAuth';
import { idGenerator } from '@/lib/idGenerator';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = await verifyAdminAuth(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 },
      );
    }

    // Only superadmin can approve
    if (admin.role !== 'superadmin') {
      return NextResponse.json(
        { success: false, message: 'Only superadmin can approve requests' },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { requestId } = body;

    if (!requestId) {
      return NextResponse.json(
        { success: false, message: 'Request ID is required' },
        { status: 400 },
      );
    }

    // Get the member request
    const memberRequest = await getMemberRequestById(requestId);
    if (!memberRequest) {
      return NextResponse.json(
        { success: false, message: 'Member request not found' },
        { status: 404 },
      );
    }

    if (memberRequest.status === 'Approved') {
      return NextResponse.json(
        { success: false, message: 'This request has already been approved' },
        { status: 400 },
      );
    }

    // Generate member ID
    const memberId = idGenerator.generate('BZB');

    // Generate temporary password
    const tempPassword = idGenerator.generate('PWD').substring(0, 10);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Create member record
    const newMember = await createMember({
      id: memberId,
      name: memberRequest.name,
      email: memberRequest.email,
      mobile: memberRequest.mobile,
      sponsor_id: memberRequest.sponsor_id || null,
      sponsor_name: memberRequest.sponsor_name || null,
      level_name: 'Level 1',
      status: 'Active',
      joining_date: new Date().toISOString().split('T')[0],
      total_earnings: 0,
      wallet_balance: 0,
      referral_count: 0,
      team_count: 0,
      avatar: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as any);

    // Create referral record if sponsor exists
    if (memberRequest.sponsor_id) {
      const referralId = idGenerator.generate('REF');
      try {
        await createReferral({
          id: referralId,
          sponsor_id: memberRequest.sponsor_id,
          sponsor_name: memberRequest.sponsor_name || 'Unknown',
          member_id: memberId,
          member_name: memberRequest.name,
          level_name: 'Level 1',
          join_date: new Date().toISOString().split('T')[0],
          status: 'Active',
          reward_amount: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as any);
      } catch (referralError) {
        console.error('Error creating referral:', referralError);
        // Don't fail the entire process if referral creation fails
      }
    }

    // Send SMS with credentials
    const smsResult = await sendCredentialsSMS(
      memberRequest.mobile,
      memberId,
      tempPassword,
      memberRequest.name,
    );

    if (!smsResult.success) {
      console.warn('SMS sending failed but member was created:', smsResult.error);
    }

    // Update member request status to Approved
    const updatedRequest = await updateMemberRequestStatus(
      requestId,
      'Approved',
      admin.id,
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Member approved and credentials sent via SMS',
        data: {
          member: newMember,
          request: updatedRequest,
          smsSent: smsResult.success,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error approving member request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to approve member request' },
      { status: 500 },
    );
  }
}
