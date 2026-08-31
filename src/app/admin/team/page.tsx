import AdminLayout from '@/components/admin/AdminLayout';
import { getAdminMembers } from '@/services/adminMemberService';
export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const adminMembers = await getAdminMembers();
  const sponsorMap = adminMembers.reduce<Record<string, number>>((acc, member) => {
    acc[member.sponsor] = (acc[member.sponsor] || 0) + 1;
    return acc;
  }, {});
  const topPerformers = [...adminMembers].sort((a, b) => b.teamCount - a.teamCount).slice(0, 4);
  return (
    <AdminLayout title="Team">
      <div className="space-y-8">
        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Team Members</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{adminMembers.reduce((sum, member) => sum + member.teamCount, 0)}</p>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Average Referrals</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{Math.round(adminMembers.reduce((sum, member) => sum + member.referralCount, 0) / adminMembers.length)}</p>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Top Sponsor</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{Object.entries(sponsorMap).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'N/A'}</p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Sponsor breakdown</h2>
            <p className="mt-2 text-sm text-slate-500">Count of members grouped by sponsor.</p>
            <div className="mt-6 space-y-3">
              {Object.entries(sponsorMap).map(([sponsor, count]) => (
                <div key={sponsor} className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">{sponsor}</p>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{count} members</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Top team performers</h2>
            <p className="mt-2 text-sm text-slate-500">Members with highest downstream team counts.</p>
            <div className="mt-6 space-y-4">
              {topPerformers.map((member) => (
                <div key={member.id} className="rounded-3xl border border-slate-200/70 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-950">{member.name}</p>
                      <p className="text-sm text-slate-500">{member.level}</p>
                    </div>
                    <span className="text-sm text-slate-600">Team size: {member.teamCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
