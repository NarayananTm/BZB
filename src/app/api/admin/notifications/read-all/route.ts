import { NextRequest, NextResponse } from 'next/server';
import { markAllMemberNotificationsAsRead } from '@/services/notificationService';
import { getNotificationMemberId } from '@/lib/memberNotificationAuth';

export async function PATCH(request: NextRequest) {
  const memberId = await getNotificationMemberId(request);
  if (!memberId) {
    return NextResponse.json({ success: false, message: 'Please sign in to continue' }, { status: 401 });
  }

  try {
    const count = await markAllMemberNotificationsAsRead(memberId);

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