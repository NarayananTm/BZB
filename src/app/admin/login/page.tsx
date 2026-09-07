'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    userId: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  /**
   * =========================================================
   * HANDLE INPUT CHANGE
   * =========================================================
   */
  const handleChange = (
    field: 'userId' | 'password',
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

  };

  /**
   * =========================================================
   * LOGIN
   * =========================================================
   */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          emailOrUsername: form.userId.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message || 'Invalid Member ID or Password'
        );
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F7F7] px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex min-h-[calc(100vh-32px)] items-center justify-center sm:min-h-[calc(100vh-48px)]">
        {/* =====================================================
            MAIN LOGIN CARD
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
              DESKTOP TWO COLUMN
          ==================================================== */}
          <div className="relative grid min-h-[600px] lg:grid-cols-2">

            {/* =================================================
                LEFT — MBD BRAND
            ================================================== */}
            <div
              className="
                flex
                items-center
                justify-center
                px-6
                py-12
                sm:px-10
                lg:px-12
              "
            >
              <div className="flex w-full max-w-[430px] flex-col items-center">

                {/* Logo */}
                <Image
                  src="/images/admin/logo/MBD_logo.svg"
                  alt="MBD - Builders & Developers"
                  width={430}
                  height={150}
                  priority
                  className="
                    h-auto
                    w-[240px]
                    object-contain
                    sm:w-[300px]
                    lg:w-[380px]
                  "
                />

              </div>
            </div>

            {/* =================================================
                RIGHT — LOGIN
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

                {/* Heading */}
                <h1
                  className="
                    mb-8
                    text-center
                    text-[22px]
                    font-medium
                    tracking-[-0.02em]
                    text-[#111111]
                    sm:text-[24px]
                  "
                >
                  Member login
                </h1>

                {/* =================================================
                    LOGIN FORM
                ================================================== */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-2"
                >

                  {/* =================================================
                      MEMBER ID
                  ================================================== */}
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
                      type="text"
                      value={form.userId}
                      onChange={(e) =>
                        handleChange(
                          'userId',
                          e.target.value
                        )
                      }
                      required
                      autoComplete="username"
                      placeholder="Member ID"
                      disabled={loading}
                      className="
                        h-[78px]
                        w-full
                        rounded-[11px]
                        border
                        border-[#E5E5E5]
                        bg-[#F1F1F1]
                        pl-[76px]
                        pr-5
                        text-center
                        text-[18px]
                        font-normal
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
                        sm:text-[19px]
                      "
                    />
                  </div>

                  {/* =================================================
                      PASSWORD
                  ================================================== */}
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
                        showPwd
                          ? 'text'
                          : 'password'
                      }
                      value={form.password}
                      onChange={(e) =>
                        handleChange(
                          'password',
                          e.target.value
                        )
                      }
                      required
                      autoComplete="current-password"
                      placeholder="Password"
                      disabled={loading}
                      className="
                        h-[78px]
                        w-full
                        rounded-[11px]
                        border
                        border-[#E5E5E5]
                        bg-[#F1F1F1]
                        pl-[76px]
                        pr-[58px]
                        text-center
                        text-[18px]
                        font-normal
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
                        sm:text-[19px]
                      "
                    />

                    {/* Show / Hide Password */}
                    <button
                      type="button"
                      onClick={() =>
                        setShowPwd(
                          (previous) => !previous
                        )
                      }
                      disabled={loading}
                      aria-label={
                        showPwd
                          ? 'Hide password'
                          : 'Show password'
                      }
                      className="
                        absolute
                        right-5
                        top-1/2
                        flex
                        -translate-y-1/2
                        items-center
                        justify-center
                        p-2
                        text-[#AAAAAA]
                        transition
                        hover:text-[#555555]
                      "
                    >
                      {showPwd ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* =================================================
                      LOGIN BUTTON
                  ================================================== */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      mt-5
                      flex
                      h-[80px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-[11px]
                      bg-[#E5C500]
                      px-5
                      text-[22px]
                      font-normal
                      text-white
                      transition-all
                      duration-200
                      hover:bg-[#D5B700]
                      active:scale-[0.99]
                      disabled:cursor-not-allowed
                      disabled:opacity-70
                      sm:text-[24px]
                    "
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Logging in...</span>
                      </>
                    ) : (
                      'Login'
                    )}
                  </button>
                </form>

                {/* =================================================
                    FORGOT PASSWORD
                ================================================== */}
                <div className="mt-8 text-center">
                  <Link
                    href="/admin/forgot-password"
                    className="
                      text-[18px]
                      font-normal
                      text-[#999999]
                      transition
                      hover:text-[#111111]
                      sm:text-[20px]
                    "
                  >
                    Forgot{' '}
                    <span className="font-medium text-[#111111]">
                      Password?
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