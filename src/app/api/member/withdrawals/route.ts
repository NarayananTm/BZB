import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import {
  createMbdWalletWithdrawal,
  getMbdWalletWithdrawalBalance,
  InsufficientMbdWalletError,
} from '@/services/withdrawalService';

function getMemberId(request: NextRequest): string | null {
  const token = request.cookies.get('bzb_token')?.value;
  if (!token) return null;
  try {
    const payload = verifyToken(token) as { id?: string | number; role?: string };
    return payload.id ? String(payload.id) : null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const memberId = getMemberId(request);
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
  const memberId = getMemberId(request);
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