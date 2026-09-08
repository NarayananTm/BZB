'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Smartphone,
  LockKeyhole,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<'verify' | 'reset'>('verify');

  const [form, setForm] = useState({
    email: '',
    mobile: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  /**
   * =========================================================
   * VERIFY USER IDENTITY
   * =========================================================
   */
  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    // Validation
    if (!form.email.trim() || !form.mobile.trim()) {
      toast.error('Email and mobile number are required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!/^\d{10,}$/.test(form.mobile.replace(/\D/g, ''))) {
      toast.error('Mobile number must be at least 10 digits');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/member/verify-forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email.trim(),
          mobile: form.mobile.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Verification failed');
      }

      // Store token and verified user info
      setResetToken(data.token);
      setVerifiedUser(data.user);
      setForm({
        ...form,
        newPassword: '',
        confirmPassword: '',
      });
      setStep('reset');
      toast.success('Identity verified! Now set your new password.');
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Verification failed'
      );
      console.error('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * =========================================================
   * RESET PASSWORD
   * =========================================================
   */
  const handleResetPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    // Validation
    if (!form.newPassword || !form.confirmPassword) {
      toast.error('Both password fields are required');
      return;
    }

    if (form.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/member/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: resetToken,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Password reset failed');
      }

      toast.success('Password reset successfully! Redirecting to login...');
      
      // Reset form and redirect
      setForm({
        email: '',
        mobile: '',
        newPassword: '',
        confirmPassword: '',
      });
      setStep('verify');
      setResetToken('');
      setVerifiedUser(null);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Password reset failed'
      );
      console.error('Reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * =========================================================
   * GO BACK TO VERIFY STEP
   * =========================================================
   */
  const handleBackToVerify = () => {
    setStep('verify');
    setResetToken('');
    setVerifiedUser(null);
    setForm({
      ...form,
      newPassword: '',
      confirmPassword: '',
    });
  };

  /**
   * =========================================================
   * HANDLE FORM INPUT CHANGE
   * =========================================================
   */
  const updateForm = (
    field: 'email' | 'mobile' | 'newPassword' | 'confirmPassword',
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex min-h-screen items-center justify-center">
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl border border-slate-700">
          {/* Decorative gradient background */}
          <div className="absolute inset-0 opacity-50">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 via-transparent to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10">
            {/* Header */}
            <div className="mb-8">
              <Link
                href="/login"
                className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Login
              </Link>

              <h1 className="text-3xl font-bold text-white mb-2">
                {step === 'verify'
                  ? 'Forgot Password?'
                  : 'Set New Password'}
              </h1>
              <p className="text-slate-400">
                {step === 'verify'
                  ? 'Verify your account to reset your password'
                  : `Welcome back, ${verifiedUser?.name}!`}
              </p>
            </div>

            {/* VERIFY STEP */}
            {step === 'verify' && (
              <form onSubmit={handleVerify} className="space-y-4">
                {/* EMAIL INPUT */}
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                      size={20}
                    />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        updateForm('email', e.target.value)
                      }
                      placeholder="Enter your registered email"
                      required
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
                    />
                  </div>
                </div>

                {/* MOBILE INPUT */}
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Smartphone
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                      size={20}
                    />
                    <input
                      type="tel"
                      value={form.mobile}
                      onChange={(e) =>
                        updateForm('mobile', e.target.value)
                      }
                      placeholder="Enter your mobile number"
                      required
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
                    />
                  </div>
                </div>

                {/* INFO BOX */}
                <div className="mt-6 p-4 bg-blue-900/30 border border-blue-700/50 rounded-lg">
                  <p className="text-sm text-blue-200">
                    💡 <strong>Tip:</strong> Enter the email and mobile number registered with your account.
                  </p>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Verifying...
                    </>
                  ) : (
                    'Verify Account'
                  )}
                </button>

                {/* LOGIN LINK */}
                <p className="text-center text-sm text-slate-400 mt-4">
                  Remember your password?{' '}
                  <Link
                    href="/login"
                    className="text-yellow-400 hover:text-yellow-300 font-medium"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            )}

            {/* RESET PASSWORD STEP */}
            {step === 'reset' && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                {/* VERIFIED USER INFO */}
                <div className="p-4 bg-green-900/30 border border-green-700/50 rounded-lg mb-6">
                  <p className="text-sm text-green-200">
                    ✓ Account verified: <strong>{verifiedUser?.email}</strong>
                  </p>
                </div>

                {/* NEW PASSWORD INPUT */}
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <LockKeyhole
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                      size={20}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.newPassword}
                      onChange={(e) =>
                        updateForm('newPassword', e.target.value)
                      }
                      placeholder="Enter new password (min 8 characters)"
                      required
                      disabled={loading}
                      className="w-full pl-12 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Password must be at least 8 characters
                  </p>
                </div>

                {/* CONFIRM PASSWORD INPUT */}
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <LockKeyhole
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                      size={20}
                    />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={(e) =>
                        updateForm('confirmPassword', e.target.value)
                      }
                      placeholder="Confirm your new password"
                      required
                      disabled={loading}
                      className="w-full pl-12 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* PASSWORD STRENGTH INDICATOR */}
                {form.newPassword && (
                  <div className="p-3 bg-slate-700/50 border border-slate-600 rounded-lg">
                    <p className="text-xs text-slate-300 mb-2">
                      Password strength:
                    </p>
                    <div className="flex gap-1">
                      {[
                        form.newPassword.length >= 8,
                        /[a-z]/.test(form.newPassword),
                        /[A-Z]/.test(form.newPassword),
                        /[0-9]/.test(form.newPassword),
                        /[^a-zA-Z0-9]/.test(form.newPassword),
                      ].map((check, idx) => (
                        <div
                          key={idx}
                          className={`h-1 flex-1 rounded-full transition ${
                            check ? 'bg-green-400' : 'bg-slate-600'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}

                {/* BUTTONS */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleBackToVerify}
                    disabled={loading}
                    className="flex-1 py-3 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Resetting...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
