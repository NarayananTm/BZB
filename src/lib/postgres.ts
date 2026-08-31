import console from 'console';
import bcrypt from 'bcryptjs';
import type { Pool as PgPool, PoolClient } from 'pg';

export interface UserRecord {
  id: number;
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  createdDate: string;
}

let pool: PgPool | undefined;

export function isDbConfigured(): boolean {
  const host = process.env.DB_HOST || "pg-18c96d3-narayanan2600-6de6.h.aivencloud.com";
  const name = process.env.DB_NAME || "defaultdb";
  const user = process.env.DB_USER || "avnadmin";
  const port = process.env.DB_PORT || "14471";
  const pass = process.env.DB_PASSWORD || "AVNS_zHo5ErjPikeL9_zPCmw";

  return Boolean(
    host &&
    name &&
    user &&
    pass &&
    port
  );
}

export function getPool(): PgPool {
  console.log(pool, 'Initializing PostgreSQL pool...') ;
  const ca = process.env.DB_CA_CERT?.replace(/\\n/g, "\n")||`-----BEGIN CERTIFICATE-----
MIIERDCCAqygAwIBAgIUCfqXDHZ2uRVSUK2fWw6ki+2ANSkwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvYjA4MmMxN2MtM2MxMC00MTZiLWI5YzYtZDVkNDY4ZDNh
ZGNkIFByb2plY3QgQ0EwHhcNMjYwODEyMTMyNTA4WhcNMzYwODA5MTMyNTA4WjA6
MTgwNgYDVQQDDC9iMDgyYzE3Yy0zYzEwLTQxNmItYjljNi1kNWQ0NjhkM2FkY2Qg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAMhunL/F
tZhCBhLkImg/n9uranKxnOwj60lK677O6oCpcuoEK1xcIgXWVmx0l6ygLBrpsb3U
S1Gka/rG+UyrElvBlv4EVxXQ3QUsuwDydPcB3/Cr/NqOCo3fX23X39eszHXIVZUA
/DS05X0wx+2MQ5TD+K4ADuSVfCBb5TnbK2Svd7l5D1tl3/lz3cuCm5og8zZqccS5
V6PmNKyECmboA7yQogJXLX2bQqy8SJcq/gjA/SwW4e6UHkuTQG5hGCA/yaIeEWEK
JmDXzIkf42jOzer3L67qoU7JpisRiRbKwF+TrzuG2rf7yM3GfMXhXH9LDwTysfaJ
ixBU+l8gr8hZLT+lvLc89tzrFq3ZrPSC7Z6OV8VUmGo1X37sqYAewDaUz4EtG6KG
p7IM6Bxc/dCnuDstRaT8Uj108aBfs9fesXlmJJUCsY+w9mn6PDldBkIG7fI5gExe
McUPMJEc7yF0ypJkZQmowp6bDrF5EFaYZakucWYMMQJKhkKk/XPt46XtcwIDAQAB
o0IwQDAdBgNVHQ4EFgQUJAZT9MubkBad0shPp26YZGD3PX8wEgYDVR0TAQH/BAgw
BgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBABv1DYuCP6k7
bZK0WYOkVGYbvFlAkEvDk1YTfGMuqBmDrPgdRrxdoMVzpvXynLCh3c5RPgqrRAaL
Fego+4GQNz/8/rvCg1QU5/txI/tn1BgR77F8aiNTsdihBnJpbBi1vP50jIiB4mhI
733rHYVJCMtN+X3PgZD1eX1NwLVEp3uAyGMQYNGoslF7VlfDM6GgkXiTXIcwgrfE
M3UytwE8kkojo/rMOQ+qqc3ps17VwqgNlzLH+Yg3GagsZ30RKlDy70KQXsSF0i69
1KYkIazG/h3JCRLCuj7YCRQ5oSUxf1D9S6i1afiQiEbsBtjcMYZo8XGTNTj98o8U
zYBQLEJzvT9YOUBlmU6YGupz5iALPN8VWeCP9zbzXoR4wiqlI/dvyMFvu/6RNDZ8
eaS0PLU3UVS4sKs/qg365S2E+aEL2BC4Z65OVv8CDUSRykDsxrWmPv+1o/KiH0ZW
agkRQemrpvqn9dT219alhB/C+v2sXyXjcqkn/83CuPqBdHV9cbTFrA==
-----END CERTIFICATE-----`;
  if (!pool) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Pool } = require('pg') as typeof import('pg');
    pool = new Pool({
      host: process.env.DB_HOST|| "pg-18c96d3-narayanan2600-6de6.h.aivencloud.com",
      port: Number(process.env.DB_PORT ?? 14471),
      database: process.env.DB_NAME || "defaultdb",
      user: process.env.DB_USER|| "avnadmin",
      password: process.env.DB_PASSWORD|| "AVNS_zHo5ErjPikeL9_zPCmw",

      ssl: {
        ca,
        rejectUnauthorized: true,
      },
      max: 10,
      idleTimeoutMillis: 30000,

      connectionTimeoutMillis: 10000,
    });

    pool.on('error', (err) => {
      console.error('PostgreSQL pool error:', err);
    });
  }
  return pool;
}

export async function query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]> {
  if (!isDbConfigured()) return [];
  try {
    const result = await getPool().query(sql, params);
    return result.rows as T[];
  } catch (err) {
    console.error('PostgreSQL query failed, returning empty result:', err);
    return [];
  }
}

export async function queryOne<T = unknown>(sql: string, params?: unknown[]): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

export async function readUsers(): Promise<UserRecord[]> {
  return query<UserRecord>(
    'SELECT id, full_name AS "fullName", email, mobile, password, created_date AS "createdDate" FROM users ORDER BY id'
  );
}

export async function findUserByEmailOrMobile(emailOrMobile: string): Promise<UserRecord | null> {
  return queryOne<UserRecord>(
    'SELECT id, full_name AS "fullName", email, mobile, password, created_date AS "createdDate" FROM users WHERE LOWER(email) = LOWER($1) OR mobile = $1 LIMIT 1',
    [emailOrMobile]
  );
}

export async function registerUser(user: Omit<UserRecord, 'id' | 'createdDate'>): Promise<UserRecord> {
  if (!isDbConfigured()) {
    throw new Error('Database is not configured');
  }

  const result = await getPool().query<UserRecord>(
    'INSERT INTO users (full_name, email, mobile, password) VALUES ($1, $2, $3, $4) RETURNING id, full_name AS "fullName", email, mobile, password, created_date AS "createdDate"',
    [user.fullName, user.email, user.mobile, user.password]
  );

  return result.rows[0];
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export interface MemberProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  avatar: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  address: string | null;
  district: string | null;
  pincode: string | null;
  state: string | null;
  nomineeName: string | null;
  nomineeRelation: string | null;
  bankName: string | null;
  accountNumber: string | null;
  accountHolder: string | null;
  branch: string | null;
  ifscCode: string | null;
  pan: string | null;
  upiId: string | null;
}

export interface MemberDocument {
  id: string;
  documentType: string;
  documentUrl: string | null;
  isVerified: boolean;
}

async function ensureMemberProfilesTable() {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS member_profiles (
      member_id VARCHAR(50) PRIMARY KEY REFERENCES members(id) ON DELETE CASCADE,
      date_of_birth DATE, gender VARCHAR(20), address TEXT, district VARCHAR(100),
      pincode VARCHAR(20), state VARCHAR(100), nominee_name VARCHAR(255),
      nominee_relation VARCHAR(100), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await getPool().query('ALTER TABLE bank_accounts ADD COLUMN IF NOT EXISTS branch VARCHAR(255), ADD COLUMN IF NOT EXISTS pan VARCHAR(50), ADD COLUMN IF NOT EXISTS upi_id VARCHAR(255)');
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS member_documents (
      id VARCHAR(50) PRIMARY KEY, member_id VARCHAR(50) NOT NULL REFERENCES members(id) ON DELETE CASCADE,
      document_type VARCHAR(50) NOT NULL, document_number VARCHAR(50) NOT NULL DEFAULT '', document_url VARCHAR(500),
      is_verified BOOLEAN NOT NULL DEFAULT FALSE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (member_id, document_type)
    )
  `);
}

const memberProfileSelect = `
  SELECT m.id, m.name, m.email, m.mobile, m.avatar,
    TO_CHAR(p.date_of_birth, 'YYYY-MM-DD') AS "dateOfBirth", p.gender, p.address,
    p.district, p.pincode, p.state, p.nominee_name AS "nomineeName",
    p.nominee_relation AS "nomineeRelation", b.bank_name AS "bankName",
    b.account_number AS "accountNumber", b.account_holder AS "accountHolder",
    b.branch, b.ifsc_code AS "ifscCode", b.pan, b.upi_id AS "upiId"
  FROM members m
  LEFT JOIN member_profiles p ON p.member_id = m.id
  LEFT JOIN LATERAL (SELECT * FROM bank_accounts WHERE member_id = m.id ORDER BY is_primary DESC, id LIMIT 1) b ON TRUE
  WHERE LOWER(m.email) = LOWER($1)
  LIMIT 1`;

export async function getMemberProfile(email: string): Promise<MemberProfile | null> {
  if (!isDbConfigured()) return null;
  await ensureMemberProfilesTable();
  return queryOne<MemberProfile>(memberProfileSelect, [email]);
}

export async function updateMemberProfile(profile: Partial<MemberProfile> & { id: string }) {
  await ensureMemberProfilesTable();
  await getPool().query('UPDATE members SET email = $1, updated_at = NOW() WHERE id = $2', [profile.email, profile.id]);
  await getPool().query(
    `INSERT INTO member_profiles (member_id, date_of_birth, gender, address, district, pincode, state, nominee_name, nominee_relation)
     VALUES ($1, NULLIF($2, '')::date, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (member_id) DO UPDATE SET date_of_birth = EXCLUDED.date_of_birth, gender = EXCLUDED.gender,
     address = EXCLUDED.address, district = EXCLUDED.district, pincode = EXCLUDED.pincode, state = EXCLUDED.state,
     nominee_name = EXCLUDED.nominee_name, nominee_relation = EXCLUDED.nominee_relation, updated_at = NOW()` ,
    [profile.id, profile.dateOfBirth ?? '', profile.gender, profile.address, profile.district, profile.pincode, profile.state, profile.nomineeName, profile.nomineeRelation],
  );
  await getPool().query(
    `INSERT INTO bank_accounts (id, member_id, account_holder, bank_name, account_number, ifsc_code, branch, pan, upi_id, is_primary)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, TRUE)
     ON CONFLICT (id) DO UPDATE SET account_holder = EXCLUDED.account_holder, bank_name = EXCLUDED.bank_name,
     account_number = EXCLUDED.account_number, ifsc_code = EXCLUDED.ifsc_code, branch = EXCLUDED.branch,
     pan = EXCLUDED.pan, upi_id = EXCLUDED.upi_id, updated_at = NOW()`,
    [`BANK-${profile.id}`, profile.id, profile.accountHolder ?? '', profile.bankName ?? '', profile.accountNumber ?? '', profile.ifscCode, profile.branch, profile.pan, profile.upiId],
  );
  return queryOne<MemberProfile>(memberProfileSelect.replace('WHERE LOWER(m.email) = LOWER($1)', 'WHERE m.id = $1'), [profile.id]);
}

export async function updateMemberAvatar(id: string, avatar: string) {
  await getPool().query('UPDATE members SET avatar = $1, updated_at = NOW() WHERE id = $2', [avatar, id]);
  return queryOne<MemberProfile>(memberProfileSelect.replace('WHERE LOWER(m.email) = LOWER($1)', 'WHERE m.id = $1'), [id]);
}

export async function getMemberDocuments(memberId: string): Promise<MemberDocument[]> {
  if (!isDbConfigured()) return [];
  await ensureMemberProfilesTable();
  return query<MemberDocument>(
    'SELECT id, document_type AS "documentType", document_url AS "documentUrl", is_verified AS "isVerified" FROM member_documents WHERE member_id = $1 ORDER BY created_at',
    [memberId],
  );
}

export async function saveMemberDocument(memberId: string, documentType: string, documentUrl: string): Promise<MemberDocument> {
  await ensureMemberProfilesTable();
  const result = await getPool().query<MemberDocument>(
    `INSERT INTO member_documents (id, member_id, document_type, document_url)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (member_id, document_type) DO UPDATE SET document_url = EXCLUDED.document_url, is_verified = FALSE, updated_at = NOW()
     RETURNING id, document_type AS "documentType", document_url AS "documentUrl", is_verified AS "isVerified"`,
    [`DOC-${memberId}-${documentType.replace(/[^a-z0-9]/gi, '-').toUpperCase()}`, memberId, documentType, documentUrl],
  );
  return result.rows[0];
}

export async function withTransaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
