import { User } from 'lucide-react';
import type { Member } from '@/services/memberService';

export default function TeamMembersCard({ members = [] }: { members?: Member[] }) {
  return (
    <div className="rounded-[16px] sm:rounded-[20px] border border-[#E5E5E5] bg-white p-3 sm:p-3 md:p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-[#111111]">Team Members</h2>
        </div>
        <button className="text-xs sm:text-sm font-semibold text-[#111111] whitespace-nowrap">See All</button>
      </div>
      <div className="mt-3 sm:mt-3 space-y-2 overflow-hidden rounded-[10px] sm:rounded-[12px] border border-[#E5E5E5] bg-[#F9F9F9] p-2 sm:p-2">
        <div className="max-h-[350px] space-y-2 overflow-y-auto rounded-[10px] sm:rounded-[12px] pr-2">
          {members.map((member, index) => (
            <div key={member.id + index} className="flex items-center justify-between rounded-[10px] bg-white px-2 py-1.5 sm:py-2 shadow-sm">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-7 sm:h-8 w-7 sm:w-8 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#111111] flex-shrink-0">
                  <User className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#111111] truncate">{member.name}</p>
                  <p className="text-xs text-[#777777] truncate">{member.id}</p>
                </div>
              </div>
              <span className="rounded-full bg-[#E5C500]/10 px-2 py-0.5 text-xs font-semibold text-[#111111] whitespace-nowrap flex-shrink-0 ml-2">{member.level_name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
