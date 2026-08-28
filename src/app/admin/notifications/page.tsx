import AdminLayout from '@/components/admin/AdminLayout';
import { adminNotifications } from '@/data/admin/notifications';

export default function AdminNotificationsPage() {
  const unread = adminNotifications.filter((notification) => !notification.read).length;

  return (
    <AdminLayout title="Notifications">
      <div className="space-y-8">
        <section className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Unread notifications</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{unread}</p>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total messages</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950">{adminNotifications.length}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">Recent notifications</h2>
          <p className="mt-2 text-sm text-slate-500">System alerts and member updates for the admin team.</p>
          <div className="mt-6 space-y-4">
            {adminNotifications.map((notification) => (
              <div key={notification.id} className="rounded-3xl border border-slate-200/70 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-950">{notification.title}</h3>
                    <p className="text-sm text-slate-500">{notification.type} • {notification.createdDate}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${notification.read ? 'bg-slate-200 text-slate-700' : 'bg-[#E5C400]/20 text-slate-950'}`}>
                    {notification.read ? 'Read' : 'Unread'}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{notification.message}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
