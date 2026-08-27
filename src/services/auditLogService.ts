import { query, queryOne, isDbConfigured } from '@/lib/postgres';
import { adminAuditLogs, type AdminAuditLog } from '@/data/admin/auditLogs';

export interface AuditLog {
  id: string;
  user_name: string | null;
  action: string;
  target: string | null;
  log_date: string;
  status: 'Success' | 'Failure' | null;
  created_at: string;
}

function adaptMockAuditLog(l: AdminAuditLog): AuditLog {
  return {
    id: l.id,
    user_name: l.user ?? null,
    action: l.action,
    target: l.target ?? null,
    log_date: l.date,
    status: l.status ?? null,
    created_at: l.date,
  };
}

export async function getAllAuditLogs(limit = 100): Promise<AuditLog[]> {
  if (!isDbConfigured()) return adminAuditLogs.map(adaptMockAuditLog);
  const rows = await query<AuditLog>('SELECT * FROM audit_logs ORDER BY log_date DESC LIMIT $1', [limit]);
  return rows.length ? rows : adminAuditLogs.map(adaptMockAuditLog);
}

export async function getAuditLogById(id: string): Promise<AuditLog | null> {
  return queryOne<AuditLog>('SELECT * FROM audit_logs WHERE id = $1', [id]);
}

export async function createAuditLog(data: {
  id: string;
  user_name: string;
  action: string;
  target?: string;
  status: 'Success' | 'Failure';
}): Promise<AuditLog> {
  const rows = await query<AuditLog>(
    `INSERT INTO audit_logs (id, user_name, action, target, log_date, status)
     VALUES ($1,$2,$3,$4,NOW(),$5)
     RETURNING *`,
    [data.id, data.user_name, data.action, data.target ?? null, data.status],
  );
  return rows[0];
}

/** Helper to auto-generate an audit log ID. */
export function generateAuditId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(Math.random() * 900) + 100;
  return `AL-${date}-${rand}`;
}
