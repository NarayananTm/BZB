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
    <section className="relative bg-[#0E0E0E] overflow-hidden">

      <div className="max-w-[1600px] mx-auto">

        <div className="grid lg:grid-cols-2 min-h-[760px]">

          {/* ================= LEFT ================= */}

          <div className="relative flex items-center">

            <div className="px-20">

              <h2
                className="
                  text-white
                  text-[30px]
                  font-semibold
                  mb-24
                "
              >
                Why Choose BZB ?
              </h2>

              <div className="space-y-5">

                {reasons.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-6"
                  >
                    <div
                      className="
                        w-12
                        h-12
                        rounded-full
                        bg-white/5
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Check
                        size={24}
                        strokeWidth={3}
                        className="text-[#D4AF11]"
                      />
                    </div>

                    <span
                      className="
                        text-white
                        text-[30px]
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

          <div className="relative overflow-hidden">

            {/* Helmet Image */}

            <Image
              src="/images/bzb/helmet.png"
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

      </div>

    </section>
  );
}