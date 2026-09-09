import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/postgres';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const memberId = params.id;

    // Fetch complete member registration details
    const rows = await query<{
      id: string;
      name: string;
      email: string;
      mobile: string;
      pan: string;
      aadhar: string;
      amount: number;
      utr_number: string;
      transaction_proof_name: string;
      transaction_proof_type: string;
      sponsor_id: string | null;
      sponsor_name: string | null;
      sponsor_mobile: string | null;
      level_name: string;
      status: string;
      created_at: string;
      joining_date: string;
      avatar: string | null;
    }>(
      `SELECT m.*, 
              COALESCE(s.name, m.sponsor_name) as sponsor_name,
              COALESCE(s.mobile, '') as sponsor_mobile
       FROM members m
       LEFT JOIN members s ON m.sponsor_id = s.id
       WHERE m.id = $1`,
      [memberId],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Member not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    console.error('[super-admin-member-details]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch member details' },
      { status: 500 },
    );
  }
}
