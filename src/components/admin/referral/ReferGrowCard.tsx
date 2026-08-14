'use client';

import { UserRoundPlus, Users } from 'lucide-react';

type ReferGrowCardProps = {
  direct?: number;
  referrals?: number;
  total?: number;
};

function Donut() {
  /*
    This SVG is intentionally designed to match
    the reference image.

    Outer radius 84
    Inner radius 50
    Yellow section = 25%
    Blue outline around both circles
  */

  const cx = 105;
  const cy = 105;

  const outerRadius = 84;
  const innerRadius = 50;

  // Yellow segment starts at 0 degrees
  // and covers 25% of the circle.
  const startAngle = 0;
  const endAngle = 90;

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

  const yellowPath = `
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
        {/* Grey donut area */}
        <circle
          cx={cx}
          cy={cy}
          r={outerRadius}
          fill="#EDEDED"
        />

        {/* White center */}
        <circle
          cx={cx}
          cy={cy}
          r={innerRadius}
          fill="#FFFFFF"
        />

        {/* Yellow 25% segment */}
        <path
          d={yellowPath}
          fill="#E5C500"
        />

        {/* Outer blue circle */}
        <circle
          cx={cx}
          cy={cy}
          r={outerRadius}
          fill="none"
          // stroke="#0A8FEF"
          strokeWidth="2.5"
        />

        {/* Inner blue circle */}
        <circle
          cx={cx}
          cy={cy}
          r={innerRadius}
          fill="none"
          // stroke="#0A8FEF"
          strokeWidth="2.5"
        />
      </svg>

      {/* Center users icon */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <Users
          size={47}
          strokeWidth={1.8}
          className="text-[#A7A7A7]"
        />
      </div>

      {/* 25% */}
      <span className="absolute right-[0px] top-[94px] text-[10px] font-medium text-[#111111]">
        25%
      </span>

      {/* 5% */}
      <span className="absolute bottom-[1px] left-[71px] text-[10px] font-medium text-[#111111]">
        5%
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
    <div className="h-[238px] w-[600px] rounded-[8px] border border-[#E5E5E5] bg-white">
      <div className="flex h-full">

        {/* LEFT */}
        <div className="relative w-[228px]">

          {/* Title */}
          <div className="absolute left-[15px] top-[13px]">
            <h3 className="text-[13px] font-semibold text-[#A38F00]">
              Refer &amp; Grow
            </h3>
          </div>

          {/* Donut */}
          <div className="absolute left-[18px] top-[29px]">
            <Donut />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="my-[10px] ml-[35px] h-[218px] w-[288px] overflow-hidden rounded-[8px] bg-[#EEEEEE]">

          {/* DIRECT */}
          <div className="h-[76px] border-b border-[#D9D9D9] px-[13px] pt-[8px]">
            <div className="flex items-center gap-[9px]">
              <UserRoundPlus
                size={24}
                strokeWidth={1.8}
                className="text-[#C8A900]"
              />

              <span className="text-[14px] font-medium text-[#222222]">
                Direct
              </span>
            </div>

            <div className="-mt-[1px] text-center text-[29px] font-medium leading-none text-[#111111]">
              {String(direct).padStart(2, '0')}
            </div>
          </div>

          {/* REFERRALS */}
          <div className="h-[76px] border-b border-[#D9D9D9] px-[13px] pt-[8px]">
            <div className="flex items-center gap-[9px]">
              <Users
                size={24}
                strokeWidth={1.8}
                className="text-[#C8A900]"
              />

              <span className="text-[14px] font-medium text-[#222222]">
                Referrals
              </span>
            </div>

            <div className="-mt-[1px] text-center text-[29px] font-medium leading-none text-[#111111]">
              {referrals}
            </div>
          </div>

          {/* TOTAL MEMBERS */}
          <div className="flex h-[66px] items-center justify-center">
            <p className="whitespace-nowrap text-[13px] font-normal text-[#222222]">
              Total Members :{' '}
              <span className="text-[22px] font-medium text-[#111111]">
                {total}
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}