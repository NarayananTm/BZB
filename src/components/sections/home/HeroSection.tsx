"use client";

import Image from "next/image";
import { Button } from "@/components";

export default function HeroSection() {
  return (
    <section
      className="
        relative

        overflow-hidden

        bg-black

       min-h-[760px]
sm:min-h-[850px]
lg:min-h-[950px]

       flex

items-end

lg:items-center

pt-24

pb-10
      "
    >
      {/* ================= Background ================= */}

      <Image
        src="/images/hero/BZB hom baner.png"
        alt="Hero Background"
        fill
        priority
        quality={100}
        className="
          object-cover
          object-center

          scale-105

          animate-[slowZoom_18s_linear_infinite_alternate]
        "
      />

      {/* Overlay */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-r

          from-black/75
          via-black/45
          to-black/10
        "
      />

      {/* Polygon */}

      <Image
        src="/images/hero/Yellow Polygon.png"
        alt=""
        width={900}
        height={600}
        priority
        quality={100}
        className="
          absolute

          -bottom-10
right-0

lg:bottom-0

          w-[180px]
          sm:w-[260px]
          md:w-[360px]
          lg:w-[520px]
          xl:w-[620px]

          h-auto

          pointer-events-none

          animate-[float_8s_ease-in-out_infinite]
        "
      />

      {/* Container */}

      <div
        className="
          relative

          z-20

          mx-auto

          w-full

          max-w-[1500px]

          px-5
          sm:px-8
          lg:px-12
        "
      >

        <div
          className="
            grid

            items-center

           gap-4
sm:gap-8
lg:gap-10

            grid-cols-1

            lg:grid-cols-[48%_52%]
          "
        >
          {/* ================= LEFT CONTENT ================= */}

          <div
            className="
              order-2
              lg:order-1

              text-center
              lg:text-left

              animate-[fadeInLeft_1s_ease]
            "
          >

            <h1
              className="
                font-black
                leading-tight

                text-white

                text-[38px]
                sm:text-[48px]
                md:text-[56px]
                lg:text-[64px]
              "
            >
              Build Your
              <br />

              Future with

              <span className="text-[#F3C300]">
                {" "}BZB
              </span>

            </h1>

            <h2
              className="
               mt-3
sm:mt-5

                font-semibold

                text-[#F3C300]

                text-[22px]
                sm:text-[26px]
                md:text-[30px]
                lg:text-[34px]

                animate-[fadeInLeft_1.2s_ease]
              "
            >
              Invest. Refer. Grow. Reward.
            </h2>

            <p
              className="
                mx-auto
                lg:mx-0

                mt-6

                max-w-[580px]

                text-gray-300

                leading-8
                lg:leading-9

                text-[16px]
                sm:text-[18px]
                lg:text-[20px]

                animate-[fadeInLeft_1.4s_ease]
              "
            >
              Join BZB and become part of a community where real estate
              opportunities meet rewarding referrals.

              Explore trusted projects, grow your network,
              unlock exclusive rewards, and manage everything
              from one powerful platform.
            </p>

            {/* CTA */}

            <div
              className="
               mt-7
sm:mt-10

                flex

                justify-center
                lg:justify-start

                animate-[fadeInUp_1.6s_ease]
              "
            >

              <Button
                href="/member/dashboard"
                className="
                  h-14

                  w-full
                  sm:w-auto

                  rounded-xl

                  bg-[#BEA311]

                  px-10

                  text-lg

                  font-semibold

                  text-white

                  transition-all
                  duration-500

                  hover:bg-primary-800
                  hover:scale-105

                  active:scale-95
                "
              >
                Get Started →
              </Button>

            </div>

          </div>

          {/* ================= RIGHT CONTENT ================= */}

          <div
            className="
              
              order-1
mb-8
lg:mb-0
              lg:order-2

              flex

              justify-center
              lg:justify-end

              animate-[fadeInRight_1.2s_ease]
            "
          >

            {/* Phone Image Wrapper */}

            <div
              className="
                relative

                flex
                items-center
                justify-center

                w-full

                lg:justify-end
              "
            >

              {/* Glow */}

              <div
                className="
                  absolute

                  h-[220px]
                  w-[220px]

md:w-[280px]

xl:w-[460px]
                  sm:h-[300px]
                  sm:w-[300px]

                  lg:h-[420px]
                  lg:w-[420px]

                  rounded-full

                  bg-[#BEA311]/20

                  blur-[90px]

                  animate-pulse
                "
              />

              {/* Mobile App */}

              <Image
                src="/images/hero/BZB Mobile App.png"
                alt="BZB Mobile App"

                width={420}
                height={760}

                priority
                quality={100}

                className="
                  relative
                  z-20

                  h-auto

                  w-[220px]
                  sm:w-[280px]
                  md:w-[340px]
                  lg:w-[420px]
                  xl:w-[460px]

                  lg:mr-14
                  xl:mr-20

                  lg:mt-24
                  xl:mt-28

                  drop-shadow-[0_30px_70px_rgba(0,0,0,.45)]

                  transition-all
                  duration-700

                  hover:scale-105

                  animate-[float_6s_ease-in-out_infinite]
                "
              />

              {/* Decorative Ring */}

              <div
                className="
                  absolute

                  bottom-10
                  right-8

                  hidden
                  lg:block

                  h-28
                  w-28

                  rounded-full

                  border

                  border-[#F3C300]/30

                  animate-[spin_18s_linear_infinite]
                "
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}