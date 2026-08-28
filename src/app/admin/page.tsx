'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardHeader from '@/components/admin/DashboardHeader';
import LevelProgress from '@/components/admin/LevelProgress';
import IncomeWalletCard from '@/components/admin/IncomeWalletCard';
import FinancialCardsGrid from '@/components/admin/FinancialCardsGrid';
import TeamMembersCard from '@/components/admin/TeamMembersCard';
import RewardsBanner from '@/components/admin/RewardsBanner';
import InviteMembersCard from '@/components/admin/InviteMembersCard';
import type { Member } from '@/services/memberService';

type Dashboard = {
  total_members: number; total_earnings: number; total_withdrawals: number; total_topups: number;
  pending_withdrawals: number; pending_topups: number; unread_notifications: number;
  levels: { name: string; pct: number }[];
};
type Admin = { id: number; name: string; email: string; role: string };
type Profile = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  avatar: string | null;
};

export default function AdminPage() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  // const [error, setError] = useState('Loading dashboard...');

  useEffect(() => {
    Promise.all([fetch('/api/admin/dashboard'), fetch('/api/admin/members'), fetch('/api/admin/profile')]).then(async ([statsResponse, membersResponse, profileResponse]) => {
      const stats = await statsResponse.json();
      const memberData = await membersResponse.json();
      const profileData = await profileResponse.json();
      if (statsResponse.status === 401 || membersResponse.status === 401 || profileResponse.status === 401) {
        router.replace('/admin/login');
        return;
      }
      if (!statsResponse.ok || !stats.success) throw new Error(stats.message || 'Unable to load dashboard');
      if (!membersResponse.ok || !memberData.success) throw new Error(memberData.message || 'Unable to load members');
      if (!profileResponse.ok || !profileData.success) throw new Error(profileData.message || 'Unable to load profile');
      setDashboard(stats.data);
      setAdmin(stats.admin);
      setMembers(memberData.data || []);
      setProfile(profileData.profile);
      setError('');
    }).catch((reason) => setError(reason instanceof Error ? reason.message : 'Unable to load dashboard'));
  }, [router]);

  const totalEarnings = Number(dashboard?.total_earnings || 0);
  const totalTopups = Number(dashboard?.total_topups || 0);
  const totalWithdrawals = Number(dashboard?.total_withdrawals || 0);

  return (
    <AdminLayout title="Dashboard">
      <div className="mx-2 px-1 py-1 sm:px-2 lg:px-1">
        {/* {error && <p className="mb-3 text-sm text-slate-500">{error}</p>} */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <DashboardHeader userName={admin?.name || ''} />
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
                <span>ID: {admin?.id || '-'}</span><span>{admin?.email || '-'}</span><span>{admin?.role || '-'}</span>
              </div>
              <LevelProgress levels={dashboard?.levels} />
            </div>
            <div className="ml-6"><button className="inline-flex h-14 min-w-[220px] items-center justify-center rounded-[16px] bg-[#E5C500] px-6 text-base font-semibold text-white">Add Member</button></div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[360px_1fr_320px]">
            <IncomeWalletCard memberName={profile?.name || admin?.name} memberGroup={profile?.email || admin?.role} totalEarnings={dashboard ? totalEarnings : undefined} avatar={profile?.avatar} />
            <FinancialCardsGrid topupCount={dashboard?.total_topups || 0} walletBalance={totalTopups - totalWithdrawals} levelIncome={totalEarnings} downlinesTopup={totalTopups} />
            <TeamMembersCard members={members} />
          </div>

          <div className="grid min-h-[150px] gap-6 lg:grid-cols-[1.7fr_0.9fr]"><RewardsBanner /><InviteMembersCard /></div>
        </div>
      </div>
    </AdminLayout>
  );
}
