import { NextResponse } from 'next/server';
import { readUsers } from '@/lib/excel';

export async function GET() {
  try {
    const users = await readUsers();

    return NextResponse.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error('Member API error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load member data.',
      },
      {
        status: 500,
      }
    );
  }
}
