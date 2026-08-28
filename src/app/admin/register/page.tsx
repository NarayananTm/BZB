'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminRegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
  });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setSuccess(false);

    if (form.password.length < 8) {
      setMessage('Password must be at least 8 characters');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Admin registration failed');
      }

      setForm({ username: '', email: '', password: '', confirmPassword: '', role: 'admin' });
      setSuccess(true);
      setMessage('Admin account created successfully');
      router.replace('/admin/login')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Admin registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4 py-12 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5C500]">
            <ShieldCheck className="h-8 w-8 text-black" />
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E5C500]">BZB Group</p>
            <h1 className="mt-1 text-2xl font-bold">Register Admin User</h1>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
          <p className="mb-6 text-sm text-slate-400">Create an account for an administrator who needs portal access.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">Username</label>
              <input name="username" value={form.username} onChange={handleChange} required autoComplete="username" className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#E5C500]/50" placeholder="Enter username" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#E5C500]/50" placeholder="admin@example.com" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">Role</label>
              <select name="role" value={form.role} onChange={handleChange} className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#E5C500]/50">
                <option value="admin" className="bg-[#171717]">Admin</option>
                <option value="superadmin" className="bg-[#171717]">Superadmin</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={8} autoComplete="new-password" className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#E5C500]/50" placeholder="Minimum 8 characters" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">Confirm Password</label>
              <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required autoComplete="new-password" className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#E5C500]/50" placeholder="Repeat password" />
            </div>

            {message && <p className={success ? 'rounded-lg bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-400' : 'rounded-lg bg-rose-500/10 px-4 py-2.5 text-sm text-rose-400'}>{message}</p>}

            <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#E5C500] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#f0d000] disabled:opacity-60">
              {loading ? 'Creating account...' : 'Create admin account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            <Link href="/admin/login" className="font-semibold text-[#E5C500] hover:underline">Back to admin login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}