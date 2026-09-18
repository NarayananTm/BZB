import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createMember } from '@/services/memberService';

export async function POST(request: NextRequest) {
  const check = requireAdmin(request);
  const { error } = check;
  if (error) return error;

  try {
    const body = await request.json();
    const { memberId, name, email, mobile } = body;

    if (!memberId || !name || !email || !mobile) {
      return NextResponse.json(
        { success: false, message: 'memberId, name, email, and mobile are required' },
        { status: 400 }
      );
    }

    const joiningDate = new Date().toISOString().slice(0, 10);
    
    const member = await createMember({
      id: memberId,
      name,
      email,
      mobile,
      sponsor_id: null,
      sponsor_name: null,
      level_name: 'Level 1',
      status: 'Active',
      joining_date: joiningDate,
      total_earnings: 0,
      wallet_balance: 0,
      referral_count: 0,
      team_count: 0,
      avatar: null,
    });

    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (err) {
    console.error('[createMember]', err);
    return NextResponse.json({ success: false, message: 'Failed to create member' }, { status: 500 });
  }
}
