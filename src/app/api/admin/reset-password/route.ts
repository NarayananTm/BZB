import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { query } from '@/lib/postgres';
import { verifyToken } from '@/lib/jwt';

interface TokenPayload {
  id: number;
  email: string;
  type: string;
  exp: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'Token and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Verify the reset token
    let payload: TokenPayload;
    try {
      payload = verifyToken(token) as unknown as TokenPayload;
    } catch (err) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired reset token' },
        { status: 401 }
      );
    }

    // Check if token is a password reset token
    if (payload.type !== 'password_reset') {
      return NextResponse.json(
        { success: false, message: 'Invalid token type' },
        { status: 401 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    const result = await query(
      'UPDATE admin_users SET password = $1, updated_at = NOW() WHERE id = $2 RETURNING id, username, email, mobile',
      [hashedPassword, payload.id]
    );

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Admin user not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully',
      data: result[0],
    });
  } catch (err) {
    console.error('[reset-password]', err);
    return NextResponse.json(
      { success: false, message: 'Password reset failed' },
      { status: 500 }
    );
  }
}
