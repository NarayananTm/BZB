"use client";

import Image from "next/image";

const levels = [
  "Your referral journey is divided into multiple achievement levels.",
  "Each completed level unlocks new opportunities and moves you closer to premium member benefits.",
  "Progress is displayed in real time inside your member dashboard.",
];

export default function ReferralLevelsSection() {
  return (
    <section className="relative overflow-hidden bg-[#B5970C] py-16 lg:py-24">

      {/* Background Shape */}

      <Image
        src="/images/referral/Level Shape.png"
        alt=""
        width={700}
        height={500}
        priority
        quality={100}
        className="
          absolute
          right-0
          bottom-0

          w-[280px]
          sm:w-[420px]
          lg:w-[700px]

          h-auto

          opacity-20

          pointer-events-none

          animate-[float_8s_ease-in-out_infinite]
        "
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

        <p
          className="
            text-white

            font-semibold

            text-lg
            lg:text-xl

            animate-[fadeInLeft_1s_ease]
          "
        >
          Referral Levels
        </p>

        <h2
          className="
            mt-4

            text-white

            font-bold

            leading-tight

            text-[34px]
            sm:text-[44px]
            lg:text-[58px]

            animate-[fadeInLeft_1s_ease]
          "
        >
          Grow Step by Step
        </h2>

        <div className="mt-10 space-y-6">

          {levels.map((item, index) => (

            <div
              key={index}
              style={{
                animationDelay: `${index * 180}ms`,
              }}
              className="
                flex
                items-start
                gap-4

                opacity-0

                animate-[fadeInUp_.8s_ease_forwards]
              "
            >

              <span
                className="
                  mt-[10px]

                  h-3
                  w-3

                  rounded-full

                  bg-white

                  flex-shrink-0
                "
              />

              <p
                className="
                  text-white

                  leading-8
                  lg:leading-9

                  text-[18px]
                  lg:text-[24px]
                "
              >
                {item}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}