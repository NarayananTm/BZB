"use client";

import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  delay?: number;
}

export default function ServiceCard({
  title,
  description,
  image,
  delay = 0,
}: ServiceCardProps) {
  return (
    <div
      style={{
        animationDelay: `${delay}ms`,
      }}
      className="
        group

        overflow-hidden

        rounded-[30px]

        bg-[#B89C12]

        shadow-[0_15px_40px_rgba(0,0,0,.12)]

        transition-all
        duration-500

        hover:-translate-y-3
        hover:shadow-[0_30px_60px_rgba(0,0,0,.18)]

        opacity-0

        animate-[bzbFadeUp_.8s_ease_forwards]
      "
    >

      {/* Image */}

      <div
        className="
          relative

          overflow-hidden

          h-[240px]
          sm:h-[280px]
          lg:h-[330px]
        "
      >

        <Image
          src={image}
          alt={title}
          fill
          priority
          quality={100}
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,25vw"
          className="
            object-cover

            p-3

            rounded-[30px]

            transition-transform
            duration-700

            group-hover:scale-105
          "
        />

      </div>

      {/* Content */}

      <div
        className="
          flex

          min-h-[180px]
          lg:min-h-[200px]

          flex-col

          justify-between

          p-7
          lg:p-9
        "
      >

        <div>

          <h3
            className="
              font-semibold

              text-white

              leading-tight

              text-[22px]
              lg:text-[20px]

              transition-colors
              duration-300
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-4

              leading-7

              text-white/90

              text-[16px]
              lg:text-[18px]
            "
          >
            {description}
          </p>

        </div>

        {/* Bottom Line */}

        <div
          className="
            mt-6

            h-[3px]

            w-0

            rounded-full

            bg-white

            transition-all
            duration-500

            group-hover:w-20
          "
        />

      </div>

    </div>
  );
}