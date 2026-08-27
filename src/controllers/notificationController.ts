import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import {
  getAllNotifications, getNotificationById, createNotification,
  markAsRead, markAllAsRead, deleteNotification,
} from '@/services/notificationService';
import type { CreateNotificationDto } from '@/models';

export async function listNotifications(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const notifications = await getAllNotifications();
    return NextResponse.json({ success: true, data: notifications, total: notifications.length });
  } catch (err) {
    console.error('[notificationController.listNotifications]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function getNotification(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const n = await getNotificationById(id);
    if (!n) return NextResponse.json({ success: false, message: 'Notification not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: n });
  } catch (err) {
    console.error('[notificationController.getNotification]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch notification' }, { status: 500 });
  }
}

export async function addNotification(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const body = await request.json();

    if (body.action === 'mark_all_read') {
      const count = await markAllAsRead();
      return NextResponse.json({ success: true, message: `${count} notifications marked as read` });
    }

    const dto: CreateNotificationDto = body;
    if (!dto.id || !dto.title) {
      return NextResponse.json({ success: false, message: 'id and title are required' }, { status: 400 });
    }
    const n = await createNotification({
      id: dto.id,
      title: dto.title,
      message: dto.message ?? null,
      type: dto.type ?? 'System',
      is_read: false,
      created_date: new Date().toISOString().slice(0, 10),
    });
    return NextResponse.json({ success: true, data: n }, { status: 201 });
  } catch (err) {
    console.error('[notificationController.addNotification]', err);
    return NextResponse.json({ success: false, message: 'Failed to create notification' }, { status: 500 });
  }
}

export async function readNotification(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const n = await markAsRead(id);
    if (!n) return NextResponse.json({ success: false, message: 'Notification not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: n });
  } catch (err) {
    console.error('[notificationController.readNotification]', err);
    return NextResponse.json({ success: false, message: 'Failed to update notification' }, { status: 500 });
  }
}

export async function removeNotification(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const deleted = await deleteNotification(id);
    if (!deleted) return NextResponse.json({ success: false, message: 'Notification not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Notification deleted' });
  } catch (err) {
    console.error('[notificationController.removeNotification]', err);
    return NextResponse.json({ success: false, message: 'Failed to delete notification' }, { status: 500 });
  }
}
