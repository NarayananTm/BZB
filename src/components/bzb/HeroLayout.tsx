"use client";

import Image from "next/image";

export default function HeroLayout() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#161313]">

      {/* Background */}

      <Image
        src="/images/bzb/hero-bg.svg"
        alt="Background"
        fill
        priority
        className="absolute inset-0 object-cover object-center opacity-30"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}

      <div className="relative z-20 mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14">

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[48%_52%]
            items-center
            min-h-screen
            gap-14
            lg:gap-0
          "
        >

          {/* ==================================== */}
          {/* LEFT */}
          {/* ==================================== */}

          <div
            className="
              order-1
              lg:order-1

              text-center
              lg:text-left

              pt-10
             
              lg:pt-0
              lg:pl-36

              animate-[fadeInLeft_1s_ease]
            "
          >

            <h1 className="font-black leading-[0.95]">

              <span
                className="
                  block
                  text-white

                  text-[48px]
                  sm:text-[48px]
                  md:text-[48px]
                  xl:text-[48px]
                "
              >
                Building
              </span>

              <span
                className="
                  block
                  text-[#F3C300]
                  font-semibold
                  text-[50px]
                  sm:text-[50px]
                  md:text-[50px]
                  xl:text-[50px]
                "
              >
                Tomorrow&apos;s
              </span>

              <span
                className="
                  block
                  text-white

                  text-[48px]
                  sm:text-[48px]
                  md:text-[48px]
                  xl:text-[48px]
                "
              >
                Landmarks
              </span>

              <span
                className="
                  block
                  text-[#F3C300]
                   font-semibold
                  text-[50px]
                  sm:text-[50px]
                  md:text-[50px]
                  xl:text-[50px]
                "
              >
                Today
              </span>

            </h1>

          </div>

          {/* ==================================== */}
          {/* RIGHT */}
          {/* ==================================== */}

          <div
            className="
              order-2

              relative

              flex
              flex-col
              items-center
              justify-center

              lg:block

              h-auto
              lg:h-[900px]

              animate-[fadeInRight_1.2s_ease]
            "
          >

            {/* House */}

            <Image
              src="/images/bzb/house-outline.png"
              alt="Luxury House"
              width={760}
              height={760}
              priority
              quality={100}
              className="
                relative

                lg:absolute

                lg:right-[220px]
                lg:bottom-[120px]

                w-[240px]
                sm:w-[320px]
                md:w-[420px]
                lg:w-[620px]
                xl:w-[760px]

                h-auto

                object-contain

                drop-shadow-[0_30px_80px_rgba(0,0,0,.45)]

                transition-all
                duration-700

                hover:scale-[1.03]
              "
            />

                      {/* Floating Information Card */}

            <div
              className="
                absolute
                mt-8

                w-full
                max-w-[430px]

                rounded-2xl
                border
                border-[#2D2D2D]

                bg-black/30
                backdrop-blur-xl

                p-5
                sm:p-6
                lg:p-8

                shadow-[0_20px_60px_rgba(0,0,0,.45)]

                transition-all
                duration-500

                hover:-translate-y-2
                hover:shadow-[0_30px_80px_rgba(243,195,0,.15)]

                animate-[fadeInUp_1.4s_ease]

                lg:absolute
                lg:left-[120px]
                lg:bottom-[120px]

                lg:mt-0
              "
            >

              <p className="text-white leading-5 text-[15px] sm:text-[16px]">
                Delivering premium residential and commercial developments
                with trust, quality, and innovation.
              </p>

              <p className="mt-6 text-white leading-5 text-[15px] sm:text-[16px]">
                Every BZB project is designed with modern architecture,
                quality construction, and long-term value to create
                exceptional living and investment opportunities.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}