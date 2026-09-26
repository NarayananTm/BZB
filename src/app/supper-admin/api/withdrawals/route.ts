import { NextRequest, NextResponse } from 'next/server';
import { requireSuperAdmin } from '@/lib/adminAuth';
import { getAllWithdrawals } from '@/services/withdrawalService';
import { isDbConfigured, query } from '@/lib/postgres';

export async function GET(request: NextRequest) {
  const { error } = requireSuperAdmin(request);
  if (error) return error;

  try {
    if (isDbConfigured()) {
      const withdrawals = await query(
        `SELECT w.*, m.email AS member_email
         FROM withdrawals w
         LEFT JOIN members m ON m.id = w.member_id
         ORDER BY w.requested_date DESC, w.created_at DESC`,
      );
      return NextResponse.json({ success: true, data: withdrawals, total: withdrawals.length });
    }

    const withdrawals = (await getAllWithdrawals()).map((withdrawal) => ({
      ...withdrawal,
      member_email: null,
    }));
    return NextResponse.json({ success: true, data: withdrawals, total: withdrawals.length });
  } catch (err) {
    console.error('[super-admin.withdrawals.GET]', err);
    return NextResponse.json({ success: false, message: 'Unable to load withdrawal requests' }, { status: 500 });
  }
}