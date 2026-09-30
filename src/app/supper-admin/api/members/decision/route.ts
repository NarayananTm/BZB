import { NextRequest, NextResponse } from 'next/server';
import { updateMemberStatus, getMemberById, awardReferralGift } from '@/services/memberService';
import { sendCredentialsSMS, sendRejectionSMS } from '@/lib/smsService';
import { sendApprovalEmail, sendRejectionEmail } from '@/lib/emailService';
import { sendApprovalWhatsApp, sendRejectionWhatsApp } from '@/lib/whatsappService';

export async function POST(request: NextRequest) {
  try {
    const { memberId, action, rejectionReason } = await request.json();

    if (!memberId || !action) {
      return NextResponse.json({ success: false, message: 'memberId and action are required' }, { status: 400 });
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ success: false, message: 'Action must be approve or reject' }, { status: 400 });
    }

    // Fetch member details before updating
    const member = await getMemberById(memberId);
    if (!member) {
      return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 });
    }

    const newStatus = action === 'approve' ? 'Approved' : 'Rejected';
    const updatedMember = await updateMemberStatus(memberId, newStatus);

    if (!updatedMember) {
      return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 });
    }

    if (action === 'approve' && member.sponsor_id) {
      await awardReferralGift(memberId);
    }

    // Send notifications based on action
    const notificationPromises: Array<{
      type: 'email' | 'sms' | 'whatsapp';
      promise: Promise<{ success: boolean; error?: string }>;
    }> = [];
    let memberPassword = '';

    if (action === 'approve') {
      // Get the original password that member entered during registration
      memberPassword = member.original_password || member.password || 'Password';
      
      // Send Email with member's original password
      notificationPromises.push({
        type: 'email',
        promise: sendApprovalEmail(member.email, member.name, memberId, memberPassword).catch(err => {
          console.error('Failed to send approval email:', err);
          return { success: false, error: err instanceof Error ? err.message : 'Email send failed' };
        }),
      });

      notificationPromises.push({
        type: 'sms',
        promise: sendCredentialsSMS(member.mobile, memberId, memberPassword, member.name).catch(err => {
          console.error('Failed to send approval SMS:', err);
          return { success: false, error: err instanceof Error ? err.message : 'SMS send failed' };
        }),
      });

      notificationPromises.push({
        type: 'whatsapp',
        promise: sendApprovalWhatsApp(member.mobile, member.name, memberId, memberPassword).catch(err => {
          console.error('Failed to send approval WhatsApp:', err);
          return { success: false, error: err instanceof Error ? err.message : 'WhatsApp send failed' };
        }),
      });
    } else {
      // Send rejection notifications
      notificationPromises.push({
        type: 'email',
        promise: sendRejectionEmail(member.email, member.name, rejectionReason).catch(err => {
          console.error('Failed to send rejection email:', err);
          return { success: false, error: err instanceof Error ? err.message : 'Email send failed' };
        }),
      });

      notificationPromises.push({
        type: 'sms',
        promise: sendRejectionSMS(member.mobile, member.name, rejectionReason).catch(err => {
          console.error('Failed to send rejection SMS:', err);
          return { success: false, error: err instanceof Error ? err.message : 'SMS send failed' };
        }),
      });

      notificationPromises.push({
        type: 'whatsapp',
        promise: sendRejectionWhatsApp(member.mobile, member.name, rejectionReason).catch(err => {
          console.error('Failed to send rejection WhatsApp:', err);
          return { success: false, error: err instanceof Error ? err.message : 'WhatsApp send failed' };
        }),
      });
    }

    const notificationDetails = await Promise.all(
      notificationPromises.map(async ({ type, promise }) => ({ type, ...(await promise) })),
    );
    const notificationResults = notificationDetails.map(({ type, success }) => ({ type, success }));
    const failedNotifications = notificationResults.filter(r => !r.success).length;

    // eslint-disable-next-line no-console
    console.log(`[Member Decision] ${action === 'approve' ? 'Approved' : 'Rejected'} member ${memberId}`);
    // eslint-disable-next-line no-console
    console.log(`Notifications: Attempted=${notificationResults.length}, Accepted=${notificationResults.length - failedNotifications}, Failed=${failedNotifications}`);
    for (const failure of notificationDetails.filter(result => !result.success)) {
      console.error(`[Member Decision] ${failure.type} failed: ${failure.error || 'Unknown provider error'}`);
    }
    const responseData = {
      success: true,
      message: `Member ${action}ed successfully`,
      data: updatedMember,
      notifications: {
        sent: notificationResults.length - failedNotifications,
        failed: failedNotifications,
        results: notificationResults,
      },
    };

    // Only add member password if it's an approval
    if (action === 'approve' && memberPassword) {
      (responseData as any).memberPassword = memberPassword;
    }

    return NextResponse.json(responseData);
  } catch (err) {
    console.error('[super-admin-member-decision]', err);
    return NextResponse.json({ success: false, message: 'Failed to process member decision' }, { status: 500 });
  }
}
