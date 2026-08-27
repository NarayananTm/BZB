'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/apiClient';

interface Props { id: string; currentStatus: string; }

export default function WithdrawalActions({ id, currentStatus }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const act = async (action: 'approve' | 'reject') => {
    setBusy(true);
    try {
      await api.patch(`/api/admin/withdrawals/${id}`, { action });
      setStatus(action === 'approve' ? 'Approved' : 'Rejected');
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  if (status !== 'Pending') {
    const color = status === 'Approved' ? 'text-emerald-700' : 'text-rose-700';
    return <span className={`text-xs font-semibold ${color}`}>{status}</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => act('approve')}
        disabled={busy}
        className="rounded-lg bg-emerald-500 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-600 disabled:opacity-50"
      >
        Approve
      </button>
      <button
        onClick={() => act('reject')}
        disabled={busy}
        className="rounded-lg bg-rose-500 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-600 disabled:opacity-50"
      >
        Reject
      </button>
    </div>
  );
}
