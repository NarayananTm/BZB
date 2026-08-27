import { NextRequest } from 'next/server';
import { listNotifications, addNotification } from '@/controllers/notificationController';

export const GET  = (req: NextRequest) => listNotifications(req);
export const POST = (req: NextRequest) => addNotification(req);
