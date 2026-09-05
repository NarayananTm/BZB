"use client";

import React, { useMemo, useState } from 'react';
import { Users, TrendingUp, FileText, Database, BarChart3, Wallet, Gift, ChevronRight } from 'lucide-react';
import type { Referral } from '@/services/referralService';
import type { Earning } from '@/services/earningService';
import type { Topup } from '@/services/topupService';
import type { Withdrawal } from '@/services/withdrawalService';
import type { Payout } from '@/services/payoutService';

interface Props {
  referrals: Referral[];
  earnings?: Earning[];
  topups?: Topup[];
  withdrawals?: Withdrawal[];
  payouts?: Payout[];
}

export default function ProfileInteractive({ referrals, earnings = [], topups = [], withdrawals = [], payouts = [] }: Props) {
  const [active, setActive] = useState<string>('direct');

  const menu = [
    { key: 'direct', label: 'My Direct Members', icon: Users },
    { key: 'topups', label: 'My Downline Top ups', icon: TrendingUp },
    { key: 'reports', label: 'Top-ups Reports', icon: FileText },
    { key: 'earnings', label: 'My Earnings', icon: Database },
    { key: 'level', label: 'My Level Income', icon: BarChart3 },
    { key: 'withdrawal', label: 'My Withdrawal', icon: Wallet },
    { key: 'payout', label: 'My Payout', icon: Gift },
  ];

  const tableConfig = useMemo(() => {
    switch (active) {
      case 'topups':
        return {
          title: 'My Downline Top-ups',
          subtitle: '',
          columns: ['No', 'Date', 'Member ID', 'Name', 'Status', 'Amount Rs.'],
          rows: topups.map((t, idx) => [
            String(idx + 1).padStart(2, '0'),
            t.topup_date ?? '-',
            t.member_id ?? '-',
            t.member_name ?? '-',
            t.status,
            `Rs.${Number(t.amount).toLocaleString('en-IN')}`,
          ]),
        };
      case 'reports':
        return {
          title: 'My Top-up Report',
          subtitle: '',
          columns: ['No', 'Date', 'Status', 'Amount Rs.'],
          rows: topups.map((t, idx) => [
            String(idx + 1).padStart(2, '0'),
            t.topup_date ?? '-',
            t.status,
            `Rs.${Number(t.amount).toLocaleString('en-IN')}`,
          ]),
        };
      case 'earnings':
        return {
          title: 'My Earnings',
          subtitle: '',
          columns: ['No', 'Date', 'Type', 'Earnings Rs.'],
          rows: earnings.map((e, idx) => [
            String(idx + 1).padStart(2, '0'),
            e.earn_date ?? '-',
            e.source ?? '-',
            `Rs.${Number(e.amount).toLocaleString('en-IN')}`,
          ]),
        };
      case 'level':
        return {
          title: 'My Level Income',
          subtitle: '',
          columns: ['No', 'Date', 'Member ID', 'Amount', 'Level', 'Status'],
          rows: earnings.map((e, idx) => [
            String(idx + 1).padStart(2, '0'),
            e.earn_date ?? '-',
            e.member_id ?? '-',
            `Rs.${Number(e.amount).toLocaleString('en-IN')}`,
            e.level_name ?? '-',
            e.status,
          ]),
        };
      case 'withdrawal':
        return {
          title: 'My Withdrawal Reqs',
          subtitle: '',
          columns: ['No', 'Date', 'Amount', 'Net Pay', 'Withdraw Type', 'Status'],
          rows: withdrawals.map((w, idx) => [
            String(idx + 1).padStart(2, '0'),
            w.requested_date ?? '-',
            `Rs.${Number(w.amount).toLocaleString('en-IN')}`,
            `Rs.${Number(w.amount).toLocaleString('en-IN')}`,
            w.payout_method ?? '-',
            w.status,
          ]),
        };
      case 'payout':
        return {
          title: 'My Payout',
          subtitle: '',
          columns: ['No', 'Date', 'Plan', 'Amount'],
          rows: payouts.map((p, idx) => [
            String(idx + 1).padStart(2, '0'),
            p.payout_date ?? '-',
            p.plan ?? '-',
            `Rs.${Number(p.amount).toLocaleString('en-IN')}`,
          ]),
        };
      default:
        return {
          title: 'My Direct Referrals - Member Details',
          subtitle: 'Member Details on my Genealogy',
          columns: ['No', 'Member ID', 'Name', 'Joining Date', 'Sponsor ID', 'Level'],
          rows: referrals.map((r, idx) => [
            String(idx + 1).padStart(2, '0'),
            r.id.replace('REF-', ''),
            r.member_name ?? '-',
            r.join_date ?? '-',
            r.sponsor_name ?? '-',
            r.level_name ?? '-',
          ]),
        };
    }
  }, [active, referrals, earnings, topups, withdrawals, payouts]);

  return (
    <div className="w-full bg-white">
      {/* Mobile & Tablet Vertical Menu Layout */}
      <div className="lg:hidden">
        {/* Menu Header */}
        <div className="border-b border-[#F0F0F0] px-3 sm:px-4 py-3 sm:py-4">
          <h3 className="text-sm sm:text-base font-medium text-slate-900">My Team</h3>
        </div>

        {/* Menu Items - Vertical List */}
        <div className="divide-y divide-[#F0F0F0]">
          {menu.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.key}
                onClick={() => setActive(m.key)}
                className={`w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4 transition-colors text-left ${
                  active === m.key
                    ? 'bg-yellow-50 border-l-4 border-l-[#E5C500]'
                    : 'bg-white border-l-4 border-l-transparent hover:bg-slate-50'
                }`}
                aria-current={active === m.key ? 'page' : undefined}
              >
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 ${
                  active === m.key ? 'text-[#E5C500]' : 'text-slate-400'
                }`} />
                <span className={`flex-1 text-sm sm:text-base ${
                  active === m.key ? 'font-semibold text-slate-900' : 'text-slate-600'
                }`}>
                  {m.label}
                </span>
                <ChevronRight className={`h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 ${
                  active === m.key ? 'text-[#E5C500]' : 'text-slate-300'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Table Section */}
        <div className="px-3 sm:px-4 py-4 sm:py-6 border-t border-[#F0F0F0]">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900">{tableConfig.title}</h2>
          {tableConfig.subtitle && <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500">{tableConfig.subtitle}</p>}

          <div className="mt-4 sm:mt-6 overflow-x-auto max-h-[50vh] rounded-lg border border-[#F0F0F0]">
            <table className="w-full table-auto text-xs sm:text-sm text-slate-700">
              <thead>
                <tr className="text-left bg-slate-50 sticky top-0">
                  {tableConfig.columns.map((col, idx) => (
                    <th
                      key={col}
                      className={`px-2 sm:px-3 py-2 sm:py-3 border-b border-[#EFEFEF] text-xs sm:text-xs font-medium text-slate-500 whitespace-nowrap ${
                        idx > 1 && idx <= 3 && 'hidden sm:table-cell' ||
                        idx > 3 && 'hidden md:table-cell'
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableConfig.rows.length > 0 ? (
                  tableConfig.rows.map((row, rIdx) => (
                    <tr key={rIdx} className={`${rIdx % 2 === 0 ? 'bg-white' : 'bg-[#FBFBFB]'} hover:bg-slate-50 transition-colors`}>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`px-2 sm:px-3 py-2 sm:py-3 border-b border-[#F6F6F6] text-xs sm:text-sm ${
                            cIdx > 1 && cIdx <= 3 && 'hidden sm:table-cell' ||
                            cIdx > 3 && 'hidden md:table-cell'
                          }`}
                        >
                          <div className="break-words">{cell}</div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={tableConfig.columns.length} className="px-3 sm:px-4 py-8 sm:py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-4xl text-slate-300">👥</div>
                        <p className="text-sm text-slate-500">No records found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-3 sm:px-4 py-4 sm:py-6 border-t border-[#F0F0F0]">
          <button className="w-full rounded-lg bg-[#E5C500] px-4 py-3 sm:py-4 text-base sm:text-base font-semibold text-slate-900 shadow-sm hover:bg-[#D4B300] transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Desktop Horizontal Layout */}
      <div className="hidden lg:block">
        <div className="flex items-start gap-8 p-6">
          {/* Sidebar */}
          <aside className="w-[280px] flex-shrink-0">
            <div className="rounded-[12px] border border-[#F0F0F0] bg-white p-4">
              <h3 className="text-sm font-medium text-slate-500 mb-4">My Team</h3>
              <ul className="divide-y divide-[#F3F3F3]">
                {menu.map((m) => {
                  const Icon = m.icon;
                  return (
                    <li key={m.key} className="py-3">
                      <button
                        onClick={() => setActive(m.key)}
                        className={`w-full text-left flex items-center gap-3 px-2 py-1 rounded transition-colors ${
                          active === m.key ? 'font-semibold text-slate-900' : 'text-slate-500 hover:text-slate-700'
                        }`}
                        aria-current={active === m.key ? 'page' : undefined}
                      >
                        <Icon className={`h-5 w-5 flex-shrink-0 ${active === m.key ? 'text-[#E5C500]' : 'text-slate-400'}`} />
                        <span className={`flex-1 ${active === m.key ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
                          {m.label}
                        </span>
                        <ChevronRight className={`h-4 w-4 ${active === m.key ? 'text-[#E5C500]' : 'text-slate-300'}`} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-6">
              <button className="w-full rounded-lg bg-[#E5C500] px-6 py-4 font-semibold text-slate-900 shadow-sm hover:bg-[#D4B300] transition-colors">
                Logout
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="rounded-[12px] border border-[#F0F0F0] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{tableConfig.title}</h2>
              {tableConfig.subtitle && <p className="mt-2 text-sm text-slate-500">{tableConfig.subtitle}</p>}

              <div className="mt-6 overflow-x-auto max-h-[53vh] rounded-lg">
                <table className="min-w-full table-auto text-sm text-slate-700">
                  <thead>
                    <tr className="text-left bg-slate-50 sticky top-0">
                      {tableConfig.columns.map((col) => (
                        <th key={col} className="px-6 py-3 border-b border-[#EFEFEF] text-sm text-slate-500 font-medium">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableConfig.rows.length > 0 ? (
                      tableConfig.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={`${rIdx % 2 === 0 ? 'bg-white' : 'bg-[#FBFBFB]'} hover:bg-slate-50 transition-colors`}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-6 py-4 border-b border-[#F6F6F6]">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={tableConfig.columns.length} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <div className="text-5xl text-slate-300">👥</div>
                            <p className="text-sm text-slate-500">No records found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
