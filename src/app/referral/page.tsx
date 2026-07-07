"use client";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from '@/components';
import Image from 'next/image';
import { useState } from "react";




export default function ReferralPage() {
   const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <>
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-[#171515]">

        {/* Background Lines */}

        <Image
          src="/images/referral/Layer1.png"
          alt=""
          fill
          className="object-cover opacity-40 pointer-events-none"
        />

        <div className="max-w-[1500px] mx-auto px-8 lg:px-14 py-28">

          <div className="grid lg:grid-cols-[48%_52%] items-center">

            {/* LEFT */}

            <div className="relative">

              {/* Side Icons */}

              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 hidden lg:flex flex-col gap-6">

                <div className="w-16 h-16 rounded-full border border-[#F2C200] flex items-center justify-center backdrop-blur-sm bg-black/30">

                  <Image
                    src="/images/referral/Icon1.png"
                    width={28}
                    height={28}
                    alt=""
                  />

                </div>

                <div className="w-16 h-16 rounded-full border border-[#F2C200] flex items-center justify-center backdrop-blur-sm bg-black/30">

                  <Image
                    src="/images/referral/Icon2.png"
                    width={28}
                    height={28}
                    alt=""
                  />

                </div>

                <div className="w-16 h-16 rounded-full border border-[#F2C200] flex items-center justify-center backdrop-blur-sm bg-black/30">

                  <Image
                    src="/images/referral/Icon3.png"
                    width={28}
                    height={28}
                    alt=""
                  />

                </div>

              </div>

              {/* QR */}

              <Image
                src="/images/referral/Referral Program QR Code.png"
                alt=""
                width={520}
                height={720}
                priority
                className="
          mx-auto
          drop-shadow-[0_25px_60px_rgba(0,0,0,.45)]
          "
              />

            </div>

            {/* RIGHT */}

            <div className="pl-10">

              <h1 className="text-white font-black leading-tight text-[40px]">

                Refer Friends.
                <br />

                Build Your Network.
                <br />

                Unlock Rewards.

              </h1>

              <p className="mt-10 text-[21px] leading-10 text-gray-300 max-w-[650px]">

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
          mt-12
          bg-[#D5AF09]
          hover:bg-[#F2C200]
          rounded-lg
          h-14
          px-10
          text-white
          font-semibold
          "
              >

                Start Referring

                <ArrowRight className="ml-2 w-5 h-5" />

              </Button>

            </div>

          </div>

        </div>

      </section>
      {/* ==========================================
    HOW REFERRAL WORKS
========================================== */}

      <section className="bg-white overflow-hidden">

        <div className="max-w-[1500px] mx-auto px-10 py-28">

          <h2 className="text-[42px] font-bold text-[#222] mb-20">
            How the Referral Program Works
          </h2>

          <div className="grid lg:grid-cols-[45%_55%] items-center gap-16">

            {/* LEFT */}

            <div className="relative">

              {/* Background Logo */}

              <Image
                src="/images/referral/BZB Watermark.png"
                alt=""
                width={500}
                height={500}
                className="
          absolute
          left-[20%]
          right-[80%]
          top-[-200px]
           opacity-1
          "
              />

              {/* Phone */}

              <Image
                src="/images/referral/Referral-Phone.png"
                alt=""
                width={430}
                height={820}
                className="
          relative
          z-20
           left-[10%]
          right-[90%]
          mx-auto
          -rotate-[15deg]
          drop-shadow-[0_30px_50px_rgba(0,0,0,.25)]
          "
              />

            </div>

            {/* RIGHT */}

            <div className="relative">

              {/* Vertical Line */}

              <div className="absolute left-[18px] top-4 bottom-4 w-[2px] border-l-2 border-dotted border-[#B8A26A]" />

              {/* STEP */}

              {[
                {
                  title: "Become a Member",
                  text: "Register as a BZB member and activate your membership to receive your unique Referral ID and QR Code.",
                },
                {
                  title: "Share Your Referral",
                  text: "Share your referral link or QR Code through WhatsApp, Facebook, Instagram, Email, or any social platform.",
                },
                {
                  title: "Grow Your Team",
                  text: "Every successful registration through your referral becomes part of your growing network.",
                },
                {
                  title: "Complete Referral Levels",
                  text: "Achieve referral milestones to unlock higher levels and exciting rewards.",
                },
                {
                  title: "Earn Recognition",
                  text: "As your team grows, your referral achievements grow too, opening doors to exclusive benefits and future opportunities.",
                },
              ].map((item, index) => (

                <div
                  key={index}
                  className="flex gap-3  mb-6 relative"
                >

                  {/* Circle */}

                  <div
                    className={`
              w-9
              h-9
              rounded-full
              flex-shrink-0
              border-4
              border-white
              shadow-md
              ${index === 4
                        ? "bg-[#FFE27B]"
                        : index === 3
                          ? "bg-[#FFD23F]"
                          : index === 2
                            ? "bg-[#F2C200]"
                            : index === 1
                              ? "bg-[#D5AF09]"
                              : "bg-[#B88C00]"
                      }
              `}
                  />

                  <div>

                    <h3 className="text-[28px] font-bold text-[#222]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[18px] text-gray-500 leading-9 max-w-[560px]">
                      {item.text}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>
      {/* ==========================================
    REFERRAL LEVELS
========================================== */}

      <section className="relative overflow-hidden bg-[#B5970C]">

        {/* Background Shape */}

        <Image
          src="/images/referral/Level Shape.png"
          alt=""
          width={700}
          height={500}
          className="
    absolute
    right-0
    bottom-0
    opacity-20
    "
        />

        <div className="max-w-[1500px] mx-auto px-10 py-20 relative z-10">

          <p className="text-white text-xl font-semibold">
            Referral Levels
          </p>

          <h2 className="text-white text-[58px] font-bold mt-4">
            Grow Step by Step
          </h2>

          <ul className="mt-10 space-y-5 text-[24px] text-white">

            <li>
              • Your referral journey is divided into multiple achievement levels.
            </li>

            <li>
              • Each completed level unlocks new opportunities and moves you closer to premium member benefits.
            </li>

            <li>
              • Progress is displayed in real time inside your member dashboard.
            </li>

          </ul>

        </div>

      </section>


      {/* ================= WHY JOIN ================= */}

      <section className="bg-white py-28">

        <div className="max-w-[1500px] mx-auto px-10">

          <h2 className="text-[42px] font-bold text-[#222] mb-20">
            Why Join Our Referral Program?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

            {[
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
            ].map((item, index) => (

              <div
                key={index}
                className="
          border
          border-gray-200
          p-10
          min-h-[250px]
          hover:shadow-xl
          transition
          "
              >

                <div className="w-16 h-16 rounded-xl shadow bg-white flex items-center justify-center">

                  <Image
                    src={item.icon}
                    alt=""
                    width={34}
                    height={34}
                  />

                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-500 leading-8">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= FAQ ================= */}

      <section className="bg-[#F7F7F7] py-28">

        <div className="max-w-[1300px] mx-auto px-10">

          <h2 className="text-[42px] font-bold  text-[#222] mb-16">
            Frequently Asked Questions
          </h2>

          {[
            {
              q: "Is joining the referral program free?",
              a: "The referral program is available for registered BZB members.",
            },
            {
              q: "How do I share my referral?",
              a: "Use your QR Code or referral link from the dashboard.",
            },
            {
              q: "Can I track my referrals?",
              a: "Yes. Everything is available inside your dashboard.",
            },
            {
              q: "When do I receive rewards?",
              a: "Rewards are unlocked after completing each referral level.",
            },
          ].map((faq, index) => (

            <div
              key={index}
              className="bg-white rounded-lg shadow mb-5 overflow-hidden"
            >

              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex justify-between items-center px-8 py-7"
              >

                <span className="font-semibold  text-[#222] text-xl">
                  {faq.q}
                </span>

                {openFaq === index ? (
                  <ChevronDown size={28} />
                ) : (
                  <ChevronRight size={28} />
                )}

              </button>

              {openFaq === index && (

                <div className="px-8 pb-7 text-gray-500">
                  {faq.a}
                </div>

              )}

            </div>

          ))}

        </div>

      </section>

    </>
  );
}
