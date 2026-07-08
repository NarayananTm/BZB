import Image from "next/image";
import { Button } from "@/components";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen lg:min-h-[950px]">
      {/* Background */}
      <Image
        src="/images/hero/BZB hom baner.png"
        alt="Background"
        fill
        priority
        className="absolute inset-0 object-cover"
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 z-10 "
        // style={{
        //   background:
        //     "linear-gradient(90deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.45) 30%, rgba(0,0,0,.30) 55%, rgba(0,0,0,.5) 75%, rgba(0,0,0,0) 100%)",
        // }}
      />

      {/* Yellow Polygon */}
      <Image
        src="/images/hero/Yellow Polygon.png"
        alt=""
        width={1000}
        height={609}
        priority
        quality={100}
        className="
          absolute
          bottom-0
          right-0
          w-[220px]
          sm:w-[320px]
          md:w-[420px]
          lg:w-[558px]
          xl:w-[650px]
         
          h-auto
          z-20
          pointer-events-none
          select-none
        "
      />

      <div className="relative z-30 mx-auto flex min-h-screen max-w-[1500px] items-center px-5 sm:px-8 lg:px-12">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[48%_52%]">
          {/* Left */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <h1
              className="
                font-black
                leading-tight
                text-white
                text-[40px]
                sm:text-[52px]
                md:text-[58px]
                lg:text-[64px]
              "
            >
              Build Your
              <br />
              Future with
              <span className="text-[#F3C300]"> BZB</span>
            </h1>

            <h2
              className="
                mt-5
                font-semibold
                text-[#F3C300]
                text-[22px]
                sm:text-[26px]
                md:text-[30px]
                lg:text-[34px]
              "
            >
              Invest. Refer. Grow. Reward.
            </h2>

            <p
              className="
                mx-auto
                mt-6
                max-w-[560px]
                text-gray-300
                leading-8
                text-[16px]
                sm:text-[18px]
                lg:mx-0
                lg:text-[20px]
              "
            >
              Join BZB and become part of a community where real estate
              opportunities meet rewarding referrals. Explore trusted
              projects, grow your network, unlock exclusive rewards, and
              manage everything from one powerful platform.
            </p>

            <Button
              href="/member/dashboard"
              className="
                mt-8
                h-14
                w-full
                rounded-xl
                bg-[#BEA311]
                px-10
                text-lg
                font-semibold
                text-white
                hover:bg-primary-800
                sm:w-auto
              "
            >
              Get Started →
            </Button>
          </div>

          {/* Right */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <Image
              src="/images/hero/BZB Mobile App.png"
              alt="BZB Mobile App"
              width={420}
              height={760}
              priority
              quality={100}
              className="
                h-auto
                w-[220px]
                sm:w-[280px]
                md:w-[340px]
                lg:mr-20
                lg:mt-40
                lg:w-[420px]
                xl:mr-28
                xl:mt-52
                drop-shadow-[0_25px_50px_rgba(0,0,0,.45)]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
