import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/postgres";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;

    // Validation
    if (!fullName || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number (must be 10 digits)' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Insert into database
    const pool = getPool();
    const result = await pool.query(
      `INSERT INTO contacts (name, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, phone, subject, message, created_at`,
      [fullName, email, phone, subject, message]
    );

    const contact = result.rows[0];

    return NextResponse.json({
      success: true,
      message: "Message saved successfully.",
      data: contact,
    }, { status: 201 });
  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save message.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const pool = getPool();
    const result = await pool.query(
      `SELECT id, name, email, phone, subject, message, created_at
       FROM contacts
       ORDER BY created_at DESC
       LIMIT 100`
    );

    return NextResponse.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Fetch contacts error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}