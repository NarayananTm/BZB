import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'BZB Member Dashboard',
  description: 'Your referral dashboard and member profile for BZB.',
};

const cards = [
  {
    title: 'Total Referrals',
    value: '12',
    detail: '2 pending • 10 approved',
  },
  {
    title: 'Wallet Balance',
    value: '$5,430',
    detail: 'Ready to withdraw',
  },
  {
    title: 'Referral Level',
    value: 'Level 1',
    detail: 'Complete 2 more referrals to Level 2',
  },
];

const stats = [
  { label: 'Direct referrals', value: '8' },
  { label: 'Bonus earnings', value: '$2,150' },
  { label: 'Team size', value: '29' },
  { label: 'Active leads', value: '14' },
];

export default function BZBPage() {
  const token = cookies().get('bzb_token')?.value;

  if (!token) {
    redirect('/login');
  }

  return (
    <main className="bg-[#FDF9EE] min-h-screen pt-[108px] text-black">
      <div className="mx-auto max-w-[1180px] px-4 pb-16">
        <div className="mb-8 flex flex-col gap-6 rounded-[32px] border border-black/10 bg-white p-8 shadow-[0_30px_60px_rgba(0,0,0,0.05)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#777777]">BZB Member</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-black">Dashboard</h1>
            <p className="mt-3 max-w-2xl text-base text-[#4E4E4E]">Track referrals, monitor rewards, and keep your membership moving forward.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/bzb" className="rounded-full border border-black/10 bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#222]">
              Dashboard
            </Link>
            <Link href="/referral" className="rounded-full border border-black/10 bg-[#F7F4E5] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#E5D98F]">
              Referral
            </Link>
            <Link href="/profile" className="rounded-full border border-black/10 bg-[#F7F4E5] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#E5D98F]">
              Profile
            </Link>
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {cards.map((card) => (
                <article key={card.title} className="rounded-[24px] border border-black/10 bg-black/95 p-6 text-white shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#F3D76F]">{card.title}</p>
                  <p className="mt-5 text-3xl font-semibold">{card.value}</p>
                  <p className="mt-3 text-sm text-[#DDD6A3]">{card.detail}</p>
                </article>
              ))}
            </div>

            <div className="rounded-[32px] border border-black/10 bg-white p-8 shadow-[0_30px_60px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-[#777777]">Referral progress</p>
                  <h2 className="mt-2 text-3xl font-semibold text-black">Earned Rewards</h2>
                </div>
                <div className="rounded-full bg-[#F7F4E5] px-4 py-2 text-sm font-semibold text-[#2E2E2E]">
                  3 / 5 referrals completed
                </div>
              </div>

              <div className="mt-8 rounded-[24px] border border-black/10 bg-[#F7F4E5] p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.3em] text-[#777777]">Level progress</p>
                    <p className="text-2xl font-semibold text-black">Level 1</p>
                  </div>
                  <p className="text-sm text-[#4E4E4E]">Complete 2 more referrals to unlock Level 2 benefits</p>
                </div>
                <div className="mt-6 h-4 overflow-hidden rounded-full bg-black/10">
                  <div className="h-full w-[60%] rounded-full bg-[#E5C400]" />
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[32px] border border-black/10 bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#777777]">Referral activity</p>
                    <h3 className="mt-3 text-2xl font-semibold text-black">Latest updates</h3>
                  </div>
                  <span className="rounded-full bg-[#F7F4E5] px-3 py-1 text-xs font-semibold uppercase text-[#4E4E4E]">Live</span>
                </div>
                <ul className="mt-8 space-y-5">
                  <li className="rounded-[24px] border border-black/10 bg-[#F8F6EA] p-5">
                    <p className="text-sm text-[#777777]">New referral added</p>
                    <p className="mt-2 text-base font-semibold text-black">A referral joined with 1.2x reward multiplier.</p>
                    <p className="mt-2 text-sm text-[#777777]">2 hours ago</p>
                  </li>
                  <li className="rounded-[24px] border border-black/10 bg-[#F8F6EA] p-5">
                    <p className="text-sm text-[#777777]">Reward payout ready</p>
                    <p className="mt-2 text-base font-semibold text-black">$1,100 is available for withdrawal.</p>
                    <p className="mt-2 text-sm text-[#777777]">Today</p>
                  </li>
                </ul>
              </div>

              <div className="rounded-[32px] border border-black/10 bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                <p className="text-sm uppercase tracking-[0.3em] text-[#777777]">Member card</p>
                <div className="mt-6 rounded-[28px] bg-[#111111] p-6 text-white shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-[#F3D76F]">Vetrivel N</p>
                      <p className="mt-2 text-xs text-[#AAAAAA]">BZB9601381</p>
                    </div>
                    <div className="rounded-full bg-[#E5C400]/10 px-3 py-1 text-xs font-semibold uppercase text-[#E5C400]">Level 1</div>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-3xl bg-[#161616] p-4">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-[#777777]">Sponsor</p>
                      <p className="mt-2 text-sm font-semibold text-white">Mahind</p>
                    </div>
                    <div className="rounded-3xl bg-[#161616] p-4">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-[#777777]">Mobile</p>
                      <p className="mt-2 text-sm font-semibold text-white">+63 912 345 678</p>
                    </div>
                    <div className="rounded-3xl bg-[#161616] p-4">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-[#777777]">Joined</p>
                      <p className="mt-2 text-sm font-semibold text-white">17 Jun 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-black/10 bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-[#FFD31A]" />
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#777777]">Your referral QR</p>
                  <p className="mt-2 text-xl font-semibold text-black">Scan to share</p>
                </div>
              </div>
              <div className="mt-6 rounded-[28px] border border-black/10 bg-[#F7F4E5] p-6 text-center">
                <Image
                  src="/images/bzb/referral-qr.png"
                  alt="Referral QR code"
                  width={240}
                  height={240}
                  className="mx-auto"
                />
                <p className="mt-4 text-sm text-[#777777]">Use this QR to send referrals and grow your team.</p>
              </div>
              <button className="mt-6 w-full rounded-full bg-[#E5C400] px-6 py-4 text-sm font-semibold text-black transition hover:bg-[#D4B400]">
                Share referral link
              </button>
            </div>

            <div className="rounded-[32px] border border-black/10 bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
              <p className="text-sm uppercase tracking-[0.3em] text-[#777777]">Quick stats</p>
              <div className="mt-6 grid gap-4">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-[20px] border border-black/10 bg-[#F7F4E5] p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#777777]">{item.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-black">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
