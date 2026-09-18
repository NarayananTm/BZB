import { NextResponse } from 'next/server';
import { getMemberById } from '@/services/memberService';

export async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
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

    return NextResponse.json({
      success: true,
      data: {
        id: member.id,
        name: member.name,
        email: member.email,
        mobile: member.mobile,
      },
    });
  } catch (error) {
    console.error('[getMember]', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch member' },
      { status: 500 }
    );
  }
}
