"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components";


export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#171515] min-h-screen flex items-center">

      {/* Background */}

      <Image
        src="/images/referral/referral-bg.svg"
        alt=""
        fill
        priority
        quality={100}
        className="object-cover opacity-40 pointer-events-none"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/10" />

      {/* Container */}

      <div className="relative z-20 mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-14 py-16 lg:py-24">

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[48%_52%]
            items-center
            gap-4
          "
        >

          {/* ================= LEFT ================= */}

          <div
            className="
              relative
              order-2
              lg:order-1

              flex
              justify-center

              animate-[fadeInLeft_1s_ease]
            "
          >

            {/* Side Icons */}

            <div
              className="
                absolute

                left-0

                top-1/2

                -translate-y-1/2

                hidden
                xl:flex

                flex-col
                gap-6
              "
            >

              {[
                "/images/referral/Icon1.png",
                "/images/referral/Icon2.png",
                "/images/referral/Icon3.png",
              ].map((icon, index) => (

                <div
                  key={index}
                  className="
                    w-16
                    h-16

                    rounded-full

                    border
                    border-[#F2C200]

                    bg-black/30

                    backdrop-blur-sm

                    flex
                    items-center
                    justify-center

                    shadow-lg

                    transition-all
                    duration-500

                    hover:scale-110
                    hover:bg-[#F2C200]
                  "
                >

                  <Image
                    src={icon}
                    alt=""
                    width={28}
                    height={28}
                    priority
                    quality={100}
                  />

                </div>

              ))}c

            </div>

                       <Image
              src="/images/referral/Referral Program QR Code.png"
              alt="Referral QR Code"
              width={520}
              height={720}
              priority
              quality={100}
              className="
                w-[240px]
                sm:w-[320px]
                md:w-[420px]
                lg:w-[480px]
                xl:w-[520px]

                h-auto

                mx-auto

                drop-shadow-[0_25px_60px_rgba(0,0,0,.45)]

                animate-[bzbFloat_6s_ease-in-out_infinite]

                transition-all
                duration-700

                hover:scale-105
              "
            />

          </div>

          {/* ================= RIGHT ================= */}

          <div
            className="
              order-1
              lg:order-2

              text-center
              lg:text-left

              lg:pl-6

              animate-[fadeInRight_1s_ease]
            "
          >

            <h1
              className="
                text-white

                font-medium

                leading-[1.1]

                text-[34px]
                sm:text-[42px]
                md:text-[48px]
                lg:text-[54px]
              "
            >
              Refer Friends.
              <br />

              Build Your Network.
              <br />

              Unlock Rewards.
            </h1>

            <p
              className="
                mt-8

                mx-auto
                lg:mx-0

                max-w-[650px]

                text-gray-300

                text-[20px]
                sm:text-[24px]
                lg:text-[24px]

                leading-7
                lg:leading-8
              "
            >
              At BZB, every referral is an opportunity to grow.

              Invite your friends, family and professional contacts
              to join the BZB community.

              As your network expands, you'll progress through referral
              levels and become eligible for exclusive rewards,
              recognition and exciting opportunities.
            </p>

            <Button
              href="/member/dashboard"
              className="
                mt-10

                h-14

                px-10

                rounded-lg

                bg-[#BEA311]

                text-white

                font-semibold

                transition-all
                duration-500

                hover:bg-primary-800
                hover:scale-105
              "
            >

              Start Referring

              <ArrowRight className="ml-2 h-5 w-5" />

            </Button>

          </div>
                  

        </div>

      </div>

    </section>
  );
}