import { NextRequest, NextResponse } from 'next/server';
import { getAllNotifications, getUnreadNotifications } from '@/services/notificationService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const unreadOnly = searchParams.get('unread') === 'true';

    let allNotifications;
    if (unreadOnly) {
      allNotifications = await getUnreadNotifications();
    } else {
      allNotifications = await getAllNotifications();
    }

    const page = Math.max(
      Number(searchParams.get('page')) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        Number(searchParams.get('limit')) || 10,
        1
      ),
      50
    );

    const skip = (page - 1) * limit;
    const notifications = allNotifications.slice(skip, skip + limit);
    const total = allNotifications.length;
    const unreadCount = allNotifications.filter(n => !n.is_read).length;

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(
      'GET /api/admin/notifications error:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load notifications',
      },
      { status: 500 }
    );
  }
}