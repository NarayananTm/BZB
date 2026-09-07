import {
  NextRequest,
  NextResponse,
} from 'next/server';

import bcrypt from 'bcryptjs';

import { getPool } from '@/lib/postgres';

export async function POST(
  request: NextRequest
) {
  const client =
    await getPool().connect();

  try {
    /*
     * ========================================================
     * READ MULTIPART FORM
     * ========================================================
     */
    const formData =
      await request.formData();

    const name =
      String(
        formData.get('name') || ''
      ).trim();

    const pan =
      String(
        formData.get('pan') || ''
      )
        .trim()
        .toUpperCase();

    const aadhar =
      String(
        formData.get('aadhar') || ''
      ).replace(/\D/g, '');

    const mobile =
      String(
        formData.get('mobile') || ''
      ).replace(/\D/g, '');

    const password =
      String(
        formData.get('password') || ''
      );

    const confirmPassword =
      String(
        formData.get(
          'confirmPassword'
        ) || ''
      );

    const amountValue =
      String(
        formData.get('amount') || ''
      );

    const utrNumber =
      String(
        formData.get(
          'utrNumber'
        ) || ''
      ).trim();

    /*
     * THIS IS THE REFERRING MEMBER
     */
    const sponsorId =
      String(
        formData.get(
          'sponsorId'
        ) || ''
      ).trim();

    const proof =
      formData.get('proof');

    /*
     * ========================================================
     * BASIC VALIDATION
     * ========================================================
     */

    if (
      !name ||
      !pan ||
      !aadhar ||
      !mobile ||
      !password ||
      !confirmPassword ||
      !amountValue ||
      !utrNumber ||
      !sponsorId
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Required fields are missing',
        },
        { status: 400 }
      );
    }

    /*
     * ========================================================
     * PASSWORD
     * ========================================================
     */

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Password must be at least 8 characters',
        },
        { status: 400 }
      );
    }

    if (
      password !==
      confirmPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Passwords do not match',
        },
        { status: 400 }
      );
    }

    /*
     * ========================================================
     * PAN
     * ========================================================
     */

    if (
      !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
        pan
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Invalid PAN number',
        },
        { status: 400 }
      );
    }

    /*
     * ========================================================
     * AADHAAR
     * ========================================================
     */

    if (!/^\d{12}$/.test(aadhar)) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Aadhar number must contain 12 digits',
        },
        { status: 400 }
      );
    }

    /*
     * ========================================================
     * MOBILE
     * ========================================================
     */

    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Invalid mobile number',
        },
        { status: 400 }
      );
    }

    /*
     * ========================================================
     * AMOUNT
     * ========================================================
     */

    const amount =
      Number(amountValue);

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Invalid amount',
        },
        { status: 400 }
      );
    }

    /*
     * ========================================================
     * TRANSACTION PROOF
     * ========================================================
     */

    if (
      !proof ||
      !(proof instanceof File)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Transaction proof is required',
        },
        { status: 400 }
      );
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
    ];

    if (
      !allowedTypes.includes(
        proof.type
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Invalid transaction proof format',
        },
        { status: 400 }
      );
    }

    if (
      proof.size >
      5 * 1024 * 1024
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Transaction proof must be less than 5 MB',
        },
        { status: 400 }
      );
    }

    /*
     * ========================================================
     * DATABASE TRANSACTION
     * ========================================================
     */

    await client.query(
      'BEGIN'
    );

    /*
     * ========================================================
     * VERIFY SPONSOR
     * ========================================================
     */

    const sponsorResult =
      await client.query(
        `
        SELECT
          id,
          username,
          name
        FROM members
        WHERE id = $1
        LIMIT 1
        `,
        [sponsorId]
      );

    if (
      sponsorResult.rows.length ===
      0
    ) {
      await client.query(
        'ROLLBACK'
      );

      return NextResponse.json(
        {
          success: false,
          message:
            'Invalid sponsor/referral ID',
        },
        { status: 400 }
      );
    }

    /*
     * ========================================================
     * CHECK DUPLICATE PAN
     * ========================================================
     */

    const panResult =
      await client.query(
        `
        SELECT id
        FROM members
        WHERE pan = $1
        LIMIT 1
        `,
        [pan]
      );

    if (
      panResult.rows.length > 0
    ) {
      await client.query(
        'ROLLBACK'
      );

      return NextResponse.json(
        {
          success: false,
          message:
            'This PAN is already registered',
        },
        { status: 409 }
      );
    }

    /*
     * ========================================================
     * CHECK DUPLICATE AADHAAR
     * ========================================================
     */

    const aadharResult =
      await client.query(
        `
        SELECT id
        FROM members
        WHERE aadhar = $1
        LIMIT 1
        `,
        [aadhar]
      );

    if (
      aadharResult.rows.length > 0
    ) {
      await client.query(
        'ROLLBACK'
      );

      return NextResponse.json(
        {
          success: false,
          message:
            'This Aadhar number is already registered',
        },
        { status: 409 }
      );
    }

    /*
     * ========================================================
     * CHECK DUPLICATE MOBILE
     * ========================================================
     */

    const mobileResult =
      await client.query(
        `
        SELECT id
        FROM members
        WHERE mobile = $1
        LIMIT 1
        `,
        [mobile]
      );

    if (
      mobileResult.rows.length > 0
    ) {
      await client.query(
        'ROLLBACK'
      );

      return NextResponse.json(
        {
          success: false,
          message:
            'This mobile number is already registered',
        },
        { status: 409 }
      );
    }

    /*
     * ========================================================
     * HASH PASSWORD
     * ========================================================
     */

    const passwordHash =
      await bcrypt.hash(
        password,
        12
      );

    /*
     * ========================================================
     * STORE PROOF
     * ========================================================
     *
     * For now we store the file as BYTEA.
     *
     * If your existing system uses object storage,
     * replace this section with your upload service.
     */
    const proofBuffer =
      Buffer.from(
        await proof.arrayBuffer()
      );

    /*
     * ========================================================
     * CREATE MEMBER
     * ========================================================
     *
     * IMPORTANT:
     *
     * sponsor_id = sponsorId
     *
     * This is what creates the referral relationship.
     */
    const memberResult =
      await client.query(
        `
        INSERT INTO members
        (
          name,
          pan,
          aadhar,
          mobile,
          password,
          sponsor_id,
          amount,
          utr_number,
          transaction_proof,
          transaction_proof_name,
          transaction_proof_type,
          role,
          created_at
        )
        VALUES
        (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          $11,
          $12,
          NOW()
        )
        RETURNING
          id,
          name,
          mobile,
          sponsor_id,
          created_at
        `,
        [
          name,
          pan,
          aadhar,
          mobile,
          passwordHash,
          sponsorId,
          amount,
          utrNumber,
          proofBuffer,
          proof.name,
          proof.type,
          'member',
        ]
      );

    await client.query(
      'COMMIT'
    );

    return NextResponse.json(
      {
        success: true,
        message:
          'Member registered successfully',
        member:
          memberResult.rows[0],
        sponsor: {
          id: sponsorResult.rows[0].id,
          username:
            sponsorResult.rows[0]
              .username,
          name:
            sponsorResult.rows[0].name ||
            sponsorResult.rows[0]
              .username,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    await client.query(
      'ROLLBACK'
    );

    console.error(
      'Member registration error:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          'Member registration failed',
      },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}