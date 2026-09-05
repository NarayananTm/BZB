import AdminLayout from '@/components/admin/AdminLayout';
import { getAllWithdrawals } from '@/services/withdrawalService';
import WithdrawalActions from '@/components/admin/WithdrawalActions';
export const dynamic = "force-dynamic";


export default async function AdminWithdrawalsPage() {
  const adminWithdrawals = await getAllWithdrawals();
  const approved = adminWithdrawals.filter((w) => w.status === 'Approved').length;
  const pending = adminWithdrawals.filter((w) => w.status === 'Pending').length;
  const rejected = adminWithdrawals.filter((w) => w.status === 'Rejected').length;

  return (
    <AdminLayout title="Withdrawals">
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        <section className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-4 sm:p-5 md:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-slate-500">Pending withdrawals</p>
            <p className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950">{pending}</p>
          </div>
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-4 sm:p-5 md:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-slate-500">Approved</p>
            <p className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950">{approved}</p>
          </div>
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-4 sm:p-5 md:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-slate-500">Rejected</p>
            <p className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950">{rejected}</p>
          </div>
        </section>

        <section className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-4 sm:p-5 md:p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-950">Withdrawal requests</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">View requested payouts and check approval status.</p>
            </div>
            <div className="rounded-2xl sm:rounded-3xl bg-slate-50 px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-600 whitespace-nowrap">{adminWithdrawals.length} requests</div>
          </div>

          <div className="mt-4 sm:mt-6 overflow-x-auto rounded-2xl sm:rounded-3xl border border-slate-200/70">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 sm:px-4 py-3 sm:py-4">ID</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4">Member</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 hidden sm:table-cell">Amount</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 hidden md:table-cell">Requested</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 hidden lg:table-cell">Method</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4">Status</th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {adminWithdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id} className="hover:bg-slate-50">
                    <td className="px-3 sm:px-4 py-3 sm:py-4 font-medium text-slate-900 text-xs sm:text-sm">{withdrawal.id}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm">{withdrawal.member_name}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 hidden sm:table-cell text-xs sm:text-sm">Rs.{Number(withdrawal.amount).toLocaleString('en-IN')}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 hidden md:table-cell text-xs sm:text-sm">{withdrawal.requested_date}</td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 hidden lg:table-cell text-xs sm:text-sm">{withdrawal.payout_method}</td>
                    <td className="px-4 py-4 text-slate-600">{withdrawal.status}</td>
                    <td className="px-4 py-4">
                      <WithdrawalActions id={withdrawal.id} currentStatus={withdrawal.status} />
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
