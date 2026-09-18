import { NextRequest, NextResponse } from 'next/server';
import { getMemberById } from '@/services/memberService';

/**
 * GET /api/super-admin/members/[id]
 * Fetch complete member registration details including KYC and bank info
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const memberId = params.id;

    // Validate member ID
    if (!memberId || typeof memberId !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid member ID' },
        { status: 400 }
      );
    }

    const member = await getMemberById(memberId);

    if (!member) {
      return NextResponse.json(
        { success: false, message: 'Member not found' },
        { status: 404 }
      );
    }

    // Calculate days pending
    const createdDate = new Date(member.created_at);
    const daysPending = Math.floor(
      (new Date().getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return NextResponse.json({
      success: true,
      data: {
        id: member.id,
        name: member.name,
        email: member.email,
        phone: member.mobile,
        status: member.status,
        created_at: member.created_at,
        joining_date: member.joining_date,
        referral_id: member.sponsor_id,
        pan: member.pan,
        aadhar: member.aadhar,
        amount: member.amount,
        utr_number: member.utr_number,
        transaction_proof_name: member.transaction_proof_name,
        transaction_proof_type: member.transaction_proof_type,
        sponsor_name: member.sponsor_name,
        total_referrals: member.referral_count || 0,
        days_pending: daysPending,
      },
    });
  } catch (err) {
    console.error('[super-admin-member-details]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch member details' },
      { status: 500 }
    );
  }
}
