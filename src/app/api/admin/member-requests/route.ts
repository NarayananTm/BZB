import { NextRequest, NextResponse } from 'next/server';
import {
  getAllMemberRequests,
  getMemberRequestById,
  updateMemberRequestStatus,
} from '@/services/memberRequestService';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const { error } = requireAdmin(request);
    if (error) return error;

    const status = request.nextUrl.searchParams.get('status') || 'Pending';
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    const result = await getAllMemberRequests(limit, offset, status);

    return NextResponse.json(
      {
        success: true,
        data: result.data,
        pagination: {
          total: result.total,
          page,
          limit,
          pages: Math.ceil(result.total / limit),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching member requests:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch member requests' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify admin authentication
    const { admin, error } = requireAdmin(request);
    if (error) return error;

    // Only superadmin can approve/reject
    if (admin.role !== 'superadmin') {
      return NextResponse.json(
        { success: false, message: 'Only superadmin can approve or reject requests' },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { requestId, action, rejectionReason } = body;

    if (!requestId || !action) {
      return NextResponse.json(
        { success: false, message: 'Request ID and action are required' },
        { status: 400 },
      );
    }

    if (!['Approved', 'Rejected'].includes(action)) {
      return NextResponse.json(
        { success: false, message: 'Action must be Approved or Rejected' },
        { status: 400 },
      );
    }

    // Get the request first
    const memberRequest = await getMemberRequestById(requestId);
    if (!memberRequest) {
      return NextResponse.json(
        { success: false, message: 'Member request not found' },
        { status: 404 },
      );
    }

    // Update request status
    const updatedRequest = await updateMemberRequestStatus(
      requestId,
      action as 'Approved' | 'Rejected',
      admin.id,
      rejectionReason,
    );

    return NextResponse.json(
      {
        success: true,
        message: `Member request ${action.toLowerCase()} successfully`,
        data: updatedRequest,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating member request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update member request' },
      { status: 500 },
    );
  }
}
