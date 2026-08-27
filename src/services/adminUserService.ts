import { query, queryOne } from '@/lib/postgres';
import bcrypt from 'bcryptjs';

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function findAdminByEmail(email: string): Promise<AdminUser | null> {
  return queryOne<AdminUser>(
    'SELECT * FROM admin_users WHERE email = $1 AND is_active = TRUE',
    [email],
  );
}

export async function findAdminByUsername(username: string): Promise<AdminUser | null> {
  return queryOne<AdminUser>(
    'SELECT * FROM admin_users WHERE username = $1 AND is_active = TRUE',
    [username],
  );
}

export async function validateAdminCredentials(
  emailOrUsername: string,
  password: string,
): Promise<Omit<AdminUser, 'password'> | null> {
  const admin =
    (await findAdminByEmail(emailOrUsername)) ??
    (await findAdminByUsername(emailOrUsername));

  if (!admin) return null;

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return null;

  const { password: _, ...safeAdmin } = admin;
  return safeAdmin;
}

export async function getAllAdmins(): Promise<Omit<AdminUser, 'password'>[]> {
  const rows = await query<AdminUser>(
    'SELECT id, username, email, role, is_active, created_at, updated_at FROM admin_users ORDER BY id',
  );
  return rows;
}

export async function createAdmin(data: {
  username: string;
  email: string;
  password: string;
  role?: string;
}): Promise<Omit<AdminUser, 'password'>> {
  const hashed = await bcrypt.hash(data.password, 10);
  const rows = await query<AdminUser>(
    `INSERT INTO admin_users (username, email, password, role)
     VALUES ($1,$2,$3,$4)
     RETURNING id, username, email, role, is_active, created_at, updated_at`,
    [data.username, data.email, hashed, data.role ?? 'admin'],
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
