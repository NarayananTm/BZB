'use client';

interface LevelItem { name: string; pct: number; }

export default function LevelProgress({ levels = [] }: { levels?: LevelItem[] }) {
  return (
    <div className="mt-2 sm:mt-3 md:mt-4">
      {/* Labels Row - Single Line */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3">
        {levels.map((lvl, index) => (
          <div key={`label-${lvl.name}`} className="flex-1 flex items-center gap-1 sm:gap-2">
            <div className="text-xs sm:text-sm md:text-base font-medium text-[#111111] whitespace-nowrap">{lvl.name}</div>
            {index < levels.length - 1 && (
              <div className="text-[#E5C500] text-lg sm:text-xl md:text-2xl flex-shrink-0 hidden sm:block">→</div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Bars Row - Single Line */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
        {levels.map((lvl) => (
          <div key={`bar-${lvl.name}`} className="flex-1 h-4 sm:h-5 md:h-6 rounded-full bg-[#F1F1F1] overflow-hidden">
            <div className="h-full rounded-full bg-[#E5C500] transition-all" style={{ width: `${lvl.pct}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
  