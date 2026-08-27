"use client";

import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section
      className="
        overflow-hidden

        bg-[#F8F8F8]

        py-16
        sm:py-20
        lg:py-28
      "
    >
      <div
        className="
          mx-auto

          max-w-[1500px]

          px-5
          sm:px-8
          lg:px-10
          xl:px-12
        "
      >
        {/* ================= Heading ================= */}

        <div
          className="
            mb-14
            lg:mb-20

            text-center

            animate-[bzbFadeUp_.8s_ease]
          "
        >
          <p
            className="
              font-semibold

              uppercase

              tracking-[4px]

              text-[#D4AF11]

              text-sm
              sm:text-base
            "
          >
            Get In Touch
          </p>

          <h2
            className="
              mt-4

              font-semibold

              text-[#222]

              text-[30px]
              sm:text-[30px]
              lg:text-[30px]
            "
          >
            Contact Us
          </h2>

          <p
            className="
              mx-auto

              mt-6

              max-w-[760px]

              text-gray-500

              leading-8
              lg:leading-9

              text-[17px]
              sm:text-[19px]
              lg:text-[22px]
            "
          >
            We'd love to hear from you.

            Fill in the form below and our
            team will get back to you as soon as possible.
          </p>
        </div>

        {/* ================= Form ================= */}

        <div
          className="
            animate-[bzbFadeUp_1s_ease]
          "
        >
          <ContactForm />
        </div>
      </div>
    </section>
  );
}