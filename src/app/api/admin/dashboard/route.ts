import { NextRequest } from 'next/server';
import { getStats } from '@/controllers/dashboardController';

export const GET = (req: NextRequest) => getStats(req);
