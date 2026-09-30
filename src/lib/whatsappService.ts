// WhatsApp Service - Configure with WhatsApp provider (Twilio, MessageBird, Gupshup, etc.)
// For now, using a simple logging implementation - replace with actual WhatsApp provider

export interface WhatsAppResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

async function sendWhatsApp(phoneNumber: string, message: string): Promise<WhatsAppResponse> {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER) {
    return { success: false, error: 'Twilio WhatsApp credentials are not configured' };
  }

  const toNumber = phoneNumber.replace(/^whatsapp:/i, '').replace(/[\s().-]/g, '');
  const fromNumber = TWILIO_WHATSAPP_NUMBER.replace(/^whatsapp:/i, '').replace(/[\s().-]/g, '');
  const toE164 = /^\d{10}$/.test(toNumber)
    ? `+91${toNumber}`
    : /^91\d{10}$/.test(toNumber)
      ? `+${toNumber}`
      : /^\+\d{10,15}$/.test(toNumber)
        ? toNumber
        : null;

  if (!toE164 || !/^\+\d{10,15}$/.test(fromNumber)) {
    return { success: false, error: 'A valid international WhatsApp phone number is required' };
  }

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: `whatsapp:${toE164}`,
          From: `whatsapp:${fromNumber}`,
          Body: message,
        }),
      },
    );
    const result = await response.json() as { sid?: string; message?: string };

    if (!response.ok) {
      return { success: false, error: result.message || `Twilio rejected the WhatsApp message (${response.status})` };
    }

    return { success: true, messageId: result.sid };
  } catch (error) {
    console.error('WhatsApp sending failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send WhatsApp message',
    };
  }
}

/**
 * Send WhatsApp message with credentials
 */
export async function sendApprovalWhatsApp(
  phoneNumber: string,
  memberName: string,
  memberId: string,
  password: string,
): Promise<WhatsAppResponse> {
  const message = `🎉 *Congratulations ${memberName}!* 🎉

Your MBD membership has been *APPROVED*! ✅

Welcome to the MBD family! Here are your login credentials:

*Member ID:* ${memberId}
*Password:* ${password}

🔐 *Security Notice:*
• Keep your credentials secure
• Change your password after first login
• Never share your credentials

🔗 Login here: ${process.env.NEXT_PUBLIC_APP_URL || 'https://yourapp.com'}/login

Questions? We're here to help! 💬`;

  return sendWhatsApp(phoneNumber, message);
}

/**
 * Send rejection notification via WhatsApp
 */
export async function sendRejectionWhatsApp(
  phoneNumber: string,
  memberName: string,
  reason?: string,
): Promise<WhatsAppResponse> {
  const reasonText = reason ? `\n\n*Reason:* ${reason}` : '';

  const message = `Hi ${memberName}, 

Your MBD membership application was reviewed. ❌

Unfortunately, your application was not approved at this time.${reasonText}

Please contact our support team for more information.

We appreciate your interest! 🙏`;

  return sendWhatsApp(phoneNumber, message);
}

/**
 * Send general notification via WhatsApp
 */
export async function sendWhatsAppMessage(
  phoneNumber: string,
  message: string,
): Promise<WhatsAppResponse> {
  return sendWhatsApp(phoneNumber, message);
}
