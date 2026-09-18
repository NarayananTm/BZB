import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { validateAdminCredentials, createAdmin, getAllAdmins, findAdminByUsername, findAdminByEmail } from '@/services/adminUserService';
import { signToken } from '@/lib/jwt';
import { createAuditLog } from '@/services/auditLogService';
import { generateUserId } from '@/lib/idGenerator';



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

    const token = signToken({ 
      id: admin.id, 
      email: admin.email, 
      name: admin.username, 
      role: admin.role,
      mobile: admin.mobile || '',
      joining_date: admin.created_at || new Date().toISOString()
    } as never);

    await createAuditLog({
      id: generateUserId(),
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

    // Check if username already exists
    const existingByUsername = await findAdminByUsername(body.username);
    if (existingByUsername) {
      return NextResponse.json({ success: false, message: 'Username already exists' }, { status: 409 });
    }

    // Check if email already exists
    const existingByEmail = await findAdminByEmail(body.email);
    if (existingByEmail) {
      return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 409 });
    }

    const admin = await createAdmin({
      username: body.username,
      email: body.email,
      mobile: body.mobile,
      password: body.password,
      role: body.role,
    });
    return NextResponse.json({ success: true, data: admin }, { status: 201 });
  } catch (err) {
    console.error('[authController.registerAdmin]', err);
    return NextResponse.json({ success: false, message: 'Failed to create admin' }, { status: 500 });
  }
}
