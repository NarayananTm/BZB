import { NextRequest, NextResponse } from 'next/server';
import { requireSuperAdmin } from '@/lib/adminAuth';
import { query } from '@/lib/postgres';
import { createXlsxWorkbook } from '@/lib/xlsxWorkbook';

export const runtime = 'nodejs';

const columns = [
  { key: 'Member ID', header: 'Member ID' },
  { key: 'Member Name', header: 'Member Name' },
  { key: 'Sponsor ID', header: 'Sponsor ID' },
  { key: 'Sponsor Name', header: 'Sponsor Name' },
  { key: 'Level', header: 'Level' },
  { key: 'Member Status', header: 'Member Status' },
  { key: 'Joining Date', header: 'Joining Date' },
  { key: 'Mobile Number', header: 'Mobile Number' },
  { key: 'Email', header: 'Email' },
  { key: 'Total Earnings', header: 'Total Earnings' },
  { key: 'Level Income Wallet', header: 'Level Income Wallet' },
  { key: 'MBD Wallet', header: 'MBD Wallet' },
  { key: 'Wallet Balance', header: 'Wallet Balance' },
  { key: 'Booster Top-up', header: 'Booster Top-up' },
  { key: 'Previous Total Withdrawals', header: 'Previous Total Withdrawals (Approved)' },
  { key: 'Pending Withdrawal Total', header: 'Pending Withdrawal Total' },
  { key: 'Pending Withdrawal Requests', header: 'Pending Withdrawal Requests' },
  { key: 'Account Holder', header: 'Bank Account Holder' },
  { key: 'Bank Name', header: 'Bank Name' },
  { key: 'Account Number', header: 'Bank Account Number' },
  { key: 'IFSC Code', header: 'IFSC Code' },
  { key: 'Branch', header: 'Bank Branch' },
  { key: 'Account Type', header: 'Bank Account Type' },
  { key: 'UPI ID', header: 'UPI ID' },
  { key: 'Bank Verified', header: 'Bank Account Verified' },
];

export async function GET(request: NextRequest) {
  const { error } = requireSuperAdmin(request);
  if (error) return error;

  try {
    const rows = await query<Record<string, unknown>>(
      `SELECT
         m.id AS "Member ID",
         m.name AS "Member Name",
         COALESCE(m.sponsor_id, '') AS "Sponsor ID",
         COALESCE(sponsor.name, m.sponsor_name, '') AS "Sponsor Name",
         COALESCE(m.level_name, '') AS "Level",
         COALESCE(m.status, '') AS "Member Status",
         TO_CHAR(m.joining_date, 'YYYY-MM-DD') AS "Joining Date",
         COALESCE(m.mobile, '') AS "Mobile Number",
         COALESCE(m.email, '') AS "Email",
         COALESCE(m.total_earnings, 0)::double precision AS "Total Earnings",
         COALESCE(m.level_income_wallet, 0)::double precision AS "Level Income Wallet",
         COALESCE(m.mbd_wallet, 0)::double precision AS "MBD Wallet",
         COALESCE(m.wallet_balance, 0)::double precision AS "Wallet Balance",
         COALESCE(m.booster_topup, 0)::double precision AS "Booster Top-up",
         COALESCE(withdrawals.approved_total, 0)::double precision AS "Previous Total Withdrawals",
         COALESCE(withdrawals.pending_total, 0)::double precision AS "Pending Withdrawal Total",
         COALESCE(withdrawals.pending_count, 0)::integer AS "Pending Withdrawal Requests",
         COALESCE(bank.account_holder, '') AS "Account Holder",
         COALESCE(bank.bank_name, '') AS "Bank Name",
         COALESCE(bank.account_number, '') AS "Account Number",
         COALESCE(bank.ifsc_code, '') AS "IFSC Code",
         COALESCE(bank.branch, '') AS "Branch",
         COALESCE(bank.account_type, '') AS "Account Type",
         COALESCE(bank.upi_id, '') AS "UPI ID",
         COALESCE(bank.is_verified, FALSE) AS "Bank Verified"
       FROM members m
       LEFT JOIN members sponsor ON sponsor.id = m.sponsor_id
       LEFT JOIN LATERAL (
         SELECT
           SUM(amount) FILTER (WHERE status = 'Approved') AS approved_total,
           SUM(amount) FILTER (WHERE status = 'Pending') AS pending_total,
           COUNT(*) FILTER (WHERE status = 'Pending') AS pending_count
         FROM withdrawals
         WHERE member_id = m.id
       ) withdrawals ON TRUE
       LEFT JOIN LATERAL (
         SELECT account_holder, bank_name, account_number, ifsc_code, branch, account_type, upi_id, is_verified
         FROM bank_accounts
         WHERE member_id = m.id
         ORDER BY is_primary DESC, updated_at DESC, id
         LIMIT 1
       ) bank ON TRUE
       ORDER BY m.id`,
    );

    const workbook = createXlsxWorkbook('Member Financial Details', columns, rows);
    const date = new Date().toISOString().slice(0, 10);
    return new NextResponse(workbook, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="mbd-member-financial-details-${date}.xlsx"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('[super-admin.dashboard.member-export.GET]', error);
    return NextResponse.json({ success: false, message: 'Unable to export member financial details' }, { status: 500 });
  }
}