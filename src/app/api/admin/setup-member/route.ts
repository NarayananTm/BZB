import { NextResponse } from 'next/server';
import { createMember, getMemberById } from '@/services/memberService';

export async function POST(request: Request) {
  try {
    // Check if member already exists
    const existing = await getMemberById('MBD9601381');
    if (existing) {
      return NextResponse.json({ 
        success: true, 
        message: 'Member already exists', 
        data: existing 
      });
    }

    // Create new member with specific ID
    const member = await createMember({
      id: 'MBD9601381',
      name: 'Admin21',
      email: 'admin@bzb.com',
      mobile: '9601381',
      sponsor_id: null,
      sponsor_name: null,
      level_name: 'Level 1',
      status: 'Active',
      joining_date: new Date().toISOString().slice(0, 10),
      total_earnings: 0,
      wallet_balance: 0,
      referral_count: 0,
      team_count: 0,
      avatar: null,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Member created successfully', 
      data: member 
    }, { status: 201 });
  } catch (error) {
    console.error('Setup member error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to setup member' 
    }, { status: 500 });
  }
}
