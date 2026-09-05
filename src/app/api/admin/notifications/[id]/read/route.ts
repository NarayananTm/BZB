import { NextRequest, NextResponse } from 'next/server';
import { markAsRead } from '@/services/notificationService';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Notification ID is required',
        },
        { status: 400 }
      );
    }

    const notification = await markAsRead(id);

    if (!notification) {
      return NextResponse.json(
        {
          success: false,
          message: 'Notification not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error(
      'PATCH notification read error:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update notification',
      },
      { status: 500 }
    );
  }
}