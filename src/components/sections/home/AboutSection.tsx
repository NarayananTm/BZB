import Image from "next/image";
import { Button } from "@/components";

export default function AboutSection() {
  return (
    <section className="overflow-hidden bg-white py-12 lg:py-0">
      <div className="mx-auto max-w-[1650px] px-5 sm:px-8 lg:px-12">

        <div className="grid items-center gap-12 lg:grid-cols-[720px_1fr] lg:gap-28">

          {/* Left Card */}

          <div className="flex justify-center lg:block">

            <div
              className="
                relative
                overflow-hidden
                rounded-b-[40px]
                bg-[#D8B300]
                shadow-[0_25px_50px_rgba(0,0,0,.25)]

                w-full
                max-w-[760px]

                h-[420px]
                sm:h-[520px]
                md:h-[620px]
                lg:h-[960px]
              "
            >

              {/* House */}

              <Image
                src="/images/hero/MaskGroup.png"
                alt="House"
                width={660}
                height={620}
                priority
                quality={100}
                className="
                  absolute
                  bottom-0
                  left-1/2
                  -translate-x-1/2

                  w-[350px]
                  sm:w-[350px]
                  md:w-[620px]
                  lg:w-[960px]

                  h-auto
                "
              />

            </div>

          </div>

          {/* Right Content */}

          <div
            className="
              max-w-[760px]
              lg:py-15
              text-center
              lg:text-left
            "
          >

            <p
              className="
                font-semibold
                text-black
                text-[30px]
                sm:text-[26px]
                lg:text-[30px]
              "
            >
              About BZB
            </p>

            <h2
              className="
                mt-3
                font-semibold
                leading-tight
                text-[#707070]

                text-[50px]
                sm:text-[40px]
                lg:text-[50px]
              "
            >
              Building Dreams.
              <br />
              Creating Opportunities.
            </h2>

            <p
              className="
                mt-5
                leading-7
                text-[#666]

                text-[17px]
                sm:text-[19px]
                lg:text-[22px]
              "
            >
              BZB is a modern Builders & Developers platform committed
              to delivering quality real estate projects while creating
              rewarding opportunities for our members.
            </p>

            <p
              className="
                mt-5
                leading-7
                text-[#666]

                text-[17px]
                sm:text-[19px]
                lg:text-[22px]
              "
            >
              Whether you're looking to own a property, invest in real
              estate, or earn through referrals, BZB provides a
              transparent and trusted ecosystem designed for long-term
              growth.
            </p>

            <p
              className="
                mt-5
                leading-7
                text-[#666]

                text-[17px]
                sm:text-[19px]
                lg:text-[22px]
              "
            >
              Our mission is to make property ownership and wealth
              creation accessible through innovation, integrity, and
              community.
            </p>

            <Button
              href="/bzb"
              className="
                mt-10

                h-14
                sm:h-[58px]

                w-full
                sm:w-auto

                rounded-lg
                bg-[#BEA311]
                px-10

                text-lg
                sm:text-xl
                font-semibold
                text-white

                hover:bg-primary-800
              "
            >
              Get Started
            </Button>

          </div>

        </div>

      </div>
    </section>
  );
}