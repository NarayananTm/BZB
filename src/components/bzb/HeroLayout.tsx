"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#161313]">

      {/* ========================= */}
      {/* BACKGROUND */}
      {/* ========================= */}
      {/* 
      <Image
        src="/images/bzb/hero-bg.png"
        alt="Background"
        fill
        priority
        className="object-cover object-center opacity-30"
      /> */}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Vertical Grid Lines */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1600px] mx-auto h-full flex justify-between opacity-10">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="w-px h-full bg-white"
            />
          ))}
        </div>
      </div>

      {/* ========================= */}
      {/* CONTENT */}
      {/* ========================= */}

      <div className="relative z-30 max-w-[1600px] mx-auto px-8 lg:px-14">

        <div className="grid lg:grid-cols-[48%_52%] items-center min-h-screen">

          {/* ========================= */}
          {/* LEFT */}
          {/* ========================= */}

          <div className="pt-0 lg:pt-0">

            <h1 className="font-black leading-[0.95]">

              <span className="block text-white text-[20px] md:text-[30px] xl:text-[40px]">
                Building
              </span>

              <span className="block text-[#F3C300] text-[20px] md:text-[30px] xl:text-[40px]">
                Tomorrow's
              </span>

              <span className="block text-white text-[20px] md:text-[30px] xl:text-[40px]">
                Landmarks
              </span>

              <span className="block text-[#F3C300] text-[20px] md:text-[30px] xl:text-[40px]">
                Today
              </span>

            </h1>

          </div>

          {/* ========================= */}
          {/* RIGHT SIDE */}
          {/* ========================= */}

          <div className="relative hidden lg:flex items-center justify-center h-[900px]">

            {/* Gold Wireframe House */}

            {/* <Image
              src="/images/bzb/house-outline.png"
              alt="House Outline"
              width={620}
              height={620}
              priority
              className="
      absolute
      top-[40px]
      right-[20px]
      z-10
      opacity-90
      pointer-events-none
      select-none
    "
            /> */}

            {/* Main House */}

            <Image
              src="/images/bzb/house-outline.png"
              alt="Luxury House"
              width={760}
              height={760}
              priority
              className="
      absolute
      bottom-[120px]
      right-[450px]
      z-20
      object-contain
      drop-shadow-[0_30px_80px_rgba(0,0,0,0.45)]
    "
            />

            {/* Floating Information Card */}

            <div
              className="
      absolute
      left-[300px]
      
      bottom-[120px]
      w-[450px]
      rounded-2xl
     
      backdrop-blur-md
      border
      border-[#2D2D2D]
      p-8
      z-30
      shadow-[0_20px_60px_rgba(0,0,0,0.45)]
    "
            >
              {/* <div className="w-16 h-1 bg-[#D4AF11] rounded-full mt-4 mb-6" /> */}

              <p className=" leading-8 text-white  text-[16px]">
               Delivering premium residential and
commercial developments with trust,
quality, and innovation.
              </p>
              <br/>
              <p className="text-white leading-8 text-[16px]">
                Every BZB project is designed with modern architecture,
                quality construction, and long-term value to create
                exceptional living and investment opportunities.
              </p>

            
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}