import AdminLayout from '@/components/admin/AdminLayout';
import { adminAuditLogs } from '@/data/admin/auditLogs';

export default function AdminAuditLogsPage() {
  return (
    <AdminLayout title="Audit Logs">
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">Audit logs</h2>
          <p className="mt-2 text-sm text-slate-500">Track admin actions, approvals, and event outcomes.</p>
          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/70">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-4">ID</th>
                  <th className="px-4 py-4">User</th>
                  <th className="px-4 py-4">Action</th>
                  <th className="px-4 py-4">Target</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {adminAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-medium text-slate-900">{log.id}</td>
                    <td className="px-4 py-4">{log.user}</td>
                    <td className="px-4 py-4">{log.action}</td>
                    <td className="px-4 py-4">{log.target}</td>
                    <td className="px-4 py-4">{log.date}</td>
                    <td className={`px-4 py-4 font-semibold ${log.status === 'Success' ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {log.status}
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
