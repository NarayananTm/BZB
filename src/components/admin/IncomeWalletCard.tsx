'use client';

import Image from 'next/image';

interface Props {
  memberName?: string;
  memberGroup?: string;
  totalEarnings?: number;
}

export default function IncomeWalletCard({ memberName = '-', memberGroup = 'Member of BZB', totalEarnings = 0 }: Props) {
  return (
    <div className="relative overflow-hidden rounded-[20px] bg-slate-100 shadow-sm">
      <div className="absolute inset-0">
        <Image src="/images/admin/Mask_group.svg" alt="Member profile" fill className="object-cover" sizes="(max-width: 1120px) 100vw, 1120px" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/90 to-transparent" />
      </div>
      <div className="relative flex h-full flex-col justify-between p-6 pt-5 text-white min-h-[500px]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-white/80">My Income Wallet</p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-4 text-left text-black">
          <div>
            <p className="text-2xl font-semibold">{memberName}</p>
            <p className="mt-1 text-sm text-[#181818]/80">{memberGroup}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#181818]/80">Total Earnings</p>
            <p className="mt-2 text-3xl font-semibold">₹{totalEarnings.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
