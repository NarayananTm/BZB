'use client';

interface LevelItem {
  id: string;
  name: string;
  pct: number;
  required_referrals: number;
  current_referrals: number;
}

export default function MyLevelsCard({ 
  currentLevel = 'Level 1',
  levels = [],
}: { 
  currentLevel?: string;
  levels?: LevelItem[];
}) {
  const activeLevelIndex = levels.findIndex((l) => l.name === currentLevel);
  const activeLevel = levels[activeLevelIndex] || levels[0];

  if (!levels || levels.length === 0) {
    return (
      <div className="rounded-[20px] border border-[#E5E5E5] bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.35em] text-[#777777]">My Level Progress</p>
        <p className="mt-3 text-3xl font-semibold text-[#111111]">Level 1</p>
        <p className="mt-4 text-sm text-[#777777]">Loading level data...</p>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] border border-[#E5E5E5] bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.35em] text-[#777777]">My Level Progress</p>
        <p className="mt-3 text-3xl font-semibold text-[#111111]">{currentLevel}</p>
        {activeLevel && (
          <p className="mt-1 text-sm text-[#777777]">
            {activeLevel.current_referrals} of {activeLevel.required_referrals} referrals
          </p>
        )}
      </div>

      <div className="space-y-4">
        {levels.map((lvl, index) => (
          <div key={lvl.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#111111]">{lvl.name}</span>
              <span className="text-xs font-semibold text-[#E5C500]">{Math.min(lvl.pct, 100)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#F1F1F1]">
              <div
                className={`h-full rounded-full transition-all ${
                  index <= activeLevelIndex ? 'bg-[#E5C500]' : 'bg-[#D1D1D1]'
                }`}
                style={{ width: `${Math.min(lvl.pct, 100)}%` }}
              />
            </div>
            <p className="text-xs text-[#777777]">{lvl.required_referrals} referrals needed</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[12px] border border-[#E5C500]/30 bg-[#E5C500]/5 p-4">
        <p className="text-xs text-[#777777]">Complete {currentLevel} to unlock</p>
        <p className="mt-1 font-semibold text-[#111111]">Exclusive Benefits</p>
        <ul className="mt-2 space-y-1 text-xs text-[#555555]">
          <li>✓ Higher commission rate</li>
          <li>✓ Special bonuses & rewards</li>
          <li>✓ Priority support</li>
        </ul>
      </div>
    </div>
  );
}
