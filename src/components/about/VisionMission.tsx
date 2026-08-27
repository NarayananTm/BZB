"use client";

import Image from "next/image";

export default function VisionMission() {
  return (
    <section
      className="
        overflow-hidden

        bg-[#030202]

        py-16
        sm:py-20
        lg:py-24
      "
    >

      <div
        className="
          mx-auto

          max-w-[1600px]

          px-5
          sm:px-8
          lg:px-10
          xl:px-12
        "
      >

        <div
          className="
            grid

            grid-cols-1
            xl:grid-cols-2

            items-center

            gap-14
            lg:gap-24
          "
        >

          {/* ================= IMAGE ================= */}

          <div
            className="
              order-1

              relative

              flex
              justify-center

              animate-[bzbFadeLeft_1s_ease]
            "
          >

            {/* Glow */}

            {/* <div
              className="
                absolute

                h-[260px]
                w-[260px]

                sm:h-[360px]
                sm:w-[360px]

                lg:h-[520px]
                lg:w-[520px]

                rounded-full

                bg-yellow-500/20

                blur-[120px]

                animate-[bzbGlow_8s_ease-in-out_infinite]
              "
            /> */}

            {/* Image */}

            <Image
              src="/images/about/vision.png"
              alt="Vision"

              width={700}
              height={900}

              priority
              quality={100}

              className="
                relative
                z-20

                h-auto

                w-[240px]
                sm:w-[320px]
                md:w-[420px]
                lg:w-[520px]
                xl:w-[650px]

                object-contain

                transition-all
                duration-700

                hover:scale-[1.03]

                animate-[bzbFloat_6s_ease-in-out_infinite]
              "
            />

          </div>

          {/* ================= CONTENT ================= */}

          <div
            className="
              order-2

              animate-[bzbFadeRight_1s_ease]
            "
          >
                     {/* ================= Vision ================= */}

            <h2
              className="
                text-[#D4AF11]

                font-semibold

                text-[30px]
                sm:text-[30px]
                lg:text-[30px]

                mb-6
                lg:mb-10
              "
            >
              Our Vision
            </h2>

            <p
              className="
                text-white/90

                leading-5
                lg:leading-[1.5]

                text-[20px]
                sm:text-[20px]
                lg:text-[20px]

                mb-4
                lg:mb-6

                animate-[bzbFadeUp_1.2s_ease]
              "
            >
              To become a leading real estate and community-driven platform that empowers individuals through trusted property developments, innovative investment opportunities, and a rewarding referral ecosystem. We aspire to build lasting relationships where every member can achieve financial growth, create valuable connections, and contribute to a stronger, thriving community.
              
            </p>


            {/* ================= Mission ================= */}

            <h2
              className="
                text-[#D4AF11]

                font-semibold

                text-[30px]
                sm:text-[30px]
                lg:text-[30px]

                mb-6
                lg:mb-10
              "
            >
              Our Mission
            </h2>

            <p
              className="
                text-white/90

                leading-5
                lg:leading-[1.5]

                text-[20px]
                sm:text-[20px]
                lg:text-[20px]

                animate-[bzbFadeUp_1.6s_ease]
              "
            >
              Our mission is to deliver high-quality, sustainable residential and commercial developments while creating a transparent and customer-focused experience. Through our innovative referral program, we aim to connect people, encourage community growth, and provide rewarding opportunities that enable members to expand their network, unlock achievements, and build a brighter future together.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}   
