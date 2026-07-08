"use client";

import Image from "next/image";

const steps = [
  {
    title: "Become a Member",
    text: "Register as a BZB member and activate your membership to receive your unique Referral ID and QR Code.",
  },
  {
    title: "Share Your Referral",
    text: "Share your referral link or QR Code through WhatsApp, Facebook, Instagram, Email, or any social platform.",
  },
  {
    title: "Grow Your Team",
    text: "Every successful registration through your referral becomes part of your growing network.",
  },
  {
    title: "Complete Referral Levels",
    text: "Achieve referral milestones to unlock higher levels and exciting rewards.",
  },
  {
    title: "Earn Recognition",
    text: "As your team grows, your referral achievements grow too, opening doors to exclusive benefits and future opportunities.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-white overflow-hidden py-16 lg:py-28">

      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

        <h2
          className="
            mb-14

            text-[32px]
            sm:text-[38px]
            lg:text-[42px]

            font-bold

            text-[#222]

            animate-[fadeInLeft_1s_ease]
          "
        >
          How the Referral Program Works
        </h2>

        <div
          className="
            grid

            grid-cols-1
            lg:grid-cols-[45%_55%]

            items-center

            gap-16
          "
        >

          {/* LEFT */}

          <div
            className="
              relative

              flex
              justify-center

              animate-[fadeInLeft_1s_ease]
            "
          >

            {/* Watermark */}

            <Image
              src="/images/referral/BZB Watermark.png"
              alt=""
              width={500}
              height={500}
              priority
              quality={100}
              className="
                absolute

                w-[260px]
                sm:w-[340px]
                lg:w-[500px]

                opacity-20

                top-0

                animate-[float_7s_ease-in-out_infinite]
              "
            />

            {/* Phone */}

            <Image
              src="/images/referral/Referral-Phone.png"
              alt="Referral Phone"
              width={430}
              height={820}
              priority
              quality={100}
              className="
                relative

                z-20

                w-[220px]
                sm:w-[280px]
                md:w-[340px]
                lg:w-[430px]

                h-auto

                -rotate-[12deg]

                drop-shadow-[0_30px_50px_rgba(0,0,0,.25)]

                transition-all
                duration-700

                hover:rotate-0
                hover:scale-105
              "
            />

          </div>

          {/* RIGHT */}

          <div className="relative">

            {/* Timeline */}

            <div
              className="
                absolute

                left-[18px]

                top-4
                bottom-4

                w-[2px]

                border-l-2
                border-dotted

                border-[#B8A26A]
              "
            />

            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  animationDelay: `${index * 180}ms`,
                }}
                className="
                  relative

                  mb-8

                  flex
                  gap-4

                  opacity-0

                  animate-[fadeInUp_.8s_ease_forwards]
                "
              >
                                {/* Circle */}

                <div
                  className={`
                    w-9
                    h-9
                    rounded-full
                    flex-shrink-0

                    border-4
                    border-white

                    shadow-lg

                    ${
                      index === 4
                        ? "bg-[#FFE27B]"
                        : index === 3
                        ? "bg-[#FFD23F]"
                        : index === 2
                        ? "bg-[#F2C200]"
                        : index === 1
                        ? "bg-[#D5AF09]"
                        : "bg-[#B88C00]"
                    }
                  `}
                />

                {/* Content */}

                <div>

                  <h3
                    className="
                      text-[22px]
                      sm:text-[24px]
                      lg:text-[28px]

                      font-bold

                      text-[#222]

                      transition-colors
                      duration-300

                      hover:text-[#B5970C]
                    "
                  >
                    {step.title}
                  </h3>

                  <p
                    className="
                      mt-3

                      max-w-[560px]

                      text-[#666]

                      leading-8

                      text-[16px]
                      sm:text-[17px]
                      lg:text-[18px]
                    "
                  >
                    {step.text}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}