import ContactForm from "@/components/sections/ContactForm";

export default function ContactSection() {
  return (
    <section className="bg-white py-10 lg:py-16">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-12  sm:px-8 ">

        <div className="mb-3 text-center">

          <p
            className="
              text-primary-700
              font-semibold
              uppercase
              tracking-widest
              text-sm
              sm:text-base
            "
          >
            Get In Touch
          </p>

          <h2
            className="
              mt-3
              font-bold
              text-dark-900

              text-[34px]
              sm:text-[40px]
              lg:text-[48px]
            "
          >
            Contact Us
          </h2>

          <p
            className="
              mt-4
              mx-auto
              max-w-xl
              text-gray-600
              leading-8

              text-[16px]
              sm:text-[18px]
            "
          >
            We'd love to hear from you. Whether you have questions about
            our projects, membership, or referral program, our team is
            ready to assist you.
          </p>

        </div>

        <div
          className="
            rounded-2xl
            bg-white
            p-4
            sm:p-6
            lg:p-8

            shadow-[0_15px_45px_rgba(0,0,0,.08)]
          "
        >
          <ContactForm />
        </div>

      </div>
    </section>
  );
}