'use client';

import React, { useState } from 'react';

export default function MemberAnalyticsCard({
  data,
  labels,
}: {
  data: number[];
  labels: string[];
}) {
  // simple SVG area chart rendering from data
  const width = 400;
  const height = 200;
  const chartData = data.length > 1 ? data : [data[0] ?? 0, data[0] ?? 0];
  const chartLabels = labels.length === chartData.length ? labels : chartData.map((_, index) => `${index + 1}`);
  const max = Math.max(...chartData, 1);
  const chartPoints = chartData.map((value, index) => ({
    value,
    label: chartLabels[index],
    x: (index / (chartData.length - 1)) * width,
    y: height - (value / max) * height,
  }));
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const points = chartPoints.map(({ x, y }) => `${x},${y}`).join(' ');
  const areaPath = `M0,${height} L${points} L${width},${height} Z`;
  const linePath = `M${chartPoints.map(({ x, y }) => `${x},${y}`).join(' L')}`;

  return (
    <div className="rounded-lg sm:rounded-lg md:rounded-[10px] lg:rounded-[10px] border border-[#F1F1F1] bg-white p-2 sm:p-3 md:p-4 lg:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
        <h3 className="text-xs sm:text-sm md:text-sm lg:text-sm font-semibold text-[#E5C500]">Total Members: {chartData[chartData.length - 1]}</h3>
        <div className="text-xs text-[#777777]">Monthly Based</div>
      </div>
      <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-4">
        <div className="relative">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            width="100%"
            height={height}
            preserveAspectRatio="none"
            onMouseLeave={() => setActivePoint(null)}
          >
          <defs>
            <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#D5D5D5" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#areaGrad)" />
          <path d={linePath} fill="none" stroke="#6B6B6B" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
          {/* dotted comparison line */}
            <path d={linePath} fill="none" stroke="#8FB8FF" strokeWidth={1} strokeDasharray="4 4" opacity={0.7} />
            {chartPoints.map((point, index) => (
              <circle
                key={`${point.label}-${index}`}
                cx={point.x}
                cy={point.y}
                r="5"
                fill="#6B6B6B"
                stroke="#FFFFFF"
                strokeWidth="2"
                tabIndex={0}
                aria-label={`${point.label}: ${point.value} members`}
                onMouseEnter={() => setActivePoint(index)}
                onFocus={() => setActivePoint(index)}
                onBlur={() => setActivePoint(null)}
              >
                <title>{`${point.label}: ${point.value} members`}</title>
              </circle>
            ))}
          </svg>
          {activePoint !== null && (
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md bg-slate-900 px-2 py-1 text-[10px] font-medium text-white shadow-md"
              style={{
                left: `${(chartPoints[activePoint].x / width) * 100}%`,
                top: `${(chartPoints[activePoint].y / height) * 100}%`,
              }}
            >
              {chartPoints[activePoint].label}: {chartPoints[activePoint].value} members
            </div>
          )}
        </div>
        <div className="mt-2 sm:mt-3 md:mt-3 lg:mt-3 flex justify-between text-[9px] sm:text-[10px] md:text-xs lg:text-xs text-[#777777]">
          {chartLabels.map((label) => <span key={label}>{label}</span>)}
        </div>
      </div>
    </div>
  );
}
