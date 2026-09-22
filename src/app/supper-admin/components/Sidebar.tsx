'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


interface SidebarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
  mobileNav: boolean;
  setMobileNav: (open: boolean) => void;
  onLogout: () => void;
}

const navItems = [
  { icon: '▦', label: 'Dashboard', key: 'Dashboard', route: '/supper-admin/Dashboard' },
  { 
    icon: '♙', 
    label: 'Members', 
    key: 'Members',
    subItems: [
      { label: 'All Members', key: 'AllMembers', route: '/supper-admin/members' },
      // { label: 'Add Member', key: 'AddMember', route: '/supper-admin/members/add' },
      // { label: 'Bulk Upload', key: 'BulkUpload', route: '/supper-admin/members/bulk' },
      { label: 'Member Approvals', key: 'MemberApprovals', route: '/supper-admin/members/pending' },
    ]
  },
  { icon: '♧', label: 'Referrals', key: 'Referrals' },
//  { icon: '▣', label: 'Income & Wallets', key: 'Income' },
  // { icon: '⇩', label: 'Withdrawals', key: 'Withdrawals' },
  // { icon: '⇧', label: 'Top-up Requests', key: 'Topups' },
  // { icon: '♜', label: 'Rewards', key: 'Rewards' },
  // { icon: '▤', label: 'Reports', key: 'Reports' },
  { icon: '⚙', label: 'Settings', key: 'Settings' },
  // { icon: '♙', label: 'Admin Management', key: 'AdminMgmt' },
];

export default function Sidebar({
  activeNav,
  setActiveNav,
  mobileNav,
  setMobileNav,
  onLogout,
}: SidebarProps) {
  const router = useRouter();
  const [expandedNav, setExpandedNav] = useState<string | null>('Members');

  const handleNavClick = (key: string, route?: string) => {
    setActiveNav(key);
    setMobileNav(false);
    if (route) {
      router.push(route);
    }
  };

  const toggleExpand = (key: string) => {
    setExpandedNav(expandedNav === key ? null : key);
  };

  return (
    <>
      <style>{`
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          width: 280px;
          height: 100vh;
          background: #1a1f24;
          border-right: 1px solid #2a3037;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow-y: auto;
        }

        .sidebar.mobile-open {
          transform: translateX(0);
        }

        .brand {
          padding: 24px 20px;
          border-bottom: 1px solid #2a3037;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-mark {
          font-size: 28px;
          line-height: 1;
          color: #f5c400;
        }

        .brand-name {
          font-size: 20px;
          font-weight: bold;
          color: white;
          line-height: 1.2;
        }

        .brand-sub {
          font-size: 11px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 2px;
        }

        .nav-list {
          flex: 1;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 16px;
          border: none;
          background: none;
          color: #888;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          border-radius: 6px;
          transition: all 0.2s;
          width: 100%;
          text-align: left;
        }

        .nav-item:hover {
          background: #242a30;
          color: #bbb;
        }

        .nav-item.active {
          background: linear-gradient(90deg, #f5c400 0%, #e6b400 100%);
          color: #000;
          font-weight: 600;
        }

        .nav-item-content {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .nav-icon {
          font-size: 16px;
          display: flex;
          align-items: center;
        }

        .nav-chevron {
          font-size: 14px;
          display: flex;
          align-items: center;
          transition: transform 0.3s;
        }

        .nav-item.expanded .nav-chevron {
          transform: rotate(180deg);
        }

        .subnav-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.2);
          margin: 4px 8px;
          border-radius: 6px;
          max-height: 500px;
          overflow: hidden;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            max-height: 0;
            opacity: 0;
          }
          to {
            max-height: 500px;
            opacity: 1;
          }
        }

        .subnav-item {
          padding: 10px 12px;
          font-size: 13px;
          color: #aaa;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s;
          border-left: 3px solid transparent;
        }

        .subnav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ddd;
        }

        .subnav-item.active {
          background: rgba(245, 196, 0, 0.1);
          color: #f5c400;
          border-left-color: #f5c400;
          font-weight: 600;
        }

        .health {
          padding: 16px 20px;
          margin: 12px 8px;
          border: 1px solid #2a3037;
          border-radius: 8px;
          background: rgba(245, 196, 0, 0.05);
        }

        .health-title {
          font-size: 12px;
          font-weight: 600;
          color: #f5c400;
          text-transform: uppercase;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .health-row {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #888;
          font-size: 13px;
        }

        .shield {
          color: #4ade80;
          font-weight: bold;
        }

        .logout {
          margin: 12px 8px 20px;
          padding: 12px 16px;
          border: 1px solid #2a3037;
          border-radius: 6px;
          background: none;
          color: #e74c3c;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .logout:hover {
          background: rgba(231, 76, 60, 0.1);
          border-color: #e74c3c;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            max-width: 280px;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
          }
        }
      `}</style>

      <aside className={`sidebar ${mobileNav ? 'mobile-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">♜</div>
          <div>
            <div className="brand-name">MBD</div>
            <div className="brand-sub">SUPER ADMIN</div>
          </div>
        </div>

        <nav className="nav-list">
          {navItems.map(({ icon, label, key, route, subItems }) => (
            <div key={key}>
              <button
                className={`nav-item ${activeNav === key ? 'active' : ''} ${
                  subItems && expandedNav === key ? 'expanded' : ''
                }`}
                onClick={() => {
                  if (subItems) {
                    toggleExpand(key);
                  } else {
                    handleNavClick(key, route);
                  }
                }}
                aria-label={label}
                title={label}
              >
                <div className="nav-item-content">
                  <span className="nav-icon">{icon}</span>
                  <span>{label}</span>
                </div>
                {subItems && <span className="nav-chevron">⌄</span>}
              </button>

              {subItems && expandedNav === key && (
                <div className="subnav-list bg-yellow-500">
                  {subItems.map(({ label: subLabel, key: subKey, route }) => (
                    <button
                      key={subKey}
                      className={`subnav-item ${activeNav === subKey ? 'active' : ''}`}
                      onClick={() => handleNavClick(subKey, route)}
                      style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                    >
                      {subLabel}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* <div className="health">
          <div className="health-title">
            <span>Platform Health</span>
            <i />
          </div>
          <div className="health-row">
            <span className="shield">✓</span>
            <span>All Systems Operational</span>
          </div>
        </div> */}

        <button className="logout" onClick={onLogout}>
          <span>⇥</span> Logout
        </button>
      </aside>
    </>
  );
}
