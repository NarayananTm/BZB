import AdminLayout from '@/components/admin/AdminLayout';
import { getAllNotifications } from '@/services/notificationService';
import MarkReadButton from '@/components/admin/MarkReadButton';
export const dynamic = "force-dynamic";


export default async function AdminNotificationsPage() {
  const notifications = await getAllNotifications();
  const unread = notifications.filter((n) => !n.is_read).length;

  return (
    <AdminLayout title="Notifications">
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        <section className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2">
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-3 sm:p-4 md:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-slate-500">Unread notifications</p>
            <p className="mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950">{unread}</p>
          </div>
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-3 sm:p-4 md:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-slate-500">Total messages</p>
            <p className="mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950">{notifications.length}</p>
          </div>
        </section>

        <section className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white p-3 sm:p-4 md:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-950">Recent notifications</h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500">System alerts and member updates for the admin team.</p>
          <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 md:space-y-4">
            {notifications.map((n) => (
              <div key={n.id} className="rounded-xl sm:rounded-2xl md:rounded-3xl border border-slate-200/70 bg-slate-50 p-3 sm:p-4 md:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 md:gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-slate-950 truncate">{n.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 truncate">{n.type} • {n.created_date}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold whitespace-nowrap ${n.is_read ? 'bg-slate-200 text-slate-700' : 'bg-[#E5C400]/20 text-slate-950'}`}>
                      {n.is_read ? 'Read' : 'Unread'}
                    </span>
                    <MarkReadButton id={n.id} isRead={n.is_read} />
                  </div>
                </div>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600">{n.message}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
