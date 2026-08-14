import AdminLayout from '@/components/admin/AdminLayout';
import { adminMembers } from '@/data/admin/members';
import { adminReferrals } from '@/data/admin/referrals';
import ProfileInteractive from '@/components/admin/ProfileInteractive';
import DashboardHeader from '@/components/admin/DashboardHeader';

export default function AdminProfilePage() {
  const member = adminMembers[0];

  return (
    <AdminLayout title="Profile">
      <div className="space-y-6 mt-2">
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
      <ProfileInteractive referrals={adminReferrals} />
</div>
    </AdminLayout>
  );
}
