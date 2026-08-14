import AdminLayout from '@/components/admin/AdminLayout';
import { adminLevels } from '@/data/admin/levels';

export default function AdminLevelsPage() {
  return (
    <AdminLayout title="Levels">
      <div className="space-y-8">
        <section className="grid gap-6 md:grid-cols-3">
          {adminLevels.map((level) => (
            <div key={level.id} className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{level.name}</p>
                  <h3 className="mt-3 text-3xl font-semibold text-slate-950">{level.reward}</h3>
                </div>
                <span className="rounded-2xl bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{level.status}</span>
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <p>{level.description}</p>
                <p><span className="font-semibold text-slate-950">Required referrals:</span> {level.requiredReferrals}</p>
                <p><span className="font-semibold text-slate-950">Members:</span> {level.members}</p>
                <p><span className="font-semibold text-slate-950">Completion:</span> {level.completion}%</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
