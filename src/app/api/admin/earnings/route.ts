import { NextRequest } from 'next/server';
import { listEarnings, addEarning } from '@/controllers/earningController';

export const GET  = (req: NextRequest) => listEarnings(req);
export const POST = (req: NextRequest) => addEarning(req);
