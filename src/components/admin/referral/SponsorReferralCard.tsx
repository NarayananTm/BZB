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
  sponsor?: string;
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
    <div className="rounded-[24px] bg-[#171717] p-6 text-white shadow-xl shadow-black/10">
      <div className="flex flex-col gap-3  p-4">
        <div className="grid gap-3 sm:grid-cols-3 text-sm text-white/80">
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

      <div className="mt-2 rounded-[24px]  p-5 pt-0 text-center">
        <p className="text-sm text-[#F2D325]">{memberName || 'Member'} | {memberId || '-'}</p>
        {/* <p className="text-xs uppercase tracking-[0.3em] text-white/60">Your referral QR</p> */}
        <div className="mt-5 inline-flex rounded-[22px] bg-white p-3">
          <img
            src={qrCodeUrl}
            alt="Referral QR Code"
            width={170}
            height={170}
            className="h-[215px] w-[215px] object-cover"
          />
        </div>
        <p className="mt-2 text-sm text-white/70">Use this QR code or copy your referral link to share with your network.</p>
      </div>

      <div className="mt-2 space-y-2">
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#E5C500] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#ffd847]"
        >
          <Clipboard className="h-4 w-4" />
          {copied ? 'Link Copied' : 'Copy Referral Link'}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="flex w-full items-center justify-center gap-2 rounded-[14px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20"
        >
          <Share2 className="h-4 w-4" />
          Share QR
        </button>
      </div>
    </div>
  );
}
