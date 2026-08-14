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
};

function LevelItem({
  label,
  icon: Icon,
  status,
  statusColor = '#333333',
}: LevelItemProps) {
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
    <div className="relative  min-h-[560px] w-full overflow-hidden rounded-[8px] border border-[#E5E5E5] bg-white px-[20px] pt-[14px]">

      {/* Header */}
      <h3 className="text-[14px] font-semibold text-[#A98F00]">
        Progress
      </h3>

      {/* Main Section */}
      <div className="relative mt-[12px] h-[430px]">

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
              className="absolute left-0 ml-4 w-full bg-[#B9A52D]"
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
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-[36px] left-0 w-full text-center">
        <p className="text-[10px] text-[#777777]">
          3 to 5 referrals
        </p>

        <p className="mt-[6px] text-[10px] text-[#555555]">
          2 more to unlock next reward
        </p>
      </div>
    </div>
  );
}