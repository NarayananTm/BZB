'use client';

import React from 'react';

interface PendingMemberCardProps {
  member: {
    id: string;
    name: string;
    email: string;
    phone: string;
    referrer_name: string;
    address: string;
    days_pending: number;
    status: string;
  };
  onReview: (memberId: string) => void;
}

export default function PendingMemberCard({ member, onReview }: PendingMemberCardProps) {
  const daysColor =
    member.days_pending > 30
      ? '#ef4444'
      : member.days_pending > 14
        ? '#f97316'
        : '#4ade80';

  return (
    <>
      <style>{`
        .member-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .member-card:hover {
          border-color: #d1d5db;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }

        .member-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f5c400 0%, #e6b400 100%);
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 18px;
          flex-shrink: 0;
        }

        .card-header-info {
          flex: 1;
        }

        .member-name {
          font-size: 15px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 2px;
        }

        .member-email {
          font-size: 12px;
          color: #6b7280;
        }

        .card-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
        }

        .info-label {
          color: #6b7280;
          font-weight: 500;
        }

        .info-value {
          color: #1f2937;
          font-weight: 600;
        }

        .days-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          color: white;
        }

        .card-footer {
          display: flex;
          gap: 8px;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
        }

        .review-btn {
          flex: 1;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          background: linear-gradient(135deg, #f5c400 0%, #e6b400 100%);
          color: #000;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .review-btn:hover {
          background: linear-gradient(135deg, #e6b400 0%, #d4a300 100%);
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .member-card {
            padding: 16px;
          }

          .card-body {
            gap: 6px;
          }
        }
      `}</style>

      <div className="member-card">
        <div className="card-header">
          <div className="member-avatar">
            {member.name.charAt(0).toUpperCase()}
          </div>
          <div className="card-header-info">
            <div className="member-name">{member.name}</div>
            <div className="member-email">{member.email}</div>
          </div>
        </div>

        <div className="card-body">
          <div className="info-row">
            <span className="info-label">Phone:</span>
            <span className="info-value">{member.phone}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Referred By:</span>
            <span className="info-value">{member.referrer_name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Location:</span>
            <span className="info-value">{member.address}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Pending Since:</span>
            <span
              className="days-badge"
              style={{ backgroundColor: daysColor }}
            >
              {member.days_pending} days
            </span>
          </div>
        </div>

        <div className="card-footer">
          <button
            className="review-btn"
            onClick={() => onReview(member.id)}
          >
            Review Member →
          </button>
        </div>
      </div>
    </>
  );
}
