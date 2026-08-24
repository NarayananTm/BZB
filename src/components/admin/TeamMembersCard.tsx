import { User } from 'lucide-react';
import { adminMembers } from '@/data/admin/members';

export default function TeamMembersCard({ members = adminMembers }: { members?: typeof adminMembers }) {
  return (
    <div className="rounded-[20px] border border-[#E5E5E5] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-[#111111]">Team Members</h2>
        </div>
        <button className="text-sm font-semibold text-[#111111]">See All</button>
      </div>
      <div className="mt-4 space-y-4 overflow-hidden rounded-[12px] border border-[#E5E5E5] bg-[#F9F9F9] p-3">
        <div className="max-h-[390px] space-y-3 overflow-y-auto rounded-[12px] pr-2">
          {members.map((member, index) => (
            <div key={member.id + index} className="flex items-center justify-between rounded-[12px] bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#111111]">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111111]">1 Members</p>
                  <p className="text-xs text-[#777777]">{member.id}</p>
                </div>
              </div>
              <span className="rounded-full bg-[#E5C500]/10 px-3 py-1 text-sm font-semibold text-[#111111]">{member.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
