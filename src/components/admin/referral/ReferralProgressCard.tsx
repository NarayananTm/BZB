'use client';

import {
  Bike,
  CarFront,
  Home,
  type LucideIcon,
} from 'lucide-react';

type LevelItemProps = {
  label: string;
  icon: LucideIcon;
  status: string;
  statusColor?: string;
  horizontal?: boolean;
};

function LevelItem({
  label,
  icon: Icon,
  status,
  statusColor = '#333333',
  horizontal = false,
}: LevelItemProps) {
  if (horizontal) {
    // Horizontal layout for mobile
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-[6px] bg-[#414141]">
          <Icon
            className="h-5 sm:h-6 w-5 sm:w-6 text-white"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </div>
        <p className="text-center text-[8px] sm:text-[9px] font-medium leading-[10px] text-[#333333]">
          {label}
        </p>
        <p
          className="text-center text-[7px] sm:text-[8px] leading-[9px]"
          style={{ color: statusColor }}
        >
          {status}
        </p>
      </div>
    );
  }

  // Vertical layout for desktop
  return (
    <div className="flex w-[80px] ml-8 flex-col items-center">
      {/* Icon */}
      <div className="flex h-[55px] w-[60px] items-center justify-center rounded-[8px] bg-[#414141]">
        <Icon
          className="h-[27px] w-[27px] text-white"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </div>

      {/* Level */}
      <p className="mt-[5px] text-center text-[9px] font-medium leading-[11px] text-[#333333]">
        {label}
      </p>

      {/* Status */}
      <p
        className="text-center text-[9px] leading-[11px]"
        style={{ color: statusColor }}
      >
        {status}
      </p>
    </div>
  );
}

type ReferralProgressCardProps = {
  percent?: number;
};

export default function ReferralProgressCard({
  percent = 60,
}: ReferralProgressCardProps) {
  const safePercent = Math.min(100, Math.max(0, percent));

  return (
    <div className="relative min-h-[200px] sm:min-h-[200px] md:min-h-[2500px] lg:min-h-[560px] w-full overflow-hidden rounded-lg md:rounded-[8px] lg:rounded-[8px] border border-[#E5E5E5] bg-white px-3 sm:px-4 md:px-5 lg:px-[20px] pt-2 sm:pt-3 md:pt-4 lg:pt-[14px]">

      {/* Header */}
      <h3 className="text-xs sm:text-sm md:text-[13px] lg:text-[14px] font-semibold text-[#A98F00]">
        Progress
      </h3>

      {/* MOBILE: Horizontal Progress Bar (xs to md) */}
      <div className="lg:hidden mt-3 sm:mt-4 md:mt-5">
        {/* Level Items (Horizontal) */}
        <div className="flex justify-between px-2 mb-4 sm:mb-5">
          <LevelItem
            label="Level 1"
            icon={Bike}
            status="Complete"
            statusColor="#333333"
            horizontal
          />
          <LevelItem
            label="Level 2"
            icon={CarFront}
            status="Complete"
            statusColor="#333333"
            horizontal
          />
          <LevelItem
            label="Level 3"
            icon={Home}
            status="Complete"
            statusColor="#333333"
            horizontal
          />
        </div>

        {/* Horizontal Progress Bar */}
        <div className="relative mb-3 sm:mb-4">
          <div className="h-3 sm:h-4 w-full overflow-hidden rounded-full bg-[#F5EFD5]">
            <div
              className="h-full bg-[#E5C500] transition-all duration-500"
              style={{
                width: `${safePercent}%`,
              }}
            />
          </div>
          <div className="mt-1 flex justify-between">
            <span className="text-[9px] sm:text-[10px] text-[#777777]">0%</span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-[#A98F00]">{safePercent}%</span>
            <span className="text-[9px] sm:text-[10px] text-[#777777]">100%</span>
          </div>
        </div>

        {/* Mobile Info Text */}
        <div className="text-center mt-3 sm:mt-4">
          <p className="text-[9px] sm:text-[10px] text-[#777777]">
            3 to 5 referrals
          </p>
          <p className="mt-1 text-[9px] sm:text-[10px] text-[#555555]">
            2 more to unlock next reward
          </p>
        </div>
      </div>

      {/* DESKTOP: Vertical Progress Bar (lg+) */}
      <div className="hidden lg:block relative mt-[12px] h-[430px]">

        {/* Background Progress Bar */}
        <div className="absolute left-[8px] top-0 h-[430px] w-[50px] overflow-hidden rounded-t-[20px] bg-[#F5EFD5]">

          {/* Progress */}
          <div
            className="absolute bottom-0 left-0 w-full bg-[#E5C500] transition-all duration-500"
            style={{
              height: `${safePercent}%`,
            }}
          />

          {/* Current Progress Highlight */}
          {safePercent > 0 && safePercent < 100 && (
            <div
              className="absolute left-0 w-full bg-[#B9A52D]"
              style={{
                bottom: `${safePercent}%`,
                height: '48px',
              }}
            />
          )}
        </div>

        {/* Percentage */}
        <div className="absolute bottom-[35px] left-[15px] w-[36px] text-center">
          <span className="text-[9px] font-medium text-[#777777]">
            {safePercent}%
          </span>
        </div>

        {/* Level 3 */}
        <div className="absolute left-[52px] top-[34px]">
          <LevelItem
            label="Level 3"
            icon={Home}
            status="Complete"
            statusColor="#333333"
          />
        </div>

        {/* Level 2 */}
        <div className="absolute left-[52px] top-[185px]">
          <LevelItem
            label="Level 2"
            icon={CarFront}
            status="Complete"
            statusColor="#333333"
          />
        </div>

        {/* Level 1 */}
        <div className="absolute left-[52px] top-[340px]">
          <LevelItem
            label="Level 1"
            icon={Bike}
            status="Complete"
            statusColor="#333333"
          />
        </div>

        {/* Bottom Text */}
        <div className="absolute top:[450px] left-0 w-full text-center">
          <p className="text-[10px] text-[#777777]">
            3 to 5 referrals
          </p>

          <p className="mt-[6px] text-[10px] text-[#555555]">
            2 more to unlock next reward
          </p>
        </div>
      </div>
    </div>
  );
}