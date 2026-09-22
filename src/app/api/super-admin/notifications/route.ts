import { NextResponse } from 'next/server';
import { getAllNotifications } from '@/services/notificationService';

export async function GET() {
  try {
    const notifications = await getAllNotifications();
    const unreadCount = notifications.filter((notification) => !notification.is_read).length;

    return NextResponse.json({
      success: true,
      unread_count: unreadCount,
      unreadCount,
      count: notifications.length,
    });
  } catch (error) {
    console.error('[super-admin-notifications]', error);
    return NextResponse.json(
      { success: false, message: 'Unable to load notifications', unread_count: 0, unreadCount: 0 },
      { status: 500 },
    );
  }
}
