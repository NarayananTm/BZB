'use client';

import { Users } from 'lucide-react';

function Donut({ percent = 25 }: { percent?: number }) {
  const r = 48;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <svg width={120} height={120} viewBox="0 0 120 120">
      <g transform="translate(60,60)">
        <circle r={r} cx={0} cy={0} fill="none" stroke="#EDEDED" strokeWidth={16} />
        <circle
          r={r}
          cx={0}
          cy={0}
          fill="none"
          stroke="#E5C500"
          strokeWidth={16}
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90)"
        />
        <g transform="translate(-12,-8)">
          <Users className="text-[#777777]" />
        </g>
      </g>
    </svg>
  );
}

export default function ReferGrowCard({ direct = 5, referrals = 25, total = 30 }: { direct?: number; referrals?: number; total?: number }) {
  const completion = Math.min(100, Math.round((direct / Math.max(referrals, 1)) * 100));

  return (
    <div className="rounded-[20px] border border-[#F1F1F1] bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#E5C500]">Refer & Grow</h3>
          <p className="mt-2 text-sm text-[#777777]">Your referral contribution and growth progress.</p>
        </div>
        <div className="rounded-full bg-[#F7F7F7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#777777]">
          {completion}% complete
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <Donut percent={completion} />
        <div className="rounded-[18px] bg-[#F7F7F7] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-[#777777] flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#E5C500]/20 text-[#E5C500]">👥</span>
                Direct
              </p>
              <p className="mt-2 text-3xl font-semibold text-[#111111]">{String(direct).padStart(2, '0')}</p>
            </div>
          </div>

          <div className="mt-5 space-y-3 text-sm text-[#777777]">
            <div className="rounded-[14px] bg-white p-3 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[#999999]">Referrals</p>
              <p className="mt-2 font-semibold text-[#111111]">{referrals}</p>
            </div>
            <div className="rounded-[14px] bg-white p-3 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[#999999]">Total Members</p>
              <p className="mt-2 font-semibold text-[#111111]">{total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
