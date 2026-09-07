import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { pool } from '@/lib/db';

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

    const result = await pool.query(
      `
      SELECT
        id,
        username,
        name
      FROM members
      WHERE id = $1
      LIMIT 1
      `,
      [id]
    );

    if (result.rows.length === 0) {
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

    const member =
      result.rows[0];

    return NextResponse.json({
      success: true,
      sponsor: {
        id: member.id,
        username:
          member.username,
        name:
          member.name ||
          member.username,
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