'use client';

import React from 'react';

type Tone = 'yellow' | 'green' | 'blue' | 'orange' | 'red' | 'purple';

interface FinancialCardProps {
  icon: React.ReactNode;
  tone: Tone;
  label: string;
  value: string | number;
  subtitle: string;
  action: string;
  onAction?: () => void;
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

export default function FinancialCard({
  icon,
  tone,
  label,
  value,
  subtitle,
  action,
  onAction,
}: FinancialCardProps) {
  return (
    <>
      <style>{`
        .financial-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .financial-card:hover {
          border-color: #d1d5db;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .financial-top {
          display: flex;
          gap: 12px;
          align-items: flex-start;
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

        .financial-top > div {
          flex: 1;
        }

        .financial-top .muted {
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .financial-top strong {
          display: block;
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
          line-height: 1.2;
        }

        .financial-subtitle {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        .gold-button {
          background: linear-gradient(135deg, #f5c400 0%, #e6b400 100%);
          color: #000;
          border: none;
          border-radius: 6px;
          padding: 10px 16px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s;
          width: 100%;
        }

        .gold-button:hover {
          background: linear-gradient(135deg, #e6b400 0%, #d4a300 100%);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(245, 196, 0, 0.3);
        }

        .arrow {
          font-size: 12px;
        }

        @media (max-width: 768px) {
          .financial-card {
            padding: 16px;
            gap: 12px;
          }

          .financial-top strong {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="financial-card">
        <div className="financial-top">
          <div
            className="icon-bubble"
            style={{
              background: toneColors[tone],
              color: textColorMap[tone],
            }}
          >
            {icon}
          </div>
          <div>
            <div className="muted">{label}</div>
            <strong>{value}</strong>
          </div>
        </div>
        <div className="financial-subtitle">{subtitle}</div>
        <button className="gold-button" onClick={onAction}>
          {action} <span className="arrow">→</span>
        </button>
      </div>
    </>
  );
}
