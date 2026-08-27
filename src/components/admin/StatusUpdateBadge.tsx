'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/apiClient';

const STATUS_COLORS: Record<string, string> = {
  Active:    'bg-emerald-100 text-emerald-700',
  Approved:  'bg-emerald-100 text-emerald-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  Pending:   'bg-yellow-100  text-yellow-800',
  Inactive:  'bg-slate-100   text-slate-600',
  Rejected:  'bg-rose-100    text-rose-700',
  Failed:    'bg-rose-100    text-rose-700',
  Scheduled: 'bg-blue-100    text-blue-700',
};

interface Props {
  id: string;
  current: string;
  endpoint: string;         // e.g. '/api/admin/topups'
  options: string[];
}

export default function StatusUpdateBadge({ id, current, endpoint, options }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(current);
  const [busy, setBusy] = useState(false);

  const change = async (next: string) => {
    if (next === status) return;
    setBusy(true);
    try {
      await api.patch(`${endpoint}/${id}`, { status: next });
      setStatus(next);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[status] ?? 'bg-slate-100 text-slate-600'}`}>
        {status}
      </span>
      <select
        value={status}
        disabled={busy}
        onChange={(e) => change(e.target.value)}
        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 disabled:opacity-50"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
