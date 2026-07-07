'use client';

import type { FC, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
 

  return (
    <div className="min-h-screen flex flex-col bg-dark-900">
      <Navigation/>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
