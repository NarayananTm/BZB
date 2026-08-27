import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getAllReports, getReportById, createReport, updateReportStatus, deleteReport } from '@/services/reportService';
import type { CreateReportDto } from '@/models';

export async function listReports(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const reports = await getAllReports();
    return NextResponse.json({ success: true, data: reports, total: reports.length });
  } catch (err) {
    console.error('[reportController.listReports]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch reports' }, { status: 500 });
  }
}

export async function addReport(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const body: CreateReportDto = await request.json();
    if (!body.id || !body.title || !body.category) {
      return NextResponse.json({ success: false, message: 'id, title and category are required' }, { status: 400 });
    }
    const report = await createReport({
      id: body.id,
      title: body.title,
      category: body.category,
      created_date: body.created_date ?? new Date().toISOString().slice(0, 10),
      owner: body.owner ?? null,
      status: body.status ?? 'Generating',
    });
    return NextResponse.json({ success: true, data: report }, { status: 201 });
  } catch (err) {
    console.error('[reportController.addReport]', err);
    return NextResponse.json({ success: false, message: 'Failed to create report' }, { status: 500 });
  }
}

export async function patchReport(request: NextRequest, id: string) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const { status } = await request.json();
    const report = await updateReportStatus(id, status);
    if (!report) return NextResponse.json({ success: false, message: 'Report not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: report });
  } catch (err) {
    console.error('[reportController.patchReport]', err);
    return NextResponse.json({ success: false, message: 'Failed to update report' }, { status: 500 });
  }
}

export async function removeReport(request: NextRequest) {
  const { error } = requireAdmin(request);
  if (error) return error;

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, message: 'id is required' }, { status: 400 });
    const deleted = await deleteReport(id);
    if (!deleted) return NextResponse.json({ success: false, message: 'Report not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Report deleted' });
  } catch (err) {
    console.error('[reportController.removeReport]', err);
    return NextResponse.json({ success: false, message: 'Failed to delete report' }, { status: 500 });
  }
}
