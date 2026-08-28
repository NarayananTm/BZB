import { NextRequest } from 'next/server';
import { getNotification, readNotification, removeNotification } from '@/controllers/notificationController';

type Params = { params: { id: string } };

export const GET    = (req: NextRequest, { params }: Params) => getNotification(req, params.id);
export const PATCH  = (req: NextRequest, { params }: Params) => readNotification(req, params.id);
export const DELETE = (req: NextRequest, { params }: Params) => removeNotification(req, params.id);
