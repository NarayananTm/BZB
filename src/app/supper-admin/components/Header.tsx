'use client';

import { ChevronRight } from 'lucide-react';
import React from 'react';

interface HeaderProps {
  mobileNavOpen: boolean;
  toggleMobileNav: () => void;
  unreadNotifications?: number;
  adminName?: string;
  adminRole?: string;
  title?: string;
  subtitle?: string;
  breadcrumb?: string[];
}

export default function Header({
  mobileNavOpen,
  toggleMobileNav,
  adminName = 'Super Admin',
  adminRole = 'Administrator',
  title = 'Welcome, Super Admin',
  subtitle = 'Monitor members, referrals, wallets and platform activity from one place.',
  breadcrumb = [],
}: HeaderProps) {
  return (
    <>
      <style>{`
        .header {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          z-index: 900;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
        }

        .hamburger {
          display: none;
          width: 40px;
          height: 40px;
          border: none;
          background: #f3f4f6;
          border-radius: 6px;
          cursor: pointer;
          font-size: 20px;
          transition: all 0.2s;
        }

        .hamburger:hover {
          background: #e5e7eb;
        }

        .header-left h1 {
          font-size: 25px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-left p {
          font-size: 13px;
          color: #6b7280;
          margin: 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .secondary-button,
        .primary-button {
          border: none;
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .secondary-button {
          background: white;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .secondary-button:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .primary-button {
          background: #f5c400;
          color: #000;
          font-weight: 600;
        }

        .primary-button:hover {
          background: #e6b400;
        }

        .notification {
          position: relative;
          width: 40px;
          height: 40px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          font-size: 18px;
          transition: all 0.2s;
        }

        .notification:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }

        .notification b {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #ef4444;
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: bold;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .profile:hover {
          background: #f3f4f6;
        }

        .profile-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f5c400 0%, #e6b400 100%);
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          flex-shrink: 0;
        }

        .profile-copy {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .profile-copy strong {
          font-size: 13px;
          color: #1f2937;
          font-weight: 600;
          line-height: 1.2;
        }

        .profile-copy span {
          font-size: 12px;
          color: #6b7280;
          line-height: 1.2;
        }

        .chevron {
          color: #9ca3af;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .header {
            padding: 0 16px;
            gap: 12px;
          }

          .hamburger {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .header-left h1,
          .secondary-button {
            display: none;
          }

          .header-left p {
            display: none;
          }

          .header-actions {
            gap: 8px;
          }

          .primary-button {
            padding: 8px 12px;
            font-size: 12px;
          }

          .profile-copy {
            display: none;
          }
        }
      `}</style>

      <header className={`${mobileNavOpen ? "ml-[220px]" : "ml-0"} header`}>
        <div className="header-left text-gray-400">
          <button
            className="hamburger"
            onClick={toggleMobileNav}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <div>
            {breadcrumb && breadcrumb.length > 0 ? (
              <>
                <div className="flex items-center gap-2 text-[13px] mb-2">
                  {breadcrumb.map((item, index) => (
                    <React.Fragment key={index}>
                      <span className={index === 0 ? 'font-semibold text-gray-600' : 'text-gray-500'}>
                        {item}
                      </span>
                      {index < breadcrumb.length - 1 && (
                        <ChevronRight size={15} className="text-gray-400" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                {/* <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1f2937', margin: 0 }}>
                  {title}
                </h1> */}
              </>
            ) : (
              <>
                <h1>
                  {title} <span>👋</span>
                </h1>
                <p>{subtitle}</p>
              </>
            )}
          </div>
        </div>

        <div className="header-actions">
          <div className="profile">
            <div className="profile-avatar">SA</div>
            <div className="profile-copy">
              <strong>{adminName}</strong>
              <span>{adminRole}</span>
            </div>
            <span className="chevron">⌄</span>
          </div>
        </div>
      </header>
    </>
  );
}
