import { NextRequest, NextResponse } from 'next/server';
import { getMemberById } from '@/services/memberService';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Member ID is required' },
        { status: 400 }
      );
    }

    const member = await getMemberById(id);

    if (!member) {
      return NextResponse.json(
        { success: false, message: 'Member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        sponsor: {
          id: member.id,
          username: member.id,
          name: member.name,
          email: member.email,
          mobile: member.mobile,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[GET /api/admin/referral/[id]]', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch member details' },
      { status: 500 }
    );
  }
}
