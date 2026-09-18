import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { getMemberById } from '@/services/memberService';

export async function GET(
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Referral ID is required',
        },
        {
          status: 400,
        }
      );
    }

    const member = await getMemberById(id);

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Sponsor not found',
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      sponsor: {
        id: member.id,
        username: member.id,
        name: member.name,
        email: member.email,
        mobile: member.mobile,
      },
    });
  } catch (error) {
    console.error(
      'Referral lookup error:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          'Unable to load sponsor',
      },
      {
        status: 500,
      }
    );
  }
}