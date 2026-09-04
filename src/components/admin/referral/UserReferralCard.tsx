'use client';

import { Copy, Share2, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface UserReferralCardProps {
  userId: string;
  userName: string;
  joinDate?: string;
  mobile?: string;
}

export default function UserReferralCard({
  userId,
  userName,
  joinDate,
  mobile,
}: UserReferralCardProps) {
  const [copied, setCopied] = useState(false);
  const [siteOrigin, setSiteOrigin] = useState('https://bzbgroup.com');
  // const [shareMessage, setShareMessage] = useState('');

  const referralLink = `${siteOrigin}/admin/register?ref=${encodeURIComponent(userId)}`;

  useEffect(() => {
    setSiteOrigin(window.location.origin);
  }, []);

  const handleCopyUserId = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(userId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyReferralLink = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    // const shareText = `Join BZB Network! Use my referral link: ${referralLink}`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Join BZB with My Referral',
          text: `I'm inviting you to join BZB! Use my referral link to sign up.`,
          url: referralLink,
        });
      } catch (error) {
        // User cancelled share
      }
      return;
    }
    
    // Fallback: copy to clipboard
    await handleCopyReferralLink();
  };

  const handleShareViaWhatsApp = () => {
    const message = `Hey! 👋 Join me on BZB Network! Here's my referral link: ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareViaEmail = () => {
    const subject = 'Join BZB Network - My Referral Invitation';
    const body = `Hi,\n\nI'd like to invite you to join BZB Network!\n\nClick this link to sign up using my referral:\n${referralLink}\n\nLooking forward to seeing you there!\n\nBest regards,\n${userName}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="rounded-[24px] bg-gradient-to-br from-[#F2D325]/10 to-[#171717] border border-[#F2D325]/20 p-6 shadow-xl shadow-black/10">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Your Referral Info</h2>
        <p className="text-sm text-white/60 mt-1">Share with new users to build your network</p>
      </div>

      {/* User ID Section */}
      <div className="mb-6 rounded-[16px] bg-black/40 p-4 border border-white/10">
        <p className="text-xs text-white/60 uppercase tracking-wider mb-2">Your User ID</p>
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold text-[#F2D325] font-mono">{userId}</p>
          <button
            type="button"
            onClick={handleCopyUserId}
            className="ml-auto p-2 rounded-lg hover:bg-white/10 transition text-white/70 hover:text-white"
            title="Copy User ID"
          >
            {copied ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* User Info */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-[12px] bg-white/5 p-3">
          <p className="text-xs text-white/60 mb-1">Name</p>
          <p className="font-semibold text-white text-sm">{userName}</p>
        </div>
        <div className="rounded-[12px] bg-white/5 p-3">
          <p className="text-xs text-white/60 mb-1">Mobile</p>
          <p className="font-semibold text-white text-sm">{mobile || 'N/A'}</p>
        </div>
        <div className="rounded-[12px] bg-white/5 p-3">
          <p className="text-xs text-white/60 mb-1">Join Date</p>
          <p className="font-semibold text-white text-sm">{joinDate || 'N/A'}</p>
        </div>
      </div>

      {/* Referral Link Display */}
      <div className="mb-6 rounded-[16px] bg-black/40 p-4 border border-white/10">
        <p className="text-xs text-white/60 uppercase tracking-wider mb-2">Your Referral Link</p>
        <div className="flex items-center gap-2">
          <a
            href={referralLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-sm font-mono text-[#F2D325] hover:text-[#ffd847] hover:underline break-all transition"
          >
            {referralLink}
          </a>
          <button
            type="button"
            onClick={handleCopyReferralLink}
            className="p-2 rounded-lg hover:bg-white/10 transition text-white/70 hover:text-white flex-shrink-0"
            title="Copy Link"
          >
            {copied ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Sharing Options */}
      <div className="space-y-2">
        <p className="text-xs text-white/60 uppercase tracking-wider mb-3">Share Your Referral Link</p>
        
        <button
          type="button"
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 rounded-[12px] bg-[#F2D325] hover:bg-[#ffd847] px-4 py-3 text-sm font-semibold text-black transition"
        >
          <Share2 className="h-4 w-4" />
          Share Referral Link
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleShareViaWhatsApp}
            className="flex items-center justify-center gap-2 rounded-[12px] bg-green-600 hover:bg-green-700 px-3 py-2 text-xs font-semibold text-white transition"
          >
            💬 WhatsApp
          </button>
          <button
            type="button"
            onClick={handleShareViaEmail}
            className="flex items-center justify-center gap-2 rounded-[12px] bg-blue-600 hover:bg-blue-700 px-3 py-2 text-xs font-semibold text-white transition"
          >
            ✉️ Email
          </button>
        </div>

        <button
          type="button"
          onClick={handleCopyReferralLink}
          className="w-full flex items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm font-semibold text-white transition"
        >
          <Copy className="h-4 w-4" />
          {copied ? 'Link Copied!' : 'Copy Referral Link'}
        </button>
      </div>

      {/* Info Message */}
      <div className="mt-4 rounded-[12px] bg-blue-500/10 border border-blue-500/20 p-3">
        <p className="text-xs text-blue-200">
          💡 <strong>Tip:</strong> New users will register using your referral link and join your network!
        </p>
      </div>
    </div>
  );
}
