import AdminLayout from '@/components/admin/AdminLayout';
import { getMemberById, getTeamMembers } from '@/services/memberService';
import { getEarningsByMember } from '@/services/earningService';
import { getTopupsByMember } from '@/services/topupService';
import { getWithdrawalsByMember } from '@/services/withdrawalService';
import { getPayoutsByMember } from '@/services/payoutService';
import ProfileInteractive from '@/components/admin/ProfileInteractive';
import { getAdminSessionUser } from '@/lib/adminAuth';
export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const session = await getAdminSessionUser();
  const member = session?.id ? await getMemberById(String(session.id)) : null;
  const directMembers = member
    ? await getTeamMembers(member.id)
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
          directMembers={directMembers}
          earnings={earnings}
          topups={topups}
          withdrawals={withdrawals}
          payouts={payouts}
        />
      </div>
    </AdminLayout>
  );
}
