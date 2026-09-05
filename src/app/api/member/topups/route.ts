import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { createTopup } from '@/services/topupService';
import { getMemberProfile } from '@/lib/postgres';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('bzb_admin_token')?.value;
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized: No token provided' },
        { status: 401 }
      );
    }

    const admin = verifyToken(token);
    if (!admin) {
      return NextResponse.json(
        { message: 'Unauthorized: Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { amount, method = 'Wallet' } = body;

    if (!amount || Number(amount) < 1) {
      return NextResponse.json(
        { message: 'Invalid amount provided' },
        { status: 400 }
      );
    }

    // Get member profile
    const member = await getMemberProfile(String(admin.id));
    if (!member) {
      return NextResponse.json(
        { message: 'Member profile not found' },
        { status: 404 }
      );
    }

    // Create topup request with auto-generated fields
    const topupId = `TOP-${Date.now()}`;
    const topupDate = new Date().toISOString().split('T')[0];

    const topup = await createTopup({
      id: topupId,
      member_id: member.id,
      member_name: member.name,
      amount: Number(amount),
      method: method,
      topup_date: topupDate,
      status: 'Pending',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Top-up request submitted successfully',
        data: topup,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Member Topup Request]', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
