"use client";

import React, { useMemo, useState } from 'react';

type Referral = {
  id: string;
  memberName: string;
  joinDate?: string;
  sponsor?: string;
  level?: string;
};

export default function ProfileInteractive({ member, referrals }: { member: any; referrals: Referral[] }) {
  const [active, setActive] = useState<string>('direct');

  const menu = [
    { key: 'direct', label: 'My Direct Members' },
    { key: 'topups', label: 'My Downline Top ups' },
    { key: 'reports', label: 'Top-ups Reports' },
    { key: 'earnings', label: 'My Earnings' },
    { key: 'level', label: 'My Level Income' },
    { key: 'withdrawal', label: 'My Withdrawal' },
    { key: 'payout', label: 'My Payout' },
  ];

  const tableConfig = useMemo(() => {
    switch (active) {
      case 'topups':
        return {
          title: 'My Downline Top-ups',
          subtitle: '',
          columns: ['No', 'Date', 'Member ID', 'Name', 'Status', 'Amount Rs.'],
          rows: referrals.map((r, idx) => [
            String(idx + 1).padStart(2, '0'),
            r.joinDate ?? '-',
            r.id.replace('REF-', ''),
            r.memberName,
            '-',
            idx === 0 ? 'Rs.200' : '-',
          ]),
        };
      case 'reports':
        return {
          title: 'My Top-up Report',
          subtitle: '',
          columns: ['No', 'Date', 'Status', 'Amount Rs.'],
          rows: referrals.map((r, idx) => [
            String(idx + 1).padStart(2, '0'),
            r.joinDate ?? '-',
            '-',
            idx === 0 ? 'Rs.200' : '-',
          ]),
        };
      case 'earnings':
        return {
          title: 'My Earnings',
          subtitle: '',
          columns: ['No', 'Date', 'Type', 'Earnings Rs.'],
          rows: referrals.map((r, idx) => [
            String(idx + 1).padStart(2, '0'),
            r.joinDate ?? '-',
            '-',
            idx === 0 ? 'Rs.200' : '-',
          ]),
        };
      case 'level':
        return {
          title: 'My Level Income',
          subtitle: '',
          columns: ['No', 'Date', 'Member ID', 'Amount', 'Level', 'Status'],
          rows: referrals.map((r, idx) => [
            String(idx + 1).padStart(2, '0'),
            r.joinDate ?? '-',
            r.id.replace('REF-', ''),
            idx === 0 ? 'Rs.200' : '-',
            r.level ?? '-',
            r.memberName,
          ]),
        };
      case 'withdrawal':
        return {
          title: 'My Withdrawal Reqs',
          subtitle: '',
          columns: ['No', 'Date', 'Amount', 'Net Pay', 'Withdraw Type', 'Status'],
          rows: referrals.map((r, idx) => [
            String(idx + 1).padStart(2, '0'),
            r.joinDate ?? '-',
            idx === 0 ? 'Rs.200' : '-',
            idx === 0 ? 'Rs.200' : '-',
            '-',
            '-',
          ]),
        };
      case 'payout':
        return {
          title: 'My Payout',
          subtitle: '',
          columns: ['No', 'Date', 'Amount'],
          rows: referrals.map((r, idx) => [
            String(idx + 1).padStart(2, '0'),
            r.joinDate ?? '-',
            idx === 0 ? 'Rs.200' : '-',
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
            r.memberName,
            r.joinDate ?? '-',
            r.sponsor ?? '-',
            r.level ?? '-',
          ]),
        };
    }
  }, [active, referrals]);

  return (
    <div className=" px-3 py-8">
      <div className="flex items-start gap-8">
        <aside className="w-[260px]">
          <div className="rounded-[12px] border border-[#F0F0F0] bg-white p-4">
            <h3 className="text-sm font-medium text-slate-500">My Team</h3>
            <ul className="mt-4 text-sm text-[#666] divide-y divide-[#F3F3F3]">
              {menu.map((m) => (
                <li key={m.key} className="py-3">
                  <button
                    onClick={() => setActive(m.key)}
                    className={`w-full text-left flex items-center gap-2 px-2 py-1 rounded ${
                      active === m.key ? 'font-semibold text-slate-900' : 'text-slate-500'
                    }`}
                    aria-current={active === m.key ? 'page' : undefined}
                  >
                    <span className={`w-1 h-6 rounded-r ${active === m.key ? 'bg-[#E5C500]' : 'bg-transparent'}`} />
                    <span className="flex-1 pl-2">{m.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <button className="w-full rounded-lg bg-[#E5C500] px-6 py-4 font-semibold text-slate-900 shadow-sm">Logout</button>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mt-0 rounded-[12px] border border-[#F0F0F0] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{tableConfig.title}</h2>
            {tableConfig.subtitle && <p className="mt-2 text-sm text-slate-500">{tableConfig.subtitle}</p>}

            <div className="mt-6 overflow-auto max-h-[58vh]">
              <table className="min-w-full table-auto text-sm text-slate-700">
                <thead>
                  <tr className="text-left">
                    {tableConfig.columns.map((col) => (
                      <th key={col} className="px-6 py-3 border-b border-[#EFEFEF] text-sm text-slate-500">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableConfig.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="odd:bg-white even:bg-[#FBFBFB] align-top">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-6 py-4 border-b border-[#F6F6F6] align-middle">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
