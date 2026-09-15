import { NextRequest, NextResponse } from 'next/server';
import { getMemberById, getPendingMembers, getPendingMembersCount, updateMemberStatus } from '@/services/memberService';
import { createAuditLog, generateAuditId } from '@/services/auditLogService';

/**
 * GET /api/super-admin/members/pending
 * Fetch pending members with pagination and filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const level = searchParams.get('level') || '';
    const status = searchParams.get('status') || 'Pending';

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { success: false, message: 'Invalid pagination parameters' },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;

    const members = await getPendingMembers({
      limit,
      offset,
      search,
      level: level ? parseInt(level) : undefined,
      status,
    });

    const totalCount = await getPendingMembersCount({
      search,
      level: level ? parseInt(level) : undefined,
      status,
    });

    return NextResponse.json({
      success: true,
      data: members,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (err) {
    console.error('[super-admin-pending-members-GET]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch pending members' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/super-admin/members/pending
 * Review member (approve or reject)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { memberId, action, reason } = body;

    // Validate request body
    if (!memberId || !action) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: memberId, action' },
        { status: 400 }
      );
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { success: false, message: 'Invalid action. Must be "approve" or "reject"' },
        { status: 400 }
      );
    }

    const member = await getMemberById(memberId);
    if (!member || member.status !== 'Pending') {
      return NextResponse.json(
        { success: false, message: 'Member not found or already reviewed' },
        { status: 404 }
      );
    }

    const newStatus = action === 'approve' ? 'Approved' : 'Rejected';

    // Update member status
    await updateMemberStatus(memberId, newStatus);

    // Log the decision in audit trail
    await createAuditLog({
      id: generateAuditId(),
      user_name: 'SUPER_ADMIN',
      action: `Member ${action}ed${reason ? `: ${reason}` : ''}`,
      target: `${member.name} (${memberId})`,
      status: 'Success',
    });

    return NextResponse.json({
      success: true,
      message: `Member successfully ${action}ed`,
      data: {
        memberId,
        action,
        newStatus,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('[super-admin-pending-members-POST]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to review member' },
      { status: 500 }
    );
  }
}
