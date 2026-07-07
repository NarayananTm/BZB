"use client";

import Image from "next/image";

const features = [
  {
    title: "Quality\nConstruction",
    description:
      "Built with premium materials and high engineering standards for durability and safety.",
    icon: "/images/bzb/quality.png",
  },
  {
    title: "On-Time\nProject Delivery",
    description:
      "Commitment to completing projects within the promised timeline.",
    icon: "/images/bzb/delivery.png",
  },
  {
    title: "Transparent\nProcess",
    description:
      "Clear pricing, legal compliance, and regular project updates for customers.",
    icon: "/images/bzb/process.png",
  },
  {
    title: "Innovative Design\n& Planning",
    description:
      "Modern, functional, and sustainable design that maximize comfort and value.",
    icon: "/images/bzb/design.png",
  },
];

export default function FeatureCards() {
  return (
    <div className="relative z-30 -mt-28 ">

      <div className="max-w-[1500px] mx-auto px-6 ">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-[28px]
                border
                border-[#E9E9E9]
                shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                px-8
                py-9
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]
              "
            >
              {/* Icon */}

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-white
                  border
                  border-[#ECECEC]
                  flex
                  items-center
                  justify-center
                  shadow-md
                "
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={28}
                  height={28}
                />
              </div>

              {/* Title */}

              <h3
                className="
                  mt-6
                  whitespace-pre-line
                  text-[34px]
                  leading-[1.2]
                  font-bold
                  text-[#111]
                "
              >
                {item.title}
              </h3>

              {/* Description */}

              <p
                className="
                  mt-6
                  text-[18px]
                  leading-8
                  text-[#666666]
                "
              >
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}