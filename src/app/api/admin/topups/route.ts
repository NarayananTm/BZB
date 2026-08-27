import { NextRequest } from 'next/server';
import { listTopups, addTopup } from '@/controllers/topupController';

export const GET  = (req: NextRequest) => listTopups(req);
export const POST = (req: NextRequest) => addTopup(req);
