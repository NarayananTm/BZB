import AdminLayout from '@/components/admin/AdminLayout';
import { adminReports } from '@/data/admin/reports';

export default function AdminReportsPage() {
  const readyReports = adminReports.filter((report) => report.status === 'Ready').length;
  const scheduledReports = adminReports.filter((report) => report.status === 'Scheduled').length;

  return (
    <AdminLayout title="Reports">
      
      <div className="space-y-8">
          
        <section className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Ready reports</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{readyReports}</p>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Scheduled reports</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{scheduledReports}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">Report library</h2>
          <p className="mt-2 text-sm text-slate-500">Generate performance and compliance reports for the admin team.</p>
          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/70">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-4">ID</th>
                  <th className="px-4 py-4">Title</th>
                  <th className="px-4 py-4">Category</th>
                  <th className="px-4 py-4">Owner</th>
                  <th className="px-4 py-4">Created</th>
                  <th className="px-4 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {adminReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-medium text-slate-900">{report.id}</td>
                    <td className="px-4 py-4">{report.title}</td>
                    <td className="px-4 py-4">{report.category}</td>
                    <td className="px-4 py-4">{report.owner}</td>
                    <td className="px-4 py-4">{report.createdDate}</td>
                    <td className="px-4 py-4 text-slate-600">{report.status}</td>
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
