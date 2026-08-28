"use client";

export default function WhoWeAre() {
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-10 xl:px-12">

        <div
          className="
            mx-auto
            max-w-[1200px]

            animate-[bzbFadeUp_.9s_ease]
          "
        >

          {/* Heading */}

          <h2
            className="
              font-semibold
              text-black

              text-[30px]
              sm:text-[30px]
              lg:text-[30px]

              leading-tight
            "
          >
            Who We Are
          </h2>

          {/* First Paragraph */}

          <p
            className="
              mt-8

              text-[#666666]

              leading-8
              sm:leading-9
              lg:leading-[1.8]

              text-[25px]
              sm:text-[25px]
              md:text-[25px]
              lg:text-[25px]

              animate-[bzbFadeUp_1s_ease]
            "
          >
            BZB is a trusted platform that combines Builders &
            Developers with a dynamic referral-based membership
            ecosystem.
          </p>

          {/* Second Paragraph */}

          <p
            className="
              mt-10
              lg:mt-14

              text-[#666666]

              leading-8
              sm:leading-9
              lg:leading-[1.8]

              text-[25px]
              sm:text-[25px]
              md:text-[25px]
              lg:text-[25px]

              animate-[bzbFadeUp_1.2s_ease]
            "
          >
            Our goal is to make real estate opportunities more
            accessible while empowering members to grow through
            community participation and network expansion.
          </p>

        </div>

      </div>
    </section>
  );
}