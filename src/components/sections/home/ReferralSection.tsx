import Image from "next/image";
import { Button } from "@/components";

export default function ReferralSection() {
  return (
    <section className="relative overflow-hidden bg-dark-900 py-16 lg:py-24">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        {/* <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid2"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M40 0L0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid2)" />
        </svg> */}
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Content */}

          <div className="order-2 text-center lg:order-1 lg:text-left">

            <p
              className="
                mb-5
                font-semibold
                uppercase
                tracking-widest
                text-primary-500

                text-[18px]
                lg:text-[30px]
              "
            >
              Referral Program
            </p>

            <h2
              className="
                font-semibold
                leading-tight
                text-white

                text-[34px]
                sm:text-[42px]
                lg:text-[50px]
              "
            >
              Refer. Grow.
              <br />
              Earn Together.
            </h2>

            <p
              className="
                mt-8
                leading-7
                text-gray-400

                text-[17px]
                sm:text-[19px]
                lg:text-[22px]
              "
            >
              Invite your friends and family to join the BZB community.

              <br />
              <br />

              Every successful referral helps you progress through
              referral levels, expand your network, and unlock exciting
              rewards.

              <br />
              <br />

              The more your network grows, the greater your
              opportunities become.
            </p>

            <Button
              href="/referral"
              className="
                mt-10

                w-full
                sm:w-auto

                h-14
                rounded-lg

                bg-[#BEA311]
                px-10

                text-lg
                font-semibold
                text-white

                hover:bg-primary-800
              "
            >
              Start Referring
            </Button>

          </div>

          {/* Right Mobile */}

          <div className="order-1 flex justify-center lg:order-2">

            <Image
              src="/images/hero/Referral-Program-iPhone-14.png"
              alt="Referral Program"

              width={420}
              height={640}

              priority
              quality={100}

              className="
                h-auto

                w-[440px]
                sm:w-[360px]
                md:w-[400px]
                lg:w-[540px]
                xl:w-[750px]

                drop-shadow-[0_25px_50px_rgba(0,0,0,.45)]
              "
            />

          </div>

        </div>

      </div>
    </section>
  );
}