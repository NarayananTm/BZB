import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { updateMemberStatus } from '@/services/memberService';

export async function POST(request: NextRequest) {
  const check = requireAdmin(request);
  const { error } = check;
  if (error) return error;

  try {
    const { memberId, action } = await request.json();

    if (!memberId || !action) {
      return NextResponse.json({ success: false, message: 'memberId and action are required' }, { status: 400 });
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ success: false, message: 'Action must be approve or reject' }, { status: 400 });
    }

    const newStatus = action === 'approve' ? 'Approved' : 'Rejected';
    const updatedMember = await updateMemberStatus(memberId, newStatus);

    if (!updatedMember) {
      return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Member ${action}ed successfully`,
      data: updatedMember,
    });
  } catch (err) {
    console.error('[admin/member-decision]', err);
    return NextResponse.json({ success: false, message: 'Failed to process member decision' }, { status: 500 });
  }
}
