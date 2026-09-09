import { NextRequest, NextResponse } from 'next/server';
import { getPendingStats } from '@/services/memberService';

export async function GET(request: NextRequest) {
  try {
    const stats = await getPendingStats();

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (err) {
    console.error('[super-admin-pending-stats]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch pending stats' }, { status: 500 });
  }
}
