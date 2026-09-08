import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/postgres';
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

    // Find user by email
    const user = await queryOne<{ id: string; email: string; mobile: string; full_name: string }>(
      'SELECT id, email, mobile, full_name FROM users WHERE LOWER(email) = LOWER($1)',
      [email]
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Email not found in our system' },
        { status: 404 }
      );
    }

    // Verify mobile number matches
    if (user.mobile !== mobile.replace(/\D/g, '')) {
      return NextResponse.json(
        { success: false, message: 'Email or mobile number is incorrect' },
        { status: 401 }
      );
    }

    // Create a reset token (valid for 1 hour)
    const resetToken = signToken({
      id: user.id,
      email: user.email,
      type: 'password_reset',
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
    } as never);

    return NextResponse.json({
      success: true,
      message: 'Identity verified successfully',
      token: resetToken,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('[member-verify-forgot-password]', err);
    return NextResponse.json(
      { success: false, message: 'Verification failed' },
      { status: 500 }
    );
  }
}
