import { NextRequest } from 'next/server';
import { getFinancialStatsData } from '@/controllers/superAdminDashboardController';

export const GET = (req: NextRequest) => getFinancialStatsData(req);
