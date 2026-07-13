'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
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
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Login failed');
            }
            localStorage.setItem("bzb_token", data.token);

            localStorage.setItem(
                "bzb_user",
                JSON.stringify({
                    id: data.user.id,
                    fullName: data.user.fullName,
                    email: data.user.email,
                    mobile: data.user.mobile,
                })
            );
            window.dispatchEvent(new Event("userChanged"));
            setMessage('Login Successful');
            router.push('/bzb');
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#111827,_#020617)] px-4 py-24 text-white">
            <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[32px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl lg:flex-row">
                <div className="flex-1 bg-black/20 p-8 sm:p-12 lg:p-16">
                    <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#FFD31A]">Member Login</p>
                    <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Welcome back to BZB</h1>
                    <p className="max-w-md text-base text-slate-300 sm:text-lg">
                        Sign in to continue your journey, manage referrals, and unlock your member benefits.
                    </p>
                </div>

                <div className="flex-1 bg-black/30 p-8 sm:p-12">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-200">Email or Mobile</label>
                            <input
                                name="email"
                                type="text"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none ring-0"
                                placeholder="Enter your email or mobile"
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
                                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none ring-0"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-[#FFD31A] px-4 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-70"
                        >
                            {loading ? 'Signing in...' : 'Login'}
                        </button>

                        <div className="flex items-center justify-between text-sm text-slate-300">
                            <Link href="/register" className="text-[#FFD31A] hover:underline">
                                Register
                            </Link>
                            <button type="button" className="hover:text-white">
                                Forgot Password
                            </button>
                        </div>

                        {message ? <p className="text-sm text-[#FFD31A]">{message}</p> : null}
                    </form>
                </div>
            </div>
        </main>
    );
}
