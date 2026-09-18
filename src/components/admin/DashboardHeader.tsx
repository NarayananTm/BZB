'use client';

export default function DashboardHeader({ userName = '' }: { userName?: string }) {
  return (
    <div className="flex items-end justify-between gap-3 sm:gap-4 md:gap-6">
      <div>
        <h1 className="text-lg sm:text-2xl md:text-[28px] lg:text-[30px] font-semibold text-[#111111]">Welcome in, {userName}</h1>
      </div>
    </div>
  );
}
