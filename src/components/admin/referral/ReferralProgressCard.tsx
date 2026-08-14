'use client';

function LevelItem({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[18px] border border-[#F1F1F1] bg-[#F8F8F8] p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#111111] text-base font-semibold text-white">✓</div>
      <div>
        <p className="text-sm font-semibold text-[#111111]">{label}</p>
        <p className="text-xs text-[#777777]">{status}</p>
      </div>
    </div>
  );
}

export default function ReferralProgressCard({ percent = 60 }: { percent?: number }) {
  return (
    <div className="rounded-[20px] border border-[#F1F1F1] bg-white p-5 h-full">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-[#E5C500]">Progress</h3>
          <p className="mt-2 text-xs text-[#777777]">Referral level performance</p>
        </div>
        <div className="rounded-full bg-[#F7F7F7] px-4 py-2 text-sm font-semibold text-[#111111]">{percent}%</div>
      </div>

      <div className="mt-6 flex items-end gap-4 ">
        <div className="h-64 w-14 rounded-full bg-[#F4F0E0] p-1">
          <div className="h-full rounded-full bg-[#E5C500] transition-all" style={{ height: `${percent}%` }} />
        </div>
        <div className="flex-1 space-y-4 ">
          <LevelItem label="Level 3" status="Completed" />
          <LevelItem label="Level 2" status="In progress" />
          <LevelItem label="Level 1" status="Available" />
        </div>
      </div>

      {/* <div className="mt-6 rounded-[18px] bg-[#F7F7F7] p-4 text-sm text-[#555555]">
        <p className="font-semibold text-[#111111]">Referral status</p>
        <p className="mt-2 leading-6">You are {percent}% of the way toward your next reward milestone. Keep sharing your referral link to unlock the next level.</p>
      </div> */}
    </div>
  );
}
