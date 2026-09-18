import { query } from '@/lib/postgres';
import { requireAdmin } from '@/lib/adminAuth';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/super-admin/members/pending
 * Fetch all pending members awaiting approval/review
 */
export async function GET(req: NextRequest) {
  try {
    // Check admin authentication
    const { error } = requireAdmin(req);
    if (error) return error;

    // Get limit from query params
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '50');

    const pendingMembers = await query(
      `
      SELECT 
        m.id,
        m.name,
        m.email,
        m.phone,
        m.status,
        m.created_at,
        m.joining_date,
        m.referral_id,
        m.address,
        m.city,
        m.state,
        m.pincode,
        m.bank_account,
        m.ifsc_code,
        u.id AS referrer_id,
        u.name AS referrer_name,
        COUNT(DISTINCT r.id) AS total_referrals,
        EXTRACT(DAY FROM NOW() - m.created_at)::INTEGER AS days_pending
      FROM members m
      LEFT JOIN members u ON m.referral_id = u.id
      LEFT JOIN referrals r ON m.id = r.member_id AND r.status = 'Active'
      WHERE m.status = 'Pending'
      GROUP BY m.id, u.id, u.name
      ORDER BY m.created_at DESC
      LIMIT $1
      `,
      [limit]
    );

    return NextResponse.json({
      success: true,
      data: pendingMembers,
      count: pendingMembers.length,
    });
  } catch (error) {
    console.error('Error fetching pending members:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pending members' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/super-admin/members/pending
 * Approve or reject a pending member
 */
export async function POST(req: NextRequest) {
  try {
    // Check admin authentication
    const auth = requireAdmin(req);
    if (auth.error) return auth.error;
    const { admin } = auth;

    const { memberId, action, reason } = await req.json();

    if (!memberId || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    const newStatus = action === 'approve' ? 'Active' : 'Rejected';

    // Update member status
    await query(
      `UPDATE members SET status = $1, updated_at = NOW() WHERE id = $2`,
      [newStatus, memberId]
    );

    // Log audit trail
    if (reason) {
      await query(
        `INSERT INTO audit_logs (admin_id, action, entity_type, entity_id, details, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [
          admin.id,
          `member_${action}`,
          'member',
          memberId,
          reason,
        ]
      );
    }

    return NextResponse.json({
      success: true,
      message: `Member ${action}ed successfully`,
      data: { memberId, status: newStatus },
    });
  } catch (error) {
    console.error('Error updating member status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update member status' },
      { status: 500 }
    );
  }
}
