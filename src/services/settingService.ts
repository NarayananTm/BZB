import { query, queryOne } from '@/lib/postgres';

export interface Setting {
  key: string;
  value: string;
  description: string | null;
  updated_at: string;
}

export async function getAllSettings(): Promise<Setting[]> {
  return query<Setting>('SELECT * FROM admin_settings ORDER BY key ASC');
}

export async function getSetting(key: string): Promise<string | null> {
  const row = await queryOne<Setting>('SELECT value FROM admin_settings WHERE key = $1', [key]);
  return row?.value ?? null;
}

export async function upsertSetting(key: string, value: string, description?: string): Promise<Setting> {
  const rows = await query<Setting>(
    `INSERT INTO admin_settings (key, value, description, updated_at)
     VALUES ($1, $2, $3, NOW())
     ON CONFLICT (key) DO UPDATE
       SET value = EXCLUDED.value,
           description = COALESCE(EXCLUDED.description, admin_settings.description),
           updated_at = NOW()
     RETURNING *`,
    [key, value, description ?? null],
  );
  return rows[0];
}

export async function upsertManySettings(settings: Record<string, string>): Promise<void> {
  for (const [key, value] of Object.entries(settings)) {
    await upsertSetting(key, value);
  }
}
