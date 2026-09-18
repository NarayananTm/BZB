"use client";

import Image from "next/image";

export default function HeroLayout() {
  return (
    <section className="relative mb-16 mt-20 overflow-hidden bg-[#161313] lg:min-h-[760px]">
      <Image
        src="/images/bzb/hero-bg.svg"
        alt="Background"
        fill
        priority
        className="absolute inset-0 object-cover object-center opacity-30"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-20 mx-auto max-w-[1600px]">
        <div className="px-5 pb-10 pt-8 sm:px-10 lg:hidden">
          <HeroTitle size="mobile" />
          <Image
            src="/images/bzb/house-outline.png"
            alt="Luxury House"
            width={760}
            height={760}
            priority
            quality={100}
            className="mx-auto mt-6 block w-[min(92vw,480px)] object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,.45)]"
          />
          <InfoCard mobile />
        </div>

        <div className="relative hidden min-h-[760px] lg:block">
          <div className="absolute left-[11%] top-[42%] z-30 -translate-y-1/2 animate-[fadeInLeft_1s_ease]">
            <HeroTitle size="desktop" />
          </div>
          <Image
            src="/images/bzb/house-outline.png"
            alt="Luxury House"
            width={760}
            height={760}
            priority
            quality={100}
            className="absolute right-[4%] top-[14%] w-[58%] max-w-[760px] object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,.45)] transition-transform duration-700 hover:scale-[1.03]"
          />
          <div className="absolute bottom-[11%] left-[40%] z-30 w-[35%] max-w-[480px] animate-[fadeInUp_1.4s_ease]">
            <InfoCard />
          </div>
        </div>
      </div>

    </section>
  );

function HeroTitle({ size }: { size: "mobile" | "desktop" }) {
  const titleSize = size === "mobile" ? "text-[32px] sm:text-[44px]" : "text-[48px] xl:text-[52px]";
  const accentSize = size === "mobile" ? "text-[34px] sm:text-[46px]" : "text-[50px] xl:text-[54px]";

  return (
    <h1 className="font-black leading-[0.95]">
      <span className={`block text-white ${titleSize}`}>Building</span>
      <span className={`block font-semibold text-[#F3C300] ${accentSize}`}>Tomorrow&apos;s</span>
      <span className={`block text-white ${titleSize}`}>Landmarks</span>
      <span className={`block font-semibold text-[#F3C300] ${accentSize}`}>Today</span>
    </h1>
  );
}

function InfoCard({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={`rounded-2xl border border-[#2D2D2D] bg-black/30 text-white backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.45)] ${
        mobile ? "mx-auto mt-5 w-[calc(100%-8px)] p-4" : "p-7"
      }`}
    >
      <p className="text-[14px] leading-5 sm:text-[16px]">
        Delivering premium residential and commercial developments with trust, quality, and innovation.
      </p>
      <p className="mt-3 text-[14px] leading-5 sm:text-[16px]">
        Every MBD project is designed with modern architecture, quality construction, and long-term value to create exceptional living and investment opportunities.
      </p>
    </div>
  );
}
}