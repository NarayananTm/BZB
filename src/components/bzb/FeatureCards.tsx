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
    <section className="relative z-30 -mt-12 sm:-mt-16 lg:-mt-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 lg:gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
              className="
                group

                rounded-[28px]
                border
                border-[#E9E9E9]

                bg-white

                px-6
                py-7

                sm:px-7
                sm:py-8

                lg:px-8
                lg:py-9

                shadow-[0_10px_30px_rgba(0,0,0,.08)]

                transition-all
                duration-500

                hover:-translate-y-3
                hover:shadow-[0_25px_50px_rgba(0,0,0,.12)]

                
                animate-[fadeInUp_.8s_ease_forwards]
                opacity-0
              "
            >
              {/* Icon */}
{/* Header */}

<div className="flex items-start gap-5">

  {/* Icon */}

  <div
    className="
      flex
      h-16
      w-16
      shrink-0
      items-center
      justify-center

      rounded-2xl

      border
      border-[#ECECEC]

      bg-white

      shadow-md

      transition-all
      duration-500

      group-hover:scale-110
      group-hover:rotate-6
    "
  >
    <Image
      src={item.icon}
      alt={item.title}
      width={32}
      height={32}
      priority
      quality={100}
      className="object-contain"
    />
  </div>

  {/* Title */}

  <h3
    className="
      whitespace-pre-line

      font-semibold

      leading-[1.15]

      text-[#111]

      text-[25px]
      lg:text-[25px]

      transition-colors
      duration-300

      group-hover:text-[#D8B300]
    "
  >
    {item.title}
  </h3>

</div>
              
              {/* Description */}

              <p
                className="
                  mt-5

                  text-[#666666]

                  leading-7

                  text-[16px]
                  sm:text-[17px]
                  lg:text-[18px]
                "
              >
                {item.description}
              </p>

              {/* Bottom Line Animation */}

              <div
                className="
                  mt-7

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
          ))}

        </div>

      </div>
    </section>
  );
}