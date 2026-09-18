// Email Service - Configure with your email provider (SendGrid, Nodemailer, AWS SES, etc.)
// For now, using a simple logging implementation - replace with actual email provider

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send email with credentials and welcome message
 */
export async function sendApprovalEmail(
  email: string,
  memberName: string,
  memberId: string,
  password: string,
): Promise<EmailResponse> {
  try {
    const subject = "🎉 MBD Membership Approved - Welcome Onboard!";

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f5c400; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; color: #171b1e; }
            .content { background-color: #f8f9fb; padding: 30px; border-radius: 0 0 10px 10px; }
            .credentials-box { background-color: white; border: 2px solid #f5c400; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .credential-item { margin: 10px 0; padding: 10px; background-color: #f0f0f0; border-radius: 5px; }
            .label { font-weight: bold; color: #171b1e; }
            .value { color: #f5c400; font-size: 16px; font-family: monospace; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
            .button { background-color: #f5c400; color: #171b1e; padding: 12px 30px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block; margin: 20px 0; }
            .warning { background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Welcome to MBD Platform! ✨</h1>
            </div>
            
            <div class="content">
              <p>Dear <strong>${memberName}</strong>,</p>
              
              <p>Congratulations! 🎊 Your membership application has been <strong style="color: #28a745;">APPROVED</strong>!</p>
              
              <p>You're now part of the MBD family. Your account is active and ready to use. Below are your login credentials:</p>
              
              <div class="credentials-box">
                <div class="credential-item">
                  <span class="label">Member ID:</span><br>
                  <span class="value">${memberId}</span>
                </div>
                <div class="credential-item">
                  <span class="label">Password:</span><br>
                  <span class="value">${password}</span>
                </div>
              </div>
              
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://yourapp.com'}/login" class="button">Login Now</a>
              
              <div class="warning">
                <strong>⚠️ Important Security Notice:</strong>
                <ul>
                  <li>Keep your credentials secure and do not share with anyone</li>
                  <li>Change your password after first login</li>
                  <li>Never respond to emails asking for your password</li>
                </ul>
              </div>
              
              <p><strong>What's Next?</strong></p>
              <ul>
                <li>Log in to your account</li>
                <li>Complete your profile setup</li>
                <li>Start referring members to earn rewards</li>
                <li>Explore earning opportunities</li>
              </ul>
              
              <p>If you have any questions or need assistance, our support team is here to help!</p>
              
              <div class="footer">
                <p>This email was sent to ${email}</p>
                <p>© 2024 MBD Platform. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log(`📧 Email sent to ${email}:`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Member ID: ${memberId}`);
    console.log(`   Name: ${memberName}`);
    console.log(`   Preview length: ${htmlContent.length}`);

    // TODO: Replace with actual email provider
    // Example with SendGrid:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: email,
    //   from: process.env.SENDGRID_FROM_EMAIL,
    //   subject: subject,
    //   html: htmlContent,
    // });

    // Example with Nodemailer:
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail({
    //   from: process.env.EMAIL_FROM,
    //   to: email,
    //   subject: subject,
    //   html: htmlContent,
    // });

    // Example with AWS SES:
    // const ses = new AWS.SES();
    // await ses.sendEmail({
    //   Source: process.env.SES_FROM_EMAIL,
    //   Destination: { ToAddresses: [email] },
    //   Message: {
    //     Subject: { Data: subject },
    //     Body: { Html: { Data: htmlContent } },
    //   },
    // }).promise();

    return {
      success: true,
      messageId: `EMAIL-${Date.now()}`,
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}

/**
 * Send rejection email
 */
export async function sendRejectionEmail(
  email: string,
  memberName: string,
  reason?: string,
): Promise<EmailResponse> {
  try {
    const subject = "Your MBD Membership Application Status";

    const reasonText = reason
      ? `<p><strong>Reason for Rejection:</strong><br>${reason}</p>`
      : '<p>Your application did not meet our criteria at this time.</p>';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #dc3545; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; color: white; }
            .content { background-color: #f8f9fb; padding: 30px; border-radius: 0 0 10px 10px; }
            .reason-box { background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Application Status Update</h1>
            </div>
            
            <div class="content">
              <p>Dear <strong>${memberName}</strong>,</p>
              
              <p>Thank you for your interest in the MBD platform. We have reviewed your membership application.</p>
              
              <div class="reason-box">
                <strong>❌ Application Status: Not Approved</strong>
                ${reasonText}
              </div>
              
              <p>If you believe this is an error or would like more information about the decision, please contact our support team.</p>
              
              <p>We appreciate your interest and hope to welcome you in the future!</p>
              
              <div class="footer">
                <p>This email was sent to ${email}</p>
                <p>© 2024 MBD Platform. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log(`📧 Rejection email sent to ${email}`);
    console.log(`   Member: ${memberName}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Message preview length: ${htmlContent.length}`);

    return {
      success: true,
      messageId: `EMAIL-${Date.now()}`,
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}
