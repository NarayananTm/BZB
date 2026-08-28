import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getDashboardStats } from '@/services/dashboardService';

export async function getStats(request: NextRequest) {
  const check = requireAdmin(request);
  const { error } = check;
  if (error) return error;

  try {
    const stats = await getDashboardStats();
    return NextResponse.json({
      success: true,
      data: stats,
      admin: check.admin,
    });
  } catch (err) {
    console.error('[dashboardController.getStats]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
