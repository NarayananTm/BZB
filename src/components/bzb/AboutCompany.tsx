"use client";

import Image from "next/image";

export default function AboutCompany() {
  return (
    <section className="relative bg-white overflow-hidden pt-10 pb-10">

      <div className="max-w-[1500px] mx-auto px-8 lg:px-12">

        <div className="relative min-h-[760px]">

          {/* ================= LEFT ================= */}

          <div
            className="
              absolute
              left-0
              top-0
              w-full
              lg:w-[58%]
              h-full
            "
          >
            {/* Blueprint */}

            <Image
              src="/images/bzb/house-sketch.png"
              alt=""
              fill
              className="
                object-contain
                object-left-bottom
                opacity-1
                pointer-events-none
                select-none
              "
            />

            {/* Worker */}

            <Image
              src="/images/bzb/worker.png"
              alt="Worker"
              width={460}
              height={700}
              priority
              className="
                absolute
                bottom-0
                left-[150px]
                z-20
              "
            />
          </div>

          {/* ================= RIGHT GOLD CARD ================= */}

          <div
            className="
              absolute
              right-0
              top-[130px]
              z-30
              w-full
              lg:w-[520px]
            "
          >
            <div
              className="
                rounded-[34px]
                bg-[#B79C10]
                p-12
                shadow-[0_30px_60px_rgba(0,0,0,.18)]
              "
            >
              <h2
                className="
                  text-white
                  text-[40px]
                  font-bold
                "
              >
                About Our Company
              </h2>

              <p
                className="
                  mt-8
                  text-white/95
                  text-[20px]
                  leading-10
                "
              >
                BZB Builders & Developers is committed to creating
                thoughtfully designed residential communities and
                commercial developments that meet modern lifestyle
                needs.
              </p>

              <p
                className="
                  mt-8
                  text-white/95
                  text-[20px]
                  leading-10
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