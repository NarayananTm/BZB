import Link from 'next/link';

export default function ProfilePage() {
  return (
    <main className="bg-white py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="mx-auto max-w-[1120px] px-3 sm:px-4 md:px-6">
        <div className="rounded-[12px] sm:rounded-[16px] md:rounded-[20px] border border-[#E5E5E5] bg-white p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm">
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#777777]">Profile</p>
              <h1 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-black">Member Profile</h1>
              <p className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm md:text-base text-[#777777]">View your member details, referral progress, and current rewards from the BZB dashboard.</p>
            </div>
            <Link
              href="/bzb"
              className="inline-flex items-center justify-center rounded-full bg-[#E5C400] px-4 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm font-semibold text-black transition hover:bg-[#d5b600] whitespace-nowrap w-full sm:w-auto"
            >
              Back to Dashboard
            </Link>
          </div>

          <div className="mt-6 sm:mt-8 md:mt-10 grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[12px] sm:rounded-[14px] md:rounded-[16px] border border-[#E5E5E5] bg-[#F1F1F1] p-3 sm:p-4 md:p-6">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#777777]">Account</p>
              <h2 className="mt-2 sm:mt-3 md:mt-4 text-base sm:text-lg md:text-xl font-semibold text-black">Kavi</h2>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#777777]">superadmin@bzb.com</p>
            </div>
            <div className="rounded-[12px] sm:rounded-[14px] md:rounded-[16px] border border-[#E5E5E5] bg-[#F1F1F1] p-3 sm:p-4 md:p-6">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#777777]">Status</p>
              <h2 className="mt-2 sm:mt-3 md:mt-4 text-base sm:text-lg md:text-xl font-semibold text-black">Active Member</h2>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#777777]">Level 1 Complete</p>
            </div>
            <div className="rounded-[12px] sm:rounded-[14px] md:rounded-[16px] border border-[#E5E5E5] bg-[#F1F1F1] p-3 sm:p-4 md:p-6">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#777777]">Team</p>
              <h2 className="mt-2 sm:mt-3 md:mt-4 text-base sm:text-lg md:text-xl font-semibold text-black">30 Members</h2>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#777777]">Referral growth and wallet status.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
