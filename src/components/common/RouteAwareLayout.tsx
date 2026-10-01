'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

export default function RouteAwareLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const isAdminRoute = pathname.startsWith('/admin');
  const isSuperAdminRoute = pathname.startsWith('/supper-admin');

  useEffect(() => {
    const originalFetch = window.fetch;
    let redirecting = false;

    window.fetch = async (...args) => {
      const response = await originalFetch.apply(window, args);
      const input = args[0];
      const requestUrl =
        typeof input === 'string'
          ? input
          : input instanceof URL
            ? input.toString()
            : input.url;

      try {
        const url = new URL(requestUrl, window.location.href);
        if (/\/api(?:\/|$)/.test(url.pathname)) {
          const data = await response.clone().json();
          const message =
            typeof data?.message === 'string'
              ? data.message.toLowerCase()
              : '';

          if (
            !redirecting &&
            data?.success === false &&
            message.includes('sign in to continue')
          ) {
            redirecting = true;
            const currentPath = window.location.pathname;
            const loginPath = currentPath === '/admin/notifications'
              ? '/login'
              : currentPath.startsWith('/supper-admin')
                ? '/supper-admin/login'
                : currentPath.startsWith('/admin')
                  ? '/admin/login'
                  : '/admin/login';

            if (currentPath !== loginPath) {
              window.location.replace(loginPath);
            }
          }
        }
      } catch {
        // Leave non-JSON API responses unchanged.
      }

      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <>
      {!isAdminRoute && !isSuperAdminRoute && <Navigation />}
      {children}
      {!isAdminRoute && !isSuperAdminRoute && <Footer />}
    </>
  );
}
