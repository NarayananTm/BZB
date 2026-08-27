"use client";

import Image from "next/image";

interface FeatureCardProps {
  icon: string;
  title: string;
  text: string;
  delay?: number;
}

export default function FeatureCard({
  icon,
  title,
  text,
  delay = 0,
}: FeatureCardProps) {
  return (
    <div
      style={{
        animationDelay: `${delay}ms`,
      }}
      className="
        group

        flex
        flex-col

        rounded-[28px]

        border
        border-[#E8E8E8]

        bg-white

        p-6
        sm:p-8
        lg:p-10

        shadow-[0_12px_30px_rgba(0,0,0,.08)]

        transition-all
        duration-500

        hover:-translate-y-3
        hover:shadow-[0_30px_60px_rgba(0,0,0,.15)]

        opacity-0
        animate-[fadeInUp_.8s_ease_forwards]
      "
    >
      {/* Icon */}

      <div
        className="
          flex

          h-16
          w-16

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
          src={icon}
          alt={title}
          width={34}
          height={34}
          priority
          quality={100}
          className="object-contain"
        />
      </div>

      {/* Title */}

      <h3
        className="
          mt-8

          text-[#222]

          font-semibold

          text-[25px]
          sm:text-[25px]
          lg:text-[25px]

          transition-colors
          duration-300

          group-hover:text-[#B5970C]
        "
      >
        {title}
      </h3>

      {/* Description */}

      <p
        className="
          mt-5

          flex-1

          text-[#666]

          leading-6

          text-[20px]
          sm:text-[20px]
          lg:text-[20px]
        "
      >
        {text}
      </p>

      {/* Bottom Line */}

      <div
        className="
          mt-8

          h-[3px]
          w-0

          rounded-full

          bg-[#B5970C]

          transition-all
          duration-500

          group-hover:w-20
        "
      />
    </div>
  );
}