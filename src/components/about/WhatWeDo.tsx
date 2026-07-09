"use client";

import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Builders & Developers",
    description:
      "Creating premium residential and commercial developments.",
    image: "/images/about/helmet.png",
  },
  {
    title: "Property Investment",
    description:
      "Providing carefully selected investment opportunities.",
    image: "/images/about/business-card.png",
  },
  {
    title: "Referral Program",
    description:
      "Helping members grow their network and unlock achievements.",
    image: "/images/about/mobile.png",
  },
  {
    title: "Member Services",
    description:
      "Offering digital tools to manage referrals, payments and memberships.",
    image: "/images/about/app-icon.png",
  },
];

export default function WhatWeDo() {
  return (
    <section
      className="
        overflow-hidden

        bg-[#F8F8F8]

        py-16
        sm:py-20
        lg:py-28
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

        {/* Heading */}

        <div
          className="
            mb-14
            lg:mb-20

            text-center

            animate-[bzbFadeUp_.8s_ease]
          "
        >

          <h2
            className="
              font-semibold

              text-black

              text-[30px]
              sm:text-[30px]
              lg:text-[30px]
            "
          >
            What We Do
          </h2>

        </div>

        {/* Cards */}

        <div
          className="
            grid

            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4

            gap-7
            lg:gap-10
          "
        >
            
             {services.map((service, index) => (

            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              image={service.image}
              delay={index * 150}
            />

          ))}

        </div>

      </div>

    </section>
  );
}