'use client';

interface LevelItem { name: string; pct: number; }

export default function LevelProgress({ levels = [] }: { levels?: LevelItem[] }) {
  return (
    <div className="mt-2 flex flex-col gap-3">
      <div className="flex items-center gap-6">
        {levels.map((lvl) => (
          <div key={lvl.name} className="w-48">
            <div className="text-sm text-[#111111]">{lvl.name}</div>
            <div className="mt-2 h-8 w-full rounded-full bg-[#F1F1F1]">
              <div className="h-full rounded-full bg-[#E5C500]" style={{ width: `${lvl.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
