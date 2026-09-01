
import AdminLayout from '@/components/admin/AdminLayout';
import { getAllEarnings } from '@/services/earningService';
import StatusUpdateBadge from '@/components/admin/StatusUpdateBadge';
export const dynamic = "force-dynamic";

export const dynamic = 'force-dynamic';

export default async function AdminEarningsPage() {
  const adminEarnings = await getAllEarnings();
  const totalTransactions = adminEarnings.length;
  const completed = adminEarnings.filter((e) => e.status === 'Completed').length;
  const pending = adminEarnings.filter((e) => e.status === 'Pending').length;
  const totalAmount = adminEarnings.reduce((s, e) => s + Number(e.amount), 0);

  return (
    <AdminLayout title="Earnings">
      <div className="space-y-8">
        <section className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total earnings</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">Rs. {totalAmount.toLocaleString()}</p>
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
              <h2 className="text-2xl font-semibold text-slate-950">Earnings transactions</h2>
              <p className="text-sm text-slate-500">Track payouts and referral income for members.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-2 text-sm text-slate-600">{totalTransactions} records</div>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/70">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-4">ID</th>
                  <th className="px-4 py-4">Member</th>
                  <th className="px-4 py-4">Source</th>
                  <th className="px-4 py-4">Amount</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {adminEarnings.map((earning) => (
                  <tr key={earning.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-medium text-slate-900">{earning.id}</td>
                    <td className="px-4 py-4">{earning.member_name}</td>
                    <td className="px-4 py-4">{earning.source}</td>
                    <td className="px-4 py-4">Rs.{Number(earning.amount).toLocaleString('en-IN')}</td>
                    <td className="px-4 py-4">{earning.earn_date}</td>
                    <td className="px-4 py-4">
                      <StatusUpdateBadge id={earning.id} current={earning.status} endpoint="/api/admin/earnings" options={['Pending','Completed','Failed']} />
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
