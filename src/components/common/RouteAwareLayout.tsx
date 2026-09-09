'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

export default function RouteAwareLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const isAdminRoute = pathname.startsWith('/admin');
  const isSuperAdminRoute = pathname.startsWith('/supper-admin');

  return (
    <>
      {!isAdminRoute && !isSuperAdminRoute && <Navigation />}
      {children}
      {!isAdminRoute && !isSuperAdminRoute && <Footer />}
    </>
  );
}
