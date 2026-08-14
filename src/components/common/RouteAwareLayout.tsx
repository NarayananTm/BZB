'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

export default function RouteAwareLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navigation />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}
