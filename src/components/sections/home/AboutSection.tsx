"use client";

import Image from "next/image";
import { Button } from "@/components";

export default function AboutSection() {
  return (
    <section
      className="
        overflow-hidden
        bg-white

        py-12
        sm:py-16
        lg:py-0
      "
    >
      <div
        className="
          mx-auto

          max-w-[1650px]

          px-5
          sm:px-8
          lg:px-12
        "
      >
        <div
          className="
            grid

            grid-cols-1
            xl:grid-cols-[720px_1fr]

            items-center

            gap-12
            lg:gap-20
            xl:gap-28
          "
        >

          {/* ================= LEFT ================= */}

          <div
            className="
              order-1

              flex
              justify-center

              xl:block

              animate-[fadeInLeft_1s_ease]
            "
          >
            <div
              className="
                relative

                overflow-hidden

                rounded-b-[40px]

                bg-[#D8B300]

                shadow-[0_25px_50px_rgba(0,0,0,.25)]

                w-full
                max-w-[760px]

                h-[380px]
                sm:h-[500px]
                md:h-[620px]
                lg:h-[760px]
                xl:h-[960px]

                transition-all
                duration-700
              "
            >

              {/* Glow */}

              <div
                className="
                  absolute

                  left-1/2
                  top-1/2

                  -translate-x-1/2
                  -translate-y-1/2

                  h-[240px]
                  w-[240px]

                  sm:h-[340px]
                  sm:w-[340px]

                  lg:h-[500px]
                  lg:w-[500px]

                  rounded-full

                  bg-white/10

                  blur-[90px]

                  animate-[pulseGlow_6s_ease-in-out_infinite]
                "
              />
              <Image
                src="/images/hero/MaskGroup.png"
                alt="House"
                width={960}
                height={900}
                priority
                quality={100}
                className="
                  absolute

                  bottom-0
                  left-1/2

                  -translate-x-1/2

                  w-[320px]
                  sm:w-[420px]
                  md:w-[560px]
                  lg:w-[700px]
                  xl:w-[900px]

                  h-auto

                  object-contain

                  transition-all
                  duration-700

                  hover:scale-105

                  animate-[float_7s_ease-in-out_infinite]
                "
              />

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div
            className="
              order-2

              max-w-[760px]

              text-center
              xl:text-left

              animate-[fadeInRight_1s_ease]
            "
          >

            <p
              className="
                font-semibold

                text-black

                text-[24px]
                sm:text-[28px]
                lg:text-[30px]
              "
            >
              About BZB
            </p>

            <h2
              className="
                mt-4

                font-semibold

                leading-tight

                text-[#707070]

                text-[34px]
                sm:text-[42px]
                md:text-[46px]
                lg:text-[50px]
              "
            >
              Building Dreams.
              <br />
              Creating Opportunities.
            </h2>

            <p
              className="
                mt-6

                leading-8
                lg:leading-9

                text-[#666]

                text-[16px]
                sm:text-[18px]
                lg:text-[22px]
              "
            >
              BZB is a modern Builders & Developers platform committed
              to delivering quality real estate projects while creating
              rewarding opportunities for our members.
            </p>

            <p
              className="
                mt-5

                leading-8
                lg:leading-9

                text-[#666]

                text-[16px]
                sm:text-[18px]
                lg:text-[22px]
              "
            >
              Whether you're looking to own a property, invest in real
              estate, or earn through referrals, BZB provides a
              transparent and trusted ecosystem designed for long-term
              growth.
            </p>

            <p
              className="
                mt-5

                leading-8
                lg:leading-9

                text-[#666]

                text-[16px]
                sm:text-[18px]
                lg:text-[22px]
              "
            >
              Our mission is to make property ownership and wealth
              creation accessible through innovation, integrity, and
              community.
            </p>

            <div
              className="
                mt-10

                flex

                justify-center
                xl:justify-start

                animate-[fadeInUp_1.3s_ease]
              "
            >

              <Button
                href="/bzb"
                className="
                  h-14
                  sm:h-[58px]

                  w-full
                  sm:w-auto

                  rounded-lg

                  bg-[#BEA311]

                  px-10

                  text-lg
                  sm:text-xl

                  font-semibold

                  text-white

                  transition-all
                  duration-500

                  hover:bg-primary-800
                  hover:scale-105

                  active:scale-95
                "
              >
                Get Started
              </Button>

            </div>
                       

          </div>

        </div>

      </div>

    </section>
  );
}