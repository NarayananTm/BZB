import { NextRequest, NextResponse } from 'next/server';
import { getMemberNotifications } from '@/services/notificationService';
import { getNotificationMemberId } from '@/lib/memberNotificationAuth';

export async function GET(request: NextRequest) {
  const memberId = await getNotificationMemberId(request);
  if (!memberId) {
    return NextResponse.json({ success: false, message: 'Please sign in to continue' }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
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

    return NextResponse.json({
      success: true,
      ...await getMemberNotifications(memberId, page, limit),
      page,
      limit,
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