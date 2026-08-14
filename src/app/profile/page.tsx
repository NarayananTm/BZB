import Link from 'next/link';

export default function ProfilePage() {
  return (
    <main className="bg-white py-10">
      <div className="mx-auto max-w-[1120px] px-4">
        <div className="rounded-[20px] border border-[#E5E5E5] bg-white p-10 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#777777]">Profile</p>
              <h1 className="mt-3 text-4xl font-semibold text-black">Member Profile</h1>
              <p className="mt-3 max-w-2xl text-base text-[#777777]">View your member details, referral progress, and current rewards from the BZB dashboard.</p>
            </div>
            <Link
              href="/bzb"
              className="inline-flex items-center justify-center rounded-full bg-[#E5C400] px-6 py-4 text-sm font-semibold text-black transition hover:bg-[#d5b600]"
            >
              Back to Dashboard
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[16px] border border-[#E5E5E5] bg-[#F1F1F1] p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-[#777777]">Account</p>
              <h2 className="mt-4 text-xl font-semibold text-black">Kavi</h2>
              <p className="mt-2 text-sm text-[#777777]">superadmin@bzb.com</p>
            </div>
            <div className="rounded-[16px] border border-[#E5E5E5] bg-[#F1F1F1] p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-[#777777]">Status</p>
              <h2 className="mt-4 text-xl font-semibold text-black">Active Member</h2>
              <p className="mt-2 text-sm text-[#777777]">Level 1 Complete</p>
            </div>
            <div className="rounded-[16px] border border-[#E5E5E5] bg-[#F1F1F1] p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-[#777777]">Team</p>
              <h2 className="mt-4 text-xl font-semibold text-black">30 Members</h2>
              <p className="mt-2 text-sm text-[#777777]">Referral growth and wallet status.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
