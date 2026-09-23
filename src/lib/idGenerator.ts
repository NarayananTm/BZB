import { getPool } from '@/lib/postgres';
import type { PoolClient } from 'pg';

/**
 * Generate unique IDs for different entity types
 */

/** Generate Audit Log ID: AL-YYYYMMDD-XXX */
export function generateAuditId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(Math.random() * 900) + 100;
  return `AL-${date}-${rand}`;
}

/** Generate an application identifier for non-member records. */
export function generateUserId(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // Last 2 digits (e.g., 26 for 2026)
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 01-12
  const day = String(now.getDate()).padStart(2, '0'); // 01-31
  const rand = Math.floor(Math.random() * 900) + 100; // 100-999
  return `MBD${year}${month}${day}${rand}`;
}

/** Generate the next sequential member ID, for example MBD000001. */
export async function generateMemberId(client?: PoolClient): Promise<string> {
  const result = await (client ?? getPool()).query<{ sequence: string }>(
    "SELECT nextval('member_id_sequence') AS sequence",
  );
  const sequence = result.rows[0]?.sequence;
  if (!sequence) throw new Error('Unable to generate member ID');
  return `MBD${String(sequence).padStart(6, '0')}`;
}

/**
 * Parse a User ID to extract components
 * @param memberId e.g., "MBD000001"
 * @returns The sequential member number
 */
export function parseUserId(memberId: string): {
  prefix: string;
  sequence: string;
} | null {
  const match = memberId.match(/^(MBD)(\d{6})$/);
  if (!match) return null;
  return {
    prefix: match[1],
    sequence: match[2],
  };
}

/** Validate User ID format */
export function isValidUserId(memberId: string): boolean {
  return /^MBD\d{6}$/.test(memberId);
}

/** Generate Referral ID: REF-YYYYMMDD-XXX */
export function generateReferralId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(Math.random() * 900) + 100;
  return `REF-${date}-${rand}`;
}

/** Generate Member Request ID: REQ-YYYYMMDD-XXX */
export function generateRequestId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(Math.random() * 900) + 100;
  return `REQ-${date}-${rand}`;
}

/** Generate temporary password: PWD-XXXXXXXXXX */
export function generatePassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = 'PWD-';
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}
