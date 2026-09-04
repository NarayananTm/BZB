/**
 * Generate unique IDs for different entity types
 */

/** Generate Audit Log ID: AL-YYYYMMDD-XXX */
export function generateAuditId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(Math.random() * 900) + 100;
  return `AL-${date}-${rand}`;
}

/** Generate User ID: MBD-YYMMDD-XXX (e.g., MBD9601381) */
export function generateUserId(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // Last 2 digits (e.g., 26 for 2026)
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 01-12
  const day = String(now.getDate()).padStart(2, '0'); // 01-31
  const rand = Math.floor(Math.random() * 900) + 100; // 100-999
  return `MBD${year}${month}${day}${rand}`;
}

/**
 * Parse a User ID to extract components
 * @param memberId e.g., "MBD9601381"
 * @returns Object with prefix, year, month, day, random
 */
export function parseUserId(memberId: string): {
  prefix: string;
  year: string;
  month: string;
  day: string;
  random: string;
} | null {
  const match = memberId.match(/^(MBD)(\d{2})(\d{2})(\d{2})(\d{3})$/);
  if (!match) return null;
  return {
    prefix: match[1],
    year: match[2],
    month: match[3],
    day: match[4],
    random: match[5],
  };
}

/** Validate User ID format */
export function isValidUserId(memberId: string): boolean {
  return /^MBD\d{7}$/.test(memberId);
}
