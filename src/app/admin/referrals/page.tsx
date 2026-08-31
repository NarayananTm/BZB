import AdminLayout from '@/components/admin/AdminLayout';
import DashboardHeader from '@/components/admin/DashboardHeader';
import MemberAnalyticsCard from '@/components/admin/referral/MemberAnalyticsCard';
import ReferGrowCard from '@/components/admin/referral/ReferGrowCard';
import ReferralProgressCard from '@/components/admin/referral/ReferralProgressCard';
import SponsorReferralCard from '@/components/admin/referral/SponsorReferralCard';
import { getMemberByEmail } from '@/services/memberService';
import { getReferralsBySponsor } from '@/services/referralService';
import { getMemberProfile } from '@/lib/postgres';
import { getAdminSessionUser } from '@/lib/adminAuth';
export const dynamic = "force-dynamic";

export default async function AdminReferralsPage() {
  const session = await getAdminSessionUser();
  const me = session?.email ? await getMemberByEmail(session.email) : null;
  const member = me ?? (session?.email ? await getMemberProfile(session.email) : null);
  const referrals = member ? await getReferralsBySponsor(member.id) : [];
  const progress = member ? Math.min(100, Math.round((referrals.length / 9) * 100)) : 0;

  return (
    <AdminLayout title="Referrals">
      <div className="space-y-1 mt-0">
        <section className="rounded-[32px] p-6">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <DashboardHeader userName={member?.name} />
                <div>
                  <div className="mt-2 text-sm text-slate-500">{member?.id} <a className="ml-2 text-slate-500" href="#">↗</a></div>
                  <div className="mt-2 text-sm text-slate-500">{referrals.length} referrals</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[42%_15%_40%]">
          <div className="space-y-6">
            <MemberAnalyticsCard data={[5, 12, 8, 20, 35, 22, 28]} />
            <ReferGrowCard direct={referrals.length} referrals={me?.team_count ?? 0} total={referrals.length + (me?.team_count ?? 0)} />
          </div>

          <div className="space-y-6">
            <ReferralProgressCard percent={progress} />
          </div>

          <div>
            <SponsorReferralCard
              sponsor={me?.sponsor_name ?? undefined}
              mobile={member?.mobile}
              joinDate={me?.joining_date}
              memberId={member?.id}
              memberName={member?.name}
            />
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
