import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';

export interface AdminTokenPayload {
  id: number;
  email: string;
  name: string;
  role: string;
  mobile: string;
  joining_date: string;
}

/** Extract and verify the admin JWT from the Authorization header or cookie. */
export function   getAdminFromRequest(request: NextRequest): AdminTokenPayload | null {
  const authHeader = request.headers.get('authorization');
  const token =
    (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null) ??
    request.cookies.get('bzb_admin_token')?.value ??
    null;

  if (!token) return null;

  try {
    return verifyToken(token) as unknown as AdminTokenPayload;
  } catch {
    return null;
  }
}

export async function getAdminSessionUser(): Promise<AdminTokenPayload | null> {
  const token = (await cookies()).get('bzb_admin_token')?.value;
  if (!token) return null;
  try {
    return verifyToken(token) as unknown as AdminTokenPayload;
  } catch {
    return null;
  }
}

/** Middleware helper — returns 401 response if admin token is missing/invalid. */
export function requireAdmin(
  request: NextRequest,
): { admin: AdminTokenPayload; error: null } | { admin: null; error: NextResponse } {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return {
      admin: null,
      error: NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 }),
    };
  }
  return { admin, error: null };
}

/** Restrict to superadmin role. */
export function requireSuperAdmin(
  request: NextRequest,
): { admin: AdminTokenPayload; error: null } | { admin: null; error: NextResponse } {
  const check = requireAdmin(request);
  if (check.error) return check;
  if (check.admin!.role !== 'superadmin') {
    return {
      admin: null,
      error: NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 }),
    };
  }
  return check;
}
