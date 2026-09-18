import { NextResponse, NextRequest } from 'next/server';
import { markAsRead } from '@/services/notificationService';

export async function PUT(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Notification ID is required.',
        },
        { status: 400 }
      );
    }

    const notification = await markAsRead(id);

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
