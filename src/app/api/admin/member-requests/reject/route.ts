import { NextRequest, NextResponse } from 'next/server';
import { getMemberRequestById, updateMemberRequestStatus } from '@/services/memberRequestService';
import { sendRejectionSMS } from '@/lib/smsService';
import { verifyAdminAuth } from '@/lib/adminAuth';

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

    // Only superadmin can reject
    if (admin.role !== 'superadmin') {
      return NextResponse.json(
        { success: false, message: 'Only superadmin can reject requests' },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { requestId, reason } = body;

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

    if (memberRequest.status === 'Rejected') {
      return NextResponse.json(
        { success: false, message: 'This request has already been rejected' },
        { status: 400 },
      );
    }

    // Send rejection SMS
    const smsResult = await sendRejectionSMS(
      memberRequest.mobile,
      memberRequest.name,
      reason,
    );

    if (!smsResult.success) {
      console.warn('SMS sending failed:', smsResult.error);
    }

    // Update member request status to Rejected
    const updatedRequest = await updateMemberRequestStatus(
      requestId,
      'Rejected',
      admin.id,
      reason,
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Member request rejected and notification sent via SMS',
        data: {
          request: updatedRequest,
          smsSent: smsResult.success,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error rejecting member request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reject member request' },
      { status: 500 },
    );
  }
}
