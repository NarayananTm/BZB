'use client';

export default function DashboardHeader({ userName = '' }: { userName?: string }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <h1 className="text-[30px] font-semibold text-[#111111]">Welcome in, {userName}</h1>
      </div>
    </div>
  );
}
