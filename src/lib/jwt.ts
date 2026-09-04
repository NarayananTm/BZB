import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'bzb-dev-secret';

export interface AuthTokenPayload {
  id: string;
  email: string;
  name: string;
  mobile?: string;
}

export function signToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
}
