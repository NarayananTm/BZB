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
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        <section className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-4 sm:p-5 md:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-slate-500">Requests</p>
            <p className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950">{adminTopups.length}</p>
          </div>
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-4 sm:p-5 md:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-slate-500">Completed</p>
            <p className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950">{completed}</p>
          </div>
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-4 sm:p-5 md:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-slate-500">Pending</p>
            <p className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950">{pending}</p>
          </div>
        </section>

        <section className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-4 sm:p-5 md:p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-950">Top-up requests</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Review pending top-up activity and approve incoming payments.</p>
            </div>
            <div className="rounded-2xl sm:rounded-3xl bg-slate-50 px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-600 whitespace-nowrap">{failed} failed</div>
          </div>

          <div className="mt-4 sm:mt-6 overflow-x-auto rounded-2xl sm:rounded-3xl border border-slate-200/70">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 sm:px-4 py-3 sm:py-4">ID</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4">Member</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 hidden sm:table-cell">Amount</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 hidden md:table-cell">Method</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 hidden lg:table-cell">Date</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4">Status</th>                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {adminTopups.map((topup) => (
                  <tr key={topup.id} className="hover:bg-slate-50">
                    <td className="px-3 sm:px-4 py-3 sm:py-4 font-medium text-slate-900">{topup.id}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4">{topup.member_name}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 hidden sm:table-cell">Rs.{Number(topup.amount).toLocaleString('en-IN')}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 hidden md:table-cell">{topup.method}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 hidden lg:table-cell">{topup.topup_date}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4">
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
