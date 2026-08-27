import { NextResponse } from 'next/server';
import { createExcelIfNotExists, hashPassword, readUsers, saveUser } from '@/lib/excel';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, mobile, password, confirmPassword } = body;

    if (!fullName || !email || !mobile || !password || !confirmPassword) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Invalid email format' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ success: false, message: 'Password must be at least 8 characters' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ success: false, message: 'Passwords do not match' }, { status: 400 });
    }

    await createExcelIfNotExists();
    const users = await readUsers();

    if (users.some((user) => user.Email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 409 });
    }

    if (users.some((user) => user.Mobile === mobile)) {
      return NextResponse.json({ success: false, message: 'Mobile already exists' }, { status: 409 });
    }

    const hashedPassword = hashPassword(password);
    await saveUser({
      FullName: fullName,
      Email: email,
      Mobile: mobile,
      Password: hashedPassword,
      CreatedDate: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: 'Registration Successful' });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ success: false, message: 'Registration failed' }, { status: 500 });
  }
}
