import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import {
  getSuperAdminDashboardStats,
  getMemberStats,
  getFinancialStats,
  getPendingRequests,
  getRecentActivities,
  getTopPerformingMembers,
  getReferralStats,
  getEarningStats,
  getWithdrawalStats,
  getTopupStats,
  getMemberGrowthData,
  getIncomeDistribution,
} from '@/services/superAdminDashboardService';

/**
 * Get comprehensive super admin dashboard data
 */
export async function getSuperAdminDashboardData(request: NextRequest) {
  try {
    // Verify admin/super admin role
    const check = requireAdmin(request);
    if (check.error) return check.error;

    // Fetch all dashboard data in parallel
    const [
      dashboardStats,
      memberStats,
      financialStats,
      pendingRequests,
      recentActivities,
      topMembers,
      referralStats,
      earningStats,
      withdrawalStats,
      topupStats,
      growthData,
      incomeDistribution,
    ] = await Promise.all([
      getSuperAdminDashboardStats(),
      getMemberStats(),
      getFinancialStats(),
      getPendingRequests(10),
      getRecentActivities(15),
      getTopPerformingMembers(5),
      getReferralStats(),
      getEarningStats(),
      getWithdrawalStats(),
      getTopupStats(),
      getMemberGrowthData(),
      getIncomeDistribution(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        dashboardStats,
        memberStats,
        financialStats,
        pendingRequests,
        recentActivities,
        topMembers,
        referralStats,
        earningStats,
        withdrawalStats,
        topupStats,
        growthData,
        incomeDistribution,
      },
      admin: check.admin,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[superAdminDashboardController.getSuperAdminDashboardData]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

/**
 * Get only dashboard stats (lightweight endpoint)
 */
export async function getDashboardStatsOnly(request: NextRequest) {
  try {
    const check = requireAdmin(request);
    if (check.error) return check.error;

    const dashboardStats = await getSuperAdminDashboardStats();

    return NextResponse.json({
      success: true,
      data: dashboardStats,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[superAdminDashboardController.getDashboardStatsOnly]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}

/**
 * Get pending requests
 */
export async function getPendingRequestsData(request: NextRequest) {
  try {
    const check = requireAdmin(request);
    if (check.error) return check.error;

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const pendingRequests = await getPendingRequests(limit);

    return NextResponse.json({
      success: true,
      data: pendingRequests,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[superAdminDashboardController.getPendingRequestsData]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch pending requests' },
      { status: 500 }
    );
  }
}

/**
 * Get recent activities
 */
export async function getRecentActivitiesData(request: NextRequest) {
  try {
    const check = requireAdmin(request);
    if (check.error) return check.error;

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '15', 10);

    const activities = await getRecentActivities(limit);

    return NextResponse.json({
      success: true,
      data: activities,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[superAdminDashboardController.getRecentActivitiesData]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch recent activities' },
      { status: 500 }
    );
  }
}

/**
 * Get financial statistics
 */
export async function getFinancialStatsData(request: NextRequest) {
  try {
    const check = requireAdmin(request);
    if (check.error) return check.error;

    const financialStats = await getFinancialStats();

    return NextResponse.json({
      success: true,
      data: financialStats,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[superAdminDashboardController.getFinancialStatsData]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch financial stats' },
      { status: 500 }
    );
  }
}

/**
 * Get member statistics
 */
export async function getMemberStatsData(request: NextRequest) {
  try {
    const check = requireAdmin(request);
    if (check.error) return check.error;

    const memberStats = await getMemberStats();

    return NextResponse.json({
      success: true,
      data: memberStats,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[superAdminDashboardController.getMemberStatsData]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch member stats' },
      { status: 500 }
    );
  }
}
