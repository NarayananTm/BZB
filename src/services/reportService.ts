import { query, queryOne, isDbConfigured } from '@/lib/postgres';
import { adminReports, type AdminReport } from '@/data/admin/reports';

export interface Report {
  id: string;
  title: string;
  category: 'Members' | 'Earnings' | 'Referral' | 'Compliance' | 'Activity';
  created_date: string;
  owner: string | null;
  status: 'Ready' | 'Generating' | 'Scheduled';
  created_at: string;
}

function adaptMockReport(r: AdminReport): Report {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    created_date: r.createdDate,
    owner: r.owner ?? null,
    status: r.status,
    created_at: r.createdDate,
  };
}

export async function getAllReports(): Promise<Report[]> {
  if (!isDbConfigured()) return adminReports.map(adaptMockReport);
  const rows = await query<Report>('SELECT * FROM reports ORDER BY created_date DESC');
  return rows.length ? rows : adminReports.map(adaptMockReport);
}

export async function getReportById(id: string): Promise<Report | null> {
  return queryOne<Report>('SELECT * FROM reports WHERE id = $1', [id]);
}

export async function createReport(data: Omit<Report, 'created_at'>): Promise<Report> {
  const rows = await query<Report>(
    `INSERT INTO reports (id, title, category, created_date, owner, status)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [data.id, data.title, data.category, data.created_date, data.owner, data.status],
  );
  return rows[0];
}

export async function updateReportStatus(id: string, status: Report['status']): Promise<Report | null> {
  return queryOne<Report>(
    `UPDATE reports SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id],
  );
}

export async function deleteReport(id: string): Promise<boolean> {
  const rows = await query('DELETE FROM reports WHERE id = $1 RETURNING id', [id]);
  return rows.length > 0;
}
