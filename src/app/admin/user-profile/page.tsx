import AdminLayout from '@/components/admin/AdminLayout';
import { adminMembers } from '@/data/admin/members';
import AdminProfileTabs from '@/components/admin/AdminProfileTabs';
import DashboardHeader from '@/components/admin/DashboardHeader';

export default function AdminProfilePage() {
  const member = adminMembers[0];

  return (
    <AdminLayout title="Profile">
      <div className="space-y-1 mt-1 max-h-[calc(100vh-150px)] ">
        <section className="">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <DashboardHeader />
                <div>
                  <div className="mt-2 text-sm text-slate-500">{member?.id} <a className="ml-2 text-slate-500" href="#">↗</a></div>
                </div>
              </div>

            </div>
          </div>
        </section>
        <AdminProfileTabs />
      </div>
    </AdminLayout>
  );
}
