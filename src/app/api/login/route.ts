import { NextResponse } from 'next/server';
import { comparePassword, findUserByEmailOrMobile } from '@/lib/postgres';
import { signToken } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    const user = await findUserByEmailOrMobile(email);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const isValidPassword = comparePassword(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
    }

    const token = signToken({ id: user.id, email: user.email, name: user.fullName, mobile: user.mobile });
    const response = NextResponse.json({
      success: true,
      message: 'Login Successful',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
      },
    });

    response.cookies.set('bzb_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Login failed' }, { status: 500 });
  }
}
