
import AdminLayout from '@/components/admin/AdminLayout';
import { getAllEarnings } from '@/services/earningService';
import StatusUpdateBadge from '@/components/admin/StatusUpdateBadge';
export const dynamic = "force-dynamic";


export default async function AdminEarningsPage() {
  const adminEarnings = await getAllEarnings();
  const totalTransactions = adminEarnings.length;
  const completed = adminEarnings.filter((e) => e.status === 'Completed').length;
  const pending = adminEarnings.filter((e) => e.status === 'Pending').length;
  const totalAmount = adminEarnings.reduce((s, e) => s + Number(e.amount), 0);

  return (
    <AdminLayout title="Earnings">
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        <section className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-4 sm:p-5 md:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-slate-500">Total earnings</p>
            <p className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-4xl font-semibold text-slate-950">Rs. {totalAmount.toLocaleString()}</p>
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
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-950">Earnings transactions</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Track payouts and referral income for members.</p>
            </div>
            <div className="rounded-2xl sm:rounded-3xl bg-slate-50 px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-600 whitespace-nowrap">{totalTransactions} records</div>
          </div>

          <div className="mt-4 sm:mt-6 overflow-x-auto rounded-2xl sm:rounded-3xl border border-slate-200/70">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 sm:px-4 py-3 sm:py-4">ID</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4">Member</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 hidden sm:table-cell">Source</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 hidden md:table-cell">Amount</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 hidden lg:table-cell">Date</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {adminEarnings.map((earning) => (
                  <tr key={earning.id} className="hover:bg-slate-50">
                    <td className="px-3 sm:px-4 py-3 sm:py-4 font-medium text-slate-900 text-xs sm:text-sm">{earning.id}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm">{earning.member_name}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 hidden sm:table-cell text-xs sm:text-sm">{earning.source}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 hidden md:table-cell text-xs sm:text-sm">Rs.{Number(earning.amount).toLocaleString('en-IN')}</td>
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
