import { NextRequest } from 'next/server';
import { getSuperAdminDashboardData } from '@/controllers/superAdminDashboardController';

export const GET = (req: NextRequest) => getSuperAdminDashboardData(req);
