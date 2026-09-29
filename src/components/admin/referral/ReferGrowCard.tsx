'use client';

import { Bike, CarFront, Home, UserRoundPlus, Users } from 'lucide-react';

type ReferGrowCardProps = {
  direct?: number;
  referrals?: number;
  total?: number;
  levels?: { name: string; required_referrals: number }[];
};

function Donut({ percent, label }: { percent: number; label: string }) {
  const radius = 67;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative h-[190px] w-[190px]">
      <svg
        viewBox="0 0 210 210"
        className="absolute inset-0 h-full w-full -rotate-90"
      >
        <circle cx="105" cy="105" r={radius} fill="none" stroke="#EDEDED" strokeWidth="34" />
        <circle
          cx="105"
          cy="105"
          r={radius}
          fill="none"
          stroke="#E5C500"
          strokeWidth="34"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percent / 100)}
          strokeLinecap="butt"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-semibold leading-none text-[#111111]">{percent}%</span>
        <span className="mt-1 text-xs text-[#666666]">{label}</span>
      </div>
    </div>
  );
}

export default function ReferGrowCard({
  direct = 5,
  referrals = 25,
  total = 30,
  levels = [
    { name: 'Level 1', required_referrals: 5 },
    { name: 'Level 2', required_referrals: 50 },
    { name: 'Level 3', required_referrals: 125 },
  ],
}: ReferGrowCardProps) {
  const sortedLevels = [...levels].sort((first, second) => first.required_referrals - second.required_referrals);
  const activeLevelIndex = sortedLevels.findIndex((level) => direct < level.required_referrals);
  const overallTarget = sortedLevels.at(-1)?.required_referrals ?? 0;
  const overallPercent = overallTarget > 0
    ? Math.min(100, Math.max(0, Math.round((direct / overallTarget) * 100)))
    : 0;
  const levelIcons = [Bike, CarFront, Home];

  return (
    <div className="w-full min-h-[200px] sm:min-h-[220px] md:min-h-[238px] lg:min-h-[238px] rounded-lg md:rounded-[8px] lg:rounded-[8px] border border-[#E5E5E5] bg-white overflow-hidden">
      <div className="flex flex-col md:flex-col lg:flex-row h-full">

        {/* LEFT - Donut Section */}
        <div className="w-full md:w-full lg:w-[240px] flex flex-col items-center justify-center px-3 sm:px-4 md:px-4 lg:px-[20px] py-4 sm:py-5 md:py-4 lg:py-[20px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-[#EEEEEE]">

          <h3 className="text-xs sm:text-sm md:text-[13px] lg:text-[13px] font-semibold text-[#A38F00] mb-3">
            Refer &amp; Grow
          </h3>

          <Donut percent={overallPercent} label="Overall progress" />
        </div>

        {/* RIGHT PANEL - Stats */}
        <div className="w-full md:w-full lg:flex-1 flex flex-col bg-[#EEEEEE]">
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-1 gap-0">

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

          <div className="grid grid-cols-3 gap-2 border-t border-[#D9D9D9] px-2 sm:px-3 md:px-4 lg:px-[12px] py-2 sm:py-3">
            {sortedLevels.map((level, index) => {
              const Icon = levelIcons[index] ?? Home;
              const levelPercent = level.required_referrals > 0
                ? Math.min(100, Math.round((direct / level.required_referrals) * 100))
                : 0;
              const status = direct >= level.required_referrals
                ? 'Complete'
                : index === activeLevelIndex
                  ? 'In progress'
                  : 'Locked';

              return (
                <div key={level.name} className="min-w-0 text-center">
                  <div className="flex items-center justify-between gap-1 text-[10px] sm:text-xs font-medium text-[#333333]">
                    <span className="flex min-w-0 items-center gap-1">
                      <Icon className="h-3 w-3 shrink-0 text-[#A98F00]" aria-hidden="true" />
                      <span className="truncate">{level.name}</span>
                    </span>
                    <span className="shrink-0 text-sm sm:text-base font-semibold text-[#A98F00]">
                      {levelPercent}%
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white">
                    <div className="h-full bg-[#E5C500]" style={{ width: `${levelPercent}%` }} />
                  </div>
                  <p className="mt-1 truncate text-[10px] sm:text-xs text-[#555555]">
                    {direct}/{level.required_referrals} · {status}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}