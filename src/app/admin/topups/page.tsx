import AdminLayout from '@/components/admin/AdminLayout';
import { getAllTopups } from '@/services/topupService';
import StatusUpdateBadge from '@/components/admin/StatusUpdateBadge';
export const dynamic = "force-dynamic";


export default async function AdminTopupsPage() {
  const adminTopups = await getAllTopups();
  const completed = adminTopups.filter((t) => t.status === 'Completed').length;
  const pending = adminTopups.filter((t) => t.status === 'Pending').length;
  const failed = adminTopups.filter((t) => t.status === 'Failed').length;

  return (
    <AdminLayout title="Top-ups">
      <div className="space-y-8">
        <section className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Requests</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{adminTopups.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{completed}</p>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{pending}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">Top-up requests</h2>
              <p className="text-sm text-slate-500">Review pending top-up activity and approve incoming payments.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-2 text-sm text-slate-600">{failed} failed</div>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/70">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-4">ID</th>
                  <th className="px-4 py-4">Member</th>
                  <th className="px-4 py-4">Amount</th>
                  <th className="px-4 py-4">Method</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Status</th>                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {adminTopups.map((topup) => (
                  <tr key={topup.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-medium text-slate-900">{topup.id}</td>
                    <td className="px-4 py-4">{topup.member_name}</td>
                    <td className="px-4 py-4">Rs.{Number(topup.amount).toLocaleString('en-IN')}</td>
                    <td className="px-4 py-4">{topup.method}</td>
                    <td className="px-4 py-4">{topup.topup_date}</td>
                    <td className="px-4 py-4">
                      <StatusUpdateBadge id={topup.id} current={topup.status} endpoint="/api/admin/topups" options={['Pending','Completed','Failed']} />
                    </td>
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
