import AdminLayout from '@/components/admin/AdminLayout';
import DashboardHeader from '@/components/admin/DashboardHeader';
import MemberAnalyticsCard from '@/components/admin/referral/MemberAnalyticsCard';
import ReferGrowCard from '@/components/admin/referral/ReferGrowCard';
import ReferralProgressCard from '@/components/admin/referral/ReferralProgressCard';
import SponsorReferralCard from '@/components/admin/referral/SponsorReferralCard';
// import UserReferralCard from '@/components/admin/referral/UserReferralCard';
// import UserIDCard from '@/components/admin/referral/UserIDCard';
import { getMemberByEmail, getMemberById } from '@/services/memberService';
import { getReferralsBySponsor } from '@/services/referralService';
import { getAdminSessionUser } from '@/lib/adminAuth';
export const dynamic = "force-dynamic";

export default async function AdminReferralsPage() {
  const session = await getAdminSessionUser();
  const me = session?.email ? await getMemberByEmail(session.email) : null;
  const member = me;
  const userId = member?.id || session?.id?.toString() || '';
  const referrals = userId ? await getReferralsBySponsor(userId) : [];
  const progress = referrals ? Math.min(100, Math.round((referrals.length / 9) * 100)) : 0;
  
  const displayName = member?.name || session?.name || 'User';
  const mobile = member?.mobile || session?.mobile ;
  const rawDate = member?.joining_date || session?.joining_date;
  const joinDate = rawDate ? new Date(rawDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : undefined;
  
  // Fetch sponsor name if sponsor_id exists but sponsor_name is not set
  let sponsorName = member?.sponsor_name;
  if (!sponsorName && member?.sponsor_id) {
    const sponsor = await getMemberById(member.sponsor_id);
    sponsorName = sponsor?.name || undefined;
  }

  return (
    <AdminLayout title="Referrals">
      <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-1 mt-0">
        <section className="rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[32px] p-3 sm:p-4 md:p-5 lg:p-6">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
              <div className="flex-1">
                <DashboardHeader userName={displayName} />
                <div>
                  <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500">{userId} <a className="ml-2 text-slate-500" href="#">↗</a></div>
                  <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500">{referrals.length} referrals</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:gap-4 md:gap-5 lg:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-[42%_15%_40%]">
          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
            <MemberAnalyticsCard data={[5, 12, 8, 20, 35, 22, 28]} />
            <ReferGrowCard direct={referrals.length} referrals={me?.team_count ?? 0} total={referrals.length + (me?.team_count ?? 0)} />
          </div>

          <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
            <ReferralProgressCard percent={progress} />
          </div>

          <div>
            <SponsorReferralCard
              sponsor={sponsorName}
              mobile={mobile}
              joinDate={joinDate}
              memberId={userId}
              memberName={displayName}
            />
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
