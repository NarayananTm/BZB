'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/apiClient';

const SETTING_LABELS: Record<string, string> = {
  site_name:             'Platform name',
  referral_bonus_l1:     'Level 1 referral bonus (Rs)',
  referral_bonus_l2:     'Level 2 referral bonus (Rs)',
  referral_bonus_l3:     'Level 3 referral bonus (Rs)',
  min_withdrawal:        'Minimum withdrawal (Rs)',
  max_withdrawal:        'Maximum withdrawal (Rs)',
  withdrawal_processing: 'Withdrawal processing days',
  maintenance_mode:      'Maintenance mode (true/false)',
};

export default function SettingsForm({ initial }: { initial: Record<string, string> }) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await api.put('/api/admin/settings', values);
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">Platform settings</h2>
            <p className="text-sm text-slate-500">Configure referral bonuses, withdrawal limits, and system options.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-3xl bg-[#E5C400] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#d5b600] disabled:opacity-50"
          >
            {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save changes'}
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(SETTING_LABELS).map(([key, label]) => (
            <div key={key} className="rounded-3xl bg-slate-50 p-5">
              <label className="block text-sm font-semibold text-slate-900">
                {label}
                <input
                  type="text"
                  value={values[key] ?? ''}
                  onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#E5C400]/50"
                />
              </label>
              <p className="mt-1 text-xs text-slate-400">{key}</p>
            </div>
          ))}

          {/* Show any extra DB keys not in the known list */}
          {Object.keys(values)
            .filter((k) => !SETTING_LABELS[k])
            .map((key) => (
              <div key={key} className="rounded-3xl bg-slate-50 p-5">
                <label className="block text-sm font-semibold text-slate-900">
                  {key}
                  <input
                    type="text"
                    value={values[key]}
                    onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#E5C400]/50"
                  />
                </label>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
