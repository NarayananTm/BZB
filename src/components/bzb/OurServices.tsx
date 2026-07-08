"use client";

import Image from "next/image";

const services = [
  {
    title: "Residential Projects",
    description:
      "Discover thoughtfully designed apartments, villas, gated communities, and premium homes built for modern families.",
    image: "/images/bzb/residential.png",
  },
  {
    title: "Commercial Developments",
    description:
      "Innovative office spaces, retail complexes, and commercial properties designed to support business growth.",
    image: "/images/bzb/commercial.png",
  },
  {
    title: "Land Development",
    description:
      "Professionally planned residential layouts and plotted developments with legal approvals and infrastructure.",
    image: "/images/bzb/land.png",
  },
];

export default function OurServices() {
  return (
    <section className="bg-[#F8F8F8] py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">

        {/* Heading */}

        <div className="mb-10 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111] animate-[fadeInLeft_.8s_ease]">
            Our Services
          </h2>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 sm:gap-6 lg:gap-8">

          {services.map((service, index) => (
            <div
              key={service.title}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
              className="
                group
                flex
                flex-col

                overflow-hidden

                rounded-[32px]

                border
                border-[#E6E6E6]

                bg-white

                shadow-[0_12px_30px_rgba(0,0,0,.08)]

                transition-all
                duration-500

                hover:-translate-y-2
                hover:shadow-[0_24px_50px_rgba(0,0,0,.12)]

                opacity-0
                animate-[fadeInUp_.8s_ease_forwards]
              "
            >

              {/* Image */}

              <div className="relative w-full aspect-[16/10] overflow-hidden">

                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority
                  quality={100}
                  sizes="(max-width:768px)100vw,(max-width:1280px)50vw,33vw"
                  className="
                    object-cover
                    object-center

                    transition-transform
                    duration-700

                    group-hover:scale-105
                  "
                />

              </div>

              {/* Content */}

              <div className="flex flex-1 flex-col p-6 lg:p-8">

                <h3
                  className="
                    text-[25px]
                    lg:text-[25px]

                    font-semibold

                    leading-tight

                    text-[#111]

                    transition-colors
                    duration-300

                    group-hover:text-[#D8B300]
                  "
                >
                  {service.title}
                </h3>

                <p
                  className="
                    mt-5

                    flex-1

                    text-[17px]
                    lg:text-[18px]

                    leading-8

                    text-[#666666]
                  "
                >
                  {service.description}
                </p>

                <div
                  className="
                    mt-8

                    h-[3px]
                    w-0

                    rounded-full

                    bg-[#D8B300]

                    transition-all
                    duration-500

                    group-hover:w-20
                  "
                />

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}