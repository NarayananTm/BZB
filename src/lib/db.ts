import { createClient, type Client } from '@libsql/client';

let client: Client | undefined;
const localCollections = new Map<string, unknown>();

function hasDatabaseConfig() {
  return Boolean(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN);
}

export function getDb() {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url || !authToken) {
      throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are required');
    }

    client = createClient({ url, authToken });
  }

  return client;
}

let schemaReady: Promise<void> | undefined;

export function ensureSchema() {
  if (!hasDatabaseConfig()) {
    return Promise.resolve();
  }

  schemaReady ??= getDb()
    .batch([
      {
        sql: `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        mobile TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_date TEXT NOT NULL
      )
    `,
        args: [],
      },
      {
        sql: `
      CREATE TABLE IF NOT EXISTS app_collections (
        collection TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `,
        args: [],
      },
    ])
    .then(() => undefined);

  return schemaReady;
}

export async function readCollection<T>(collection: string, seed: T): Promise<T> {
  if (!hasDatabaseConfig()) {
    if (!localCollections.has(collection)) {
      localCollections.set(collection, seed);
    }

    return localCollections.get(collection) as T;
  }

  await ensureSchema();
  const result = await getDb().execute({
    sql: 'SELECT data FROM app_collections WHERE collection = ?',
    args: [collection],
  });

  if (result.rows.length > 0) {
    return JSON.parse(String(result.rows[0].data)) as T;
  }

  await getDb().execute({
    sql: 'INSERT INTO app_collections (collection, data, updated_at) VALUES (?, ?, ?)',
    args: [collection, JSON.stringify(seed), new Date().toISOString()],
  });
  return seed;
}

export async function writeCollection<T>(collection: string, data: T): Promise<T> {
  if (!hasDatabaseConfig()) {
    localCollections.set(collection, data);
    return data;
  }

  await ensureSchema();
  await getDb().execute({
    sql: `
      INSERT INTO app_collections (collection, data, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(collection) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at
    `,
    args: [collection, JSON.stringify(data), new Date().toISOString()],
  });
  return data;
}