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

export interface MemberNotification {
  id: string;
  title: string;
  message: string;
  icon: string | null;
  is_read: boolean;
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

async function backfillWithdrawalNotifications(memberId: string) {
  await query(
    `INSERT INTO member_notifications (member_id, title, message, icon, notification_type, created_at)
     SELECT w.member_id, 'Withdrawal request submitted',
       'Withdrawal request ' || w.id || ' for Rs. ' || TO_CHAR(w.amount, 'FM999,999,999,990') || ' is pending review.',
       '💸', 'withdrawal_requested', w.created_at
     FROM withdrawals w
     WHERE w.member_id = $1
       AND NOT EXISTS (
         SELECT 1 FROM member_notifications n
         WHERE n.member_id = w.member_id
           AND n.notification_type = 'withdrawal_requested'
           AND (n.message LIKE '%' || w.id || '%'
             OR n.created_at BETWEEN w.created_at - INTERVAL '2 minutes' AND w.created_at + INTERVAL '2 minutes')
       )`,
    [memberId],
  );

  await query(
    `INSERT INTO member_notifications (member_id, title, message, icon, notification_type, created_at)
     SELECT w.member_id, 'Withdrawal approved',
       'Withdrawal request ' || w.id || ' for Rs. ' || TO_CHAR(w.amount, 'FM999,999,999,990') || ' was approved.',
       '✅', 'withdrawal_approved', w.updated_at
     FROM withdrawals w
     WHERE w.member_id = $1 AND w.status = 'Approved'
       AND NOT EXISTS (
         SELECT 1 FROM member_notifications n
         WHERE n.member_id = w.member_id
           AND n.notification_type = 'withdrawal_approved'
           AND (n.message LIKE '%' || w.id || '%'
             OR n.created_at BETWEEN w.updated_at - INTERVAL '2 minutes' AND w.updated_at + INTERVAL '2 minutes')
       )`,
    [memberId],
  );

  await query(
    `INSERT INTO member_notifications (member_id, title, message, icon, notification_type, created_at)
     SELECT w.member_id, 'Withdrawal request rejected',
       'Withdrawal request ' || w.id || ' for Rs. ' || TO_CHAR(w.amount, 'FM999,999,999,990') || ' was rejected.'
         || CASE WHEN NULLIF(BTRIM(w.remarks), '') IS NULL THEN '' ELSE ' Reason: ' || BTRIM(w.remarks) END,
       '⚠️', 'withdrawal_rejected', w.updated_at
     FROM withdrawals w
     WHERE w.member_id = $1 AND w.status = 'Rejected'
       AND NOT EXISTS (
         SELECT 1 FROM member_notifications n
         WHERE n.member_id = w.member_id
           AND n.notification_type = 'withdrawal_rejected'
           AND (n.message LIKE '%' || w.id || '%'
             OR n.created_at BETWEEN w.updated_at - INTERVAL '2 minutes' AND w.updated_at + INTERVAL '2 minutes')
       )`,
    [memberId],
  );
}

export async function getMemberNotifications(memberId: string, page: number, limit: number) {
  await backfillWithdrawalNotifications(memberId);
  const offset = (page - 1) * limit;
  const [notifications, counts] = await Promise.all([
    query<MemberNotification>(
      `SELECT id::text AS id, title, message, icon, is_read, created_at
       FROM member_notifications
       WHERE member_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [memberId, limit, offset],
    ),
    queryOne<{ total: string; unread_count: string }>(
      `SELECT COUNT(*)::text AS total,
         COUNT(*) FILTER (WHERE is_read = FALSE)::text AS unread_count
       FROM member_notifications
       WHERE member_id = $1`,
      [memberId],
    ),
  ]);
  const total = Number(counts?.total || 0);

  return {
    notifications: notifications.map((notification) => ({
      id: notification.id,
      title: notification.title,
      message: notification.message,
      icon: notification.icon,
      createdAt: notification.created_at,
      read: notification.is_read,
    })),
    unreadCount: Number(counts?.unread_count || 0),
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function markMemberNotificationAsRead(id: string, memberId: string): Promise<boolean> {
  const rows = await query(
    `UPDATE member_notifications
     SET is_read = TRUE, read_at = NOW(), updated_at = NOW()
     WHERE id::text = $1 AND member_id = $2
     RETURNING id`,
    [id, memberId],
  );
  return rows.length > 0;
}

export async function markAllMemberNotificationsAsRead(memberId: string): Promise<number> {
  const rows = await query(
    `UPDATE member_notifications
     SET is_read = TRUE, read_at = NOW(), updated_at = NOW()
     WHERE member_id = $1 AND is_read = FALSE
     RETURNING id`,
    [memberId],
  );
  return rows.length;
}
