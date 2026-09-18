import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { getMemberByEmail } from '@/services/memberService';
import { getMemberDashboardStats } from '@/services/dashboardService';

export async function getStats(request: NextRequest) {
  const check = requireAdmin(request);
  const { error } = check;
  if (error) return error;

  try {
    const member = await getMemberByEmail(check.admin!.email);
    const stats = member ? await getMemberDashboardStats(member.id) : {
      total_members: 0, active_members: 0, pending_members: 0, total_referrals: 0,
      pending_referrals: 0, total_earnings: 0, total_withdrawals: 0, pending_withdrawals: 0,
      total_topups: 0, pending_topups: 0, unread_notifications: 0, levels: [],
    };
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
