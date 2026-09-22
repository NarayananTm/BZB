import { NextRequest, NextResponse } from 'next/server';
import { signToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate credentials
    if (username === 'supperadmin' && password === 'supperadmin@123') {
      const token = signToken({
        id: 'superadmin',
        email: 'supperadmin@bzb.com',
        name: 'Super Admin',
        mobile: '',
        role: 'superadmin',
        joining_date: new Date().toISOString(),
      });

      // Create response with success
      const response = NextResponse.json(
        { 
          success: true, 
          message: 'Login successful',
          token,
        },
        { status: 200 }
      );

      // Set secure cookie
      response.cookies.set('bzb_admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60, // 24 hours
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (err) {
    console.error('[super-admin-login]', err);
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    );
  }
}
