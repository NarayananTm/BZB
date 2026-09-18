import { NextRequest } from 'next/server';
import { getDashboardStatsOnly } from '@/controllers/superAdminDashboardController';

export const GET = (req: NextRequest) => getDashboardStatsOnly(req);
