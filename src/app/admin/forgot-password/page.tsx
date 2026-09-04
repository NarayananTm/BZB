'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<'verify' | 'reset'>('verify');
  const [form, setForm] = useState({ email: '', mobile: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!form.email || !form.mobile) {
        throw new Error('Email and mobile number are required');
      }

      const res = await fetch('/api/admin/verify-forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, mobile: form.mobile }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Verification failed');
      }

      setResetToken(data.token);
      setStep('reset');
      setMessage('');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Verification failed');
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
            <h1 className="mt-1 text-2xl font-bold text-white">
              {step === 'verify' ? 'Forgot Password' : 'Reset Password'}
            </h1>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
          {step === 'verify' ? (
            <>
              <p className="mb-6 text-sm text-slate-400">
                Enter your email and mobile number to verify your identity and reset your password.
              </p>

              <form onSubmit={handleVerify} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E5C500]/50 focus:ring-1 focus:ring-[#E5C500]/30"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    required
                    autoComplete="tel"
                    placeholder="Enter your mobile number"
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E5C500]/50 focus:ring-1 focus:ring-[#E5C500]/30"
                  />
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
                      Verifying…
                    </>
                  ) : (
                    'Verify & Continue'
                  )}
                </button>
              </form>
            </>
          ) : (
            <ResetPasswordForm token={resetToken} />
          )}

          <div className="mt-6 border-t border-white/10 pt-5 text-center text-sm text-slate-400">
            <Link href="/admin/login" className="font-semibold text-[#E5C500] hover:underline">
              Back to login
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          BZB Group — Restricted access. Authorised personnel only.
        </p>
      </div>
    </main>
  );
}

interface ResetPasswordFormProps {
  token: string;
}

function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!form.newPassword || !form.confirmPassword) {
        throw new Error('Both password fields are required');
      }

      if (form.newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      if (form.newPassword !== form.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: form.newPassword }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Password reset failed');
      }

      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/admin/login');
      }, 2000);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="mb-6 text-sm text-slate-400">
        Enter your new password below. Make sure it's at least 8 characters.
      </p>

      <form onSubmit={handleReset} className="space-y-5">
        {/* New Password */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
            New Password
          </label>
          <input
            type="password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Enter new password"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E5C500]/50 focus:ring-1 focus:ring-[#E5C500]/30"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
            Confirm Password
          </label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
            autoComplete="new-password"
            placeholder="Confirm your password"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E5C500]/50 focus:ring-1 focus:ring-[#E5C500]/30"
          />
        </div>

        {/* Message */}
        {message && (
          <p
            className={`rounded-lg px-4 py-2.5 text-sm font-medium ${
              message.includes('successfully')
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-rose-500/10 text-rose-400'
            }`}
          >
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
              Resetting…
            </>
          ) : (
            'Reset Password'
          )}
        </button>
      </form>
    </>
  );
}
