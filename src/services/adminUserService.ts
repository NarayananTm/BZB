import { getPool, query, queryOne } from '@/lib/postgres';
import bcrypt from 'bcryptjs';
import { generateUserId } from '@/lib/idGenerator';
export interface AdminUser {
  id: number;
  username: string;
  email: string;
  mobile?: string;
  password: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function findAdminByEmail(email: string): Promise<AdminUser | null> {
  return queryOne<AdminUser>(
    'SELECT * FROM admin_users WHERE LOWER(email) = LOWER($1) AND is_active = TRUE',
    [email],
  );
}

export async function findAdminByUsername(username: string): Promise<AdminUser | null> {
  return queryOne<AdminUser>(
    'SELECT * FROM admin_users WHERE LOWER(username) = LOWER($1) AND is_active = TRUE',
    [username],
  );
}

export async function validateAdminCredentials(
  emailOrUsername: string,
  password: string,
): Promise<Omit<AdminUser, 'password'> | null> {
  const identifier = emailOrUsername.trim();
  const result = await getPool().query<AdminUser>(
    `SELECT * FROM admin_users
     WHERE (LOWER(email) = LOWER($1) OR LOWER(username) = LOWER($1))
       AND is_active = TRUE
     LIMIT 1`,
    [identifier],
  );
  const admin = result.rows[0] ?? null;

  if (!admin) return null;

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return null;

  const { password: _, ...safeAdmin } = admin;
  return safeAdmin;
}

export async function validateMemberCredentials(identifier: string, password: string) {
  const result = await getPool().query<{
    id: string;
    username: string;
    email: string;
    mobile: string;
    password: string | null;
    status: string;
    created_at: string;
  }>(
    `SELECT id, name AS username, email, mobile, password, status, created_at
     FROM members
     WHERE LOWER(id) = LOWER($1) OR mobile = $1 OR LOWER(email) = LOWER($1)`,
    [identifier.trim()],
  );
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const exactMatches = result.rows.filter(
    (member) => member.id.toLowerCase() === normalizedIdentifier || member.mobile === identifier.trim(),
  );
  const candidates = exactMatches.length ? exactMatches : result.rows;
  if (candidates.length !== 1) return null;

  const member = candidates[0];
  if (!member.password || !['Approved', 'Active'].includes(member.status)) return null;
  if (!(await bcrypt.compare(password, member.password))) return null;

  const { password: _, status: __, ...safeMember } = member;
  return { ...safeMember, role: 'member' };
}

export async function getAllAdmins(): Promise<Omit<AdminUser, 'password'>[]> {
  const rows = await query<AdminUser>(
    'SELECT id, username, email, mobile, role, is_active, created_at, updated_at FROM admin_users ORDER BY id',
  );
  return rows;
}

export async function createAdmin(data: {
  username: string;
  email: string;
  mobile?: string;
  password: string;
  role?: string;
}): Promise<Omit<AdminUser, 'password'>> {
  const hashed = await bcrypt.hash(data.password, 10);
  const rows = await query<AdminUser>(
    `INSERT INTO admin_users (id, username, email, mobile, password, role)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING id, username, email, mobile, role, is_active, created_at, updated_at`,
    [generateUserId(), data.username, data.email, data.mobile || null, hashed, data.role ?? 'admin'],
  );
  return rows[0];
}

export async function updateAdminStatus(id: number, is_active: boolean): Promise<boolean> {
  const rows = await query(
    'UPDATE admin_users SET is_active = $1, updated_at = NOW() WHERE id = $2 RETURNING id',
    [is_active, id],
  );
  return rows.length > 0;
}
