import { NextRequest } from 'next/server';
import { getPendingRequestsData } from '@/controllers/superAdminDashboardController';

export const GET = (req: NextRequest) => getPendingRequestsData(req);
