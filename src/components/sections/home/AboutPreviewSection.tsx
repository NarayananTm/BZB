import Image from "next/image";
import { Button } from "@/components";

export default function AboutPreviewSection() {
  return (
    <section className="bg-gray-100 py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Content */}

          <div className="text-center lg:text-left">

            <p
              className="
                font-semibold
                text-dark-900

                text-[22px]
                sm:text-[24px]
                lg:text-[30px]
              "
            >
              About Us
            </p>

            <h2
              className="
                mt-3
                font-semibold
                leading-tight
                text-dark-400

                text-[34px]
                sm:text-[40px]
                md:text-[44px]
                lg:text-[50px]
              "
            >
              Building Trust.
              <br />
              Creating Opportunities.
            </h2>

            <p
              className="
                mt-6
                text-gray-700
                leading-8

                text-[17px]
                sm:text-[19px]
                lg:text-[22px]
              "
            >
              BZB is a trusted platform that combines Builders &
              Developers with a dynamic referral-based membership
              ecosystem.
            </p>

            <p
              className="
                mt-6
                text-gray-700
                leading-8

                text-[17px]
                sm:text-[19px]
                lg:text-[20px]
              "
            >
              Our goal is to make real estate opportunities more
              accessible while empowering members to grow through
              community participation and network expansion.
            </p>

            <Button
              href="/about"
              className="
                mt-10

                h-14
                sm:h-[58px]

                w-full
                sm:w-auto

                rounded-lg
                bg-primary-700
                px-10

                text-lg
                font-semibold
                text-white

                hover:bg-primary-800
              "
            >
              View More
            </Button>

          </div>

          {/* Right Logo */}

          <div className="flex justify-center">

            <Image
              src="/images/logo/MBD Log.svg"
              alt="MBD Logo"

              width={420}
              height={420}

              priority
              quality={100}

              className="
                h-auto

                w-[180px]
                sm:w-[240px]
                md:w-[300px]
                lg:w-[360px]
                xl:w-[420px]

                object-contain
              "
            />

          </div>

        </div>

      </div>
    </section>
  );
}