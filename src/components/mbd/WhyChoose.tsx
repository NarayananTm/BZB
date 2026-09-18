"use client";

import Image from "next/image";
import { Check } from "lucide-react";

const reasons = [
  "Trusted Developers",
  "Premium Locations",
  "Legal Transparency",
  "Modern Architecture",
  "Customer-Centric Service",
  "Strong Investment Value",
];

export default function WhyChoose() {
  return (
    <section className="relative min-h-[321px] overflow-hidden bg-black sm:min-h-[420px] lg:min-h-0">

      <div className="max-w-[1600px] mx-auto">

        <div className="grid min-h-[321px] lg:min-h-[760px] lg:grid-cols-2">

          {/* ================= LEFT ================= */}

          <div className="relative flex items-start lg:items-center">

            <div className="mt-11 px-10 lg:mt-10">

              <h2
                className="
                  text-white
                  text-[25px]
                  sm:text-[35px]
                  lg:text-[50px]
                  2xl:text-[60px]
                  font-semibold
                  mb-8
                  lg:mb-7
                "
              >
                Why Choose MBD ?
              </h2>

              <div className="space-y-2 lg:space-y-2">

                {reasons.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1 lg:gap-6"
                  >
                    <div
                      className="
                        h-4
                        w-4
                        flex
                        items-center
                        justify-center
                        lg:h-12
                        lg:w-12
                        lg:rounded-full
                        lg:bg-white/5
                      "
                    >
                      <Check
                        size={16}
                        strokeWidth={3}
                        className="text-[#555] lg:text-[#D4AF11]"
                      />
                    </div>

                    <span
                      className="
                        text-white
                        text-[15px]
                        lg:text-[30px]
                        font-normal
                      "
                    >
                      {item}
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div className="relative hidden overflow-hidden lg:block">

            {/* Helmet Image */}

            <Image
              src="/images/bzb/helmet.svg"
              alt=""
              fill
              quality={100}
              priority
              className="
                object-cover
                object-center
              "
            />

            {/* Black Overlay */}

            <div className="absolute inset-0 bg-black/20" />

          </div>

        </div>

        <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[#D4AF11]" />
        <div className="absolute bottom-[7px] left-0 h-[2px] w-[76%] bg-[#D4AF11]" />
        <div className="absolute bottom-[12px] left-0 h-[2px] w-[72%] bg-[#D4AF11]" />

      </div>

    </section>
  );
}