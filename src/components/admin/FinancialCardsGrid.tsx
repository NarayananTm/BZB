'use client';

import { ArrowRight } from 'lucide-react';

function Card({ title, desc, value, action }: { title: string; desc?: string; value?: string; action?: string }) {
  return (
    <div className="rounded-[12px] bg-[#F1F1F1] p-5">
      <h2 className="text-lg font-semibold text-[#111111]">{title}</h2>
      {desc && <p className="mt-2 text-sm text-[#777777]">{desc}</p>}
      {value && !action && <p className="mt-4 text-3xl font-semibold text-[#111111]">{value}</p>}

      {action && (
        <div className="mt-2 flex items-center justify-between gap-3">
      {value && <p className="mt-2 text-3xl font-semibold text-[#111111]">{value}</p>}

          <button className="inline-flex items-center justify-between rounded-[14px] w-full bg-[#AC992E] px-4 py-2 text-sm font-medium text-white">{action}
            <div className="inline-flex h-10 w-10 ml-2 items-center justify-center rounded-full bg-white shadow-sm">
            <ArrowRight className="h-4 w-4 text-black" />
          </div>
          </button>
          
        </div>
      )}
    </div>
  );
}

export default function FinancialCardsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card title="My Income Withdrawal" action="Withdrawal REQ" />
      <Card title="Top-up Wallet" desc="(Total Top-up Count : 0)" action="Top-up REQ" />
      <Card title="Booster Top-up" desc="(Top-up from 4th level Income)" value="Rs.0" action="Top-up REQ" />
      <Card title="Level Income Wallet" desc="Available Level Income" value="Rs.0" />
      <Card title="Wallet Balance" desc="Available Amount in Income Wallet" value="Rs.0" />
      <Card title="Downlines Top-up" desc="My Downlines Topup to me" value="Rs.0" />
    </div>
  );
}
