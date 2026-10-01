import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { getAdminFromRequest } from '@/lib/adminAuth';
import { queryOne } from '@/lib/postgres';
import {
  createMbdWalletWithdrawal,
  getMbdWalletWithdrawalBalance,
  InsufficientMbdWalletError,
} from '@/services/withdrawalService';

async function getMemberId(request: NextRequest): Promise<string | null> {
  const admin = getAdminFromRequest(request);
  if (admin && ['admin', 'superadmin'].includes(admin.role)) {
    const member = await queryOne<{ id: string }>(
      `SELECT id
       FROM members
       WHERE ($1::text IS NOT NULL AND id = $1)
          OR ($2::text IS NOT NULL AND LOWER(email) = LOWER($2))
       ORDER BY CASE WHEN id = $1 THEN 0 ELSE 1 END
       LIMIT 1`,
      [String(admin.id), admin.email || null],
    );

    return member?.id ?? null;
  }

  const authorization = request.headers.get('authorization');
  const memberToken = request.cookies.get('bzb_token')?.value ??
    (authorization?.startsWith('Bearer ') ? authorization.slice(7) : null);

  if (memberToken) {
    try {
      const payload = verifyToken(memberToken) as { id?: string | number; email?: string };
      if (payload.id) {
        const member = await queryOne<{ id: string }>(
          `SELECT id
           FROM members
           WHERE ($1::text IS NOT NULL AND id = $1)
              OR ($2::text IS NOT NULL AND LOWER(email) = LOWER($2))
           ORDER BY CASE WHEN id = $1 THEN 0 ELSE 1 END
           LIMIT 1`,
          [String(payload.id), payload.email ?? null],
        );

        if (member) return member.id;
      }
    } catch {
      // Return unauthorized when neither session resolves to a member.
    }
  }
  return null;
}

export async function GET(request: NextRequest) {
  const memberId = await getMemberId(request);
  if (!memberId) return NextResponse.json({ success: false, message: 'Please sign in to continue' }, { status: 401 });

  try {
    const balance = await getMbdWalletWithdrawalBalance(memberId);
    if (!balance) return NextResponse.json({ success: false, message: 'Member account not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: balance });
  } catch (error) {
    console.error('[member.withdrawals.GET]', error);
    return NextResponse.json({ success: false, message: 'Unable to load MBD Wallet balance' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const memberId = await getMemberId(request);
  if (!memberId) return NextResponse.json({ success: false, message: 'Please sign in to continue' }, { status: 401 });

  try {
    const body = await request.json();
    const amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount < 200) {
      return NextResponse.json({ success: false, message: 'Minimum payout request is Rs. 200.' }, { status: 400 });
    }

    const withdrawal = await createMbdWalletWithdrawal(memberId, amount);
    return NextResponse.json({ success: true, data: withdrawal }, { status: 201 });
  } catch (error) {
    if (error instanceof InsufficientMbdWalletError) {
      return NextResponse.json({ success: false, message: error.message }, { status: 409 });
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
    }
    console.error('[member.withdrawals.POST]', error);
    return NextResponse.json({ success: false, message: 'Unable to create withdrawal request' }, { status: 500 });
  }
}