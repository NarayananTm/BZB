import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/postgres';
import { requireSuperAdmin } from '@/lib/adminAuth';
import { deleteMember, updateMember } from '@/services/memberService';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const memberId = params.id;

    // Fetch complete member registration details
    const rows = await query<{
      id: string;
      name: string;
      email: string;
      mobile: string;
      pan: string;
      aadhar: string;
      amount: number;
      utr_number: string;
      transaction_proof_name: string;
      transaction_proof_type: string;
      sponsor_id: string | null;
      sponsor_name: string | null;
      sponsor_mobile: string | null;
      level_name: string;
      status: string;
      created_at: string;
      joining_date: string;
      avatar: string | null;
    }>(
      `SELECT m.*, 
              COALESCE(s.name, m.sponsor_name) as sponsor_name,
              COALESCE(s.mobile, '') as sponsor_mobile
       FROM members m
       LEFT JOIN members s ON m.sponsor_id = s.id
       WHERE m.id = $1`,
      [memberId],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Member not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    console.error('[super-admin-member-details]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch member details' },
      { status: 500 },
    );
  }
}

const editableFields = ['name', 'email', 'mobile', 'level_name', 'sponsor_name', 'joining_date', 'pan', 'aadhar', 'status'] as const;

function authorizeSuperAdmin(request: NextRequest) {
  if (request.cookies.get('super_admin_auth')?.value === 'true') return null;
  return requireSuperAdmin(request).error;
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const error = authorizeSuperAdmin(request);
  if (error) return error;

  try {
    const body = await request.json() as Record<string, unknown>;
    const updates = Object.fromEntries(
      editableFields
        .filter((field) => body[field] !== undefined)
        .map((field) => [field, body[field]]),
    );

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ success: false, message: 'No editable member details supplied' }, { status: 400 });
    }
    if (updates.status && !['Active', 'Inactive', 'Pending', 'Approved', 'Rejected', 'Suspended'].includes(String(updates.status))) {
      return NextResponse.json({ success: false, message: 'Invalid member status' }, { status: 400 });
    }

    const member = await updateMember(params.id, updates);
    if (!member) return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: member });
  } catch (err) {
    console.error('[super-admin-member-update]', err);
    return NextResponse.json({ success: false, message: 'Failed to update member' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const error = authorizeSuperAdmin(request);
  if (error) return error;

  try {
    const deleted = await deleteMember(params.id);
    if (!deleted) return NextResponse.json({ success: false, message: 'Member not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Member deleted' });
  } catch (err) {
    console.error('[super-admin-member-delete]', err);
    return NextResponse.json({ success: false, message: 'Failed to delete member' }, { status: 500 });
  }
}
