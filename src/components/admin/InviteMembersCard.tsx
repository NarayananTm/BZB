'use client';

export default function InviteMembersCard() {
  return (
    <div className="w-full rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[24px] bg-[#E5C500] p-4 sm:p-5 md:p-6 text-[#181818]">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <div className="rounded-sm sm:rounded-[5px] bg-[#FFF3B2] px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold text-black w-fit">Referral</div>
        <div className="text-xs sm:text-sm font-medium">Grow your network</div>
      </div>
      <h2 className="mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl font-semibold text-white">Invite 5 Members</h2>
      <p className="mt-1 sm:mt-2 max-w-md text-xs sm:text-sm text-[#181818]/80">Unlock the next achievement tier and community benefits.</p>
      <div className="mt-3 sm:mt-4">
        <button className="w-full inline-flex items-center justify-center rounded-lg sm:rounded-[16px] bg-white px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-[#181818] hover:bg-gray-50 transition">Invite Now</button>
      </div>
    </div>
  );
}
