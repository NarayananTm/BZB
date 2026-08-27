import AdminLayout from '@/components/admin/AdminLayout';
import { getAllSettings } from '@/services/settingService';
import SettingsForm from '@/components/admin/SettingsForm';

export default async function AdminSettingsPage() {
  const settings = await getAllSettings();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return (
    <AdminLayout title="Settings">
      <SettingsForm initial={map} />
    </AdminLayout>
  );
}
