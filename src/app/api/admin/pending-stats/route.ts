import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getPendingStats } from '@/services/memberService';

export async function GET(request: NextRequest) {
  const check = requireAdmin(request);
  const { error } = check;
  if (error) return error;

  try {
    const stats = await getPendingStats();

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (err) {
    console.error('[admin/pending-stats]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch pending stats' }, { status: 500 });
  }
}
