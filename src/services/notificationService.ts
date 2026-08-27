import { query, queryOne, isDbConfigured } from '@/lib/postgres';
import { adminNotifications, type AdminNotification } from '@/data/admin/notifications';

export interface Notification {
  id: string;
  title: string;
  message: string | null;
  type: 'System' | 'Member' | 'Alert';
  is_read: boolean;
  created_date: string;
  created_at: string;
}

function adaptMockNotification(n: AdminNotification): Notification {
  return {
    id: n.id,
    title: n.title,
    message: n.message ?? null,
    type: n.type,
    is_read: n.read,
    created_date: n.createdDate,
    created_at: n.createdDate,
  };
}

export async function getAllNotifications(): Promise<Notification[]> {
  if (!isDbConfigured()) return adminNotifications.map(adaptMockNotification);
  const rows = await query<Notification>('SELECT * FROM notifications ORDER BY created_at DESC');
  return rows.length ? rows : adminNotifications.map(adaptMockNotification);
}

export async function getUnreadNotifications(): Promise<Notification[]> {
  return query<Notification>('SELECT * FROM notifications WHERE is_read = FALSE ORDER BY created_at DESC');
}

export async function getNotificationById(id: string): Promise<Notification | null> {
  return queryOne<Notification>('SELECT * FROM notifications WHERE id = $1', [id]);
}

export async function createNotification(data: Omit<Notification, 'created_at'>): Promise<Notification> {
  const rows = await query<Notification>(
    `INSERT INTO notifications (id, title, message, type, is_read, created_date)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [data.id, data.title, data.message, data.type, data.is_read, data.created_date],
  );
  return rows[0];
}

export async function markAsRead(id: string): Promise<Notification | null> {
  return queryOne<Notification>(
    `UPDATE notifications SET is_read = TRUE WHERE id = $1 RETURNING *`,
    [id],
  );
}

export async function markAllAsRead(): Promise<number> {
  const rows = await query('UPDATE notifications SET is_read = TRUE WHERE is_read = FALSE RETURNING id');
  return rows.length;
}

export async function deleteNotification(id: string): Promise<boolean> {
  const rows = await query('DELETE FROM notifications WHERE id = $1 RETURNING id', [id]);
  return rows.length > 0;
}
