"use client";

import Image from "next/image";
import { Button } from "@/components";
import "@/styles/animations.css";
export default function ReferralSection() {
  return (
    <section
      className="
        relative

        overflow-hidden

        bg-dark-900

        py-14
        sm:py-16
        lg:py-24
      "
    >

      {/* Background */}

      <div
        className="
          absolute
          inset-0

          opacity-[0.04]

          animate-[bzbPulseGlow_8s_ease-in-out_infinite]
        "
      />

      <div
        className="
          relative

          mx-auto

          max-w-[1500px]

          px-5
          sm:px-8
          lg:px-12
        "
      >

        <div
          className="
            grid

            grid-cols-1
            xl:grid-cols-2

            items-center

            gap-10
            lg:gap-16
          "
        >

          {/* ================= LEFT ================= */}

          <div
            className="
              order-2
              xl:order-1

              text-center
              xl:text-left

              animate-[bzbFadeLeft_1s_ease]
            "
          >

            <p
              className="
                mb-4

                font-semibold

                uppercase

                tracking-widest

                text-primary-500

                text-[18px]
                sm:text-[22px]
                lg:text-[30px]
              "
            >
              Referral Program
            </p>

            <h2
              className="
                font-semibold

                leading-tight

                text-white

                text-[32px]
                sm:text-[40px]
                md:text-[46px]
                lg:text-[50px]
              "
            >
              Refer. Grow.
              <br />
              Earn Together.
            </h2>

            <p
              className="
                mt-6

                leading-8
                lg:leading-9

                text-gray-400

                text-[16px]
                sm:text-[18px]
                lg:text-[22px]
              "
            >
              Invite your friends and family to join the BZB community.

              <br />
              <br />

              Every successful referral helps you progress through
              referral levels, expand your network, and unlock exciting
              rewards.

              <br />
              <br />

              The more your network grows, the greater your
              opportunities become.
            </p>

            <div
              className="
                mt-10

                flex

                justify-center
                xl:justify-start

                animate-[bzbFadeUp_1.3s_ease]
              "
            >

              <Button
                href="/referral"
                className="
                  h-14

                  w-full
                  sm:w-auto

                  rounded-lg

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
                Start Referring
              </Button>

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div
            className="
              order-1
              xl:order-2

              flex

              justify-center

              animate-[bzbFadeRight_1.2s_ease]
            "
          >
                        <div
              className="
                relative

                flex
                items-center
                justify-center

                w-full
              "
            >

              {/* Background Glow */}

              <div
                className="
                  absolute

                  h-[220px]
                  w-[220px]

                  sm:h-[300px]
                  sm:w-[300px]

                  lg:h-[420px]
                  lg:w-[420px]

                  rounded-full

                  bg-[#BEA311]/20

                  blur-[90px]

                  animate-[bzbPulseGlow_6s_ease-in-out_infinite]
                "
              />

              {/* Phone Image */}

              <Image
                src="/images/hero/Referral-Program-iPhone-14.png"
                alt="Referral Program"

                width={750}
                height={900}

                priority
                quality={100}

                className="
                  relative
                  z-20

                  h-auto

                  w-[240px]
                  sm:w-[300px]
                  md:w-[360px]
                  lg:w-[460px]
                  xl:w-[650px]

                  object-contain

                  drop-shadow-[0_35px_70px_rgba(0,0,0,.45)]

                  transition-all
                  duration-700
                  ease-out

                  hover:scale-[1.03]

                  will-change-transform

                  animate-[bzbFloat_6s_ease-in-out_infinite]
                "
              />

              {/* Decorative Ring */}

              <div
                className="
                  absolute

                  bottom-8
                  right-6

                  hidden
                  lg:block

                  h-28
                  w-28

                  rounded-full

                  border
                  border-[#BEA311]/30

                  animate-[bzbRotateSlow_25s_linear_infinite]
                "
              />

            </div>

          </div>
                  </div>

      </div>

      {/* Bottom Decorative Gradient */}

      <div
        className="
          absolute

          bottom-0
          left-0

          h-24
          w-full

          bg-gradient-to-t

          from-black/20
          to-transparent

          pointer-events-none
        "
      />

    </section>
  );
}