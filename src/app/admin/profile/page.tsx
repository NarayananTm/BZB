import AdminLayout from '@/components/admin/AdminLayout';
import { getMemberByEmail } from '@/services/memberService';
import { getReferralsBySponsor, getReferralsBySponsorName } from '@/services/referralService';
import { getEarningsByMember } from '@/services/earningService';
import { getTopupsByMember } from '@/services/topupService';
import { getWithdrawalsByMember } from '@/services/withdrawalService';
import { getPayoutsByMember } from '@/services/payoutService';
import ProfileInteractive from '@/components/admin/ProfileInteractive';
import { getAdminSessionUser } from '@/lib/adminAuth';
export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const session = await getAdminSessionUser();
  const member = session?.email ? await getMemberByEmail(session.email) : null;
  const referrals = member
    ? await getReferralsBySponsor(member.id)
    : session?.name
      ? await getReferralsBySponsorName(session.name)
      : [];

  const [earnings, topups, withdrawals, payouts] = member
    ? await Promise.all([
        getEarningsByMember(member.id),
        getTopupsByMember(member.id),
        getWithdrawalsByMember(member.id),
        getPayoutsByMember(member.id),
      ])
    : [[], [], [], []];

  return (
    <AdminLayout title="Profile">
      <div className="space-y-4 mt-2">
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
