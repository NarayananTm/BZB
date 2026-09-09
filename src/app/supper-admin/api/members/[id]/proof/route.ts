import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/postgres';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const memberId = params.id;

    if (!memberId) {
      return NextResponse.json({ success: false, message: 'Member ID is required' }, { status: 400 });
    }

    // Fetch transaction proof from database
    const result = await query<{
      transaction_proof: Buffer;
      transaction_proof_name: string;
      transaction_proof_type: string;
    }>(
      'SELECT transaction_proof, transaction_proof_name, transaction_proof_type FROM members WHERE id = $1',
      [memberId]
    );

    if (!result || result.length === 0 || !result[0].transaction_proof) {
      return NextResponse.json({ success: false, message: 'Transaction proof not found' }, { status: 404 });
    }

    const { transaction_proof, transaction_proof_name, transaction_proof_type } = result[0];
    const imageBytes = Uint8Array.from(transaction_proof);

    // Return the image with appropriate headers
    return new NextResponse(imageBytes, {
      status: 200,
      headers: {
        'Content-Type': transaction_proof_type || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${transaction_proof_name}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    console.error('[member-proof-image]', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch transaction proof' }, { status: 500 });
  }
}
