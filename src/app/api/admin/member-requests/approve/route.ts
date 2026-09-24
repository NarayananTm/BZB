import { NextRequest, NextResponse } from 'next/server';
import { getMemberRequestById, updateMemberRequestStatus } from '@/services/memberRequestService';
import { createMember } from '@/services/memberService';
import { sendCredentialsSMS } from '@/lib/smsService';
import { requireAdmin } from '@/lib/adminAuth';
import { generateMemberId, generatePassword } from '@/lib/idGenerator';
import { calculateWalletAllocation } from '@/lib/wallet';
// import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const { admin, error } = requireAdmin(request);
    if (error) return error;

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
    const memberId = await generateMemberId();

    // Generate temporary password
    const tempPassword = generatePassword();
    const walletAllocation = calculateWalletAllocation(Number(memberRequest.amount || 0));
    // const hashedPassword = await bcrypt.hash(tempPassword, 10);

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
      wallet_balance: walletAllocation.walletBalance,
      level_income_wallet: walletAllocation.levelIncomeWallet,
      mbd_wallet: walletAllocation.mbdWallet,
      booster_topup: walletAllocation.boosterTopup,
      referral_count: 0,
      team_count: 0,
      avatar: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as any);

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
