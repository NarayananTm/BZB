import { NextRequest, NextResponse } from 'next/server';
import { createMemberRequest, getMemberRequestsByEmail } from '@/services/memberRequestService';
import { idGenerator } from '@/lib/idGenerator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      mobile,
      sponsor_id,
      sponsor_name,
      date_of_birth,
      gender,
      address,
      district,
      pincode,
      state,
      nominee_name,
      nominee_relation,
      bank_name,
      bank_account_no,
      bank_account_holder,
      ifsc_code,
      pan,
      g_pay,
    } = body;

    // Validate required fields
    if (!name || !email || !mobile) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and mobile are required' },
        { status: 400 },
      );
    }

    // Check if email already exists in requests or members
    const existingRequests = await getMemberRequestsByEmail(email);
    if (existingRequests.length > 0) {
      const pending = existingRequests.find((r) => r.status === 'Pending');
      if (pending) {
        return NextResponse.json(
          { success: false, message: 'A request with this email is already pending approval' },
          { status: 400 },
        );
      }
    }

    // Generate request ID
    const requestId = idGenerator.generate('REQ');

    // Create member request
    const memberRequest = await createMemberRequest({
      id: requestId,
      name,
      email,
      mobile,
      sponsor_id,
      sponsor_name,
      date_of_birth,
      gender,
      address,
      district,
      pincode,
      state,
      nominee_name,
      nominee_relation,
      bank_name,
      bank_account_no,
      bank_account_holder,
      ifsc_code,
      pan,
      g_pay,
      status: 'Submitted',
      submitted_date: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Member request submitted successfully',
        data: memberRequest,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error submitting member request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit member request' },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');

    if (email) {
      const requests = await getMemberRequestsByEmail(email);
      return NextResponse.json(
        {
          success: true,
          data: requests,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { success: false, message: 'Email parameter is required' },
      { status: 400 },
    );
  } catch (error) {
    console.error('Error fetching member requests:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch member requests' },
      { status: 500 },
    );
  }
}
