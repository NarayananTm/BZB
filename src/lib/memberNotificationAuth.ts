import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { queryOne } from '@/lib/postgres';

export async function getNotificationMemberId(request: NextRequest): Promise<string | null> {
  const authorization = request.headers.get('authorization');
  const tokens = [
    authorization?.startsWith('Bearer ') ? authorization.slice(7) : null,
    request.cookies.get('bzb_admin_token')?.value ?? null,
    request.cookies.get('bzb_token')?.value ?? null,
  ].filter((token, index, all): token is string => Boolean(token) && all.indexOf(token) === index);

  for (const token of tokens) {
    try {
      const payload = verifyToken(token);
      const member = await queryOne<{ id: string }>(
        `SELECT id
         FROM members
         WHERE ($1::text IS NOT NULL AND id = $1)
            OR ($2::text IS NOT NULL AND LOWER(email) = LOWER($2))
         ORDER BY CASE WHEN id = $1 THEN 0 ELSE 1 END
         LIMIT 1`,
        [payload.id ? String(payload.id) : null, payload.email ?? null],
      );
      if (member) return member.id;
    } catch { /* Try the next available session. */ }
  }
  return null;
}