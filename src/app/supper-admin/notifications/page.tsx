'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Banknote,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  GitBranch,
  Inbox,
  Loader2,
  RefreshCw,
  UserRoundPlus,
} from 'lucide-react';

type Activity = {
  id: string;
  type: string;
  description: string;
  member_name: string;
  timestamp: string;
  status: string;
};

const PAGE_SIZE = 20;

function getActivityPresentation(type: string) {
  switch (type) {
    case 'member_joined':
      return { label: 'New member', icon: UserRoundPlus, tone: 'green' };
    case 'referral_created':
      return { label: 'Referral', icon: GitBranch, tone: 'blue' };
    case 'withdrawal_requested':
      return { label: 'Withdrawal request', icon: Banknote, tone: 'orange' };
    default:
      return { label: 'Earning activity', icon: CircleDollarSign, tone: 'yellow' };
  }
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export default function SuperAdminNotificationsPage() {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState('');
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    let cancelled = false;

    async function loadActivities() {
      setError('');
      if (refreshKey > 0) setRefreshing(true);
      else setLoading(true);

      try {
        const token = localStorage.getItem('super_admin_token');
        const response = await fetch(
          `/api/super-admin/dashboard/recent-activities?page=${page}&limit=${PAGE_SIZE}`,
          {
            credentials: 'include',
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            cache: 'no-store',
          },
        );

        if (response.status === 401 || response.status === 403) {
          router.replace('/supper-admin/login');
          return;
        }

        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Unable to load notifications.');
        }

        if (!cancelled) {
          setActivities(result.data || []);
          setTotal(Number(result.total) || 0);
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : 'Unable to load notifications.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    }

    loadActivities();
    return () => {
      cancelled = true;
    };
  }, [page, refreshKey, router]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">All Notifications</h2>
          <p className="mt-1 text-sm text-slate-500">
            {total} platform {total === 1 ? 'activity' : 'activities'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setRefreshKey((current) => current + 1)}
          disabled={loading || refreshing}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="h-7 w-7 animate-spin text-amber-500" />
            <p className="text-sm">Loading notifications...</p>
          </div>
        ) : error ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-5 text-center">
            <p className="text-sm text-red-700">{error}</p>
            <button
              type="button"
              onClick={() => setRefreshKey((current) => current + 1)}
              className="rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-300"
            >
              Try again
            </button>
          </div>
        ) : activities.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-slate-500">
            <Inbox className="h-9 w-9 text-slate-300" />
            <p className="text-sm">No platform activity yet.</p>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-slate-100">
              {activities.map((activity) => {
                const presentation = getActivityPresentation(activity.type);
                const Icon = presentation.icon;

                return (
                  <li key={`${activity.type}-${activity.id}`} className="flex gap-4 px-4 py-5 sm:px-6">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      presentation.tone === 'green' ? 'bg-green-50 text-green-700' :
                      presentation.tone === 'blue' ? 'bg-blue-50 text-blue-700' :
                      presentation.tone === 'orange' ? 'bg-orange-50 text-orange-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-semibold text-slate-900">{presentation.label}</h3>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-600">
                          {activity.status || 'Recorded'}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{activity.description}</p>
                      <time dateTime={activity.timestamp} className="mt-2 block text-xs text-slate-400">
                        {formatTimestamp(activity.timestamp)}
                      </time>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 sm:px-6">
              <p className="text-sm text-slate-500">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page <= 1}
                  aria-label="Previous page"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={page >= totalPages}
                  aria-label="Next page"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}