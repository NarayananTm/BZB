'use client';

import React from 'react';

interface MembersTableProps {
  members: Member[];
  search: string;
  loading?: boolean;
  onViewMember?: (memberId: string) => void;
}

interface Member {
  id: string;
  name: string;
  email: string;
  level: string;
  status: 'Active' | 'Pending' | 'Suspended';
  joined: string;
  avatar?: string;
}

export default function MembersTable({
  members,
  search,
  loading = false,
  onViewMember,
}: MembersTableProps) {
  const filteredMembers = members.filter((m) =>
    `${m.name} ${m.id} ${m.email} ${m.level} ${m.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        .members-table {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          background: white;
        }

        .table-head {
          display: grid;
          grid-template-columns: 200px 150px 100px 120px 130px 50px;
          gap: 16px;
          padding: 16px;
          min-width: 846px;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .table-body {
          max-height: 600px;
          overflow-x: auto;
          overflow-y: auto;
        }

        .table-row {
          display: grid;
          grid-template-columns: 200px 150px 100px 120px 130px 50px;
          gap: 16px;
          padding: 16px;
          min-width: 846px;
          border-bottom: 1px solid #e5e7eb;
          align-items: center;
          font-size: 13px;
          color: #374151;
          transition: all 0.2s;
        }

        .table-row > * {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .table-row:hover {
          background: #f9fafb;
        }

        .member-cell {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          font-weight: 500;
          color: #1f2937;
        }

        .member-cell > div {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .member-avatar {
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
          overflow: hidden;
          white-space: nowrap;
        }

        .table-row .email {
          color: #6b7280;
          font-size: 12px;
        }

        .table-row .more {
          width: 32px;
          height: 32px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          background: white;
          color: #374151;
          cursor: pointer;
          font-size: 18px;
          transition: all 0.2s;
        }

        .table-row .more:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }

        .empty-state {
          padding: 40px 16px;
          text-align: center;
          color: #9ca3af;
          font-size: 13px;
        }

        .loading-state {
          padding: 40px 16px;
          text-align: center;
          color: #9ca3af;
          font-size: 13px;
        }

        @media (max-width: 1024px) {
          .table-head,
          .table-row {
            grid-template-columns: 150px 120px 100px 100px auto 40px;
          }
        }

        @media (max-width: 768px) {
          .table-head,
          .table-row {
            grid-template-columns: 1fr;
            gap: 8px;
            padding: 12px;
            min-width: 0;
          }

          .table-head {
            display: none;
          }

          .table-row {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            margin-bottom: 8px;
          }

          .table-row::before {
            content: attr(data-label);
            font-weight: 600;
            color: #6b7280;
            font-size: 11px;
            text-transform: uppercase;
            display: block;
            margin-bottom: 4px;
          }
        }
      `}</style>

      <div className="members-table">
        <div className="table-head">
          <span>Member</span>
          <span>Email</span>
          <span>Level</span>
          <span>Status</span>
          <span>Joined</span>
          <span></span>
        </div>
        <div className="table-body">
          {loading && (
            <div className="loading-state">Loading members...</div>
          )}
          {!loading && filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <div className="table-row" key={member.id}>
                <span className="member-cell">
                  <span className="member-avatar">{member.avatar || member.name.charAt(0).toUpperCase()}</span>
                  <div>
                    <div>{member.name}</div>
                    <div className="email">{member.id}</div>
                  </div>
                </span>
                <span className="email">{member.email}</span>
                <span>{member.level}</span>
                <span>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '600',
                      backgroundColor:
                        member.status === 'Active'
                          ? '#d1fae5'
                          : member.status === 'Pending'
                            ? '#fef3c7'
                            : '#fee2e2',
                      color:
                        member.status === 'Active'
                          ? '#065f46'
                          : member.status === 'Pending'
                            ? '#92400e'
                            : '#7f1d1d',
                    }}
                  >
                    {member.status}
                  </span>
                </span>
                <span>{member.joined}</span>
                <button
                  className="more"
                  onClick={() => onViewMember?.(member.id)}
                  title="View details"
                >
                  ⋮
                </button>
              </div>
            ))
          ) : (
            !loading && (
              <div className="empty-state">
                {search ? 'No members found matching your search' : 'No members found'}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
