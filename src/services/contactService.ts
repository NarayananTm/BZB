import { query, queryOne } from '@/lib/postgres';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
}

/**
 * Get all contacts with optional limit
 */
export async function getAllContacts(limit: number = 100): Promise<Contact[]> {
  return query<Contact>(
    `SELECT id, name, email, phone, subject, message, created_at
     FROM contacts
     ORDER BY created_at DESC
     LIMIT $1`,
    [limit]
  );
}

/**
 * Get a single contact by ID
 */
export async function getContactById(id: number): Promise<Contact | null> {
  return queryOne<Contact>(
    `SELECT id, name, email, phone, subject, message, created_at
     FROM contacts
     WHERE id = $1`,
    [id]
  );
}

/**
 * Get contacts by email
 */
export async function getContactsByEmail(email: string): Promise<Contact[]> {
  return query<Contact>(
    `SELECT id, name, email, phone, subject, message, created_at
     FROM contacts
     WHERE LOWER(email) = LOWER($1)
     ORDER BY created_at DESC`,
    [email]
  );
}

/**
 * Create a new contact
 */
export async function createContact(data: Omit<Contact, 'id' | 'created_at'>): Promise<Contact> {
  const rows = await query<Contact>(
    `INSERT INTO contacts (name, email, phone, subject, message)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, phone, subject, message, created_at`,
    [data.name, data.email, data.phone, data.subject, data.message]
  );
  return rows[0];
}

/**
 * Get contact statistics
 */
export async function getContactStats() {
  const rows = await query<{
    total: string;
    unique_emails: string;
    latest_submission: string;
  }>(
    `SELECT
       COUNT(*) AS total,
       COUNT(DISTINCT email) AS unique_emails,
       MAX(created_at) AS latest_submission
     FROM contacts`
  );
  return rows[0];
}

/**
 * Get contacts by date range
 */
export async function getContactsByDateRange(
  startDate: Date,
  endDate: Date,
  limit: number = 100
): Promise<Contact[]> {
  return query<Contact>(
    `SELECT id, name, email, phone, subject, message, created_at
     FROM contacts
     WHERE created_at BETWEEN $1 AND $2
     ORDER BY created_at DESC
     LIMIT $3`,
    [startDate, endDate, limit]
  );
}

/**
 * Search contacts by keyword
 */
export async function searchContacts(keyword: string, limit: number = 100): Promise<Contact[]> {
  const searchTerm = `%${keyword}%`;
  return query<Contact>(
    `SELECT id, name, email, phone, subject, message, created_at
     FROM contacts
     WHERE LOWER(name) LIKE LOWER($1)
        OR LOWER(email) LIKE LOWER($1)
        OR LOWER(subject) LIKE LOWER($1)
        OR LOWER(message) LIKE LOWER($1)
     ORDER BY created_at DESC
     LIMIT $2`,
    [searchTerm, limit]
  );
}

/**
 * Delete a contact
 */
export async function deleteContact(id: number): Promise<boolean> {
  const rows = await query('DELETE FROM contacts WHERE id = $1 RETURNING id', [id]);
  return rows.length > 0;
}
