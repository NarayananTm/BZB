import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { queryOne } from '@/lib/postgres';

export async function getNotificationMemberId(request: NextRequest): Promise<string | null> {
  const authorization = request.headers.get('authorization');
  const token =
    request.cookies.get('bzb_token')?.value ??
    (authorization?.startsWith('Bearer ') ? authorization.slice(7) : null);

  if (token) {
    try {
      const payload = verifyToken(token);
      if (payload.id) return payload.id;
    } catch {
      // Try the admin session when no valid member session is present.
    }
  }

  const adminToken = request.cookies.get('bzb_admin_token')?.value;
  if (!adminToken) return null;

  try {
    const payload = verifyToken(adminToken);
    if (!payload.role || !payload.email) return null;

    const member = await queryOne<{ id: string }>(
      'SELECT id FROM members WHERE LOWER(email) = LOWER($1) LIMIT 1',
      [payload.email],
    );

    return member?.id ?? null;
  } catch {
    return null;
  }
}