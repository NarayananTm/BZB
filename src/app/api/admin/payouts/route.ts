import { NextRequest } from 'next/server';
import { listPayouts, addPayout } from '@/controllers/payoutController';

export const GET  = (req: NextRequest) => listPayouts(req);
export const POST = (req: NextRequest) => addPayout(req);
