import { NextRequest, NextResponse } from 'next/server';
import { updateMemberStatus, getMemberById } from '@/services/memberService';
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

    // Send notifications based on action
    const notificationPromises = [];
    let memberPassword = '';

    if (action === 'approve') {
      // Get the original password that member entered during registration
      memberPassword = member.original_password || member.password || 'Password';
      
      // Send Email with member's original password
      notificationPromises.push(
        sendApprovalEmail(member.email, member.name, memberId, memberPassword).catch(err => {
          console.error('Failed to send approval email:', err);
          return { success: false };
        })
      );

      // Send SMS with member's original password
      notificationPromises.push(
        sendCredentialsSMS(member.mobile, memberId, memberPassword, member.name).catch(err => {
          console.error('Failed to send approval SMS:', err);
          return { success: false };
        })
      );

      // Send WhatsApp with member's original password
      notificationPromises.push(
        sendApprovalWhatsApp(member.mobile, member.name, memberId, memberPassword).catch(err => {
          console.error('Failed to send approval WhatsApp:', err);
          return { success: false };
        })
      );
    } else {
      // Send rejection notifications
      notificationPromises.push(
        sendRejectionEmail(member.email, member.name, rejectionReason).catch(err => {
          console.error('Failed to send rejection email:', err);
          return { success: false };
        })
      );

      notificationPromises.push(
        sendRejectionSMS(member.mobile, member.name, rejectionReason).catch(err => {
          console.error('Failed to send rejection SMS:', err);
          return { success: false };
        })
      );

      notificationPromises.push(
        sendRejectionWhatsApp(member.mobile, member.name, rejectionReason).catch(err => {
          console.error('Failed to send rejection WhatsApp:', err);
          return { success: false };
        })
      );
    }

    // Wait for all notifications to be sent (but don't fail if any fail)
    const notificationResults = await Promise.all(notificationPromises);
    const failedNotifications = notificationResults.filter(r => !r.success).length;

    // eslint-disable-next-line no-console
    console.log(`[Member Decision] ${action === 'approve' ? 'Approved' : 'Rejected'} member ${memberId}`);
    // eslint-disable-next-line no-console
    console.log(`Notifications: Sent=${notificationResults.length}, Failed=${failedNotifications}`);
    if (action === 'approve') {
      // eslint-disable-next-line no-console
      console.log(`Member's original password retrieved and sent: ${memberPassword}`);
    }

    const responseData = {
      success: true,
      message: `Member ${action}ed successfully`,
      data: updatedMember,
      notifications: {
        sent: notificationResults.length,
        failed: failedNotifications,
        types: ['email', 'sms', 'whatsapp'],
      },
    };

    // Only add member password if it's an approval
    if (action === 'approve' && memberPassword) {
      (responseData as any).memberPassword = memberPassword;
    }

    // eslint-disable-next-line no-console
    console.log(`API Response:`, JSON.stringify(responseData, null, 2));

    return NextResponse.json(responseData);
  } catch (err) {
    console.error('[super-admin-member-decision]', err);
    return NextResponse.json({ success: false, message: 'Failed to process member decision' }, { status: 500 });
  }
}
