import AdminLayout from '@/components/admin/AdminLayout';
import { getAllMembers } from '@/services/memberService';
import StatusUpdateBadge from '@/components/admin/StatusUpdateBadge';
export const dynamic = "force-dynamic";


export default async function AdminMembersPage() {
  const adminMembers = await getAllMembers();
  const activeCount = adminMembers.filter((m) => m.status === 'Active').length;
  const pendingCount = adminMembers.filter((m) => m.status === 'Pending').length;
  const totalEarnings = adminMembers.reduce((s, m) => s + Number(m.total_earnings), 0);

  return (
    <AdminLayout title="Members">
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        <section className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-4 sm:p-5 md:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-slate-500">Total Members</p>
            <p className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950">{adminMembers.length}</p>
          </div>
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-4 sm:p-5 md:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-slate-500">Active Members</p>
            <p className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950">{activeCount}</p>
          </div>
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-4 sm:p-5 md:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-slate-500">Pending Approvals</p>
            <p className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950">{pendingCount}</p>
          </div>
        </section>

        <section className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-4 sm:p-5 md:p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-950">Members</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage member profiles, review status, and monitor referral performance.</p>
            </div>
            <div className="rounded-2xl sm:rounded-3xl bg-slate-50 px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-600 whitespace-nowrap">Total earnings tracked: Rs. {totalEarnings.toLocaleString()}</div>
          </div>

          <div className="mt-4 sm:mt-6 overflow-x-auto rounded-2xl sm:rounded-3xl border border-slate-200/70">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 sm:px-4 py-3 sm:py-4">ID</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4">Member</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 hidden sm:table-cell">Sponsor</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 hidden md:table-cell">Level</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4">Status</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 hidden lg:table-cell">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {adminMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50">
                    <td className="px-3 sm:px-4 py-3 sm:py-4 font-medium text-slate-900 text-xs sm:text-sm">{member.id}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <div className="flex flex-col gap-0.5 sm:gap-1">
                        <span className="font-semibold text-slate-950 text-xs sm:text-sm">{member.name}</span>
                        <span className="text-xs text-slate-500 hidden sm:block">{member.email}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm hidden sm:table-cell">{member.sponsor_name ?? '-'}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm hidden md:table-cell">{member.level_name}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <StatusUpdateBadge id={member.id} current={member.status} endpoint="/api/admin/members" options={['Active','Inactive','Pending','Approved','Rejected']} />
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm hidden lg:table-cell">{member.joining_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
