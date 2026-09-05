'use client';

import { UserRoundPlus, Users } from 'lucide-react';

type ReferGrowCardProps = {
  direct?: number;
  referrals?: number;
  total?: number;
};

function Donut({ direct = 0, total = 0 }: Pick<ReferGrowCardProps, 'direct' | 'total'>) {
  const cx = 105;
  const cy = 105;
  const outerRadius = 84;
  const innerRadius = 50;
  const directPercent = total > 0 ? Math.round((direct / total) * 100) : 0;
  const startAngle = 0;
  const endAngle = (directPercent / 100) * 360;

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angle: number
  ) => {
    const angleInRadians = ((angle - 90) * Math.PI) / 180;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const outerStart = polarToCartesian(
    cx,
    cy,
    outerRadius,
    startAngle
  );

  const outerEnd = polarToCartesian(
    cx,
    cy,
    outerRadius,
    endAngle
  );

  const innerStart = polarToCartesian(
    cx,
    cy,
    innerRadius,
    startAngle
  );

  const innerEnd = polarToCartesian(
    cx,
    cy,
    innerRadius,
    endAngle
  );

  const yellowPath = directPercent === 0 ? '' : `
    M ${outerStart.x} ${outerStart.y}
    A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}
    L ${innerEnd.x} ${innerEnd.y}
    A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}
    Z
  `;

  return (
    <div className="relative h-[190px] w-[190px]">
      <svg
        width="190"
        height="190"
        viewBox="0 0 210 210"
        className="absolute inset-0"
      >
        <circle
          cx={cx}
          cy={cy}
          r={outerRadius}
          fill="#EDEDED"
        />

        <circle
          cx={cx}
          cy={cy}
          r={innerRadius}
          fill="#FFFFFF"
        />

        <path
          d={yellowPath}
          fill="#E5C500"
        />

        <circle
          cx={cx}
          cy={cy}
          r={outerRadius}
          fill="none"
          strokeWidth="2.5"
        />

        <circle
          cx={cx}
          cy={cy}
          r={innerRadius}
          fill="none"
          strokeWidth="2.5"
        />
      </svg>

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <Users
          size={47}
          strokeWidth={1.8}
          className="text-[#A7A7A7]"
        />
      </div>

      <span className="absolute right-[0px] top-[94px] text-[10px] font-medium text-[#111111]">
        {directPercent}%
      </span>

      <span className="absolute bottom-[1px] left-[71px] text-[10px] font-medium text-[#111111]">
        {100 - directPercent}%
      </span>
    </div>
  );
}

export default function ReferGrowCard({
  direct = 5,
  referrals = 25,
  total = 30,
}: ReferGrowCardProps) {
  return (
    <div className="w-full min-h-[200px] sm:min-h-[220px] md:min-h-[238px] lg:min-h-[238px] rounded-lg md:rounded-[8px] lg:rounded-[8px] border border-[#E5E5E5] bg-white overflow-hidden">
      <div className="flex flex-col md:flex-col lg:flex-row h-full">

        {/* LEFT - Donut Section */}
        <div className="w-full md:w-full lg:w-[240px] flex flex-col items-center justify-center px-3 sm:px-4 md:px-4 lg:px-[20px] py-4 sm:py-5 md:py-4 lg:py-[20px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-[#EEEEEE]">

          <h3 className="text-xs sm:text-sm md:text-[13px] lg:text-[13px] font-semibold text-[#A38F00] mb-3">
            Refer &amp; Grow
          </h3>

          <Donut direct={direct} total={total} />
        </div>

        {/* RIGHT PANEL - Stats */}
        <div className="w-full md:w-full lg:flex-1 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-1 gap-0 bg-[#EEEEEE]">

          <div className="border-b border-r md:border-r lg:border-b border-[#D9D9D9] px-2 sm:px-3 md:px-4 lg:px-[20px] py-2 sm:py-3 md:py-3 lg:py-[12px] flex flex-col items-center justify-center lg:justify-start">
            <div className="flex flex-col items-center gap-1 sm:gap-1 lg:gap-2">
              <UserRoundPlus
                size={16}
                strokeWidth={1.8}
                className="text-[#C8A900] sm:w-5 md:w-5 lg:w-5"
              />

              <span className="text-[11px] sm:text-[12px] md:text-[12px] lg:text-[13px] font-medium text-[#222222]">
                Direct
              </span>
            </div>

            <div className="text-center text-lg sm:text-xl md:text-xl lg:text-[26px] font-medium leading-none text-[#111111] mt-1 lg:mt-2">
              {String(direct).padStart(2, '0')}
            </div>
          </div>

          <div className="border-b border-r md:border-r lg:border-b border-[#D9D9D9] px-2 sm:px-3 md:px-4 lg:px-[20px] py-2 sm:py-3 md:py-3 lg:py-[12px] flex flex-col items-center justify-center lg:justify-start">
            <div className="flex flex-col items-center gap-1 sm:gap-1 lg:gap-2">
              <Users
                size={16}
                strokeWidth={1.8}
                className="text-[#C8A900] sm:w-5 md:w-5 lg:w-5"
              />

              <span className="text-[11px] sm:text-[12px] md:text-[12px] lg:text-[13px] font-medium text-[#222222]">
                Referrals
              </span>
            </div>

            <div className="text-center text-lg sm:text-xl md:text-xl lg:text-[26px] font-medium leading-none text-[#111111] mt-1 lg:mt-2">
              {referrals}
            </div>
          </div>

          <div className="border-b-0 md:border-r-0 lg:border-b-0 px-2 sm:px-3 md:px-4 lg:px-[20px] py-2 sm:py-3 md:py-3 lg:py-[12px] flex flex-col items-center justify-center lg:justify-start">
            <p className="text-center text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] font-normal text-[#222222]">
              Total
            </p>
            <span className="text-base sm:text-lg md:text-lg lg:text-[24px] font-medium text-[#111111] mt-0.5 lg:mt-1">
              {total}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}