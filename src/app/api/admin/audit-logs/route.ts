import { NextRequest } from 'next/server';
import { listAuditLogs, addAuditLog } from '@/controllers/auditLogController';

export const GET  = (req: NextRequest) => listAuditLogs(req);
export const POST = (req: NextRequest) => addAuditLog(req);
