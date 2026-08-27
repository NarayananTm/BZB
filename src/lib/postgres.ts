import type { Pool as PgPool, PoolClient } from 'pg';

let pool: PgPool | undefined;

export function isDbConfigured(): boolean {
  return Boolean(process.env.DB_HOST && process.env.DB_NAME && process.env.DB_USER && process.env.DB_PASSWORD);
}

export function getPool(): PgPool {
  if (!pool) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Pool } = require('pg') as typeof import('pg');
    pool = new Pool({
      host:     process.env.DB_HOST,
      port:     Number(process.env.DB_PORT ?? 5432),
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl:      process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      max:      10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
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
