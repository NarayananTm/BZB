'use client';

import React from 'react';

type Tone = 'yellow' | 'green' | 'blue' | 'orange' | 'red' | 'purple';

interface StatCardProps {
  icon: React.ReactNode;
  tone: Tone;
  label: string;
  value: string | number;
  note: string;
  noteType?: 'positive' | 'warning';
}

const toneColors: Record<Tone, string> = {
  yellow: 'linear-gradient(135deg, #f5c400 0%, #e6b400 100%)',
  green: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
  blue: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
  orange: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
  red: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
  purple: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
};

const textColorMap: Record<Tone, string> = {
  yellow: '#000',
  green: '#fff',
  blue: '#fff',
  orange: '#fff',
  red: '#fff',
  purple: '#fff',
};

export default function StatCard({
  icon,
  tone,
  label,
  value,
  note,
  noteType = 'positive',
}: StatCardProps) {
  return (
    <>
      <style>{`
        .stat-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 20px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          border-color: #d1d5db;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .icon-bubble {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
          font-weight: 600;
        }

        .stat-copy {
          flex: 1;
        }

        .stat-copy .muted {
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .stat-copy strong {
          display: block;
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .stat-note {
          font-size: 12px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .stat-note.positive {
          color: #059669;
        }

        .stat-note.warning {
          color: #d97706;
        }

        @media (max-width: 768px) {
          .stat-card {
            padding: 16px;
            gap: 12px;
          }

          .icon-bubble {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .stat-copy strong {
            font-size: 22px;
          }
        }
      `}</style>

      <div className="stat-card">
        <div
          className="icon-bubble"
          style={{
            background: toneColors[tone],
            color: textColorMap[tone],
          }}
        >
          {icon}
        </div>
        <div className="stat-copy">
          <div className="muted">{label}</div>
          <strong>{value}</strong>
          <div className={`stat-note ${noteType}`}>
            {noteType === 'positive' && <span>↑</span>}
            {noteType === 'warning' && <span>⚠</span>}
            {note}
          </div>
        </div>
      </div>
    </>
  );
}
