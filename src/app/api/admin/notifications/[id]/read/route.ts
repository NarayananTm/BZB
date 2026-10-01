import { NextRequest, NextResponse } from 'next/server';
import { markMemberNotificationAsRead } from '@/services/notificationService';
import { getNotificationMemberId } from '@/lib/memberNotificationAuth';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  const memberId = await getNotificationMemberId(request);
  if (!memberId) {
    return NextResponse.json({ success: false, message: 'Please sign in to continue' }, { status: 401 });
  }

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

    const updated = await markMemberNotificationAsRead(id, memberId);

    if (!updated) {
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