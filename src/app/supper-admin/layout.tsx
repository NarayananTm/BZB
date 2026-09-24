'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [mobileNav, setMobileNav] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [adminName, setAdminName] = useState('Super Admin');
  const [headerTitle, setHeaderTitle] = useState('Welcome, Super Admin');
  const [headerSubtitle, setHeaderSubtitle] = useState('Monitor members, referrals, wallets and platform activity from one place.');
  const [headerBreadcrumb, setHeaderBreadcrumb] = useState<string[]>([]);
  const isLoginPage = pathname === '/supper-admin/login';

  // Determine active navigation and header content based on current path
  useEffect(() => {
    if (pathname.includes('/members/pending')) {
      setActiveNav('Members');
      setHeaderBreadcrumb(['Members', 'Member Approvals']);
      setHeaderTitle('Pending Review');
      setHeaderSubtitle('Review and approve or reject new member registration requests.');
    } else if (pathname.includes('/members')) {
      setActiveNav('Members');
      setHeaderBreadcrumb(['Members', 'All Members']);
      setHeaderTitle('All Members');
      setHeaderSubtitle('View and manage all registered members.');
    } else if (pathname.includes('/referrals')) {
      setActiveNav('Referrals');
      setHeaderBreadcrumb(['Referrals']);
      setHeaderTitle('Referral Network');
      setHeaderSubtitle('Manage referral levels and connections.');
    } else if (pathname.includes('/income')) {
      setActiveNav('Income');
      setHeaderBreadcrumb(['Income & Wallets']);
      setHeaderTitle('Income & Wallets');
      setHeaderSubtitle('Track member income and wallet balances.');
    } else if (pathname.includes('/withdrawals')) {
      setActiveNav('Withdrawals');
      setHeaderBreadcrumb(['Withdrawals']);
      setHeaderTitle('Withdrawal Requests');
      setHeaderSubtitle('Review and process member withdrawal requests.');
    } else if (pathname.includes('/topups')) {
      setActiveNav('Topups');
      setHeaderBreadcrumb(['Top-up Requests']);
      setHeaderTitle('Top-up Requests');
      setHeaderSubtitle('Review and process member top-up requests.');
    } else if (pathname.includes('/rewards')) {
      setActiveNav('Rewards');
      setHeaderBreadcrumb(['Rewards']);
      setHeaderTitle('Rewards & Achievements');
      setHeaderSubtitle('Manage achievement levels and reward configuration.');
    } else if (pathname.includes('/reports')) {
      setActiveNav('Reports');
      setHeaderBreadcrumb(['Reports']);
      setHeaderTitle('Reports');
      setHeaderSubtitle('View platform activity and member reports.');
    } else if (pathname.includes('/settings')) {
      setActiveNav('Settings');
      setHeaderBreadcrumb(['Settings']);
      setHeaderTitle('Settings');
      setHeaderSubtitle('Configure platform settings and preferences.');
    } else if (pathname.includes('/admin')) {
      setActiveNav('AdminMgmt');
      setHeaderBreadcrumb(['Admin Management']);
      setHeaderTitle('Admin Management');
      setHeaderSubtitle('Manage admin users and permissions.');
    } else {
      setActiveNav('Dashboard');
      setHeaderBreadcrumb([]);
      setHeaderTitle('Welcome, Super Admin');
      setHeaderSubtitle('Monitor members, referrals, wallets and platform activity from one place.');
    }
  }, [pathname]);

  // Fetch notifications count
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/super-admin/notifications');
        if (response.ok) {
          const data = await response.json();
          setUnreadNotifications(data.unread_count || 0);
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Keep the shared header in sync with the editable profile.
  useEffect(() => {
    const readProfileName = () => {
      const storedProfile = localStorage.getItem('super_admin_profile');
      if (!storedProfile) {
        setAdminName('Super Admin');
        if (pathname === '/supper-admin/Dashboard') {
          setHeaderTitle('Welcome, Super Admin');
        }
        return;
      }

      try {
        const profile = JSON.parse(storedProfile) as { name?: string };
        const name = profile.name?.trim() || 'Super Admin';
        setAdminName(name);
        if (pathname === '/supper-admin/Dashboard') {
          setHeaderTitle(`Welcome, ${name}`);
        }
      } catch {
        setAdminName('Super Admin');
        if (pathname === '/supper-admin/Dashboard') {
          setHeaderTitle('Welcome, Super Admin');
        }
      }
    };

    readProfileName();
    window.addEventListener('super-admin-profile-updated', readProfileName);
    window.addEventListener('storage', readProfileName);

    return () => {
      window.removeEventListener('super-admin-profile-updated', readProfileName);
      window.removeEventListener('storage', readProfileName);
    };
  }, [pathname]);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem('super_admin_token');
      localStorage.removeItem('super_admin_logged_in');
      
      // Redirect to login
      router.push('/supper-admin/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  // Close mobile nav when route changes
  useEffect(() => {
    setMobileNav(false);
  }, [pathname]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fb' }}>
      {!isLoginPage && (
        <Sidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          mobileNav={mobileNav}
          setMobileNav={setMobileNav}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: isLoginPage ? 0 : '280px', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Header
          mobileNavOpen={mobileNav}
          toggleMobileNav={() => setMobileNav(!mobileNav)}
          unreadNotifications={unreadNotifications}
          adminName={adminName}
          adminRole="Administrator"
          title={headerTitle}
          subtitle={headerSubtitle}
          breadcrumb={headerBreadcrumb}
        />

        {/* Page Content */}
        <main style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileNav && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={() => setMobileNav(false)}
        />
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          main {
            margin-left: 0;
          }

          aside {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 1001;
          }
        }
      `}</style>
    </div>
  );
}
