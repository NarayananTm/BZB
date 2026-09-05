import { query, queryOne } from '@/lib/postgres';

export interface MemberRequest {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  mobile: string;
  sponsor_id?: string;
  sponsor_name?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  district?: string;
  pincode?: string;
  state?: string;
  nominee_name?: string;
  nominee_relation?: string;
  bank_name?: string;
  bank_account_no?: string;
  bank_account_holder?: string;
  ifsc_code?: string;
  pan?: string;
  g_pay?: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Submitted';
  rejection_reason?: string;
  submitted_by_admin_id?: string;
  approved_by_admin_id?: string;
  approved_date?: string;
  submitted_date: string;
  created_at: string;
  updated_at: string;
}

/**
 * Create a new member request
 */
export async function createMemberRequest(data: Omit<MemberRequest, 'created_at' | 'updated_at' | 'id'> & { id: string }): Promise<MemberRequest> {
  const rows = await query<MemberRequest>(
    `INSERT INTO member_requests
       (id, user_id, name, email, mobile, sponsor_id, sponsor_name, date_of_birth,
        gender, address, district, pincode, state, nominee_name, nominee_relation,
        bank_name, bank_account_no, bank_account_holder, ifsc_code, pan, g_pay,
        status, submitted_date, submitted_by_admin_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
             $16, $17, $18, $19, $20, $21, $22, $23, $24)
     RETURNING *`,
    [
      data.id,
      data.user_id || null,
      data.name,
      data.email,
      data.mobile,
      data.sponsor_id || null,
      data.sponsor_name || null,
      data.date_of_birth || null,
      data.gender || null,
      data.address || null,
      data.district || null,
      data.pincode || null,
      data.state || null,
      data.nominee_name || null,
      data.nominee_relation || null,
      data.bank_name || null,
      data.bank_account_no || null,
      data.bank_account_holder || null,
      data.ifsc_code || null,
      data.pan || null,
      data.g_pay || null,
      data.status || 'Pending',
      data.submitted_date,
      data.submitted_by_admin_id || null,
    ],
  );
  return rows[0];
}

/**
 * Get all pending member requests
 */
export async function getPendingMemberRequests(): Promise<MemberRequest[]> {
  return query<MemberRequest>(
    `SELECT * FROM member_requests WHERE status = 'Pending' ORDER BY submitted_date DESC`,
  );
}

/**
 * Get member request by ID
 */
export async function getMemberRequestById(id: string): Promise<MemberRequest | null> {
  return queryOne<MemberRequest>(
    `SELECT * FROM member_requests WHERE id = $1`,
    [id],
  );
}

/**
 * Get member requests by email
 */
export async function getMemberRequestsByEmail(email: string): Promise<MemberRequest[]> {
  return query<MemberRequest>(
    `SELECT * FROM member_requests WHERE LOWER(email) = LOWER($1) ORDER BY submitted_date DESC`,
    [email],
  );
}

/**
 * Update member request status
 */
export async function updateMemberRequestStatus(
  id: string,
  status: MemberRequest['status'],
  adminId?: any,
  rejectionReason?: string,
): Promise<MemberRequest | null> {
  let query_str = `UPDATE member_requests SET status = $1, updated_at = NOW()`;
  const params: (string | null)[] = [status];
  let paramIndex = 2;

  if (adminId) {
    query_str += `, approved_by_admin_id = $${paramIndex}`;
    params.push(adminId);
    paramIndex++;
  }

  if (rejectionReason) {
    query_str += `, rejection_reason = $${paramIndex}`;
    params.push(rejectionReason);
    paramIndex++;
  }

  if (status === 'Approved') {
    query_str += `, approved_date = NOW()`;
  }

  query_str += ` WHERE id = $${paramIndex} RETURNING *`;
  params.push(id);

  return queryOne<MemberRequest>(query_str, params);
}

/**
 * Get all member requests with pagination
 */
export async function getAllMemberRequests(
  limit: number = 50,
  offset: number = 0,
  status?: string,
): Promise<{ data: MemberRequest[]; total: number }> {
  let where = '';
  const params: unknown[] = [];

  if (status) {
    where = 'WHERE status = $1';
    params.push(status);
  }

  const rows = await query<MemberRequest>(
    `SELECT * FROM member_requests ${where} ORDER BY submitted_date DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, limit, offset],
  );

  const countResult = await query<{ count: string }>(
    `SELECT COUNT(*) as count FROM member_requests ${where}`,
    params,
  );

  return {
    data: rows,
    total: parseInt(countResult[0]?.count || '0'),
  };
}

/**
 * Delete member request
 */
export async function deleteMemberRequest(id: string): Promise<boolean> {
  const rows = await query('DELETE FROM member_requests WHERE id = $1 RETURNING id', [id]);
  return rows.length > 0;
}
