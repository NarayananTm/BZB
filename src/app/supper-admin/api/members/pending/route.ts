import { NextRequest, NextResponse } from 'next/server';
import { getPendingMembers, getPendingMembersCount } from '@/services/memberService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const level = searchParams.get('level') || '';
    const status = searchParams.get('status') || 'Pending';

    const offset = (page - 1) * limit;

    const members = await getPendingMembers({
      limit,
      offset,
      search,
      level: level ? parseInt(level) : undefined,
      status,
    });

    const totalCount = await getPendingMembersCount({
      search,
      level: level ? parseInt(level) : undefined,
      status,
    });

    return NextResponse.json({
      success: true,
      data: members,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (err) {
    console.error('[super-admin-pending-members]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch pending members' }, { status: 500 });
  }
}
