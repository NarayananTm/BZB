 'use client';

import {
  MoveRight,
  Bike,
  CarFront,
  Home,
} from 'lucide-react';

export default function RewardsBanner() {
  const levels = [
    { level: 'Level 1', icon: Bike },
    { level: 'Level 2', icon: CarFront },
    { level: 'Level 3', icon: Home },
  ];

  return (
    <div className="w-full rounded-[8px] min-h-[120px] sm:min-h-[140px] lg:min-h-[150px] bg-[#404040] px-3 sm:px-4 md:px-5 lg:px-[28px] py-2 sm:py-3 md:py-4 lg:py-[12px]">
      <div className="flex flex-col lg:flex-row lg:min-h-[150px] w-full lg:items-center gap-3 sm:gap-4 md:gap-5 lg:gap-0">

        {/* LEFT */}
        <div className="w-full sm:w-auto lg:w-[260px] lg:shrink-0">
          <p className="mb-[2px] text-sm sm:text-base md:text-[16px] lg:text-[16px] font-semibold leading-[16px] text-[#E5C500]">Reward's</p>

          <p className="text-xs sm:text-sm md:text-[14px] lg:text-[14px] mt-1 sm:mt-2 lg:mt-2 font-medium leading-[14px] text-white">
            Upgrade your life to
            <br />
            Levels Complete!
          </p>

          <p className="mt-2 sm:mt-3 md:mt-4 lg:mt-4 text-xs sm:text-sm md:text-[14px] lg:text-[14px] font-normal leading-[14px] text-[#E2E2E2]">
            Invest in real estate, grow your referrals and unlock exclusive rewards — including
            <span className="font-semibold text-[#E5C500]"> Bike</span>,
            <span className="font-semibold text-[#E5C500]"> Car</span>, and
            <span className="font-semibold text-[#E5C500]"> Luxury House</span>.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="hidden lg:block mx-[20px] h-[100px] w-px lg:shrink-0 bg-[#777777]" aria-hidden />

        {/* LEVELS */}
        <div className="flex flex-wrap sm:flex-wrap lg:flex-nowrap lg:shrink-0 lg:items-center lg:gap-4 gap-2 sm:gap-3 w-full lg:w-auto">
          {levels.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.level} className="flex items-center gap-1 sm:gap-2 lg:gap-0">
                <div className="flex w-14 sm:w-16 md:w-[55px] lg:w-[55px] flex-col items-center flex-shrink-0">
                  <div className="flex h-12 sm:h-14 md:h-[53px] lg:h-[53px] w-12 sm:w-14 md:w-[53px] lg:w-[53px] items-center justify-center rounded-[8px] bg-[#E5C500]">
                    <Icon className="h-6 sm:h-8 md:h-[40px] lg:h-[40px] w-6 sm:w-8 md:w-[40px] lg:w-[40px] text-white" strokeWidth={1.8} aria-hidden />
                  </div>

                  <span className="mt-1 sm:mt-1.5 md:mt-[6px] lg:mt-[6px] whitespace-nowrap text-[8px] sm:text-[9px] md:text-[10px] lg:text-[10px] font-medium leading-[12px] text-white">{item.level}</span>
                  <span className="whitespace-nowrap text-[8px] sm:text-[9px] md:text-[10px] lg:text-[10px] leading-[12px] text-[#D0D0D0]">Complete</span>
                </div>

                {index < levels.length - 1 && (
                  <MoveRight className="hidden sm:block mx-1 sm:mx-2 md:mx-[8px] lg:mx-[8px] h-4 sm:h-5 md:h-[17px] lg:h-[17px] w-5 sm:w-6 md:w-[35px] lg:w-[35px] text-white flex-shrink-0" strokeWidth={1.9} aria-hidden />
                )}
              </div>
            );
          })}
        </div>

        {/* EXPLORE */}
        <div className="w-full sm:w-auto lg:ml-auto lg:shrink-0 mt-2 sm:mt-3 md:mt-0 lg:mt-0">
          <button
            type="button"
            aria-label="Explore rewards"
            className="flex w-full sm:w-auto h-9 sm:h-10 md:h-[51px] lg:h-[51px] px-3 sm:px-4 md:px-6 lg:w-[124px] items-center justify-center gap-2 sm:gap-2.5 md:gap-[9px] lg:gap-[9px] rounded-[8px] bg-[#FAFAFA] text-xs sm:text-sm md:text-[13px] lg:text-[13px] font-semibold text-[#444444] transition hover:bg-white"
          >
            <span>Explore</span>
            <MoveRight className="h-3 sm:h-4 md:h-[18px] lg:h-[18px] w-3 sm:w-4 md:w-[18px] lg:w-[18px]" strokeWidth={1.6} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}