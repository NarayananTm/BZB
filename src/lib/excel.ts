import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const DATA_FILE = path.join(process.cwd(), 'data', 'users.json');

export interface UserRecord {
  ID: number;
  FullName: string;
  Email: string;
  Mobile: string;
  Password: string;
  CreatedDate: string;
}

function ensureDataDir() {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

function ensureDataFile() {
  ensureDataDir();

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

export function createExcelIfNotExists() {
  ensureDataFile();
}

export function readUsers(): UserRecord[] {
  ensureDataFile();

  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8').trim();
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((row: Partial<UserRecord>) => row?.Email || row?.Mobile)
      : [];
  } catch {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
    return [];
  }
}

export function saveUser(user: Omit<UserRecord, 'ID'> & { ID?: number }) {
  ensureDataFile();

  const users = readUsers();
  const nextId = users.length > 0 ? Math.max(...users.map((item) => item.ID || 0)) + 1 : 1;

  const newUser: UserRecord = {
    ID: user.ID ?? nextId,
    FullName: user.FullName,
    Email: user.Email,
    Mobile: user.Mobile,
    Password: user.Password,
    CreatedDate: user.CreatedDate,
  };

  const updatedUsers = [...users, newUser];
  fs.writeFileSync(DATA_FILE, JSON.stringify(updatedUsers, null, 2), 'utf8');
}

export function findUserByEmail(email: string) {
  const users = readUsers();
  return users.find((user) => user.Email.toLowerCase() === email.toLowerCase());
}

export function findUserByMobile(mobile: string) {
  const users = readUsers();
  return users.find((user) => user.Mobile === mobile);
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
