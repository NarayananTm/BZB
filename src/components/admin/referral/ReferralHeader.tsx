'use client';

import Link from 'next/link';
import { Bell, User } from 'lucide-react';

export default function ReferralHeader({
  userName = 'Kavi',
  memberId = 'MBD9601381',
  direct = 5,
  totalReferrals = 30,
}: {
  userName?: string;
  memberId?: string;
  direct?: number;
  totalReferrals?: number;
}) {
  return (
    <div className="rounded-[28px] border border-[#F1F1F1] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#777777]">Referral Dashboard</p>
          <h1 className="mt-4 text-3xl font-semibold text-[#111111]">Welcome back, {userName}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#555555]">
            Track your referral performance, unlock rewards, and share your unique referral ID with your network.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <div className="rounded-[18px] border border-[#E5D84F] bg-[#FFF8D6] px-4 py-3 text-sm font-semibold text-[#111111]">
              {direct} Direct referrals
            </div>
            <div className="rounded-[18px] border border-[#F1F1F1] bg-[#F8F8F8] px-4 py-3 text-sm font-semibold text-[#111111]">
              {totalReferrals} Team members
            </div>
            <div className="rounded-[18px] border border-[#F1F1F1] bg-[#F8F8F8] px-4 py-3 text-sm text-[#777777]">
              Member ID: <span className="font-semibold text-[#111111]">{memberId}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="inline-flex overflow-hidden rounded-full border border-[#111111] bg-black text-white shadow-sm">
            <Link href="/admin" className="inline-flex items-center px-5 py-3 text-sm font-medium text-white">
              Dashboard
            </Link>
            <Link href="/referral" className="inline-flex items-center bg-[#F3E29D] px-5 py-3 text-sm font-medium text-black">
              Referral
            </Link>
            <Link href="/profile" className="inline-flex items-center px-5 py-3 text-sm font-medium text-white">
              Profile
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-sm">
              <Bell className="h-5 w-5" />
            </button>
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-sm">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
