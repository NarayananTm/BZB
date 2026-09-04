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
import { getMemberProfile } from '@/lib/postgres';
import { getAdminSessionUser } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getAdminSessionUser();
  
  // Get member by email first, if not found check profile
  let me = session?.email ? await getMemberByEmail(session.email) : null;
  
  // Fallback: if member not found by email, try profile lookup
  if (!me && session?.email) {
    const profile = await getMemberProfile(session.email);
    if (profile) {
      me = profile as any;
    }
  }

  // Use admin session name if member not found
  const displayName = me?.name || session?.name || 'Member';
  const userGroup = session?.role || 'Member of BZB';

  const [levels, topups, earnings, teamMembers] = me
    ? await Promise.all([
        getAllLevels(),
        getTopupsByMember(me.id),
        getEarningsByMember(me.id),
        getTeamMembers(me.id),
      ])
    : [await getAllLevels(), [], [], []];

  const levelProgressItems = levels.map((lvl) => ({
    id: lvl.id,
    name: lvl.name,
    pct: me
      ? Math.min(100, Math.round((me.referral_count / lvl.required_referrals) * 100))
      : 0,
    required_referrals: lvl.required_referrals,
    current_referrals: me?.referral_count ?? 0,
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
              <DashboardHeader userName={displayName} />
              <LevelProgress levels={levelProgressItems.map(l => ({ name: l.name, pct: l.pct }))} />
            </div>
            <div className="ml-6">
              <button className="inline-flex h-14 min-w-[220px] items-center justify-center rounded-[16px] bg-[#E5C500] px-6 text-base font-semibold text-white">Add Member</button>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[360px_1fr_320px]">
            <div className="col-span-1">
              <IncomeWalletCard
                memberName={displayName}
                memberGroup={userGroup}
                totalEarnings={totalEarnings}
                avatar={me?.avatar}
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
