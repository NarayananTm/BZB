import type { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'BZB - Born to Win | Real Estate & Investment Platform',
  description:
    'Join BZB and invest in quality real estate projects, grow your network through our referral program, and unlock exclusive rewards.',
  keywords: [
    'real estate',
    'property investment',
    'referral program',
    'membership',
    'BZB',
  ],
  authors: [{ name: 'BZB Team' }],
  viewport: 'width=device-width, initial-scale=1.0',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://bzb.com',
    title: 'BZB - Born to Win',
    description: 'Real Estate & Investment Platform',
    images: [
      {
        url: 'https://bzb.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BZB Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BZB - Born to Win',
    description: 'Real Estate & Investment Platform',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#FFC107" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
