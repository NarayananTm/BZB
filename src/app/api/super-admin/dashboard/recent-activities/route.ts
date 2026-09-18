import { NextRequest } from 'next/server';
import { getRecentActivitiesData } from '@/controllers/superAdminDashboardController';

export const GET = (req: NextRequest) => getRecentActivitiesData(req);
