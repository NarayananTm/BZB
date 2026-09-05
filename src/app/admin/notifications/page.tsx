'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  User,
  Menu,
  X,
  CheckCheck,
  Loader2,
  RefreshCw,
  AlertCircle,
  Inbox,
} from 'lucide-react';

type Notification = {
  id: string;
  title: string;
  message: string;
  icon?: string;
  createdAt: string;
  read: boolean;
};

type NotificationResponse = {
  success: boolean;
  notifications: Notification[];
  unreadCount: number;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  message?: string;
};

const PAGE_SIZE = 10;

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * ---------------------------------------------------------
   * Format notification time
   * ---------------------------------------------------------
   */
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return 'Just now';
    }

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }

    if (days < 7) {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }

    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  /**
   * ---------------------------------------------------------
   * Load notifications
   * ---------------------------------------------------------
   */
  const loadNotifications = useCallback(
    async (showRefreshLoader = false) => {
      try {
        setError(null);

        if (showRefreshLoader) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const response = await fetch(
          `/api/admin/notifications?page=${page}&limit=${PAGE_SIZE}`,
          {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store',
          }
        );

        const data: NotificationResponse = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || 'Unable to load notifications'
          );
        }

        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Unable to load notifications';

        setError(message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [page]
  );

  /**
   * ---------------------------------------------------------
   * Initial load
   * ---------------------------------------------------------
   */
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  /**
   * ---------------------------------------------------------
   * Mark single notification as read
   * ---------------------------------------------------------
   */
  const markAsRead = async (notification: Notification) => {
    if (notification.read) {
      return;
    }

    // Optimistic UI update
    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id
          ? { ...item, read: true }
          : item
      )
    );

    setUnreadCount((count) => Math.max(0, count - 1));

    try {
      const response = await fetch(
        `/api/admin/notifications/${notification.id}/read`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Unable to mark notification as read'
        );
      }
    } catch (err) {
      // Rollback optimistic update
      setNotifications((current) =>
        current.map((item) =>
          item.id === notification.id
            ? { ...item, read: false }
            : item
        )
      );

      setUnreadCount((count) => count + 1);

      console.error('Mark notification read error:', err);
    }
  };

  /**
   * ---------------------------------------------------------
   * Mark all notifications as read
   * ---------------------------------------------------------
   */
  const markAllAsRead = async () => {
    if (unreadCount === 0 || markingAll) {
      return;
    }

    try {
      setMarkingAll(true);
      setError(null);

      const response = await fetch(
        '/api/admin/notifications/read-all',
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Unable to mark all notifications as read'
        );
      }

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          read: true,
        }))
      );

      setUnreadCount(0);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to mark notifications as read';

      setError(message);
    } finally {
      setMarkingAll(false);
    }
  };

  /**
   * ---------------------------------------------------------
   * Render notification icon
   * ---------------------------------------------------------
   */
  const renderIcon = (icon?: string) => {
    return (
      <span className="mr-2 inline-flex text-[20px] sm:text-[22px]">
        {icon || '🔔'}
      </span>
    );
  };

  return (
    <div className="min-h-full bg-[#F8F8F8] text-[#111111]">
      <div className="mx-auto min-h-screen max-w-[1600px] px-3 py-3 sm:px-5 sm:py-4 lg:px-8">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <header className="rounded-[22px] border border-slate-200/70 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* LOGO */}
            <Link
              href="/admin/dashboard"
              className="shrink-0"
            >
              <img
                src="/images/admin/logo/MBD_logo.svg"
                alt="MBD Logo"
                className="h-auto w-[105px] sm:w-[125px] lg:w-[145px]"
              />
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden items-center gap-4 lg:flex">
              <nav className="flex items-center rounded-full bg-[#151515] p-1">
                <Link
                  href="/admin/dashboard"
                  className="rounded-full px-6 py-3 text-sm font-medium text-white transition hover:text-[#E5C500]"
                >
                  Dashboard
                </Link>

                <Link
                  href="/admin/referrals"
                  className="rounded-full px-6 py-3 text-sm font-medium text-white transition hover:text-[#E5C500]"
                >
                  Referral
                </Link>

                <Link
                  href="/admin/profile"
                  className="rounded-full px-6 py-3 text-sm font-medium text-white transition hover:text-[#E5C500]"
                >
                  Profile
                </Link>
              </nav>

              {/* Notification */}
              <Link
                href="/admin/notifications"
                className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#151515] text-white"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />

                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E5C500] px-1 text-[10px] font-bold text-black">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </Link>

              {/* Profile */}
              <Link
                href="/admin/user-profile"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#151515]"
                aria-label="Profile"
              >
                <User className="h-5 w-5 text-white" />
              </Link>
            </div>

            {/* MOBILE HEADER */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Notification */}
              <Link
                href="/admin/notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-black text-white sm:h-11 sm:w-11"
              >
                <Bell className="h-5 w-5" />

                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E5C500] px-1 text-[9px] font-bold text-black">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </Link>

              {/* User */}
              <Link
                href="/admin/user-profile"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black sm:h-11 sm:w-11"
              >
                <User className="h-5 w-5 text-white" />
              </Link>

              {/* Menu */}
              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen((value) => !value)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white sm:h-11 sm:w-11"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* MOBILE NAV */}
          {mobileMenuOpen && (
            <nav className="mt-4 border-t border-slate-200 pt-3 lg:hidden">
              <div className="grid gap-2">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Dashboard
                </Link>

                <Link
                  href="/admin/referrals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Referral
                </Link>

                <Link
                  href="/admin/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Profile
                </Link>
              </div>
            </nav>
          )}

          {/* =====================================================
              PAGE HEADER
          ====================================================== */}
          <div className="mt-7 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-[28px] font-semibold tracking-tight text-[#111111] sm:text-[34px] lg:text-[38px]">
                All Notification
              </h1>

              {unreadCount > 0 && (
                <p className="mt-1 text-sm text-slate-500">
                  {unreadCount} unread notification
                  {unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Refresh */}
              <button
                type="button"
                onClick={() => loadNotifications(true)}
                disabled={refreshing || loading}
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    refreshing ? 'animate-spin' : ''
                  }`}
                />

                <span className="hidden sm:inline">
                  Refresh
                </span>
              </button>

              {/* Mark all */}
              <button
                type="button"
                onClick={markAllAsRead}
                disabled={
                  unreadCount === 0 ||
                  markingAll ||
                  loading
                }
                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#E5C500] px-4 text-sm font-medium text-black shadow-sm transition hover:bg-[#d4b700] disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
              >
                {markingAll ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCheck className="h-4 w-4" />
                )}

                <span>
                  {markingAll
                    ? 'Updating...'
                    : 'Mark all as read'}
                </span>
              </button>
            </div>
          </div>

          {/* =====================================================
              ERROR
          ====================================================== */}
          {error && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

              <div className="flex-1">
                <p className="font-medium">
                  Unable to load notifications
                </p>

                <p className="mt-1 text-sm">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={() => loadNotifications()}
                className="text-sm font-semibold underline"
              >
                Retry
              </button>
            </div>
          )}

          {/* =====================================================
              NOTIFICATION LIST
          ====================================================== */}
          <section className="mt-7">
            {loading ? (
              <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
                <div className="flex flex-col items-center gap-3 text-slate-500">
                  <Loader2 className="h-8 w-8 animate-spin text-[#E5C500]" />

                  <p className="text-sm">
                    Loading notifications...
                  </p>
                </div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF8CC]">
                  <Inbox className="h-8 w-8 text-[#D5B800]" />
                </div>

                <h2 className="mt-5 text-xl font-semibold">
                  No notifications
                </h2>

                <p className="mt-2 max-w-md text-sm text-slate-500">
                  You don't have any notifications at the
                  moment.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {notifications.map(
                  (notification, index) => (
                    <article
                      key={notification.id}
                      onClick={() =>
                        markAsRead(notification)
                      }
                      className={`
                        group
                        relative
                        cursor-pointer
                        rounded-2xl
                        border
                        px-4
                        py-5
                        transition
                        sm:px-6
                        lg:px-8
                        ${
                          notification.read
                            ? 'border-slate-200 bg-white'
                            : 'border-slate-200 bg-[#FFFEF5]'
                        }
                        hover:border-slate-300
                        hover:shadow-sm
                      `}
                    >
                      {/* Unread indicator */}
                      {!notification.read && (
                        <span className="absolute left-0 top-5 h-12 w-1 rounded-r-full bg-[#E5C500]" />
                      )}

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start gap-2">
                            <span className="shrink-0 text-base font-semibold sm:text-lg">
                              {index + 1}.
                            </span>

                            <h2
                              className={`
                                min-w-0
                                text-base
                                sm:text-[20px]
                                ${
                                  notification.read
                                    ? 'font-medium text-[#222222]'
                                    : 'font-semibold text-[#111111]'
                                }
                              `}
                            >
                              {renderIcon(
                                notification.icon
                              )}

                              <span>
                                {notification.title}
                              </span>
                            </h2>
                          </div>

                          <p className="mt-2 pl-7 text-sm leading-6 text-[#777777] sm:text-base">
                            {notification.message}
                          </p>
                        </div>

                        <time
                          dateTime={
                            notification.createdAt
                          }
                          className="pl-7 text-xs text-slate-500 sm:pl-0 sm:pt-1 sm:text-sm"
                        >
                          {formatTime(
                            notification.createdAt
                          )}
                        </time>
                      </div>
                    </article>
                  )
                )}
              </div>
            )}
          </section>

          {/* =====================================================
              PAGINATION
          ====================================================== */}
          {!loading &&
            notifications.length > 0 &&
            totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() =>
                    setPage((current) =>
                      Math.max(1, current - 1)
                    )
                  }
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="px-3 text-sm text-slate-600">
                  Page {page} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() =>
                    setPage((current) =>
                      Math.min(totalPages, current + 1)
                    )
                  }
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
        </header>
      </div>
    </div>
  );
}