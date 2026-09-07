'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  Loader2,
  Upload,
  UserPlus,
  AlertCircle,
} from 'lucide-react';

/* ============================================================
   TYPES
============================================================ */

interface Sponsor {
  id: string;
  username?: string | null;
  name?: string | null;
}

interface RegisterForm {
  name: string;
  pan: string;
  aadhar: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  amount: string;
  utrNumber: string;
  proof: File | null;
}

type MessageType = 'error' | 'success' | '';

/* ============================================================
   CONSTANTS
============================================================ */

const UPI_ID = 'mprema7771980@okaxis';

/*
 * Change this path only if your QR image is stored somewhere else.
 *
 * Example:
 * /public/images/admin/upi-qr.png
 */
const QR_IMAGE = '/images/admin/upi/upi-qr-code.png';

const INITIAL_FORM: RegisterForm = {
  name: '',
  pan: '',
  aadhar: '',
  mobile: '',
  password: '',
  confirmPassword: '',
  amount: '',
  utrNumber: '',
  proof: null,
};

/* ============================================================
   PAGE
============================================================ */

export default function RegisterPage() {
  const router = useRouter();

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const [referralId, setReferralId] =
    useState('');

  const [sponsor, setSponsor] =
    useState<Sponsor | null>(null);

  const [loadingSponsor, setLoadingSponsor] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState<RegisterForm>(INITIAL_FORM);

  const [message, setMessage] =
    useState('');

  const [messageType, setMessageType] =
    useState<MessageType>('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  /* ==========================================================
     GET REFERRAL ID FROM URL

     Example:
     /admin/register?ref=43043d13-45d2-462f-b436-bd9c670ebaa8
  ========================================================== */

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const ref =
      params.get('ref')?.trim() || '';

    setReferralId(ref);
  }, []);

  /* ==========================================================
     LOAD SPONSOR
  ========================================================== */

  useEffect(() => {
    if (!referralId) {
      setLoadingSponsor(false);
      setSponsor(null);

      setMessage(
        'Referral ID is missing. Please use a valid referral link.'
      );

      setMessageType('error');

      return;
    }

    let cancelled = false;

    const loadSponsor = async () => {
      setLoadingSponsor(true);
      setMessage('');
      setMessageType('');

      try {
        /*
         * IMPORTANT
         *
         * The referral ID is used to find the sponsor.
         */
        const response = await fetch(
          `/api/admin/referral/${encodeURIComponent(
            referralId
          )}`,
          {
            method: 'GET',
            cache: 'no-store',
            headers: {
              Accept: 'application/json',
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              'Sponsor could not be found.'
          );
        }

        if (cancelled) {
          return;
        }

        const sponsorData =
          data.sponsor;

        if (!sponsorData?.id) {
          throw new Error(
            'Invalid sponsor information returned by the server.'
          );
        }

        setSponsor({
          id: String(
            sponsorData.id
          ),
          username:
            sponsorData.username ??
            null,
          name:
            sponsorData.name ??
            null,
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        setSponsor(null);

        setMessage(
          error instanceof Error
            ? error.message
            : 'Unable to load sponsor.'
        );

        setMessageType('error');
      } finally {
        if (!cancelled) {
          setLoadingSponsor(false);
        }
      }
    };

    loadSponsor();

    return () => {
      cancelled = true;
    };
  }, [referralId]);

  /* ==========================================================
     SPONSOR DISPLAY NAME
  ========================================================== */

  const sponsorDisplayName =
    sponsor?.name?.trim() ||
    sponsor?.username?.trim() ||
    '';

  /* ==========================================================
     GENERIC FIELD UPDATE
  ========================================================== */

  const updateField = <
    K extends keyof RegisterForm
  >(
    field: K,
    value: RegisterForm[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (
      messageType === 'error'
    ) {
      setMessage('');
      setMessageType('');
    }
  };

  /* ==========================================================
     FILE CHANGE
  ========================================================== */

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      updateField('proof', null);
      return;
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage(
        'Please upload JPG, PNG, WEBP or PDF only.'
      );

      setMessageType('error');

      event.target.value = '';

      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setMessage(
        'Transaction proof must be less than 5 MB.'
      );

      setMessageType('error');

      event.target.value = '';

      return;
    }

    updateField(
      'proof',
      file
    );
  };

  /* ==========================================================
     COPY UPI
  ========================================================== */

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(
        UPI_ID
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setMessage(
        'Unable to copy UPI ID.'
      );

      setMessageType('error');
    }
  };

  /* ==========================================================
     VALIDATION
  ========================================================== */

  const validateForm = (): string | null => {
    if (!referralId) {
      return 'Referral ID is missing.';
    }

    if (!sponsor?.id) {
      return 'Valid sponsor is required.';
    }

    if (!form.name.trim()) {
      return 'Please enter your name.';
    }

    if (!form.pan.trim()) {
      return 'Please enter your PAN number.';
    }

    const pan =
      form.pan
        .trim()
        .toUpperCase();

    if (
      !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
        pan
      )
    ) {
      return 'Please enter a valid PAN number.';
    }

    const aadhar =
      form.aadhar.replace(
        /\D/g,
        ''
      );

    if (
      !/^\d{12}$/.test(
        aadhar
      )
    ) {
      return 'Aadhar number must contain exactly 12 digits.';
    }

    const mobile =
      form.mobile.replace(
        /\D/g,
        ''
      );

    if (
      !/^\d{10}$/.test(
        mobile
      )
    ) {
      return 'Please enter a valid 10 digit mobile number.';
    }

    if (!form.password) {
      return 'Please enter a password.';
    }

    if (
      form.password.length < 8
    ) {
      return 'Password must be at least 8 characters.';
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      return 'Password and confirm password do not match.';
    }

    const amount =
      Number(form.amount);

    if (
      !form.amount.trim() ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return 'Please enter a valid amount.';
    }

    if (!form.utrNumber.trim()) {
      return 'Please enter the transaction UTR number.';
    }

    if (!form.proof) {
      return 'Please upload transaction proof.';
    }

    return null;
  };

  /* ==========================================================
     SUBMIT
  ========================================================== */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setMessage('');
    setMessageType('');

    const validationError =
      validateForm();

    if (validationError) {
      setMessage(
        validationError
      );

      setMessageType('error');

      return;
    }

    setLoading(true);

    try {
      /*
       * ================================================
       * NORMALISE VALUES
       * ================================================
       */

      const name =
        form.name.trim();

      const pan =
        form.pan
          .trim()
          .toUpperCase();

      const aadhar =
        form.aadhar.replace(
          /\D/g,
          ''
        );

      const mobile =
        form.mobile.replace(
          /\D/g,
          ''
        );

      const amount =
        Number(form.amount);

      const utrNumber =
        form.utrNumber.trim();

      /*
       * ================================================
       * FORM DATA
       * ================================================
       */

      const formData =
        new FormData();

      formData.append(
        'name',
        name
      );

      formData.append(
        'pan',
        pan
      );

      formData.append(
        'aadhar',
        aadhar
      );

      formData.append(
        'mobile',
        mobile
      );

      formData.append(
        'password',
        form.password
      );

      /*
       * Do NOT send confirmPassword
       * to the server.
       */

      formData.append(
        'amount',
        String(amount)
      );

      formData.append(
        'utrNumber',
        utrNumber
      );

      /*
       * ================================================
       * MOST IMPORTANT REFERRAL FIELD
       *
       * This is the sponsor's actual database ID.
       * ================================================
       */

      formData.append(
        'sponsorId',
        sponsor!.id
      );

      /*
       * Keep referral ID also.
       *
       * This is useful for backend validation/auditing.
       */

      formData.append(
        'referralId',
        referralId
      );

      /*
       * Transaction proof
       */

      formData.append(
        'proof',
        form.proof!
      );

      /*
       * ================================================
       * API CALL
       * ================================================
       */

      const response =
        await fetch(
          '/api/admin/register',
          {
            method: 'POST',
            body: formData,
          }
        );

      let data: {
        success?: boolean;
        message?: string;
        member?: {
          id?: string;
          username?: string;
        };
      };

      try {
        data =
          await response.json();
      } catch {
        throw new Error(
          'Invalid response received from server.'
        );
      }

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            'Registration failed.'
        );
      }

      /*
       * ================================================
       * SUCCESS
       * ================================================
       */

      setMessage(
        'Registration successful. Redirecting to login...'
      );

      setMessageType('success');

      setForm({
        ...INITIAL_FORM,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value =
          '';
      }

      /*
       * Redirect after successful registration.
       */

      window.setTimeout(() => {
        router.replace(
          '/admin/login'
        );
      }, 1800);
    } catch (error) {
      console.error(
        'Registration error:',
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : 'Registration failed. Please try again.'
      );

      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================
     UI
  ========================================================== */

  return (
    <main className="
      min-h-screen
      bg-[#F7F7F7]
      px-3
      py-4
      sm:px-5
      sm:py-6
      md:px-8
      lg:px-10
    ">

      <div className="
        mx-auto
        w-full
        max-w-[1140px]
      ">

        {/* ====================================================
            TOP
        ===================================================== */}

        <div className="
          mb-5
          flex
          items-center
          justify-between
          px-1
          sm:mb-7
        ">

          <Link
            href="/admin/login"
            className="
              inline-flex
              items-center
            "
          >
            <Image
              src="/images/admin/logo/MBD_logo.svg"
              alt="MBD Builders & Developers"
              width={150}
              height={70}
              priority
              className="
                h-auto
                w-[105px]
                sm:w-[135px]
              "
            />
          </Link>

          <Link
            href="/admin/login"
            className="
              text-[10px]
              font-medium
              text-[#666666]
              transition-colors
              hover:text-[#D4B600]
              sm:text-[12px]
            "
          >
            Already registered?
            <span className="
              ml-1
              font-semibold
              text-[#111111]
            ">
              Login
            </span>
          </Link>

        </div>


        {/* ====================================================
            WELCOME
        ===================================================== */}

        <div className="
          mb-5
          text-center
          sm:mb-6
        ">

          <h1 className="
            text-[25px]
            font-semibold
            leading-tight
            tracking-[-0.5px]
            text-[#111111]
            sm:text-[30px]
            md:text-[32px]
          ">
            Welcome to MBD
          </h1>

          <p className="
            mx-auto
            mt-1.5
            max-w-[520px]
            text-[11px]
            leading-5
            text-[#777777]
            sm:text-[13px]
          ">
            Complete your registration
            to become a member of the
            MBD community.
          </p>

          {/* Sponsor */}

          {loadingSponsor && (
            <div className="
              mt-3
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#E7E7E7]
              bg-white
              px-3
              py-1.5
              text-[10px]
              text-[#777777]
            ">

              <Loader2 className="
                h-3.5
                w-3.5
                animate-spin
              " />

              Loading sponsor...

            </div>
          )}

          {!loadingSponsor &&
            sponsor && (
              <div className="
                mt-3
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-[#E8D36A]
                bg-[#FFFBE7]
                px-3
                py-1.5
              ">

                <span className="
                  text-[10px]
                  text-[#777777]
                ">
                  Invited by
                </span>

                <span className="
                  text-[10px]
                  font-semibold
                  text-[#171717]
                ">
                  {sponsorDisplayName}
                </span>

              </div>
            )}

        </div>


        {/* ====================================================
            REGISTRATION FORM
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          noValidate
        >

          <div className="
            grid
            grid-cols-1
            gap-3
            md:grid-cols-2
          ">

            {/* =================================================
                LEFT CARD
            ================================================== */}

            <section className="
              rounded-[12px]
              border
              border-[#E4E4E4]
              bg-white
              px-4
              py-5
              sm:px-5
              sm:py-6
            ">

              <FormInput
                label="Sponsor Name"
                value={
                  loadingSponsor
                    ? 'Loading...'
                    : sponsorDisplayName ||
                      'Sponsor not found'
                }
                readOnly
                disabled={
                  loadingSponsor ||
                  !sponsor
                }
              />

              <FormInput
                label="Your Name"
                value={form.name}
                placeholder="Your Name"
                onChange={(value) =>
                  updateField(
                    'name',
                    value
                  )
                }
              />

              <FormInput
                label="PAN"
                value={form.pan}
                placeholder="PAN"
                maxLength={10}
                onChange={(value) =>
                  updateField(
                    'pan',
                    value
                      .toUpperCase()
                      .replace(
                        /[^A-Z0-9]/g,
                        ''
                      )
                  )
                }
              />

              <FormInput
                label="Aadhar"
                value={form.aadhar}
                placeholder="Aadhar"
                maxLength={12}
                inputMode="numeric"
                onChange={(value) =>
                  updateField(
                    'aadhar',
                    value.replace(
                      /\D/g,
                      ''
                    )
                  )
                }
              />

              <FormInput
                label="Phone Number."
                value={form.mobile}
                placeholder="Phone Number."
                type="tel"
                maxLength={10}
                inputMode="numeric"
                onChange={(value) =>
                  updateField(
                    'mobile',
                    value.replace(
                      /\D/g,
                      ''
                    )
                  )
                }
              />

              <PasswordInput
                label="Password"
                value={
                  form.password
                }
                show={
                  showPassword
                }
                placeholder="Password"
                onChange={(value) =>
                  updateField(
                    'password',
                    value
                  )
                }
                onToggle={() =>
                  setShowPassword(
                    (current) =>
                      !current
                  )
                }
              />

            </section>


            {/* =================================================
                RIGHT CARD
            ================================================== */}

            <section className="
              rounded-[12px]
              border
              border-[#E4E4E4]
              bg-white
              px-4
              py-5
              sm:px-5
              sm:py-6
            ">

              <PasswordInput
                label="Confirm Password"
                value={
                  form.confirmPassword
                }
                show={
                  showConfirmPassword
                }
                placeholder="Confirm Password"
                onChange={(value) =>
                  updateField(
                    'confirmPassword',
                    value
                  )
                }
                onToggle={() =>
                  setShowConfirmPassword(
                    (current) =>
                      !current
                  )
                }
              />

              <FormInput
                label="Amount Rs."
                value={form.amount}
                placeholder="Amount Rs."
                type="number"
                min="0"
                inputMode="decimal"
                onChange={(value) =>
                  updateField(
                    'amount',
                    value.replace(
                      /[^0-9.]/g,
                      ''
                    )
                  )
                }
              />


              {/* =============================================
                  BANK / UPI
              ============================================== */}

              <div className="
                mt-1
              ">

                <label className="
                  mb-3
                  block
                  text-[12px]
                  font-medium
                  text-[#111111]
                ">
                  Our Bank Details.
                </label>


                <div className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-[165px_minmax(0,1fr)]
                  sm:items-start
                ">

                  {/* QR */}

                  <div className="
                    flex
                    flex-col
                    items-center
                    sm:items-start
                  ">

                    <div className="
                      h-[185px]
                      w-[155px]
                      overflow-hidden
                      rounded-[10px]
                      bg-[#1D1D1F]
                    ">

                      <Image
                        src={QR_IMAGE}
                        alt="MBD UPI QR Code"
                        width={155}
                        height={185}
                        className="
                          h-full
                          w-full
                          object-contain
                        "
                      />

                    </div>


                    {/* UPI */}

                    <div className="
                      mt-2
                      flex
                      w-full
                      max-w-[155px]
                      items-center
                      justify-center
                      gap-1
                      sm:justify-start
                    ">

                      <span className="
                        truncate
                        text-[8px]
                        text-[#444444]
                      ">
                        UPI ID: {UPI_ID}
                      </span>

                      <button
                        type="button"
                        onClick={
                          handleCopyUPI
                        }
                        className="
                          shrink-0
                          rounded
                          p-0.5
                          text-[#777777]
                          transition-colors
                          hover:text-[#111111]
                        "
                        aria-label="Copy UPI ID"
                      >
                        {copied ? (
                          <Check className="
                            h-3
                            w-3
                          " />
                        ) : (
                          <Copy className="
                            h-3
                            w-3
                          " />
                        )}
                      </button>

                    </div>

                  </div>


                  {/* =========================================
                      TRANSACTION
                  ========================================== */}

                  <div className="
                    min-w-0
                  ">

                    <label className="
                      mb-2
                      block
                      text-[12px]
                      font-medium
                      text-[#111111]
                    ">
                      Transaction Proof
                    </label>


                    {/* FILE UPLOAD */}

                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="
                        flex
                        h-[55px]
                        w-full
                        flex-col
                        items-center
                        justify-center
                        rounded-[7px]
                        border
                        border-dashed
                        border-[#D5D5D5]
                        bg-[#FAFAFA]
                        px-2
                        text-center
                        transition
                        hover:border-[#E5C500]
                        hover:bg-[#FFFDF2]
                      "
                    >

                      <Upload className="
                        mb-1
                        h-4
                        w-4
                        text-[#D7B800]
                      " />

                      <span className="
                        max-w-full
                        truncate
                        text-[8px]
                        text-[#555555]
                      ">
                        {form.proof
                          ? form.proof.name
                          : 'Drag files here or Browse'}
                      </span>

                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="
                        image/jpeg,
                        image/png,
                        image/webp,
                        application/pdf
                      "
                      onChange={
                        handleFileChange
                      }
                      className="hidden"
                    />


                    {/* UTR */}

                    <label className="
                      mb-2
                      mt-5
                      block
                      text-[12px]
                      font-medium
                      text-[#111111]
                    ">
                      Transaction UTR Number
                    </label>

                    <input
                      type="text"
                      value={
                        form.utrNumber
                      }
                      onChange={(event) =>
                        updateField(
                          'utrNumber',
                          event.target.value
                        )
                      }
                      placeholder="Transaction UTR Number"
                      autoComplete="off"
                      className="
                        h-[42px]
                        w-full
                        rounded-[7px]
                        border
                        border-[#E5E5E5]
                        bg-[#F2F2F2]
                        px-3
                        text-[11px]
                        text-[#222222]
                        outline-none
                        placeholder:text-[#999999]
                        transition
                        focus:border-[#E5C500]
                        focus:bg-white
                      "
                    />


                    {/* REGISTER */}

                    <button
                      type="submit"
                      disabled={
                        loading ||
                        loadingSponsor ||
                        !sponsor
                      }
                      className="
                        mt-5
                        inline-flex
                        h-[42px]
                        min-w-[108px]
                        items-center
                        justify-center
                        gap-2
                        rounded-[6px]
                        bg-[#E5C500]
                        px-5
                        text-[12px]
                        font-medium
                        text-white
                        transition-all
                        hover:bg-[#D3B700]
                        active:scale-[0.98]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >

                      {loading ? (
                        <>
                          <Loader2 className="
                            h-4
                            w-4
                            animate-spin
                          " />

                          Registering...
                        </>
                      ) : (
                        <>
                          <UserPlus className="
                            h-4
                            w-4
                          " />

                          Register
                        </>
                      )}

                    </button>

                  </div>

                </div>

              </div>

            </section>

          </div>


          {/* ==================================================
              MESSAGE
          =================================================== */}

          {message && (
            <div className={`
              mx-auto
              mt-4
              flex
              max-w-[650px]
              items-start
              gap-2
              rounded-[8px]
              border
              px-3
              py-2.5
              text-[11px]
              font-medium
              ${
                messageType === 'success'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-600'
              }
            `}>

              {messageType ===
                'error' && (
                <AlertCircle className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                " />
              )}

              {messageType ===
                'success' && (
                <Check className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                " />
              )}

              <span>
                {message}
              </span>

            </div>
          )}

        </form>


        {/* ====================================================
            FOOTER
        ===================================================== */}

        <p className="
          mt-5
          text-center
          text-[9px]
          text-[#999999]
          sm:text-[10px]
        ">
          © {new Date().getFullYear()} MBD
          Builders & Developers
        </p>

      </div>

    </main>
  );
}


/* ============================================================
   FORM INPUT
============================================================ */

interface FormInputProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
  disabled?: boolean;
  maxLength?: number;
  min?: string;
  inputMode?:
    | 'text'
    | 'numeric'
    | 'decimal'
    | 'tel';
  onChange?: (
    value: string
  ) => void;
}

function FormInput({
  label,
  value,
  placeholder,
  type = 'text',
  readOnly = false,
  disabled = false,
  maxLength,
  min,
  inputMode,
  onChange,
}: FormInputProps) {
  return (
    <div className="mb-4">

      <label className="
        mb-2
        block
        text-[12px]
        font-medium
        text-[#111111]
      ">
        {label}
      </label>

      <input
        type={type}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        maxLength={maxLength}
        min={min}
        inputMode={inputMode}
        placeholder={placeholder}
        onChange={(event) =>
          onChange?.(
            event.target.value
          )
        }
        className="
          h-[42px]
          w-full
          rounded-[7px]
          border
          border-[#E5E5E5]
          bg-[#F2F2F2]
          px-3
          text-[11px]
          text-[#222222]
          outline-none
          placeholder:text-[#999999]
          transition
          focus:border-[#E5C500]
          focus:bg-white
          disabled:cursor-not-allowed
          disabled:opacity-70
        "
      />

    </div>
  );
}


/* ============================================================
   PASSWORD INPUT
============================================================ */

interface PasswordInputProps {
  label: string;
  value: string;
  placeholder?: string;
  show: boolean;
  onChange: (
    value: string
  ) => void;
  onToggle: () => void;
}

function PasswordInput({
  label,
  value,
  placeholder,
  show,
  onChange,
  onToggle,
}: PasswordInputProps) {
  return (
    <div className="mb-4">

      <label className="
        mb-2
        block
        text-[12px]
        font-medium
        text-[#111111]
      ">
        {label}
      </label>

      <div className="relative">

        <input
          type={
            show
              ? 'text'
              : 'password'
          }
          value={value}
          placeholder={placeholder}
          minLength={8}
          autoComplete="new-password"
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className="
            h-[42px]
            w-full
            rounded-[7px]
            border
            border-[#E5E5E5]
            bg-[#F2F2F2]
            px-3
            pr-10
            text-[11px]
            text-[#222222]
            outline-none
            placeholder:text-[#999999]
            transition
            focus:border-[#E5C500]
            focus:bg-white
          "
        />

        <button
          type="button"
          onClick={onToggle}
          className="
            absolute
            right-1.5
            top-1/2
            -translate-y-1/2
            rounded
            p-1.5
            text-[#999999]
            transition
            hover:text-[#222222]
          "
          aria-label={
            show
              ? `Hide ${label}`
              : `Show ${label}`
          }
        >
          {show ? (
            <EyeOff className="
              h-4
              w-4
            " />
          ) : (
            <Eye className="
              h-4
              w-4
            " />
          )}
        </button>

      </div>

    </div>
  );
}