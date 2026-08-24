'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#111827,_#020617)] px-4 py-12 text-white">
      <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#FFD31A]">Admin Portal</p>
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-300">Sign in to view your dashboard and account details.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-medium text-slate-200">
            Email or mobile
            <input
              name="email"
              type="text"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none"
              placeholder="Enter your email or mobile"
            />
          </label>

          <label className="block text-sm font-medium text-slate-200">
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none"
              placeholder="Enter your password"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#FFD31A] px-4 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign in to admin'}
          </button>

          {message ? <p className="text-sm text-red-300">{message}</p> : null}
        </form>
      </div>
    </main>
  );
}