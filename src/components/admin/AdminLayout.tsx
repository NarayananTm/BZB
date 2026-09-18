'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Bell,
  User,
  Menu,
  X,
  LayoutDashboard,
  Users,
  UserCircle,
} from 'lucide-react';

import { ROUTES } from '@/utils/constants';
import Image from 'next/image';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
  title: string;
  userName?: string;
}) {
  const pathname = usePathname() || '';

  const [menuOpen, setMenuOpen] = useState(false);

  const linkActive = (href: string) => {
    if (href === ROUTES.ADMIN) {
      return pathname === ROUTES.ADMIN;
    }

    return pathname.startsWith(href);
  };

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Referral',
      href: '/admin/referrals',
      icon: Users,
    },
    {
      name: 'Profile',
      href: '/admin/profile',
      icon: UserCircle,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8F8F8] text-slate-900">
      <div
        className="
          mx-auto
          min-h-screen
          w-full
          max-w-[1600px]
          px-2
          py-2
          sm:px-3
          sm:py-3
          md:px-6
          md:py-4
          xl:px-8
        "
      >
        <div className="flex min-h-[calc(100vh-16px)] flex-col">
          {/* ================= HEADER ================= */}
          <header
            className="
              rounded-[18px]
              border border-slate-200/70
              bg-white
              px-3 py-3
              shadow-sm
              sm:rounded-[24px]
              sm:px-4 sm:py-4
              md:rounded-[28px]
              md:px-6 md:py-5
            "
          >
            <div className="flex items-center justify-between gap-3">
              {/* ================= LOGO ================= */}
              <Link
                href="/admin/dashboard"
                className="flex shrink-0 items-center"
              >
                <Image
                  src="/images/admin/logo/MBD_logo.svg"
                  alt="MBD Logo"
                  width={150}
                  height={70}
                  priority
                  className="
                    h-auto
                    w-[105px]
                    object-contain
                    sm:w-[125px]
                    md:w-[150px]
                  "
                />
              </Link>

              {/* ================= DESKTOP NAV ================= */}
              <div className="hidden items-center gap-3 lg:flex">
                <nav
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    bg-black
                    p-1
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  {navItems.map((item) => {
                    const active = linkActive(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={`
                          inline-flex
                          items-center
                          rounded-full
                          px-5
                          py-3
                          transition-colors
                          ${active
                            ? 'text-[#E5C500]'
                            : 'text-white hover:text-[#E5C500]'
                          }
                        `}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>

                {/* Notification */}
                <button
                  type="button"
                  aria-label="Notifications"
                  className="
                    inline-flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-white
                    transition
                    hover:bg-slate-800
                  "
                >
                  <Bell className="h-5 w-5" />
                </button>

                {/* User */}
                <Link
                  href="/admin/user-profile"
                  aria-label="User profile"
                  className="
                    inline-flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                  "
                >
                  <User
                    className={`
                      h-5 w-5
                      ${linkActive(ROUTES.ADMIN + '/user-profile')
                        ? 'text-[#E5C500]'
                        : 'text-white'
                      }
                    `}
                  />
                </Link>
              </div>

              {/* ================= MOBILE HEADER ================= */}
              <div className="flex items-center gap-2 lg:hidden">
                {/* Notification */}
                <Link
                  href="/admin/notifications"
                  aria-label="User profile"
                  className="
                    inline-flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    sm:h-11
                    sm:w-11
                  "
                >
                  <Bell
                    className={`
                      h-[18px]
                      w-[18px]
                      sm:h-5
                      sm:w-5
                      ${linkActive(ROUTES.ADMIN + '/notifications')
                        ? 'text-[#E5C500]'
                        : 'text-white'
                      }
                    `}
                  />
                </Link>
                {/* User */}
                <Link
                  href="/admin/user-profile"
                  aria-label="User profile"
                  className="
                    inline-flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    sm:h-11
                    sm:w-11
                  "
                >
                  <User
                    className={`
                      h-[18px]
                      w-[18px]
                      sm:h-5
                      sm:w-5
                      ${linkActive(ROUTES.ADMIN + '/user-profile')
                        ? 'text-[#E5C500]'
                        : 'text-white'
                      }
                    `}
                  />
                </Link>

                {/* Hamburger */}
                <button
                  type="button"
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((value) => !value)}
                  className="
                    inline-flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-black
                    text-white
                    sm:h-11
                    sm:w-11
                  "
                >
                  {menuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* ================= MOBILE MENU ================= */}
            {menuOpen && (
              <div
                className="
                  mt-3
                  border-t
                  border-slate-200
                  pt-3
                  lg:hidden
                "
              >
                <nav className="grid gap-2">
                  {navItems.map((item) => {
                    const active = linkActive(item.href);
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`
                          flex
                          items-center
                          gap-3
                          rounded-xl
                          px-4
                          py-3
                          text-sm
                          font-medium
                          transition
                          ${active
                            ? 'bg-[#FFF8CC] text-[#C5A900]'
                            : 'text-slate-700 hover:bg-slate-100'
                          }
                        `}
                      >
                        <Icon
                          className={`
                            h-5 w-5
                            ${active
                              ? 'text-[#E5C500]'
                              : 'text-slate-500'
                            }
                          `}
                        />

                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* ================= PAGE CONTENT ================= */}
            <main className="mt-4 sm:mt-5 md:mt-6">
              {children}
            </main>
          </header>
        </div>
      </div>
    </div>
  );
}