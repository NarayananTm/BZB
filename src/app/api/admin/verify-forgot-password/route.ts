import { NextRequest, NextResponse } from 'next/server';
import { findAdminByEmail } from '@/services/adminUserService';
import { signToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, mobile } = body;

    if (!email || !mobile) {
      return NextResponse.json(
        { success: false, message: 'Email and mobile number are required' },
        { status: 400 }
      );
    }

    // Find admin by email
    const admin = await findAdminByEmail(email);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Email not found' },
        { status: 404 }
      );
    }

    // Verify mobile number matches
    if (admin.mobile !== mobile) {
      return NextResponse.json(
        { success: false, message: 'Email or mobile number is incorrect' },
        { status: 401 }
      );
    }

    // Create a reset token (valid for 1 hour)
    const resetToken = signToken({
      id: admin.id,
      email: admin.email,
      type: 'password_reset',
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
    } as never);

    return NextResponse.json({
      success: true,
      message: 'Verification successful',
      token: resetToken,
    });
  } catch (err) {
    console.error('[verify-forgot-password]', err);
    return NextResponse.json(
      { success: false, message: 'Verification failed' },
      { status: 500 }
    );
  }
}
