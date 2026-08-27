import { NextRequest } from 'next/server';
import { listLevels, addLevel } from '@/controllers/levelController';

export const GET  = (req: NextRequest) => listLevels(req);
export const POST = (req: NextRequest) => addLevel(req);
