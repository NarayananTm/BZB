"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-[#161414]

        min-h-[550px]
        sm:min-h-[650px]
        md:min-h-[650px]
        lg:min-h-[650px]
        xl:min-h-[650px]
      "
    >
      {/* ================= Background ================= */}

      <Image
        src="/images/about/about-bg.svg"
        alt="About Background"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="
          object-cover
          object-center

          opacity-20

          will-change-transform

          animate-[bzbHeroZoom_18s_linear_infinite_alternate]
        "
      />

    

      {/* ================= Content ================= */}

      <div
        className="
          relative
          z-20

          mx-auto

          flex

          min-h-[550px]
          sm:min-h-[550px]
          md:min-h-[650px]
          lg:min-h-[650px]
          xl:min-h-[650px]

          items-center

          px-5
          sm:px-8
          lg:px-40
          xl:px-52

          max-w-[1450px]
        "
      >

        <div
          className="
            w-full

            max-w-[950px]

            animate-[bzbFadeLeft_1s_ease]
          "
        >
                      <h1
            className="
              font-medium
              leading-[1.15]

              text-[30px]
              sm:text-[30px]
              md:text-[50px]
              lg:text-[50px]
              xl:text-[50px]
            "
          >

            <span className="text-white">
              Building
            </span>

            <span className="text-[#E0BF18]">
              {" "}Trust.
            </span>

            <br />

            <span className="text-white">
              Creating
            </span>

            <span className="text-[#E0BF18]">
              {" "}Opportunities.
            </span>

            <br />

            <span className="text-white">
              Transforming
            </span>

            <span className="text-[#E0BF18]">
              {" "}Communities.
            </span>

          </h1>

                  </div>

      </div>

      {/* ================= Bottom Gradient ================= */}

      <div
        className="
          absolute

          bottom-0
          left-0

          h-40
          w-full

          bg-gradient-to-t

          from-black/60
          via-black/20
          to-transparent

          pointer-events-none
        "
      />

    </section>
  );
}