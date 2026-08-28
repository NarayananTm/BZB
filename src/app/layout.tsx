import type { Metadata } from 'next';
import '@/styles/globals.css';
import RouteAwareLayout from '@/components/common/RouteAwareLayout';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'BZB - Born to Win | Real Estate & Referral Platform',
  description: 'Build your future with BZB. Invest in real estate, grow your network through referrals, and unlock exclusive rewards.',
  keywords: ['real estate', 'investment', 'referral program', 'BZB'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RouteAwareLayout>{children}</RouteAwareLayout>
        <Toaster position="bottom-right" richColors closeButton duration={3000} />
      </body>
    </html>
  );
}
