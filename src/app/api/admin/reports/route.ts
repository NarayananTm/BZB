import { NextRequest } from 'next/server';
import { listReports, addReport, removeReport } from '@/controllers/reportController';

export const GET    = (req: NextRequest) => listReports(req);
export const POST   = (req: NextRequest) => addReport(req);
export const DELETE = (req: NextRequest) => removeReport(req);
