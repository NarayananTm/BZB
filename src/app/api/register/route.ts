import { NextResponse } from 'next/server';
import { hashPassword, readUsers, registerUser } from '@/lib/postgres';
import { createMember, getMemberById, updateMember } from '@/services/memberService';
import { generateUserId } from '@/lib/idGenerator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, mobile, password, confirmPassword, sponsor_id, sponsor_name } = body;

    if (!fullName || !email || !mobile || !password || !confirmPassword) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Invalid email format' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ success: false, message: 'Password must be at least 8 characters' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ success: false, message: 'Passwords do not match' }, { status: 400 });
    }

    const users = await readUsers();

    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 409 });
    }

    if (users.some((user) => user.mobile === mobile)) {
      return NextResponse.json({ success: false, message: 'Mobile already exists' }, { status: 409 });
    }

    const memberId = generateUserId();
    await registerUser({
      id: memberId,
      fullName,
      email,
      mobile,
      password: hashPassword(password),
    });

    // Create member entry with today's joining date and sponsor info
    const joiningDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
    
    try {
      await createMember({
        id: memberId,
        name: fullName,
        email,
        mobile,
        sponsor_id: sponsor_id || null,
        sponsor_name: sponsor_name || null,
        level_name: 'Level 1',
        status: 'Pending',
        joining_date: joiningDate,
        total_earnings: 0,
        wallet_balance: 0,
        referral_count: 0,
        team_count: 0,
        avatar: null,
      });

      // Update sponsor's referral count and team count if sponsor exists
      if (sponsor_id) {
        try {
          const sponsor = await getMemberById(sponsor_id);
          if (sponsor) {
            await updateMember(sponsor_id, {
              referral_count: (sponsor.referral_count || 0) + 1,
              team_count: (sponsor.team_count || 0) + 1,
            });
          }
        } catch (sponsorError) {
          console.error('Sponsor update error (non-critical):', sponsorError);
          // Don't fail registration if sponsor update fails
        }
      }
    } catch (memberError) {
      console.error('Member creation error (non-critical):', memberError);
      // Don't fail registration if member creation fails
    }

    return NextResponse.json({ success: true, message: 'Registration Successful' });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ success: false, message: 'Registration failed' }, { status: 500 });
  }
}
