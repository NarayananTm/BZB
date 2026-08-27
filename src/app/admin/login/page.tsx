'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm]       = useState({ userId: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername: form.userId, password: form.password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message ?? 'Login failed');

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#E5C500]/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo / brand */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5C500]">
            <ShieldCheck className="h-8 w-8 text-black" />
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E5C500]">BZB Group</p>
            <h1 className="mt-1 text-2xl font-bold text-white">Admin Portal</h1>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
          <p className="mb-6 text-sm text-slate-400">Sign in with your admin credentials to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User ID */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                Admin User ID
              </label>
              <input
                type="text"
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
                required
                autoComplete="username"
                placeholder="Enter your user ID"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E5C500]/50 focus:ring-1 focus:ring-[#E5C500]/30"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 pr-11 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E5C500]/50 focus:ring-1 focus:ring-[#E5C500]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {message && (
              <p className="rounded-lg bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-400">
                {message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E5C500] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#f0d000] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          BZB Group — Restricted access. Authorised personnel only.
        </p>
      </div>
    </main>
  );
}
