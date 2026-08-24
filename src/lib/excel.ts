import bcrypt from 'bcryptjs';
import { ensureSchema, getDb } from '@/lib/db';

export interface UserRecord {
  ID: number;
  FullName: string;
  Email: string;
  Mobile: string;
  Password: string;
  CreatedDate: string;
}

export async function createExcelIfNotExists() {
  await ensureSchema();
}

export async function readUsers(): Promise<UserRecord[]> {
  await ensureSchema();
  const result = await getDb().execute(
    'SELECT id AS ID, full_name AS FullName, email AS Email, mobile AS Mobile, password AS Password, created_date AS CreatedDate FROM users ORDER BY id'
  );

  return result.rows as unknown as UserRecord[];
}

export async function saveUser(user: Omit<UserRecord, 'ID'> & { ID?: number }) {
  await ensureSchema();
  await getDb().execute({
    sql: 'INSERT INTO users (full_name, email, mobile, password, created_date) VALUES (?, ?, ?, ?, ?)',
    args: [user.FullName, user.Email, user.Mobile, user.Password, user.CreatedDate],
  });
}

export async function findUserByEmail(email: string) {
  await ensureSchema();
  const result = await getDb().execute({
    sql: 'SELECT id AS ID, full_name AS FullName, email AS Email, mobile AS Mobile, password AS Password, created_date AS CreatedDate FROM users WHERE lower(email) = lower(?) LIMIT 1',
    args: [email],
  });
  return result.rows[0] as unknown as UserRecord | undefined;
}

export async function findUserByMobile(mobile: string) {
  await ensureSchema();
  const result = await getDb().execute({
    sql: 'SELECT id AS ID, full_name AS FullName, email AS Email, mobile AS Mobile, password AS Password, created_date AS CreatedDate FROM users WHERE mobile = ? LIMIT 1',
    args: [mobile],
  });
  return result.rows[0] as unknown as UserRecord | undefined;
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
