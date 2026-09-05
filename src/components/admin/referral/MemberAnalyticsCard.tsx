'use client';

import React from 'react';

export default function MemberAnalyticsCard({ data = [5, 12, 8, 20, 35, 22, 28] }: { data?: number[] }) {
  // simple SVG area chart rendering from data
  const width = 400;
  const height = 200;
  const max = Math.max(...data, 100);
  const points = data.map((d, i) => `${(i / (data.length - 1)) * width},${height - (d / max) * height}`).join(' ');
  const areaPath = `M0,${height} L${points} L${width},${height} Z`;
  const linePath = `M${data.map((d, i) => `${(i / (data.length - 1)) * width},${height - (d / max) * height}`).join(' L')}`;

  return (
    <div className="rounded-lg sm:rounded-lg md:rounded-[10px] lg:rounded-[10px] border border-[#F1F1F1] bg-white p-2 sm:p-3 md:p-4 lg:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
        <h3 className="text-xs sm:text-sm md:text-sm lg:text-sm font-semibold text-[#E5C500]">Total Members</h3>
        <div className="text-xs text-[#777777]">Monthly Based</div>
      </div>
      <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-4">
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
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
        </svg>
        <div className="mt-2 sm:mt-3 md:mt-3 lg:mt-3 flex justify-between text-[9px] sm:text-[10px] md:text-xs lg:text-xs text-[#777777]">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
        </div>
      </div>
    </div>
  );
}
