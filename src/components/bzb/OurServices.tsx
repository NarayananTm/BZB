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
    <section className="bg-[#F8F8F8] py-24">

      <div className="max-w-[1600px] mx-auto px-10">

        {/* Heading */}

        <h2
          className="
            text-[44px]
            font-bold
            text-[#111]
            mb-16
          "
        >
          Our Services
        </h2>

        {/* Cards */}

        <div className="grid lg:grid-cols-3 gap-10">

          {services.map((service) => (
            <div
              key={service.title}
              className="
                bg-white
                rounded-[34px]
                overflow-hidden
                border
                border-[#D8D8D8]
                shadow-[0_12px_28px_rgba(0,0,0,.12)]
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >

              {/* Image */}

              <div className="relative h-[330px]">

                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />

              </div>

              {/* Content */}

              <div className="p-10">

                <h3
                  className="
                    text-[34px]
                    font-bold
                    text-[#111]
                  "
                >
                  {service.title}
                </h3>

                <p
                  className="
                    mt-6
                    text-[20px]
                    leading-9
                    text-[#666]
                  "
                >
                  {service.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}