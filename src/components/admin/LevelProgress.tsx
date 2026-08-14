'use client';

export default function LevelProgress() {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <div className="flex items-center gap-6">
        <div className="w-48">
          <div className="text-sm text-[#111111]">Level 1 Complete</div>
          <div className="mt-2 h-8 w-full rounded-full bg-[#F1F1F1]">
            <div className="h-full rounded-full bg-[#E5C500]" style={{ width: '78%' }} />
          </div>
        </div>

        <div className="w-48">
          <div className="text-sm text-[#111111]">Level 2 Complete</div>
          <div className="mt-2 h-8 w-full rounded-full bg-[#F1F1F1]">
            <div className="h-full rounded-full bg-[#E5C500]" style={{ width: '12%' }} />
          </div>
        </div>

        <div className="w-48">
          <div className="text-sm text-[#111111]">Level 3 Complete</div>
          <div className="mt-2 h-8 w-full rounded-full bg-[#F1F1F1]">
            <div className="h-full rounded-full bg-[#E5C500]" style={{ width: '8%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
