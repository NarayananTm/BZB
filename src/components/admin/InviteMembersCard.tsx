'use client';

export default function InviteMembersCard() {
  return (
    <div className="rounded-[24px] bg-[#E5C500] p-6 text-[#181818]">
      <div className="flex items-center gap-3">
        <div className="rounded-[5px]  bg-[#FFF3B2] px-3 py-1 text-sm font-semibold text-black">Referral</div>
        <div className="text-sm font-medium">Grow your network</div>
      </div>
      <h2 className="mt-1 text-2xl font-semibold text-white">Invite 5 Members</h2>
      <p className="mt-2 max-w-md text-sm text-[#181818]/80">Unlock the next achievement tier and community benefits.</p>
      <div className="mt-2">
        <button className="inline-flex w-full items-center justify-center rounded-[16px] bg-white px-4 py-3 text-sm font-semibold text-[#181818]">Invite Now</button>
      </div>
    </div>
  );
}
