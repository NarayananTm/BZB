'use client';

import { ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

function Card({ title, desc, value, action, onAction }: { title: string; desc?: string; value?: string; action?: string; onAction?: () => void }) {
  return (
    <div className="w-full h-full min-h-[140px] rounded-lg sm:rounded-[12px] bg-[#F1F1F1] p-3 sm:p-3 md:p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-sm sm:text-base font-semibold text-[#111111] line-clamp-2">{title}</h2>
        {desc && <p className="mt-1 text-xs text-[#777777] line-clamp-2">{desc}</p>}
      </div>
      {value && !action && <p className="mt-2 text-lg sm:text-xl md:text-2xl font-semibold text-[#111111]">{value}</p>}

      {action && (
        <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
      {value && <p className="mt-1 text-lg sm:text-xl font-semibold text-[#111111]">{value}</p>}

          <button onClick={onAction} className="w-full sm:w-auto inline-flex items-center justify-between rounded-lg sm:rounded-[14px] bg-[#AC992E] px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#8B7A23] transition">
            {action}
            <div className="inline-flex h-8 sm:h-9 md:h-10 w-8 sm:w-9 md:w-10 ml-2 items-center justify-center rounded-full bg-white shadow-sm">
            <ArrowRight className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-black" />
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
  const [showTopup, setShowTopup] = useState(false);
  const [showBoosterTopup, setShowBoosterTopup] = useState(false);
  const [amount, setAmount] = useState('');
  const [topupAmount, setTopupAmount] = useState('');
  const [boosterTopupAmount, setBoosterTopupAmount] = useState('');
  const [member, setMember] = useState<{ id: string; name: string } | null>(null);
  const [message, setMessage] = useState('');
  const [topupMessage, setTopupMessage] = useState('');
  const [boosterTopupMessage, setBoosterTopupMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [topupSubmitting, setTopupSubmitting] = useState(false);
  const [boosterTopupSubmitting, setBoosterTopupSubmitting] = useState(false);

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

  const openTopup = async () => {
    setShowTopup(true);
    setTopupMessage('');
    setTopupAmount('');
    try {
      const response = await fetch('/api/admin/profile');
      const data = await response.json();
      if (!response.ok || !data.profile?.id) throw new Error(data.message || 'Unable to load your profile');
      setMember({ id: data.profile.id, name: data.profile.name || '' });
    } catch (error) {
      setTopupMessage(error instanceof Error ? error.message : 'Unable to load your profile');
    }
  };

  const submitTopup = async () => {
    const requestedAmount = Number(topupAmount);
    if (!member) return setTopupMessage('Your profile is still loading.');
    if (!Number.isFinite(requestedAmount) || requestedAmount < 1) return setTopupMessage('Please enter a valid amount.');
    setTopupSubmitting(true);
    try {
      const response = await fetch('/api/member/topups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: requestedAmount, method: 'Wallet' }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to create topup request');
      setTopupMessage('✅ Top-up request submitted successfully!');
      setTopupAmount('');
      setTimeout(() => {
        setShowTopup(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      setTopupMessage(error instanceof Error ? error.message : 'Unable to create topup request');
    } finally {
      setTopupSubmitting(false);
    }
  };

  const openBoosterTopup = async () => {
    setShowBoosterTopup(true);
    setBoosterTopupMessage('');
    setBoosterTopupAmount('');
    try {
      const response = await fetch('/api/admin/profile');
      const data = await response.json();
      if (!response.ok || !data.profile?.id) throw new Error(data.message || 'Unable to load your profile');
      setMember({ id: data.profile.id, name: data.profile.name || '' });
    } catch (error) {
      setBoosterTopupMessage(error instanceof Error ? error.message : 'Unable to load your profile');
    }
  };

  const submitBoosterTopup = async () => {
    const requestedAmount = Number(boosterTopupAmount);
    if (!member) return setBoosterTopupMessage('Your profile is still loading.');
    if (!Number.isFinite(requestedAmount) || requestedAmount < 1) return setBoosterTopupMessage('Please enter a valid amount.');
    if (requestedAmount > boosterTopup) return setBoosterTopupMessage('Requested amount exceeds your level topup balance.');
    setBoosterTopupSubmitting(true);
    try {
      const response = await fetch('/api/member/topups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: requestedAmount, method: 'Level Topup' }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to create topup request');
      setBoosterTopupMessage('✅ Booster top-up request submitted successfully!');
      setBoosterTopupAmount('');
      setTimeout(() => {
        setShowBoosterTopup(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      setBoosterTopupMessage(error instanceof Error ? error.message : 'Unable to create topup request');
    } finally {
      setBoosterTopupSubmitting(false);
    }
  };

  return (
    <>
    <div className="w-full grid gap-2 sm:gap-3 md:gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
      <Card title="My Income Withdrawal" action="Withdrawal REQ" onAction={openWithdrawal} />
      <Card title="Top-up Wallet" desc={`(Total Top-up Count : ${topupCount})`} action="Top-up REQ" onAction={openTopup} />
      <Card title="Booster Top-up" desc="(Top-up from 4th level Income)" value={fmt(boosterTopup)} action="Top-up REQ" onAction={openBoosterTopup} />
      <Card title="Level Income Wallet" desc="Available Level Income" value={fmt(levelIncome)} />
      <Card title="Wallet Balance" desc="Available Amount in Income Wallet" value={fmt(walletBalance)} />
      <Card title="Downlines Top-up" desc="My Downlines Topup to me" value={fmt(downlinesTopup)} />
    </div>
    {showWithdrawal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-2 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="withdrawal-title">
      <div className="relative w-full max-w-md sm:max-w-2xl rounded-lg sm:rounded-md bg-white px-4 sm:px-8 py-8 sm:py-14 text-center shadow-xl">
        <button onClick={() => setShowWithdrawal(false)} className="absolute right-3 sm:right-5 top-3 sm:top-4 text-slate-900" aria-label="Close withdrawal dialog"><X size={20} className="sm:w-[22px] sm:h-[22px]" /></button>
        <p className="text-xs font-medium text-slate-800">MY EARNINGS</p>
        <h2 id="withdrawal-title" className="mt-4 sm:mt-8 text-lg sm:text-2xl font-bold text-slate-950">INCOME WALLET AMOUNT<br />Rs. : {walletBalance.toLocaleString('en-IN')}</h2>
        <p className="mt-3 sm:mt-5 text-xs sm:text-sm text-slate-500">Request Amount Minimum payout request is<br />200 INR (TDS 5% + Service Charge 5%)</p>
        <label className="mt-4 sm:mt-7 block text-xs sm:text-sm text-slate-500" htmlFor="withdrawal-amount">Payout Request Amount Rs.</label>
        <input id="withdrawal-amount" type="number" min="200" value={amount} onChange={(event) => setAmount(event.target.value)} className="mx-auto mt-2 sm:mt-4 block w-full max-w-xs rounded-md border border-[#F0F0F0] bg-[#F5F5F5] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm" placeholder="Enter Amount" />
        {message && <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600">{message}</p>}
        <button onClick={submitWithdrawal} disabled={submitting || !member} className="mt-4 sm:mt-8 w-full max-w-xs rounded-md bg-[#E5C500] px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-white disabled:opacity-50">{submitting ? 'Submitting...' : 'Withdraw'}</button>
      </div>
    </div>}

    {showTopup && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-2 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="topup-title">
      <div className="relative w-full max-w-md sm:max-w-2xl rounded-lg sm:rounded-md bg-white px-4 sm:px-8 py-8 sm:py-14 text-center shadow-xl">
        <button onClick={() => setShowTopup(false)} className="absolute right-3 sm:right-5 top-3 sm:top-4 text-slate-900" aria-label="Close topup dialog"><X size={20} className="sm:w-[22px] sm:h-[22px]" /></button>
        <p className="text-xs font-medium text-slate-800">TOPUP REQUEST</p>
        <h2 id="topup-title" className="mt-4 sm:mt-8 text-lg sm:text-2xl font-bold text-slate-950">TOPUP WALLET AMOUNT<br />Rs. : 0</h2>
        <p className="mt-3 sm:mt-5 text-xs sm:text-sm text-slate-500">You can Topup one time daily</p>
        <label className="mt-4 sm:mt-7 block text-xs sm:text-sm text-slate-500" htmlFor="topup-amount">Top-up Amount Rs.</label>
        <input id="topup-amount" type="number" min="1" value={topupAmount} onChange={(event) => setTopupAmount(event.target.value)} className="mx-auto mt-2 sm:mt-4 block w-full max-w-xs rounded-md border border-[#F0F0F0] bg-[#F5F5F5] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm" placeholder="Enter Amount" />
        {topupMessage && <p className={`mt-2 sm:mt-3 text-xs sm:text-sm ${topupMessage.includes('✅') ? 'text-green-600' : 'text-slate-600'}`}>{topupMessage}</p>}
        <button onClick={submitTopup} disabled={topupSubmitting || !member} className="mt-4 sm:mt-8 w-full max-w-xs rounded-md bg-[#E5C500] px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-white disabled:opacity-50">{topupSubmitting ? 'Submitting...' : 'Top-up'}</button>
      </div>
    </div>}

    {showBoosterTopup && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-2 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="booster-topup-title">
      <div className="relative w-full max-w-md sm:max-w-2xl rounded-lg sm:rounded-md bg-white px-4 sm:px-8 py-8 sm:py-14 text-center shadow-xl">
        <button onClick={() => setShowBoosterTopup(false)} className="absolute right-3 sm:right-5 top-3 sm:top-4 text-slate-900" aria-label="Close booster topup dialog"><X size={20} className="sm:w-[22px] sm:h-[22px]" /></button>
        <p className="text-xs font-medium text-slate-800">BOOSTER TOPUP</p>
        <h2 id="booster-topup-title" className="mt-4 sm:mt-8 text-lg sm:text-2xl font-bold text-slate-950">LEVEL TOPUP WALLET<br />AMOUNT Rs. : {boosterTopup.toLocaleString('en-IN')}</h2>
        <p className="mt-3 sm:mt-5 text-xs sm:text-sm text-slate-500">You can Topup one time daily</p>
        {boosterTopup === 0 && <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600">Not Enough amount in Level Topup wallet.</p>}
        {boosterTopup > 0 && (
          <>
            <label className="mt-4 sm:mt-7 block text-xs sm:text-sm text-slate-500" htmlFor="booster-topup-amount">Top-up Amount Rs.</label>
            <input id="booster-topup-amount" type="number" min="1" max={boosterTopup} value={boosterTopupAmount} onChange={(event) => setBoosterTopupAmount(event.target.value)} className="mx-auto mt-2 sm:mt-4 block w-full max-w-xs rounded-md border border-[#F0F0F0] bg-[#F5F5F5] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm" placeholder="Enter Amount" />
          </>
        )}
        {boosterTopupMessage && <p className={`mt-2 sm:mt-3 text-xs sm:text-sm ${boosterTopupMessage.includes('✅') ? 'text-green-600' : 'text-slate-600'}`}>{boosterTopupMessage}</p>}
        {boosterTopup > 0 && <button onClick={submitBoosterTopup} disabled={boosterTopupSubmitting || !member} className="mt-4 sm:mt-8 w-full max-w-xs rounded-md bg-[#E5C500] px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-white disabled:opacity-50">{boosterTopupSubmitting ? 'Submitting...' : 'Top-up'}</button>}
      </div>
    </div>}
    </>
  );
}
