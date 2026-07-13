import { NextResponse } from 'next/server';
import { comparePassword, readUsers } from '@/lib/excel';
import { signToken } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    const users = readUsers();
    const user = users.find((item) => item.Email.toLowerCase() === email.toLowerCase() || item.Mobile === email);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const isValidPassword = comparePassword(password, user.Password);

    if (!isValidPassword) {
      return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
    }

    const token = signToken({ id: user.ID, email: user.Email, name: user.FullName });
    const response = NextResponse.json({
      success: true,
      message: 'Login Successful',
      token,
      user: {
        id: user.ID,
        fullName: user.FullName,
        email: user.Email,
        mobile: user.Mobile,
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
