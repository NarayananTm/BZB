import AdminLayout from '@/components/admin/AdminLayout';
import DashboardHeader from '@/components/admin/DashboardHeader';
import MemberAnalyticsCard from '@/components/admin/referral/MemberAnalyticsCard';
import ReferGrowCard from '@/components/admin/referral/ReferGrowCard';
import ReferralProgressCard from '@/components/admin/referral/ReferralProgressCard';
import SponsorReferralCard from '@/components/admin/referral/SponsorReferralCard';
import { adminMembers } from '@/data/admin/members';
import { adminReferrals } from '@/data/admin/referrals';

export default function AdminReferralsPage() {
  const activeReferrals = adminReferrals.filter((referral) => referral.status === 'Active').length;
  const pendingReferrals = adminReferrals.filter((referral) => referral.status === 'Pending').length;
  const approvedReferrals = adminReferrals.filter((referral) => referral.status === 'Approved').length;
  const selectedMember = adminMembers[0];
  const progress = Math.min(100, Math.round((selectedMember.referralCount / 9) * 100));

  return (
    <AdminLayout title="Referrals">
      <div className="space-y-8 mt-6">
        <section className="rounded-[32px] border border-slate-200/70 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center justify-between">
            <div className="flex-1">
              <DashboardHeader />
                <div>
            <div className="mt-2 text-sm text-slate-500">{selectedMember?.id} <a className="ml-2 text-slate-500" href="#">↗</a></div>
          </div>
            </div>
          
          </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[42%_18%_37%]">
          <div className="space-y-6">
            <MemberAnalyticsCard data={[5, 12, 8, 20, 35, 22, 28]} />
            <ReferGrowCard direct={selectedMember.referralCount} referrals={selectedMember.teamCount} total={selectedMember.referralCount + selectedMember.teamCount} />
          </div>

          <div className="space-y-6">
            <ReferralProgressCard percent={progress} />
            {/* <div className="rounded-[20px] border border-[#F1F1F1] bg-white p-5">
              <h3 className="text-sm font-semibold text-[#E5C500]">Referral Snapshot</h3>
              <div className="mt-5 grid gap-4">
                <div className="rounded-[18px] bg-[#F7F7F7] p-4">
                  <p className="text-sm text-[#777777]">Member level</p>
                  <p className="mt-2 text-2xl font-semibold text-[#111111]">{selectedMember.level}</p>
                </div>
                <div className="rounded-[18px] bg-[#F7F7F7] p-4">
                  <p className="text-sm text-[#777777]">Wallet balance</p>
                  <p className="mt-2 text-2xl font-semibold text-[#111111]">{selectedMember.walletBalance}</p>
                </div>
              </div>
            </div> */}
          </div>

          <div>
            <SponsorReferralCard
              sponsor={selectedMember.sponsor}
              mobile={selectedMember.mobile}
              joinDate={selectedMember.joiningDate}
              memberName={selectedMember.name}
              memberId={selectedMember.id}
            />
          </div>
        </section>

        {/* <section className="rounded-[32px] border border-slate-200/70 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">Referral list</h2>
              <p className="mt-2 text-sm text-slate-500">Review referral status, reward levels, and join dates.</p>
            </div>
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
              Total referrals: {adminReferrals.length}
            </div>
          </div>
          <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-4">ID</th>
                  <th className="px-4 py-4">Sponsor</th>
                  <th className="px-4 py-4">Referred Member</th>
                  <th className="px-4 py-4">Level</th>
                  <th className="px-4 py-4">Joined</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Reward</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {adminReferrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-medium text-slate-900">{referral.id}</td>
                    <td className="px-4 py-4">{referral.sponsor}</td>
                    <td className="px-4 py-4">{referral.memberName}</td>
                    <td className="px-4 py-4">{referral.level}</td>
                    <td className="px-4 py-4">{referral.joinDate}</td>
                    <td className="px-4 py-4 text-slate-600">{referral.status}</td>
                    <td className="px-4 py-4 font-medium text-slate-900">{referral.reward}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section> */}
      </div>
    </AdminLayout>
  );
}
