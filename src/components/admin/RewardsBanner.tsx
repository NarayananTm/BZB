 'use client';

import {
  ArrowRight,
  Bike,
  CarFront,
  Mouse,
} from 'lucide-react';

export default function RewardsBanner() {
  const levels = [
    { level: 'Level 1', icon: Bike },
    { level: 'Level 2', icon: CarFront },
    { level: 'Level 3', icon: Mouse },
  ];

  return (
    <div className="w-full rounded-[8px] bg-[#404040] px-[28px] py-[12px]">
      <div className="flex min-h-[200px] w-full items-center">

        {/* LEFT */}
        <div className="w-[194px] shrink-0">
          <p className="mb-[6px] text-[16px] font-semibold leading-[16px] text-[#E5C500]">Reward's</p>

          <p className="text-[14px] font-medium leading-[14px] text-white">
            Upgrade your life to
            <br />
            Levels Complete!
          </p>

          <p className="mt-[6px] text-[14px] font-normal leading-[14px] text-[#E2E2E2]">
            Invest in real estate, grow your referrals and unlock exclusive rewards — including
            <span className="font-semibold text-[#E5C500]"> Bike</span>,
            <span className="font-semibold text-[#E5C500]"> Car</span>, and
            <span className="font-semibold text-[#E5C500]"> Luxury House</span>.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="mx-[20px] h-[68px] w-px shrink-0 bg-[#777777]" aria-hidden />

        {/* LEVELS */}
        <div className="flex shrink-0 items-center gap-4">
          {levels.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.level} className="flex items-center">
                <div className="flex w-[55px] flex-col items-center">
                  <div className="flex h-[43px] w-[43px] items-center justify-center rounded-[8px] bg-[#E5C500]">
                    <Icon className="h-[22px] w-[22px] text-white" strokeWidth={1.8} aria-hidden />
                  </div>

                  <span className="mt-[6px] whitespace-nowrap text-[10px] font-medium leading-[12px] text-white">{item.level}</span>
                  <span className="whitespace-nowrap text-[10px] leading-[12px] text-[#D0D0D0]">Complete</span>
                </div>

                {index < levels.length - 1 && (
                  <ArrowRight className="mx-[8px] h-[17px] w-[17px] text-white" strokeWidth={1.4} aria-hidden />
                )}
              </div>
            );
          })}
        </div>

        {/* EXPLORE */}
        <div className="ml-auto shrink-0 ">
          <button
            type="button"
            aria-label="Explore rewards"
            className="flex h-[51px] w-[124px] items-center justify-center gap-[9px] rounded-[8px] bg-[#FAFAFA] text-[13px] font-semibold text-[#444444] transition hover:bg-white"
          >
            <span>Explore</span>
            <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}