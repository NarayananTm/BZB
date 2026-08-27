import { NextRequest } from 'next/server';
import { getNotification, readNotification, removeNotification } from '@/controllers/notificationController';

type Params = { params: { id: string } };

export const GET    = (req: NextRequest, { params }: Params) => getNotification(req, params.id);
export const PATCH  = (req: NextRequest, { params }: Params) => readNotification(req, params.id);
export const DELETE = (req: NextRequest, { params }: Params) => removeNotification(req, params.id);

type Params = { params: { id: string } };

export async function GET(request: NextRequest, { params }: Params) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const n = await getNotificationById(params.id);
    if (!n) return NextResponse.json({ success: false, message: 'Notification not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: n });
  } catch (error) {
    console.error('Get notification error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch notification' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const n = await markAsRead(params.id);
    if (!n) return NextResponse.json({ success: false, message: 'Notification not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: n });
  } catch (error) {
    console.error('Update notification error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update notification' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const deleted = await deleteNotification(params.id);
    if (!deleted) return NextResponse.json({ success: false, message: 'Notification not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    console.error('Delete notification error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete notification' }, { status: 500 });
  }
}
