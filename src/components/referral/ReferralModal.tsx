"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { X } from "lucide-react";

import { toast } from "sonner";

interface ReferralModalProps {
  open: boolean;
  onClose: () => void;
}

interface ReferralFormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  referralCode: string;
  message: string;
}

export default function ReferralModal({
  open,
  onClose,
}: ReferralModalProps) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ReferralFormData>({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    referralCode: "",
    message: "",
  });

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      referralCode: "",
      message: "",
    });
  };

  const handleSubmit = async (
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setLoading(true);

  const loadingToast = toast.loading(
    "Submitting referral..."
  );

  try {
    const response = await fetch("/api/referral", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    toast.dismiss(loadingToast);

    if (result.success) {
      toast.success("Referral submitted successfully.");

      resetForm();

      onClose();
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    console.error(error);

    toast.dismiss(loadingToast);

    toast.error("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed

        inset-0

        z-[9999]

        flex

        items-center
        justify-center

        bg-black/70

        backdrop-blur-md

        p-5

        animate-[fadeIn_.35s_ease]
      "
    >

      {/* Modal */}

      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative

          w-full

          max-w-[720px]

          rounded-[30px]

          bg-white

          p-8
          sm:p-10
          lg:p-12

          shadow-[0_30px_80px_rgba(0,0,0,.35)]

          animate-[zoomIn_.35s_ease]
        "
      >

        {/* Close */}

        <button
          type="button"
          onClick={onClose}
          className="
            absolute

            right-6
            top-6

            rounded-full

            p-2

            transition-all

            hover:bg-gray-100
          "
        >
          <X
            size={26}
            className="text-gray-700"
          />
        </button>

        {/* Heading */}

        <h2
          className="
            text-center

            text-[36px]

            font-bold

            text-[#171515]
          "
        >
          Referral Registration
        </h2>

        <p
          className="
            mt-3

            text-center

            text-gray-500

            text-[18px]
          "
        >
          Complete the form below to start referring
          friends and earning rewards.
        </p>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-10"
        >

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* ================= Full Name ================= */}

          <div className="col-span-1">

            <label
              className="
                mb-3

                block

                text-[18px]

                font-semibold

                text-[#171515]
              "
            >
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"

              value={formData.fullName}

              onChange={handleChange}

              required

              className="
                h-14
                lg:h-16

                w-full

                rounded-xl

                border
                border-gray-300

                bg-white

                px-6

                text-[17px]

                text-[#171515]

                placeholder:text-gray-400

                outline-none

                transition-all
                duration-300

                focus:border-[#BEA311]

                focus:ring-4
                focus:ring-[#BEA311]/15
              "
            />

          </div>

          {/* ================= Email ================= */}

         <div className="col-span-1">

            <label
              className="
                mb-3

                block

                text-[18px]

                font-semibold

                text-[#171515]
              "
            >
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"

              value={formData.email}

              onChange={handleChange}

              required

              className="
                h-14
                lg:h-16

                w-full

                rounded-xl

                border
                border-gray-300

                bg-white

                px-6

                text-[17px]

                text-[#171515]

                placeholder:text-gray-400

                outline-none

                transition-all
                duration-300

                focus:border-[#BEA311]

                focus:ring-4
                focus:ring-[#BEA311]/15
              "
            />

          </div>
                    {/* ================= Phone Number ================= */}

        <div className="col-span-1">
            <label
              className="
                mb-3

                block

                text-[18px]

                font-semibold

                text-[#171515]
              "
            >
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"

              value={formData.phone}

              onChange={handleChange}

              required

              className="
                h-14
                lg:h-16

                w-full

                rounded-xl

                border
                border-gray-300

                bg-white

                px-6

                text-[17px]

                text-[#171515]

                placeholder:text-gray-400

                outline-none

                transition-all
                duration-300

                focus:border-[#BEA311]

                focus:ring-4
                focus:ring-[#BEA311]/15
              "
            />

          </div>

          {/* ================= City ================= */}

         <div className="col-span-1">

            <label
              className="
                mb-3

                block

                text-[18px]

                font-semibold

                text-[#171515]
              "
            >
              City
            </label>

            <input
              type="text"
              name="city"
              placeholder="Enter your city"

              value={formData.city}

              onChange={handleChange}

              required

              className="
                h-14
                lg:h-16

                w-full

                rounded-xl

                border
                border-gray-300

                bg-white

                px-6

                text-[17px]

                text-[#171515]

                placeholder:text-gray-400

                outline-none

                transition-all
                duration-300

                focus:border-[#BEA311]

                focus:ring-4
                focus:ring-[#BEA311]/15
              "
            />

          </div>
                    {/* ================= Referral Code ================= */}
<div className="col-span-1">

            <label
              className="
                mb-3

                block

                text-[18px]

                font-semibold

                text-[#171515]
              "
            >
              Referral Code
              <span className="ml-2 text-sm font-normal text-gray-500">
                (Optional)
              </span>
            </label>

            <input
              type="text"
              name="referralCode"
              placeholder="Enter referral code"

              value={formData.referralCode}

              onChange={handleChange}

              className="
                h-14
                lg:h-16

                w-full

                rounded-xl

                border
                border-gray-300

                bg-white

                px-6

                text-[17px]

                text-[#171515]

                placeholder:text-gray-400

                outline-none

                transition-all
                duration-300

                focus:border-[#BEA311]

                focus:ring-4
                focus:ring-[#BEA311]/15
              "
            />

          </div>

          {/* ================= Message ================= */}

        <div className="md:col-span-2 lg:col-span-3">

            <label
              className="
                mb-3

                block

                text-[18px]

                font-semibold

                text-[#171515]
              "
            >
              Message
            </label>

            <textarea
              name="message"

              rows={5}

              placeholder="Tell us about your referral..."

              value={formData.message}

              onChange={handleChange}

              required

              className="
                w-full

                rounded-xl

                border
                border-gray-300

                bg-white

                p-6

                text-[17px]

                text-[#171515]

                leading-7

                placeholder:text-gray-400

                outline-none

                resize-none

                transition-all
                duration-300

                focus:border-[#BEA311]

                focus:ring-4
                focus:ring-[#BEA311]/15
              "
            />

          </div>
                    {/* ================= Buttons ================= */}

          <div
            className="
              lg:col-span-3
    md:col-span-2
    col-span-1

    mt-4

    flex

    justify-end

    gap-4
            "
          >

            {/* Cancel */}

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                h-14
                lg:h-16

                rounded-xl

                border
                border-gray-300

                bg-white

                px-8

                text-[17px]

                font-semibold

                text-[#171515]

                transition-all
                duration-300

                hover:bg-gray-100

                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              Cancel
            </button>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="
                h-14
                lg:h-16

                rounded-xl

                bg-[#BEA311]

                px-10

                text-[17px]

                font-semibold

                text-white

                transition-all
                duration-300

                hover:bg-[#A88F0F]
                hover:scale-105

                active:scale-95

                disabled:cursor-not-allowed
                disabled:opacity-70
                disabled:hover:scale-100
              "
            >
              {loading ? "Submitting..." : "Submit Referral"}
            </button>

          </div>
          </div>

        </form>

      </div>

    </div>
  );
}