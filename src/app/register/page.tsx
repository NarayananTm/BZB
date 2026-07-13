'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      setMessage('Registration Successful');
      router.push('/login');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#111827,_#020617)] px-4 py-24 text-white">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[32px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl lg:flex-row">
        <div className="flex-1 bg-black/20 p-8 sm:p-12 lg:p-16">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#FFD31A]">Create Account</p>
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Join the BZB community</h1>
          <p className="max-w-md text-base text-slate-300 sm:text-lg">
            Register to unlock access to referral benefits, member opportunities, and exclusive updates.
          </p>
        </div>

        <div className="flex-1 bg-black/30 p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Mobile Number</label>
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none"
                placeholder="Enter your mobile number"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none"
                placeholder="Minimum 8 characters"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#FFD31A] px-4 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-70"
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>

            <div className="text-center text-sm text-slate-300">
              Already have an account?{' '}
              <Link href="/login" className="text-[#FFD31A] hover:underline">
                Login here
              </Link>
            </div>

            {message ? <p className="text-sm text-[#FFD31A]">{message}</p> : null}
          </form>
        </div>
      </div>
    </main>
  );
}
