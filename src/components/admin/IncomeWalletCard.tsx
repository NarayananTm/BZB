'use client';

import Image from 'next/image';

interface Props {
  memberName?: string;
  memberGroup?: string;
  totalEarnings?: number;
  avatar?: string | null;
}

export default function IncomeWalletCard({ memberName, memberGroup, totalEarnings, avatar }: Props) {
  const imageSource = avatar && avatar.startsWith('http') ? avatar : (avatar || '/images/admin/Mask_group.svg');
  const displayName = memberName  ? memberName : 'Member';

  return (
    <div className="relative overflow-hidden rounded-[16px] sm:rounded-[20px] bg-slate-100 shadow-sm">
      <div className="absolute inset-0"><Image src={imageSource} alt="Member profile" fill className="object-cover" sizes="(max-width: 1120px) 100vw, 1120px" unoptimized /><div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 md:h-36 bg-gradient-to-t from-white via-white/90 to-transparent" /></div>
      <div className="relative flex h-full min-h-[250px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[450px] flex-col justify-between p-3 sm:p-3 md:p-4 pt-3 sm:pt-3 md:pt-4 text-white">
        <div>
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/80">My Income Wallet</p>
        </div>
        <div className="mt-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4 text-left text-black">
          <div className='max-w-xs'>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold truncate">{displayName}</p>
            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-[#181818]/80 truncate">{memberGroup || ''}</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs sm:text-sm text-[#181818]/80">Total Earnings</p>
            <p className="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-semibold">{totalEarnings == null ? '' : `₹${totalEarnings.toLocaleString('en-IN')}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
