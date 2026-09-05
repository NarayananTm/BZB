import AdminLayout from '@/components/admin/AdminLayout';
import { getAllReports } from '@/services/reportService';

export const dynamic = 'force-dynamic';

export default async function AdminReportsPage() {
  const reports = await getAllReports();
  const readyReports = reports.filter((r) => r.status === 'Ready').length;
  const scheduledReports = reports.filter((r) => r.status === 'Scheduled').length;

  return (
    <AdminLayout title="Reports">
      
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
          
        <section className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2">
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-3 sm:p-4 md:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-slate-500">Ready reports</p>
            <p className="mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950">{readyReports}</p>
          </div>
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-3 sm:p-4 md:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-slate-500">Scheduled reports</p>
            <p className="mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950">{scheduledReports}</p>
          </div>
        </section>

        <section className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-3 sm:p-4 md:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-950">Report library</h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500">Generate performance and compliance reports for the admin team.</p>
          <div className="mt-4 sm:mt-6 overflow-x-auto rounded-xl sm:rounded-2xl md:rounded-3xl border border-slate-200/70">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">ID</th>
                  <th className="hidden sm:table-cell px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">Title</th>
                  <th className="hidden md:table-cell px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">Category</th>
                  <th className="hidden lg:table-cell px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">Owner</th>
                  <th className="hidden lg:table-cell px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">Created</th>
                  <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50">
                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 font-medium text-slate-900 text-xs sm:text-sm">{report.id}</td>
                    <td className="hidden sm:table-cell px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{report.title}</td>
                    <td className="hidden md:table-cell px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{report.category}</td>
                    <td className="hidden lg:table-cell px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{report.owner}</td>
                    <td className="hidden lg:table-cell px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm">{report.created_date}</td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-slate-600 text-xs sm:text-sm">{report.status}</td>
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
