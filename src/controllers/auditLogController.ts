import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getAllAuditLogs, createAuditLog, generateAuditId } from '@/services/auditLogService';

export async function listAuditLogs(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const limit = Number(new URL(request.url).searchParams.get('limit') ?? 100);
    const logs = await getAllAuditLogs(limit);
    return NextResponse.json({ success: true, data: logs, total: logs.length });
  } catch (err) {
    console.error('[auditLogController.listAuditLogs]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch audit logs' }, { status: 500 });
  }
}

export async function addAuditLog(request: NextRequest) {
  const { admin, error } = requireAdmin(request);
  if (error) return error;

  try {
    const body = await request.json();
    if (!body.action) {
      return NextResponse.json({ success: false, message: 'action is required' }, { status: 400 });
    }
    const log = await createAuditLog({
      id: body.id ?? generateAuditId(),
      user_name: body.user_name ?? admin!.name,
      action: body.action,
      target: body.target,
      status: body.status ?? 'Success',
    });
    return NextResponse.json({ success: true, data: log }, { status: 201 });
  } catch (err) {
    console.error('[auditLogController.addAuditLog]', err);
    return NextResponse.json({ success: false, message: 'Failed to create audit log' }, { status: 500 });
  }
}
