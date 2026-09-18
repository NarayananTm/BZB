'use client';

import React from 'react';

type Status = 'Active' | 'Pending' | 'Suspended' | 'Rejected';

interface StatusPillProps {
  status: Status;
}

const statusConfig: Record<Status, { bg: string; text: string; icon: string }> = {
  Active: { bg: '#d1fae5', text: '#065f46', icon: '✓' },
  Pending: { bg: '#fef3c7', text: '#92400e', icon: '⏳' },
  Suspended: { bg: '#fee2e2', text: '#7f1d1d', icon: '⚠' },
  Rejected: { bg: '#fecaca', text: '#7f1d1d', icon: '✗' },
};

export default function StatusPill({ status }: StatusPillProps) {
  const config = statusConfig[status] || statusConfig.Pending;

  return (
    <>
      <style>{`
        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          background-color: ${config.bg};
          color: ${config.text};
        }
      `}</style>

      <span className="status-pill">{config.icon} {status}</span>
    </>
  );
}
