import { query, queryOne, isDbConfigured } from '@/lib/postgres';
import { adminTopups, type AdminTopup } from '@/data/admin/topups';

export interface Topup {
  id: string;
  member_id: string | null;
  member_name: string | null;
  amount: number;
  method: string | null;
  topup_date: string;
  status: 'Pending' | 'Completed' | 'Failed';
  created_at: string;
  updated_at: string;
}

function adaptMockTopup(t: AdminTopup): Topup {
  const parseRs = (s: string) => Number(s.replace(/[^0-9.]/g, '')) || 0;
  return {
    id: t.id,
    member_id: t.memberId ?? null,
    member_name: t.memberName ?? null,
    amount: parseRs(t.amount ?? '0'),
    method: t.method ?? null,
    topup_date: t.date,
    status: t.status,
    created_at: t.date,
    updated_at: t.date,
  };
}

export async function getAllTopups(): Promise<Topup[]> {
  if (!isDbConfigured()) return adminTopups.map(adaptMockTopup);
  const rows = await query<Topup>('SELECT * FROM topups ORDER BY topup_date DESC');
  return rows.length ? rows : adminTopups.map(adaptMockTopup);
}

export async function getTopupById(id: string): Promise<Topup | null> {
  return queryOne<Topup>('SELECT * FROM topups WHERE id = $1', [id]);
}

export async function getTopupsByMember(memberId: string): Promise<Topup[]> {
  if (!isDbConfigured()) return adminTopups.filter((t) => t.memberId === memberId).map(adaptMockTopup);
  return query<Topup>('SELECT * FROM topups WHERE member_id = $1 ORDER BY topup_date DESC', [memberId]);
}

export async function createTopup(data: Omit<Topup, 'created_at' | 'updated_at'>): Promise<Topup> {
  const rows = await query<Topup>(
    `INSERT INTO topups (id, member_id, member_name, amount, method, topup_date, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [data.id, data.member_id, data.member_name, data.amount, data.method, data.topup_date, data.status],
  );
  return rows[0];
}

export async function updateTopupStatus(id: string, status: Topup['status']): Promise<Topup | null> {
  return queryOne<Topup>(
    `UPDATE topups SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [status, id],
  );
}

export async function getTopupSummary() {
  const rows = await query<{ total_amount: string; completed: string; pending: string }>(
    `SELECT
       COALESCE(SUM(amount), 0)                                    AS total_amount,
       COALESCE(SUM(amount) FILTER (WHERE status='Completed'), 0)  AS completed,
       COALESCE(SUM(amount) FILTER (WHERE status='Pending'),   0)  AS pending
     FROM topups`,
  );
  return rows[0];
}
