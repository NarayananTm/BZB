// SMS Service - Configure with your SMS provider (Twilio, AWS SNS, etc.)
// For now, using a simple logging implementation - replace with actual SMS provider

export interface SMSResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send SMS with user credentials
 * Configure this with your SMS provider (Twilio, AWS SNS, etc.)
 */
export async function sendSMS(
  phoneNumber: string,
  message: string,
): Promise<SMSResponse> {
  try {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
    const TWILIO_PHONE_NUMBER = process.env['TWILIO_PHONE_NUMBER'] || '+17372508034';
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
      return { success: false, error: 'Twilio SMS credentials are not configured' };
    }

    const normalizedPhone = phoneNumber.replace(/[\s().-]/g, '');
    const destination = /^\d{10}$/.test(normalizedPhone)
      ? `+91${normalizedPhone}`
      : /^91\d{10}$/.test(normalizedPhone)
        ? `+${normalizedPhone}`
        : /^\+\d{10,15}$/.test(normalizedPhone)
          ? normalizedPhone
          : null;

    if (!destination) {
      return { success: false, error: 'Member phone number must be a valid international number' };
    }

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: destination,
          From: TWILIO_PHONE_NUMBER,
          Body: message,
        }),
      },
    );
    const result = await response.json() as { sid?: string; message?: string };

    if (!response.ok) {
      return { success: false, error: result.message || `Twilio rejected the SMS (${response.status})` };
    }

    return {
      success: true,
      messageId: result.sid,
    };
  } catch (error) {
    console.error('SMS sending failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send SMS',
    };
  }
}

/**
 * Send credentials SMS to new member
 */
export async function sendCredentialsSMS(
  phoneNumber: string,
  userId: string,
  password: string,
  memberName: string,
): Promise<SMSResponse> {
  const loginUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.magimai.builders/admin';

  const message = `Hello ${memberName}, your MBD membership is approved. Member ID: ${userId}. Password: ${password}. Login: ${loginUrl}/login. Please change your password after login.`;

  return sendSMS(phoneNumber, message);
}

/**
 * Send approval notification SMS
 */
export async function sendApprovalSMS(
  phoneNumber: string,
  memberName: string,
  memberId?: string,
  password?: string,
): Promise<SMSResponse> {
  const loginUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.magimai.builders/admin';
  const memberIdText = memberId ? `\nMember ID: ${memberId}` : '';
  const passwordText = password ? `\nPassword: ${password}` : '';

  const message = `🎉 Congratulations ${memberName}! 🎉

Your MBD membership has been APPROVED! ✅

Welcome to the MBD family! Here are your login credentials:${memberIdText}${passwordText}

🔐 Security Notice:
• Keep your credentials secure
• Never share your credentials with anyone
• Change your password after login for better security
• Report any suspicious activity immediately

🔗 Login here: ${loginUrl}/login

Questions? We're here to help! 💬`;

  return sendSMS(phoneNumber, message);
}

/**
 * Send rejection notification SMS
 */
export async function sendRejectionSMS(
  phoneNumber: string,
  memberName: string,
  reason?: string,
): Promise<SMSResponse> {
  const reasonText = reason ? `\nReason: ${reason}` : '';
  const message = `Hi ${memberName}, unfortunately your MBD membership application was not approved.${reasonText}\n\nPlease contact support for more details.`;

  return sendSMS(phoneNumber, message);
}
