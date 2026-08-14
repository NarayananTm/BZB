'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Layers,
  Share2,
  DollarSign,
  CreditCard,
  ArrowUpRight,
  Bell,
  Settings,
  FileText,
  ClipboardList,
  ShieldCheck,
  LogOut,
  Menu,
  ChevronLeft,
  User,
} from 'lucide-react';

import { ROUTES } from '@/utils/constants';

const navItems = [
  { label: 'Dashboard', href: ROUTES.ADMIN, icon: LayoutDashboard },
  { label: 'Members', href: ROUTES.ADMIN + '/members', icon: Users },
  { label: 'Team', href: ROUTES.ADMIN + '/team', icon: Layers },
  { label: 'Referrals', href: ROUTES.ADMIN + '/referrals', icon: Share2 },
  { label: 'Earnings', href: ROUTES.ADMIN + '/earnings', icon: DollarSign },
  { label: 'Top-ups', href: ROUTES.ADMIN + '/topups', icon: CreditCard },
  { label: 'Withdrawals', href: ROUTES.ADMIN + '/withdrawals', icon: ArrowUpRight },
  { label: 'Payouts', href: ROUTES.ADMIN + '/payouts', icon: ClipboardList },
  { label: 'Reports', href: ROUTES.ADMIN + '/reports', icon: FileText },
  { label: 'Notifications', href: ROUTES.ADMIN + '/notifications', icon: Bell },
  { label: 'Profile', href: ROUTES.ADMIN + '/profile', icon: ShieldCheck },
  { label: 'Settings', href: ROUTES.ADMIN + '/settings', icon: Settings },
];

function Sidebar({ collapsed, pathname }: { collapsed: boolean; pathname: string }) {
  return (
    <aside className={`flex h-full w-full flex-col gap-4 overflow-hidden ${collapsed ? 'w-20' : 'w-72'} transition-all duration-300`}>
      <div className="flex items-center gap-3 rounded-3xl border border-slate-200/70 bg-white p-4 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5C400] text-slate-950">
          B
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-semibold text-slate-950">BZB Admin</p>
            <p className="text-xs text-slate-500">Portal</p>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto pr-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-[#E5C400] text-slate-950' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && item.label}
            </Link>
          );
        })}
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white p-4 shadow-sm">
        <button className="flex w-full items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
          <span>Logout</span>
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}

function TopHeader({ title }: { title: string }) {
  return (
    <div className="sticky top-0 z-20 flex flex-col gap-4 rounded-3xl border border-slate-200/70 bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-500">Admin Portal</p>
          <h1 className="text-3xl font-semibold text-slate-950">{title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-xs md:w-auto">
            <input
              type="search"
              placeholder="Search members, referrals, transactions"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#E5C400] focus:ring-2 focus:ring-[#E5C400]/20"
            />
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            <Bell className="h-4 w-4" />
            Notifications
          </button>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="h-10 w-10 rounded-full bg-slate-900 text-white grid place-items-center">A</div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Admin</p>
              <p className="text-xs text-slate-500">superadmin@bzb.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children, title, userName = 'Kavi' }: { children: ReactNode; title: string, userName?: string }) {
  const pathname = usePathname() || '';

  const linkActive = (href: string) => {
    if (href === ROUTES.ADMIN) return pathname === ROUTES.ADMIN;
    return pathname.startsWith(href);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F8F8] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-5 lg:px-6 xl:px-8">
        <div className="flex min-h-[calc(100vh-40px)] flex-1 flex-col gap-6">
          <div className="rounded-[32px] border border-slate-200/70 bg-white p-6 shadow-sm">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h1 className="text-[30px] font-semibold text-[#111111]"></h1>

              </div>

              <div className="flex items-center gap-4">
                <div className="inline-flex items-center rounded-full bg-black p-1 text-sm font-medium text-white shadow-sm">
                  <Link
                    href="/admin"
                    aria-current={linkActive(ROUTES.ADMIN) ? 'page' : undefined}
                    className={`inline-flex items-center rounded-full px-5 py-3 ${linkActive(ROUTES.ADMIN) ? 'text-[#E5C500]' : 'text-white'}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/referrals"
                    aria-current={linkActive(ROUTES.ADMIN + '/referrals') ? 'page' : undefined}
                    className={`inline-flex items-center rounded-full px-5 py-3 ${linkActive(ROUTES.ADMIN + '/referrals') ? 'text-[#E5C500]' : 'text-white'}`}
                  >
                    Referral
                  </Link>
                  <Link
                    href="/admin/profile"
                    aria-current={linkActive(ROUTES.ADMIN + '/profile') ? 'page' : undefined}
                    className={`inline-flex items-center rounded-full px-5 py-3 ${linkActive(ROUTES.ADMIN + '/profile') ? 'text-[#E5C500]' : 'text-white'}`}
                  >
                    Profile
                  </Link>
                </div>

                <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="relative">
                  <Link
                    href="/admin/user-profile"
                    onClick={() => setMenuOpen((s) => !s)}
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black"
                  >
                    <User
                      className={`h-5 w-5 transition-colors duration-200 
                       ${linkActive(ROUTES.ADMIN + '/user-profile') ? "text-[#E5C500]" : "text-white"
                        }`}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
