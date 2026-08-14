import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminSettingsPage() {
  return (
    <AdminLayout title="Settings">
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">Platform settings</h2>
              <p className="text-sm text-slate-500">Configure admin preferences, system notifications, and security options.</p>
            </div>
            <button className="rounded-3xl bg-[#E5C400] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#d5b600]">
              Save changes
            </button>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-950">Security</h3>
              <p className="mt-2 text-sm text-slate-500">Manage admin access controls and session settings.</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Two-factor authentication</p>
                  <p className="mt-2 text-sm text-slate-600">Enabled for superadmin accounts.</p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Session timeout</p>
                  <p className="mt-2 text-sm text-slate-600">30 minutes of inactivity.</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-950">Notifications</h3>
              <p className="mt-2 text-sm text-slate-500">Control how admin alerts are delivered.</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">Email alerts</p>
                  <p className="mt-2 text-sm text-slate-600">Active for all admin events.</p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">System notices</p>
                  <p className="mt-2 text-sm text-slate-600">In-app alerts are enabled.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
