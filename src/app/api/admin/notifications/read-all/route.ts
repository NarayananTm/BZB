import { NextRequest, NextResponse } from 'next/server';
import { markAllAsRead } from '@/services/notificationService';

export async function PATCH(_request: NextRequest) {
  try {
    const count = await markAllAsRead();

    return NextResponse.json({
      success: true,
      updatedCount: count,
    });
  } catch (error) {
    console.error(
      'PATCH read-all error:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          'Failed to mark all notifications as read',
      },
      { status: 500 }
    );
  }
}