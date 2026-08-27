'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/apiClient';

interface Props { id: string; isRead: boolean; }

export default function MarkReadButton({ id, isRead }: Props) {
  const router = useRouter();
  const [read, setRead] = useState(isRead);
  const [busy, setBusy] = useState(false);

  if (read) {
    return <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">Read</span>;
  }

  const mark = async () => {
    setBusy(true);
    try {
      await api.patch(`/api/admin/notifications/${id}`, {});
      setRead(true);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={mark}
      disabled={busy}
      className="rounded-full bg-[#E5C400]/20 px-3 py-1 text-xs font-semibold text-slate-950 hover:bg-[#E5C400]/40 disabled:opacity-50"
    >
      {busy ? '...' : 'Mark read'}
    </button>
  );
}
