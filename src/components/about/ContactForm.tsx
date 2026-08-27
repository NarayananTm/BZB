"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components";
import { toast } from "sonner";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

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
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully.");

        resetForm();
      } else {
        toast.error(result.message || "Unable to send message.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-[24px]
        lg:rounded-[30px]

        bg-white

        p-6
        sm:p-8
        lg:p-12

        shadow-[0_20px_50px_rgba(0,0,0,.08)]
      "
    >
      {/* Name */}

      <div
        className="
          grid

          grid-cols-1
          md:grid-cols-2

          gap-6
          lg:gap-8
        "
      >
                {/* ================= First Name ================= */}

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="
            h-14
            lg:h-16

            rounded-xl

            border
            border-gray-300

            px-5
            lg:px-6

            outline-none

            text-[#222]

            transition-all
            duration-300

            focus:border-[#D4AF11]
            focus:ring-4
            focus:ring-[#D4AF11]/10
          "
        />

        {/* ================= Last Name ================= */}

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="
            h-14
            lg:h-16

            rounded-xl

            border
            border-gray-300

            px-5
            lg:px-6

            outline-none

            text-[#222]

            transition-all
            duration-300

            focus:border-[#D4AF11]
            focus:ring-4
            focus:ring-[#D4AF11]/10
          "
        />

      </div>

      {/* ================= Email ================= */}

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        className="
          mt-6
          lg:mt-8

          h-14
          lg:h-16

          w-full

          rounded-xl

          border
          border-gray-300

          px-5
          lg:px-6

          outline-none

          text-[#222]

          transition-all
          duration-300

          focus:border-[#D4AF11]
          focus:ring-4
          focus:ring-[#D4AF11]/10
        "
      />

      {/* ================= Phone ================= */}

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="
          mt-6
          lg:mt-8

          h-14
          lg:h-16

          w-full

          rounded-xl

          border
          border-gray-300

          px-5
          lg:px-6

          outline-none

          text-[#222]

          transition-all
          duration-300

          focus:border-[#D4AF11]
          focus:ring-4
          focus:ring-[#D4AF11]/10
        "
      />
            {/* ================= Message ================= */}

      <textarea
        name="message"
        rows={6}
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
        className="
          mt-6
          lg:mt-8

          w-full

          rounded-xl

          border
          border-gray-300

          p-5
          lg:p-6

          outline-none

          resize-none

          text-[#222]

          leading-7

          transition-all
          duration-300

          focus:border-[#D4AF11]
          focus:ring-4
          focus:ring-[#D4AF11]/10
        "
      />

      {/* ================= Bottom Section ================= */}

      <div
        className="
          mt-8
          lg:mt-10

          flex

          flex-col
          sm:flex-row

          items-center

          justify-between

          gap-5
        "
      >

        <p
          className="
            text-center
            sm:text-left

            text-[14px]
            sm:text-[15px]

            leading-6

            text-gray-500
          "
        >
          By submitting this form, you agree that BZB may contact you
          regarding your enquiry.
        </p>

        <Button
          type="submit"
          disabled={loading}
          className="
            h-14
            lg:h-16

            w-full
            sm:w-auto

            rounded-xl

            bg-primary-700

            px-10
            lg:px-12

            text-white

            text-lg
            font-semibold

            transition-all
            duration-500

            hover:bg-primary-800
            hover:scale-105
            hover:-translate-y-1
            hover:shadow-[0_20px_40px_rgba(212,175,17,.35)]

            active:scale-95

            disabled:opacity-70
            disabled:cursor-not-allowed
            disabled:hover:scale-100
            disabled:hover:translate-y-0
          "
        >
          {loading ? "Sending..." : "Send Message"}
        </Button>

      </div>

    </form>
  );
}