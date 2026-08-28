import AdminLayout from '@/components/admin/AdminLayout';
import { getAdminTopups } from '@/services/adminTopupService';

export default async function AdminTopupsPage() {
  const adminTopups = await getAdminTopups();
  const completed = adminTopups.filter((topup) => topup.status === 'Completed').length;
  const pending = adminTopups.filter((topup) => topup.status === 'Pending').length;
  const failed = adminTopups.filter((topup) => topup.status === 'Failed').length;

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
                  <th className="px-4 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {adminTopups.map((topup) => (
                  <tr key={topup.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-medium text-slate-900">{topup.id}</td>
                    <td className="px-4 py-4">{topup.memberName}</td>
                    <td className="px-4 py-4">{topup.amount}</td>
                    <td className="px-4 py-4">{topup.method}</td>
                    <td className="px-4 py-4">{topup.date}</td>
                    <td className="px-4 py-4 text-slate-600">{topup.status}</td>
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
