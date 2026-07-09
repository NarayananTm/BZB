"use client";

import { Button } from "@/components";

export default function ContactForm() {
  return (
    <div
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

        <input
          type="text"
          placeholder="First Name"
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

        <input
          type="text"
          placeholder="Last Name"
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

      {/* Email */}

      <input
        type="email"
        placeholder="Email Address"
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

          transition-all
          duration-300

          focus:border-[#D4AF11]
          focus:ring-4
          focus:ring-[#D4AF11]/10
        "
      />

      {/* Phone */}

      <input
        type="text"
        placeholder="Phone Number"
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

          transition-all
          duration-300

          focus:border-[#D4AF11]
          focus:ring-4
          focus:ring-[#D4AF11]/10
        "
      />
            {/* Message */}

      <textarea
        rows={6}
        placeholder="Your Message"
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

      {/* Bottom Section */}

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
          className="
            h-14
            lg:h-16

            w-full
            sm:w-auto

            rounded-xl

            bg-[#B69E14]

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
          "
        >
          Send Message
        </Button>

      </div>

    </div>
  );
}