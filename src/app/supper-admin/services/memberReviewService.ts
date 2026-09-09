// Super Admin Services - Database & Business Logic Layer

import { query, queryOne } from '@/lib/postgres';
import { Member } from '@/services/memberService';

/**
 * Extended member type for registration details
 */
export interface MemberRegistration extends Omit<Member, 'sponsor_name'> {
  pan?: string;
  aadhar?: string;
  amount?: number;
  utr_number?: string;
  transaction_proof_name?: string;
  transaction_proof_type?: string;
  sponsor_name?: string | null;
  sponsor_mobile?: string | null;
}

/**
 * Get pending members for super admin review
 */
export async function getPendingMembersForReview(filters: {
  limit: number;
  offset: number;
  search?: string;
  level?: number;
  status?: string;
}): Promise<MemberRegistration[]> {
  let sql = 'SELECT * FROM members WHERE status = $1';
  const params: unknown[] = [filters.status || 'Pending'];

  if (filters.search) {
    sql += ` AND (LOWER(name) LIKE LOWER($${params.length + 1}) OR 
                  LOWER(email) LIKE LOWER($${params.length + 2}) OR 
                  LOWER(mobile) LIKE LOWER($${params.length + 3}) OR 
                  id LIKE $${params.length + 4})`;
    const searchTerm = `%${filters.search}%`;
    params.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }

  if (filters.level) {
    sql += ` AND level_name = 'Level ${filters.level}'`;
  }

  sql += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
  params.push(filters.limit, filters.offset);

  return query<MemberRegistration>(sql, params);
}

/**
 * Get count of pending members
 */
export async function countPendingMembers(filters: {
  search?: string;
  level?: number;
  status?: string;
}): Promise<number> {
  let sql = 'SELECT COUNT(*) as count FROM members WHERE status = $1';
  const params: unknown[] = [filters.status || 'Pending'];

  if (filters.search) {
    sql += ` AND (LOWER(name) LIKE LOWER($${params.length + 1}) OR 
                  LOWER(email) LIKE LOWER($${params.length + 2}) OR 
                  LOWER(mobile) LIKE LOWER($${params.length + 3}) OR 
                  id LIKE $${params.length + 4})`;
    const searchTerm = `%${filters.search}%`;
    params.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }

  if (filters.level) {
    sql += ` AND level_name = 'Level ${filters.level}'`;
  }

  const rows = await query<{ count: string }>(sql, params);
  return rows[0] ? parseInt(rows[0].count) : 0;
}

/**
 * Get dashboard statistics for pending members
 */
export async function getPendingMembersStats() {
  const rows = await query<{
    pending_review: string;
    todays_submissions: string;
    this_week: string;
    rejected_7days: string;
  }>(
    `SELECT
       COUNT(*) FILTER (WHERE status = 'Pending')                                      AS pending_review,
       COUNT(*) FILTER (WHERE status = 'Pending' AND DATE(created_at) = CURRENT_DATE)  AS todays_submissions,
       COUNT(*) FILTER (WHERE status = 'Pending' AND created_at >= NOW() - INTERVAL '7 days') AS this_week,
       COUNT(*) FILTER (WHERE status = 'Rejected' AND created_at >= NOW() - INTERVAL '7 days') AS rejected_7days
     FROM members`,
  );
  
  return rows[0]
    ? {
        pendingReview: parseInt(rows[0].pending_review) || 0,
        todaysSubmissions: parseInt(rows[0].todays_submissions) || 0,
        thisWeek: parseInt(rows[0].this_week) || 0,
        rejected7Days: parseInt(rows[0].rejected_7days) || 0,
      }
    : {
        pendingReview: 0,
        todaysSubmissions: 0,
        thisWeek: 0,
        rejected7Days: 0,
      };
}

/**
 * Get complete member details including registration info
 */
export async function getMemberRegistrationDetails(memberId: string): Promise<MemberRegistration | null> {
  const rows = await query<MemberRegistration>(
    `SELECT m.*, 
            COALESCE(s.name, m.sponsor_name) as sponsor_name,
            COALESCE(s.mobile, '') as sponsor_mobile
     FROM members m
     LEFT JOIN members s ON m.sponsor_id = s.id
     WHERE m.id = $1`,
    [memberId],
  );
  return rows[0] || null;
}

/**
 * Approve a member registration
 */
export async function approveMember(memberId: string): Promise<MemberRegistration | null> {
  return queryOne<MemberRegistration>(
    'UPDATE members SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
    ['Approved', memberId],
  );
}

/**
 * Reject a member registration
 */
export async function rejectMember(memberId: string): Promise<MemberRegistration | null> {
  return queryOne<MemberRegistration>(
    'UPDATE members SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
    ['Rejected', memberId],
  );
}

/**
 * Get member details for review
 */
export async function getMemberForReview(memberId: string): Promise<MemberRegistration | null> {
  return queryOne<MemberRegistration>(
    'SELECT * FROM members WHERE id = $1',
    [memberId],
  );
}
