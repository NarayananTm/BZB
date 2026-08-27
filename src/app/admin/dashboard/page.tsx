import AdminLayout from '@/components/admin/AdminLayout';
import DashboardHeader from '@/components/admin/DashboardHeader';
import LevelProgress from '@/components/admin/LevelProgress';
import IncomeWalletCard from '@/components/admin/IncomeWalletCard';
import FinancialCardsGrid from '@/components/admin/FinancialCardsGrid';
import TeamMembersCard from '@/components/admin/TeamMembersCard';
import RewardsBanner from '@/components/admin/RewardsBanner';
import InviteMembersCard from '@/components/admin/InviteMembersCard';
import { getMemberByEmail, getTeamMembers } from '@/services/memberService';
import { getAllLevels } from '@/services/levelService';
import { getTopupsByMember } from '@/services/topupService';
import { getEarningsByMember } from '@/services/earningService';
import { getSessionUser } from '@/lib/session';

export default async function AdminDashboardPage() {
  const session = await getSessionUser();
  const me = session?.email ? await getMemberByEmail(session.email) : null;

  const [levels, topups, earnings, teamMembers] = me
    ? await Promise.all([
        getAllLevels(),
        getTopupsByMember(me.id),
        getEarningsByMember(me.id),
        getTeamMembers(me.id),
      ])
    : [await getAllLevels(), [], [], []];

  const levelProgressItems = levels.map((lvl) => ({
    name: `${lvl.name} Complete`,
    pct: me
      ? Math.min(100, Math.round((me.referral_count / lvl.required_referrals) * 100))
      : 0,
  }));

  const topupCount = topups.length;
  const walletBalance = me?.wallet_balance ?? 0;
  const totalEarnings = me?.total_earnings ?? 0;
  const completedEarnings = earnings
    .filter((e) => e.status === 'Completed')
    .reduce((s, e) => s + Number(e.amount), 0);

  return (
    <AdminLayout title="Dashboard">
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <DashboardHeader userName={me?.name} />
              <LevelProgress levels={levelProgressItems} />
            </div>
            <div className="ml-6">
              <button className="inline-flex h-14 min-w-[220px] items-center justify-center rounded-[16px] bg-[#E5C500] px-6 text-base font-semibold text-white">Add Member</button>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[360px_1fr_320px]">
            <div className="col-span-1">
              <IncomeWalletCard
                memberName={me?.name}
                memberGroup="Member of BZB"
                totalEarnings={totalEarnings}
              />
            </div>
            <div className="col-span-1">
              <FinancialCardsGrid
                topupCount={topupCount}
                walletBalance={walletBalance}
                boosterTopup={0}
                levelIncome={completedEarnings}
                downlinesTopup={0}
              />
            </div>
            <div className="col-span-1">
              <TeamMembersCard members={teamMembers} />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
            <RewardsBanner />
            <InviteMembersCard />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default async function AdminDashboardPage() {
  const [members, levels, topups, earnings] = await Promise.all([
    getAllMembers(),
    getAllLevels(),
    getAllTopups(),
    getAllEarnings(),
  ]);

  // Use first member as the logged-in member context
  const me = members[0];

  const levelProgressItems = levels.map((lvl) => ({
    name: `${lvl.name} Complete`,
    pct: lvl.completion_pct,
  }));

  const topupCount = topups.filter((t) => t.member_id === me?.id).length;
  const walletBalance = me?.wallet_balance ?? 0;
  const totalEarnings = me?.total_earnings ?? 0;
  const completedEarnings = earnings
    .filter((e) => e.member_id === me?.id && e.status === 'Completed')
    .reduce((s, e) => s + Number(e.amount), 0);

  return (
    <AdminLayout title="Dashboard">
      <div className="mx-auto  px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <DashboardHeader userName={me?.name} />
              <LevelProgress levels={levelProgressItems} />
            </div>
            <div className="ml-6">
              <button className="inline-flex h-14 min-w-[220px] items-center justify-center rounded-[16px] bg-[#E5C500] px-6 text-base font-semibold text-white">Add Member</button>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[360px_1fr_320px]">
            <div className="col-span-1">
              <IncomeWalletCard
                memberName={me?.name}
                memberGroup={`Member of BZB`}
                totalEarnings={totalEarnings}
              />
            </div>

            <div className="col-span-1">
              <FinancialCardsGrid
                topupCount={topupCount}
                walletBalance={walletBalance}
                boosterTopup={0}
                levelIncome={completedEarnings}
                downlinesTopup={0}
              />
            </div>

            <div className="col-span-1">
              <TeamMembersCard members={members} />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
            <RewardsBanner />
            <InviteMembersCard />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
