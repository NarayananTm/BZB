import { NextRequest } from 'next/server';
import { getMemberStatsData } from '@/controllers/superAdminDashboardController';

export const GET = (req: NextRequest) => getMemberStatsData(req);
