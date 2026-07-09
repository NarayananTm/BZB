"use client";

import Image from "next/image";

export default function AboutCompany() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">

      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        <div className="grid items-center gap-2 lg:grid-cols-[60%_40%]">

          {/* ================= LEFT ================= */}

          <div
            className="
              relative
              flex
              justify-center
              items-end

              h-[380px]
              sm:h-[500px]
              md:h-[620px]
              lg:h-[760px]

              animate-[fadeInLeft_1s_ease]
            "
          >

            {/* Blueprint */}

            <div className="absolute left-0 bottom-0">

              <Image
                src="/images/bzb/house-sketch.png"
                alt=""
                width={1200}
                height={1200}
                priority
                quality={100}
                className="
      w-[500px]
      sm:w-[650px]
      md:w-[800px]
      lg:w-[950px]
      xl:w-[1100px]

      h-auto

      object-contain

      opacity-90

      pointer-events-none
      select-none
    "
              />

            </div>

            {/* Worker */}

            <Image
              src="/images/bzb/worker.png"
              alt="Worker"
              width={460}
              height={700}
              priority
              quality={100}
              className="
                relative
                z-20

                w-[220px]
                sm:w-[280px]
                md:w-[360px]
                lg:w-[460px]

                h-auto

                transition-all
                duration-700

                hover:scale-105
              "
            />

          </div>

          {/* ================= RIGHT ================= */}

          <div
            className="
              animate-[fadeInRight_1.2s_ease]
            "
          >

            <div
              className="
                rounded-[34px]

                bg-[#B79C10]

                p-6
                sm:p-8
                lg:p-12


                shadow-[0_30px_60px_rgba(0,0,0,.18)]

                transition-all
                duration-500

                hover:-translate-y-2
                hover:shadow-[0_40px_70px_rgba(0,0,0,.22)]
              "
            >

              <h2
                className="
                  font-semibold
                  text-white

                  text-[30px]
                  sm:text-[26px]
                  lg:text-[30px]
                "
              >
                About Our Company
              </h2>

              <p
                className="
                  mt-8

                  text-white/95

                  leading-8
                  lg:leading-10

                  text-[25px]
                  sm:text-[25px]
                  lg:text-[25px]
                "
              >
                BZB Builders & Developers is committed to creating
                thoughtfully designed residential communities and
                commercial developments that meet modern lifestyle
                needs.
              </p>

              <p
                className="
                  mt-6

                  text-white/95

                  leading-8
                  lg:leading-10

                  text-[25px]
                  sm:text-[25px]
                  lg:text-[25px]
                "
              >
                With a focus on quality construction, transparent
                business practices, and customer satisfaction,
                we deliver projects that stand the test of time.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}