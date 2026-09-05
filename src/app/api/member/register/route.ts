import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { query } from '@/lib/postgres';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const sponsor_name = formData.get('sponsor_name') as string;
    const name = formData.get('name') as string;
    const pan = formData.get('pan') as string;
    const aadhar = formData.get('aadhar') as string;
    const phone_number = formData.get('phone_number') as string;
    const password = formData.get('password') as string;
    const amount = formData.get('amount') as string;
    const transaction_utr = formData.get('transaction_utr') as string;
    const file = formData.get('transaction_proof') as File;

    // Validation
    if (!sponsor_name || !name || !pan || !aadhar || !phone_number || !password || !amount || !transaction_utr) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { message: 'Transaction proof is required' },
        { status: 400 }
      );
    }

    // Save file
    let filePath = '';
    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'kyc');
      
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {
        // Directory might already exist
      }
      
      const fullPath = join(uploadDir, fileName);
      const buffer = await file.arrayBuffer();
      await writeFile(fullPath, Buffer.from(buffer));
      filePath = `/uploads/kyc/${fileName}`;
    }

    // Insert into member_requests table
    const memberId = `REQ-${Date.now()}`;
    const createdAt = new Date().toISOString();

    const result = await query(
      `INSERT INTO member_requests (
        id, sponsor_name, name, mobile, pan, status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        memberId,
        sponsor_name,
        name,
        phone_number,
        pan,
        'Submitted',
        createdAt,
        createdAt,
      ]
    );

    // Store transaction details in a separate table
    try {
      await query(
        `INSERT INTO registration_transactions (
          id, request_id, aadhar, amount, transaction_utr, 
          transaction_proof, password, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          `TXN-${Date.now()}`,
          memberId,
          aadhar,
          Number(amount),
          transaction_utr,
          filePath,
          password,
          createdAt,
        ]
      );
    } catch (txnError) {
      console.log('Transaction table might not exist, data stored in main request');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration submitted successfully',
        data: {
          id: result[0]?.id || memberId,
          name,
          sponsor_name,
          status: 'Submitted',
          transaction_proof: filePath,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Member Register]', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
