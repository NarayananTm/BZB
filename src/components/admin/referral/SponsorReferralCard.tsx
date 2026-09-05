'use client';

import { Clipboard, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SponsorReferralCard({
  sponsor,
  mobile,
  joinDate,
  memberId,
  memberName,
}: {
  sponsor?: string | null | undefined;
  mobile?: string;
  joinDate?: string;
  memberId?: string;
  memberName?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [siteOrigin, setSiteOrigin] = useState('https://bzbgroup.com');
  const referralLink = `${siteOrigin}/admin/register?ref=${encodeURIComponent(memberId ?? '')}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=215x215&format=svg&data=${encodeURIComponent(referralLink)}`;

  useEffect(() => {
    setSiteOrigin(window.location.origin);
  }, []);

  const handleCopyLink = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share({ title: 'Join BZB', text: `Join BZB using ${memberName ?? 'my'} referral link.`, url: referralLink });
      return;
    }
    await handleCopyLink();
  };

  return (
    <div className="rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[24px] bg-[#171717] p-3 sm:p-4 md:p-5 lg:p-6 text-white shadow-xl shadow-black/10">
      <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3 lg:gap-3 p-2 sm:p-3 md:p-4 lg:p-4">
        <div className="grid gap-2 sm:gap-3 md:gap-4 lg:gap-3 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 text-xs sm:text-sm md:text-sm lg:text-sm text-white/80">
          <div>
            <p className="text-xs text-white/60">Sponsor Name</p>
            <p className="mt-1 font-semibold text-white">{sponsor || 'Not assigned'}</p>
          </div>
          <div>
            <p className="text-xs text-white/60">Mobile Number</p>
            <p className="mt-1 font-semibold text-white">{mobile || 'Not available'}</p>
          </div>
          <div>
            <p className="text-xs text-white/60">Join Date</p>
            <p className="mt-1 font-semibold text-white">{joinDate || 'Not available'}</p>
          </div>
        </div>
      </div>

      <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-2 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[24px] p-3 sm:p-4 md:p-5 lg:p-5 pt-2 sm:pt-3 md:pt-4 lg:pt-0 text-center">
        <p className="text-xs sm:text-sm md:text-sm lg:text-sm text-[#F2D325] break-all">{memberName || 'Member'} | {memberId || '-'}</p>
        {/* <p className="text-xs uppercase tracking-[0.3em] text-white/60">Your referral QR</p> */}
        <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-5 inline-flex rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[22px] bg-white p-2 sm:p-2.5 md:p-3 lg:p-3">
          <img
            src={qrCodeUrl}
            alt="Referral QR Code"
            width={170}
            height={170}
            className="h-28 w-28 sm:h-40 md:h-48 lg:h-[215px] sm:w-40 md:w-48 lg:w-[215px] object-cover"
          />
        </div>
        <p className="mt-2 sm:mt-3 md:mt-4 lg:mt-2 text-xs sm:text-sm md:text-sm lg:text-sm text-white/70">Use this QR code or copy your referral link to share with your network.</p>
      </div>

      <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-2 space-y-2">
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-[12px] md:rounded-[14px] lg:rounded-[14px] bg-[#E5C500] px-3 sm:px-4 md:px-4 lg:px-4 py-2 sm:py-2.5 md:py-3 lg:py-3 text-xs sm:text-sm md:text-sm lg:text-sm font-semibold text-black transition hover:bg-[#ffd847]"
        >
          <Clipboard className="h-3 sm:h-4 w-3 sm:w-4" />
          {copied ? 'Link Copied' : 'Copy Link'}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-[12px] md:rounded-[14px] lg:rounded-[14px] border border-white/10 bg-white/5 px-3 sm:px-4 md:px-4 lg:px-4 py-2 sm:py-2.5 md:py-3 lg:py-3 text-xs sm:text-sm md:text-sm lg:text-sm font-semibold text-white transition hover:border-white/20"
        >
          <Share2 className="h-3 sm:h-4 w-3 sm:w-4" />
          Share QR
        </button>
      </div>
    </div>
  );
}
