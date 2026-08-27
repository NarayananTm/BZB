import AdminLayout from '@/components/admin/AdminLayout';
import { getMemberByEmail } from '@/services/memberService';
import { getReferralsBySponsor } from '@/services/referralService';
import { getEarningsByMember } from '@/services/earningService';
import { getTopupsByMember } from '@/services/topupService';
import { getWithdrawalsByMember } from '@/services/withdrawalService';
import { getPayoutsByMember } from '@/services/payoutService';
import ProfileInteractive from '@/components/admin/ProfileInteractive';
import DashboardHeader from '@/components/admin/DashboardHeader';
import { getSessionUser } from '@/lib/session';

export default async function AdminProfilePage() {
  const session = await getSessionUser();
  const member = session?.email ? await getMemberByEmail(session.email) : null;

  const [referrals, earnings, topups, withdrawals, payouts] = member
    ? await Promise.all([
        getReferralsBySponsor(member.id),
        getEarningsByMember(member.id),
        getTopupsByMember(member.id),
        getWithdrawalsByMember(member.id),
        getPayoutsByMember(member.id),
      ])
    : [[], [], [], [], []];

  return (
    <AdminLayout title="Profile">
      <div className="space-y-4 mt-2">
        <section className="">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <DashboardHeader userName={member?.name} />
                <div>
                  <div className="mt-2 text-sm text-slate-500">{member?.id} <a className="ml-2 text-slate-500" href="#">↗</a></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ProfileInteractive
          referrals={referrals}
          earnings={earnings}
          topups={topups}
          withdrawals={withdrawals}
          payouts={payouts}
        />
      </div>
    </AdminLayout>
  );
}
