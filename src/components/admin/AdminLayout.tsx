'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Bell,
  User,
} from 'lucide-react';

import { ROUTES } from '@/utils/constants';



export default function AdminLayout({ children }: { children: ReactNode; title: string, userName?: string }) {
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
