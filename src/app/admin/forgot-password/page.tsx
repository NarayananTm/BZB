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

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'verify' | 'reset'>('verify');

  const [form, setForm] = useState({
    email: '',
    mobile: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');

  /**
   * =========================================================
   * VERIFY USER
   * =========================================================
   */
  const handleVerify = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage('');

    try {
      if (!form.email.trim() || !form.mobile.trim()) {
        throw new Error(
          'Email and mobile number are required'
        );
      }

      const res = await fetch(
        '/api/admin/verify-forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: form.email.trim(),
            mobile: form.mobile.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message || 'Verification failed'
        );
      }

      setResetToken(data.token);
      setStep('reset');
      setMessage('');
    } catch (err) {
      setMessage(
        err instanceof Error
          ? err.message
          : 'Verification failed'
      );
      console.error('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * =========================================================
   * UPDATE FORM
   * =========================================================
   */
  const updateForm = (
    field: 'email' | 'mobile',
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (message) {
      setMessage('');
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F7F7] px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex min-h-[calc(100vh-32px)] items-center justify-center sm:min-h-[calc(100vh-48px)]">

        {/* =====================================================
            MAIN MBD CARD
        ====================================================== */}
        <section
          className="
            relative
            w-full
            max-w-[1100px]
            overflow-hidden
            rounded-[24px]
            bg-white
            shadow-[0_4px_30px_rgba(0,0,0,0.03)]
            sm:rounded-[28px]
            lg:min-h-[600px]
            lg:rounded-[30px]
          "
        >

          {/* ===================================================
              SUBTLE BOTTOM PATTERN
          ==================================================== */}
          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-[24%]
              right-0
              h-[70px]
              opacity-[0.035]
            "
          >
            <div
              className="
                h-full
                w-full
                bg-[repeating-linear-gradient(
                  90deg,
                  #000_0px,
                  #000_38px,
                  transparent_38px,
                  transparent_58px
                )]
              "
            />
          </div>

          {/* ===================================================
              DESKTOP / MOBILE GRID
          ==================================================== */}
          <div
            className="
              relative
              grid
              min-h-[600px]
              lg:grid-cols-2
            "
          >

            {/* =================================================
                LEFT — MBD BRAND
            ================================================== */}
            <div
              className="
                flex
                items-center
                justify-center
                px-6
                py-10
                sm:px-10
                sm:py-12
                lg:px-12
              "
            >
              <div
                className="
                  flex
                  w-full
                  max-w-[430px]
                  flex-col
                  items-center
                "
              >
                <Image
                  src="/images/admin/logo/MBD_logo.svg"
                  alt="MBD Builders & Developers"
                  width={430}
                  height={150}
                  priority
                  className="
                    h-auto
                    w-[230px]
                    object-contain
                    sm:w-[300px]
                    lg:w-[380px]
                  "
                />
              </div>
            </div>

            {/* =================================================
                RIGHT — FORGOT PASSWORD
            ================================================== */}
            <div
              className="
                flex
                items-center
                justify-center
                px-6
                pb-12
                sm:px-10
                lg:px-14
                lg:py-12
              "
            >
              <div className="w-full max-w-[400px]">

                {/* =================================================
                    TITLE
                ================================================== */}
                <h1
                  className="
                    mb-3
                    text-center
                    text-[22px]
                    font-medium
                    tracking-[-0.02em]
                    text-[#111111]
                    sm:text-[24px]
                  "
                >
                  {step === 'verify'
                    ? 'Forgot Password'
                    : 'Reset Password'}
                </h1>

                {/* =================================================
                    DESCRIPTION
                ================================================== */}
                <p
                  className="
                    mb-7
                    text-center
                    text-[14px]
                    leading-6
                    text-[#999999]
                    sm:text-[15px]
                  "
                >
                  {step === 'verify'
                    ? 'Enter your registered email and mobile number to verify your account.'
                    : 'Enter your new password below.'}
                </p>

                {/* =================================================
                    VERIFY STEP
                ================================================== */}
                {step === 'verify' ? (
                  <form
                    onSubmit={handleVerify}
                    className="space-y-2"
                  >

                    {/* EMAIL */}
                    <div className="relative">
                      <Mail
                        className="
                          pointer-events-none
                          absolute
                          left-6
                          top-1/2
                          z-10
                          h-6
                          w-6
                          -translate-y-1/2
                          text-[#AAAAAA]
                        "
                      />

                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          updateForm(
                            'email',
                            e.target.value
                          )
                        }
                        required
                        autoComplete="email"
                        placeholder="Email ID"
                        disabled={loading}
                        className="
                          h-[72px]
                          w-full
                          rounded-[11px]
                          border
                          border-[#E5E5E5]
                          bg-[#F1F1F1]
                          pl-[76px]
                          pr-5
                          text-center
                          text-[17px]
                          text-[#222222]
                          outline-none
                          placeholder:text-[#A7A7A7]
                          transition
                          focus:border-[#E5C500]
                          focus:bg-white
                          focus:ring-2
                          focus:ring-[#E5C500]/20
                          disabled:cursor-not-allowed
                          disabled:opacity-70
                          sm:text-[18px]
                        "
                      />
                    </div>

                    {/* MOBILE */}
                    <div className="relative">
                      <Smartphone
                        className="
                          pointer-events-none
                          absolute
                          left-6
                          top-1/2
                          z-10
                          h-6
                          w-6
                          -translate-y-1/2
                          text-[#AAAAAA]
                        "
                      />

                      <input
                        type="tel"
                        value={form.mobile}
                        onChange={(e) =>
                          updateForm(
                            'mobile',
                            e.target.value
                          )
                        }
                        required
                        autoComplete="tel"
                        placeholder="Mobile Number"
                        disabled={loading}
                        className="
                          h-[72px]
                          w-full
                          rounded-[11px]
                          border
                          border-[#E5E5E5]
                          bg-[#F1F1F1]
                          pl-[76px]
                          pr-5
                          text-center
                          text-[17px]
                          text-[#222222]
                          outline-none
                          placeholder:text-[#A7A7A7]
                          transition
                          focus:border-[#E5C500]
                          focus:bg-white
                          focus:ring-2
                          focus:ring-[#E5C500]/20
                          disabled:cursor-not-allowed
                          disabled:opacity-70
                          sm:text-[18px]
                        "
                      />
                    </div>

                    {/* ERROR */}
                    {message && (
                      <div
                        role="alert"
                        className="
                          mt-3
                          rounded-lg
                          border
                          border-red-200
                          bg-red-50
                          px-4
                          py-3
                          text-center
                          text-sm
                          font-medium
                          text-red-600
                        "
                      >
                        {message}
                      </div>
                    )}

                    {/* VERIFY BUTTON */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="
                        mt-5
                        flex
                        h-[72px]
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-[11px]
                        bg-[#E5C500]
                        px-5
                        text-[20px]
                        font-normal
                        text-white
                        transition-all
                        duration-200
                        hover:bg-[#D5B700]
                        active:scale-[0.99]
                        disabled:cursor-not-allowed
                        disabled:opacity-70
                        sm:text-[22px]
                      "
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-6 w-6 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        'Verify & Continue'
                      )}
                    </button>
                  </form>
                ) : (
                  /* =================================================
                     RESET PASSWORD
                  ================================================== */
                  <ResetPasswordForm
                    token={resetToken}
                  />
                )}

                {/* =================================================
                    BACK TO LOGIN
                ================================================== */}
                <div className="mt-8 text-center">
                  <Link
                    href="/admin/login"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-[16px]
                      text-[#999999]
                      transition
                      hover:text-[#111111]
                      sm:text-[18px]
                    "
                  >
                    <ArrowLeft className="h-4 w-4" />

                    <span>
                      Back to{' '}
                      <span className="font-medium text-[#111111]">
                        Login
                      </span>
                    </span>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


/* =============================================================
   RESET PASSWORD COMPONENT
============================================================= */

interface ResetPasswordFormProps {
  token: string;
}

function ResetPasswordForm({
  token,
}: ResetPasswordFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  /**
   * =========================================================
   * RESET PASSWORD
   * =========================================================
   */
  const handleReset = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage('');

    try {
      if (
        !form.newPassword ||
        !form.confirmPassword
      ) {
        throw new Error(
          'Both password fields are required'
        );
      }

      if (form.newPassword.length < 8) {
        throw new Error(
          'Password must be at least 8 characters'
        );
      }

      if (
        form.newPassword !==
        form.confirmPassword
      ) {
        throw new Error(
          'Passwords do not match'
        );
      }

      const res = await fetch(
        '/api/admin/reset-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            newPassword: form.newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message ||
            'Password reset failed'
        );
      }

      setMessage(
        'Password reset successfully! Redirecting to login...'
      );

      setTimeout(() => {
        router.push('/admin/login');
      }, 2000);
    } catch (err) {
      setMessage(
        err instanceof Error
          ? err.message
          : 'Password reset failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleReset}
      className="space-y-2"
    >

      {/* =====================================================
          NEW PASSWORD
      ====================================================== */}
      <div className="relative">
        <LockKeyhole
          className="
            pointer-events-none
            absolute
            left-6
            top-1/2
            z-10
            h-6
            w-6
            -translate-y-1/2
            text-[#AAAAAA]
          "
        />

        <input
          type={
            showNewPassword
              ? 'text'
              : 'password'
          }
          value={form.newPassword}
          onChange={(e) =>
            setForm({
              ...form,
              newPassword: e.target.value,
            })
          }
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="New Password"
          disabled={loading}
          className="
            h-[72px]
            w-full
            rounded-[11px]
            border
            border-[#E5E5E5]
            bg-[#F1F1F1]
            pl-[76px]
            pr-[60px]
            text-center
            text-[17px]
            text-[#222222]
            outline-none
            placeholder:text-[#A7A7A7]
            transition
            focus:border-[#E5C500]
            focus:bg-white
            focus:ring-2
            focus:ring-[#E5C500]/20
            disabled:cursor-not-allowed
            disabled:opacity-70
            sm:text-[18px]
          "
        />

        <button
          type="button"
          onClick={() =>
            setShowNewPassword(
              (previous) => !previous
            )
          }
          className="
            absolute
            right-5
            top-1/2
            -translate-y-1/2
            p-2
            text-[#AAAAAA]
            hover:text-[#555555]
          "
          aria-label={
            showNewPassword
              ? 'Hide password'
              : 'Show password'
          }
        >
          {showNewPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* =====================================================
          CONFIRM PASSWORD
      ====================================================== */}
      <div className="relative">
        <LockKeyhole
          className="
            pointer-events-none
            absolute
            left-6
            top-1/2
            z-10
            h-6
            w-6
            -translate-y-1/2
            text-[#AAAAAA]
          "
        />

        <input
          type={
            showConfirmPassword
              ? 'text'
              : 'password'
          }
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({
              ...form,
              confirmPassword: e.target.value,
            })
          }
          required
          autoComplete="new-password"
          placeholder="Confirm Password"
          disabled={loading}
          className="
            h-[72px]
            w-full
            rounded-[11px]
            border
            border-[#E5E5E5]
            bg-[#F1F1F1]
            pl-[76px]
            pr-[60px]
            text-center
            text-[17px]
            text-[#222222]
            outline-none
            placeholder:text-[#A7A7A7]
            transition
            focus:border-[#E5C500]
            focus:bg-white
            focus:ring-2
            focus:ring-[#E5C500]/20
            disabled:cursor-not-allowed
            disabled:opacity-70
            sm:text-[18px]
          "
        />

        <button
          type="button"
          onClick={() =>
            setShowConfirmPassword(
              (previous) => !previous
            )
          }
          className="
            absolute
            right-5
            top-1/2
            -translate-y-1/2
            p-2
            text-[#AAAAAA]
            hover:text-[#555555]
          "
          aria-label={
            showConfirmPassword
              ? 'Hide password'
              : 'Show password'
          }
        >
          {showConfirmPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* =====================================================
          MESSAGE
      ====================================================== */}
      {message && (
        <div
          role="alert"
          className={`
            mt-3
            rounded-lg
            px-4
            py-3
            text-center
            text-sm
            font-medium
            ${
              message.includes('successfully')
                ? 'border border-green-200 bg-green-50 text-green-600'
                : 'border border-red-200 bg-red-50 text-red-600'
            }
          `}
        >
          {message}
        </div>
      )}

      {/* =====================================================
          RESET BUTTON
      ====================================================== */}
      <button
        type="submit"
        disabled={loading}
        className="
          mt-5
          flex
          h-[72px]
          w-full
          items-center
          justify-center
          gap-2
          rounded-[11px]
          bg-[#E5C500]
          px-5
          text-[20px]
          font-normal
          text-white
          transition-all
          duration-200
          hover:bg-[#D5B700]
          active:scale-[0.99]
          disabled:cursor-not-allowed
          disabled:opacity-70
          sm:text-[22px]
        "
      >
        {loading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" />
            Resetting...
          </>
        ) : (
          'Reset Password'
        )}
      </button>
    </form>
  );
}