import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { validateAdminCredentials, createAdmin, getAllAdmins } from '@/services/adminUserService';
import { signToken } from '@/lib/jwt';
import { createAuditLog, generateAuditId } from '@/services/auditLogService';

export async function login(request: NextRequest) {
  try {
    const { emailOrUsername, password } = await request.json();

    if (!emailOrUsername || !password) {
      return NextResponse.json({ success: false, message: 'Credentials are required' }, { status: 400 });
    }

    const admin = await validateAdminCredentials(emailOrUsername, password);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ id: admin.id, email: admin.email, name: admin.username, role: admin.role } as never);

    await createAuditLog({
      id: generateAuditId(),
      user_name: admin.username,
      action: 'Admin login',
      target: 'Admin Panel',
      status: 'Success',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      admin: { id: admin.id, username: admin.username, email: admin.email, role: admin.role },
    });

    response.cookies.set('bzb_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('[authController.login]', err);
    return NextResponse.json({ success: false, message: 'Login failed' }, { status: 500 });
  }
}

export async function logout() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.set('bzb_admin_token', '', { maxAge: 0, path: '/' });
  return response;
}

export async function listAdmins(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const admins = await getAllAdmins();
    return NextResponse.json({ success: true, data: admins });
  } catch (err) {
    console.error('[authController.listAdmins]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch admins' }, { status: 500 });
  }
}

export async function registerAdmin(request: NextRequest) {
  // const { error } = requireAdmin(request);
  // if (error) return error;

  try {
    const body = await request.json();
    if (!body.username || !body.email || !body.password) {
      return NextResponse.json({ success: false, message: 'username, email and password are required' }, { status: 400 });
    }
    const admin = await createAdmin(body);
    return NextResponse.json({ success: true, data: admin }, { status: 201 });
  } catch (err) {
    console.error('[authController.registerAdmin]', err);
    return NextResponse.json({ success: false, message: 'Failed to create admin' }, { status: 500 });
  }
}
