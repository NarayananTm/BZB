'use client';

import { ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

function Card({ title, desc, value, action, onAction }: { title: string; desc?: string; value?: string; action?: string; onAction?: () => void }) {
  return (
    <div className="rounded-[12px] bg-[#F1F1F1] p-5">
      <h2 className="text-lg font-semibold text-[#111111]">{title}</h2>
      {desc && <p className="mt-2 text-sm text-[#777777]">{desc}</p>}
      {value && !action && <p className="mt-4 text-3xl font-semibold text-[#111111]">{value}</p>}

      {action && (
        <div className="mt-2 flex items-center justify-between gap-3">
      {value && <p className="mt-2 text-3xl font-semibold text-[#111111]">{value}</p>}

          <button onClick={onAction} className="inline-flex w-full items-center justify-between rounded-[14px] bg-[#AC992E] px-4 py-2 text-sm font-medium text-white">{action}
            <div className="inline-flex h-10 w-10 ml-2 items-center justify-center rounded-full bg-white shadow-sm">
            <ArrowRight className="h-4 w-4 text-black" />
          </div>
          </button>
          
        </div>
      )}
    </div>
  );
}

interface Props {
  topupCount?: number;
  walletBalance?: number;
  boosterTopup?: number;
  levelIncome?: number;
  downlinesTopup?: number;
}

function fmt(n: number) { return `Rs.${n.toLocaleString('en-IN')}`; }

export default function FinancialCardsGrid({ topupCount = 0, walletBalance = 0, boosterTopup = 0, levelIncome = 0, downlinesTopup = 0 }: Props) {
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [amount, setAmount] = useState('');
  const [member, setMember] = useState<{ id: string; name: string } | null>(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const openWithdrawal = async () => {
    setShowWithdrawal(true);
    setMessage('');
    setAmount('');
    try {
      const response = await fetch('/api/admin/profile');
      const data = await response.json();
      if (!response.ok || !data.profile?.id) throw new Error(data.message || 'Unable to load your profile');
      setMember({ id: data.profile.id, name: data.profile.name || '' });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to load your profile');
    }
  };

  const submitWithdrawal = async () => {
    const requestedAmount = Number(amount);
    if (!member) return setMessage('Your profile is still loading.');
    if (!Number.isFinite(requestedAmount) || requestedAmount < 200) return setMessage('Minimum payout request is Rs. 200.');
    if (requestedAmount > walletBalance) return setMessage('Requested amount exceeds your income wallet balance.');
    setSubmitting(true);
    try {
      const response = await fetch('/api/admin/withdrawals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: `WDR-${Date.now()}`, member_id: member.id, member_name: member.name, amount: requestedAmount, payout_method: 'Income Wallet' }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to create withdrawal request');
      setMessage('Withdrawal request submitted successfully.');
      setAmount('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to create withdrawal request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <div className="grid gap-4 sm:grid-cols-2">
      <Card title="My Income Withdrawal" action="Withdrawal REQ" onAction={openWithdrawal} />
      <Card title="Top-up Wallet" desc={`(Total Top-up Count : ${topupCount})`} action="Top-up REQ" />
      <Card title="Booster Top-up" desc="(Top-up from 4th level Income)" value={fmt(boosterTopup)} action="Top-up REQ" />
      <Card title="Level Income Wallet" desc="Available Level Income" value={fmt(levelIncome)} />
      <Card title="Wallet Balance" desc="Available Amount in Income Wallet" value={fmt(walletBalance)} />
      <Card title="Downlines Top-up" desc="My Downlines Topup to me" value={fmt(downlinesTopup)} />
    </div>
    {showWithdrawal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" role="dialog" aria-modal="true" aria-labelledby="withdrawal-title">
      <div className="relative w-full max-w-2xl rounded-md bg-white px-8 py-14 text-center shadow-xl">
        <button onClick={() => setShowWithdrawal(false)} className="absolute right-5 top-4 text-slate-900" aria-label="Close withdrawal dialog"><X size={22} /></button>
        <p className="text-xs font-medium text-slate-800">MY EARNINGS</p>
        <h2 id="withdrawal-title" className="mt-8 text-2xl font-bold text-slate-950">INCOME WALLET AMOUNT<br />Rs. : {walletBalance.toLocaleString('en-IN')}</h2>
        <p className="mt-5 text-sm text-slate-500">Request Amount Minimum payout request is<br />200 INR (TDS 5% + Service Charge 5%)</p>
        <label className="mt-7 block text-sm text-slate-500" htmlFor="withdrawal-amount">Payout Request Amount Rs.</label>
        <input id="withdrawal-amount" type="number" min="200" value={amount} onChange={(event) => setAmount(event.target.value)} className="mx-auto mt-4 block w-full max-w-xs rounded-md border border-[#F0F0F0] bg-[#F5F5F5] px-4 py-3 text-center text-sm" placeholder="Enter Amount" />
        {message && <p className="mt-3 text-sm text-slate-600">{message}</p>}
        <button onClick={submitWithdrawal} disabled={submitting || !member} className="mt-8 w-full max-w-xs rounded-md bg-[#E5C500] px-6 py-3 text-sm font-medium text-white disabled:opacity-50">{submitting ? 'Submitting...' : 'Withdraw'}</button>
      </div>
    </div>}
    </>
  );
}
