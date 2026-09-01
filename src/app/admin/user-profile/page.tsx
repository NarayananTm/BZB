import AdminLayout from '@/components/admin/AdminLayout';
import AdminProfileTabs from '@/components/admin/AdminProfileTabs';
export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  return (
    <AdminLayout title="Profile">
      <div className="space-y-1 mt-1 max-h-[calc(100vh-10px)] ">
        <section className="">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div>
                  <h1 className="text-[30px] font-semibold text-[#111111]">Member Profile</h1>
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
