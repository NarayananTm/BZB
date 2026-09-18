import { query, queryOne, isDbConfigured } from '@/lib/postgres';
import { adminPayouts, type AdminPayout } from '@/data/admin/payouts';

export interface Payout {
  id: string;
  member_id: string | null;
  member_name: string | null;
  plan: string | null;
  amount: number;
  payout_date: string | null;
  status: 'Completed' | 'Scheduled' | 'Failed';
  created_at: string;
  updated_at: string;
}

function adaptMockPayout(p: AdminPayout): Payout {
  const parseRs = (s: string) => Number(s.replace(/[^0-9.]/g, '')) || 0;
  return {
    id: p.id,
    member_id: p.memberId ?? null,
    member_name: p.memberName ?? null,
    plan: p.plan ?? null,
    amount: parseRs(p.amount ?? '0'),
    payout_date: p.payoutDate ?? null,
    status: p.status,
    created_at: p.payoutDate ?? '',
    updated_at: p.payoutDate ?? '',
  };
}

export async function getAllPayouts(): Promise<Payout[]> {
  if (!isDbConfigured()) return adminPayouts.map(adaptMockPayout);
  const rows = await query<Payout>('SELECT * FROM payouts ORDER BY created_at DESC');
  return rows.length ? rows : adminPayouts.map(adaptMockPayout);
}

export async function getPayoutById(id: string): Promise<Payout | null> {
  return queryOne<Payout>('SELECT * FROM payouts WHERE id = $1', [id]);
}

export async function getPayoutsByMember(memberId: string): Promise<Payout[]> {
  if (!isDbConfigured()) return adminPayouts.filter((p) => p.memberId === memberId).map(adaptMockPayout);
  return query<Payout>('SELECT * FROM payouts WHERE member_id = $1 ORDER BY created_at DESC', [memberId]);
}

export async function createPayout(data: Omit<Payout, 'created_at' | 'updated_at'>): Promise<Payout> {
  const rows = await query<Payout>(
    `INSERT INTO payouts (id, member_id, member_name, plan, amount, payout_date, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [data.id, data.member_id, data.member_name, data.plan, data.amount, data.payout_date, data.status],
  );
  return rows[0];
}

export async function updatePayoutStatus(id: string, status: Payout['status']): Promise<Payout | null> {
  return queryOne<Payout>(
    `UPDATE payouts SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [status, id],
  );
}

export async function getPayoutSummary() {
  const rows = await query<{ total_amount: string; completed: string; scheduled: string; failed: string }>(
    `SELECT
       COALESCE(SUM(amount), 0)                                     AS total_amount,
       COALESCE(SUM(amount) FILTER (WHERE status='Completed'),  0)  AS completed,
       COALESCE(SUM(amount) FILTER (WHERE status='Scheduled'),  0)  AS scheduled,
       COALESCE(SUM(amount) FILTER (WHERE status='Failed'),     0)  AS failed
     FROM payouts`,
  );
  return rows[0];
}
