'use client';

import { useState } from 'react';
import { Phone, Check, X } from 'lucide-react';

interface MobileUpdateCardProps {
  currentMobile?: string;
  onUpdate?: (mobile: string) => void;
}

export default function MobileUpdateCard({ currentMobile = '', onUpdate }: MobileUpdateCardProps) {
  const [mobile, setMobile] = useState(currentMobile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSaveMobile = async () => {
    if (!mobile || mobile.trim().length < 10) {
      setMessage({ type: 'error', text: 'Please enter a valid mobile number (at least 10 digits)' });
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/mobile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: mobile.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Mobile number updated successfully!' });
        setIsEditing(false);
        if (onUpdate) onUpdate(mobile);
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update mobile number' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating mobile number' });
      console.error('Error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setMobile(currentMobile);
    setIsEditing(false);
    setMessage(null);
  };

  return (
    <div className="rounded-[16px] bg-black/40 border border-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-[#F2D325]" />
          <p className="text-xs text-white/60 uppercase tracking-wider">Mobile Number</p>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-xs text-[#F2D325] hover:text-[#ffd847] transition"
          >
            Edit
          </button>
        )}
      </div>

      {!isEditing ? (
        <p className="text-lg font-semibold text-white">
          {mobile || <span className="text-white/50">Not set</span>}
        </p>
      ) : (
        <div className="space-y-3">
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your mobile number"
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#F2D325] transition"
          />
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSaveMobile}
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#F2D325] hover:bg-[#ffd847] text-black font-semibold transition disabled:opacity-50"
            >
              <Check className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold transition"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {message && (
        <div className={`mt-3 px-3 py-2 rounded-lg text-sm ${
          message.type === 'success'
            ? 'bg-green-500/10 text-green-200 border border-green-500/20'
            : 'bg-red-500/10 text-red-200 border border-red-500/20'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
