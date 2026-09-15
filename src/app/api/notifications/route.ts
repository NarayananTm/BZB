import { NextResponse, NextRequest } from 'next/server';
import { getAllNotifications, markAsRead as markAsReadService } from '@/services/notificationService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get('unread') === 'true';
    
    let notifications = await getAllNotifications();
    
    if (unreadOnly) {
      notifications = notifications.filter((n) => !n.is_read);
    }

    return NextResponse.json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    console.error('Notifications API error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load notifications.',
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Notification ID is required.',
        },
        { status: 400 }
      );
    }

    const notification = await markAsReadService(id);

    if (!notification) {
      return NextResponse.json(
        {
          success: false,
          message: 'Notification not found.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error('Mark as read error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to update notification.',
      },
      {
        status: 500,
      }
    );
  }
}
