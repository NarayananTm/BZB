import { cookies } from 'next/headers';
import { verifyToken, type AuthTokenPayload } from '@/lib/jwt';

/** Read the member JWT from cookie in a Server Component. Returns null if not logged in. */
export async function getSessionUser(): Promise<AuthTokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('bzb_token')?.value;
  if (!token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
