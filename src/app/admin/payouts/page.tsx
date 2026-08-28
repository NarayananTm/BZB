import AdminLayout from '@/components/admin/AdminLayout';
import { getAdminPayouts } from '@/services/adminFinanceService';

export default async function AdminPayoutsPage() {
  const adminPayouts = await getAdminPayouts();
  const completed = adminPayouts.filter((payout) => payout.status === 'Completed').length;
  const scheduled = adminPayouts.filter((payout) => payout.status === 'Scheduled').length;
  const failed = adminPayouts.filter((payout) => payout.status === 'Failed').length;

  return (
    <AdminLayout title="Payouts">
      <div className="space-y-8">
        <section className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total payouts</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{adminPayouts.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{completed}</p>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Scheduled</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{scheduled}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">Payout history</h2>
              <p className="text-sm text-slate-500">Review payout lifecycle and track scheduled disbursements.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-2 text-sm text-slate-600">{failed} failed</div>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/70">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-4">ID</th>
                  <th className="px-4 py-4">Member</th>
                  <th className="px-4 py-4">Plan</th>
                  <th className="px-4 py-4">Amount</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {adminPayouts.map((payout) => (
                  <tr key={payout.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-medium text-slate-900">{payout.id}</td>
                    <td className="px-4 py-4">{payout.memberName}</td>
                    <td className="px-4 py-4">{payout.plan}</td>
                    <td className="px-4 py-4">{payout.amount}</td>
                    <td className="px-4 py-4">{payout.payoutDate}</td>
                    <td className="px-4 py-4 text-slate-600">{payout.status}</td>
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
