import AdminLayout from '@/components/admin/AdminLayout';
import DashboardHeader from '@/components/admin/DashboardHeader';
import LevelProgress from '@/components/admin/LevelProgress';
import IncomeWalletCard from '@/components/admin/IncomeWalletCard';
import FinancialCardsGrid from '@/components/admin/FinancialCardsGrid';
import TeamMembersCard from '@/components/admin/TeamMembersCard';
import RewardsBanner from '@/components/admin/RewardsBanner';
import InviteMembersCard from '@/components/admin/InviteMembersCard';
import { getAdminMembers } from '@/services/adminMemberService';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/jwt';

export default async function AdminPage() {
  const members = await getAdminMembers();
  const token = cookies().get('bzb_token')?.value;
  let user = null;

  if (token) {
    try {
      user = verifyToken(token);
    } catch {
      redirect('/admin/login');
    }
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="mx-2  px-1 py-1 sm:px-2 lg:px-1">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <DashboardHeader userName={user?.name} />
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
                <span>ID: {user?.id}</span>
                <span>{user?.email}</span>
                {user?.mobile ? <span>{user.mobile}</span> : null}
              </div>
              <LevelProgress />
            </div>
            <div className="ml-6">
              <button className="inline-flex h-14 min-w-[220px] items-center justify-center rounded-[16px] bg-[#E5C500] px-6 text-base font-semibold text-white">Add Member</button>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[360px_1fr_320px]">
            <div className="col-span-1">
              <IncomeWalletCard />
            </div>

            <div className="col-span-1">
              <FinancialCardsGrid />
            </div>

            <div className="col-span-1">
              <TeamMembersCard members={members} />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]  min-h-[150px]">
            <RewardsBanner />
            <InviteMembersCard />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
