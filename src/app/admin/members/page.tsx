import AdminLayout from '@/components/admin/AdminLayout';
import { getAdminMembers } from '@/services/adminMemberService';

export default async function AdminMembersPage() {
  const adminMembers = await getAdminMembers();
  const activeCount = adminMembers.filter((member) => member.status === 'Active').length;
  const pendingCount = adminMembers.filter((member) => member.status === 'Pending').length;
  const totalEarnings = adminMembers.length > 0 ? adminMembers.reduce((sum, member) => sum + Number(member.totalEarnings.replace(/[^0-9]/g, '')), 0) : 0;

  return (
    <AdminLayout title="Members">
      <div className="space-y-8">
        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Members</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{adminMembers.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Active Members</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{activeCount}</p>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Pending Approvals</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{pendingCount}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">Members</h2>
              <p className="text-sm text-slate-500">Manage member profiles, review status, and monitor referral performance.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-2 text-sm text-slate-600">Total earnings tracked: Rs. {totalEarnings.toLocaleString()}</div>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/70">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-4">ID</th>
                  <th className="px-4 py-4">Member</th>
                  <th className="px-4 py-4">Sponsor</th>
                  <th className="px-4 py-4">Level</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {adminMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-medium text-slate-900">{member.id}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-slate-950">{member.name}</span>
                        <span className="text-xs text-slate-500">{member.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">{member.sponsor}</td>
                    <td className="px-4 py-4">{member.level}</td>
                    <td className="px-4 py-4 text-slate-600">{member.status}</td>
                    <td className="px-4 py-4">{member.joiningDate}</td>
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
