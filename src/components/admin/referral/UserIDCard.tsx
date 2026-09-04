'use client';

import { Copy, Share2, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface UserIDCardProps {
  userId: string;
  userName?: string;
}

export default function UserIDCard({ userId, userName }: UserIDCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(userId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareId = async () => {
    const shareText = `My User ID: ${userId}`;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'My User ID',
          text: shareText,
        });
      } catch {
        // User cancelled
      }
      return;
    }
    
    await handleCopyId();
  };

  const handleShareViaWhatsApp = () => {
    const message = `My User ID on BZB: ${userId}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="rounded-[20px] bg-gradient-to-r from-[#F2D325]/15 to-[#171717] border-2 border-[#F2D325]/30 p-5 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs text-white/60 uppercase tracking-wider mb-2">Your User ID</p>
          <p className="text-3xl font-bold text-[#F2D325] font-mono tracking-wider">{userId}</p>
          {userName && <p className="text-sm text-white/70 mt-2">{userName}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleCopyId}
            className="p-3 rounded-lg bg-[#F2D325] hover:bg-[#ffd847] text-black transition"
            title="Copy User ID"
          >
            {copied ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
          <button
            type="button"
            onClick={handleShareId}
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
            title="Share User ID"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Quick Share Options */}
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={handleShareViaWhatsApp}
          className="flex-1 px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-semibold transition"
        >
          💬 Share via WhatsApp
        </button>
        <button
          type="button"
          onClick={handleCopyId}
          className="px-4 py-2 rounded-lg border border-[#F2D325] text-[#F2D325] hover:bg-[#F2D325]/10 text-xs font-semibold transition"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
