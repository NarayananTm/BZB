"use client";

import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: "/images/referral/share.png",
    title: "Easy to Share",
    text: "Share your personalized QR Code or referral link with anyone.",
  },
  {
    icon: "/images/referral/tracking.png",
    title: "Real-Time Tracking",
    text: "Monitor your referrals, team members, and progress directly from your dashboard.",
  },
  {
    icon: "/images/referral/levels.png",
    title: "Level-Based Growth",
    text: "Advance through multiple referral levels and unlock new achievements.",
  },
  {
    icon: "/images/referral/reward.png",
    title: "Exclusive Rewards",
    text: "Complete milestones to become eligible for exciting member rewards.",
  },
  {
    icon: "/images/referral/community.png",
    title: "Strong Community",
    text: "Grow together with thousands of members across the BZB network.",
  },
];

export default function WhyJoinSection() {
  return (
    <section className="bg-white py-16 lg:py-28 overflow-hidden">

      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

        {/* Heading */}

        <div className="mb-14 lg:mb-20">

          <h2
            className="
              text-[#222]

              font-bold

              text-[32px]
              sm:text-[38px]
              lg:text-[42px]

              animate-[fadeInLeft_1s_ease]
            "
          >
            Why Join Our Referral Program?
          </h2>

        </div>

        {/* Cards */}

        <div
          className="
            grid

            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3

            gap-7
          "
        >

          {features.map((feature, index) => (

            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              text={feature.text}
              delay={index * 150}
            />

          ))}

        </div>

      </div>

    </section>
  );
}