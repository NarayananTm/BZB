import type { Metadata } from 'next';

import { Button } from '@/components';

import Image from 'next/image';
export const metadata: Metadata = {
  title: 'About Us | BZB - Born to Win',
  description:
    'Learn about BZB company story, mission, and vision. Discover how we are transforming real estate and building communities.',
  keywords: ['about', 'company story', 'mission', 'vision', 'real estate company'],
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      {/* <Hero
        title={
          <span>
            Building <span className="gradient-text">Trust.</span>
            <br />
            Creating <span className="gradient-text">Opportunities.</span>
            <br />
            Transforming <span className="gradient-text">Communities.</span>
          </span>
        }
        description="Discover the story, mission, and vision behind BZB"
      /> */}

      <section className="relative bg-[#161414] overflow-hidden min-h-[760px]">

        {/* Background Pattern */}

        <Image
          src="/images/about/about-bg.png"
          alt=""
          fill
          className="object-cover opacity-20"
        />

        {/* Vertical Lines */}

        <div className="absolute inset-0 z-10">
          <div className="max-w-[1600px] mx-auto h-full flex justify-between opacity-10">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-px bg-white h-full"
              />
            ))}
          </div>
        </div>

        <div className="relative z-20 max-w-[1450px] mx-auto px-10 py-28">

          <div className="max-w-[900px] py-48">

            <h1 className="font-black leading-[1.15] text-[40px]">

              <span className="text-white">
                Building
              </span>

              <span className="text-[#E0BF18]">
                {" "}Trust.
              </span>

              <br />

              <span className="text-white">
                Creating
              </span>

              <span className="text-[#E0BF18]">
                {" "}Opportunities.
              </span>

              <br />

              <span className="text-white">
                Transforming
              </span>

              <span className="text-[#E0BF18]">
                {" "}Communities.
              </span>

            </h1>

          </div>

        </div>

      </section>

      {/* ========================= */}
      {/* WHO WE ARE */}
      {/* ========================= */}

      <section className="bg-white py-28">

        <div className="max-w-[1450px] mx-auto px-10">

          <div className="max-w-[1200px]">

            <h2 className="text-[40px] font-bold text-black mb-12">
              Who We Are
            </h2>

            <p className="text-[34px] leading-[1.8] text-[#666666]">

              BZB is a trusted platform that combines Builders &
              Developers with a dynamic referral-based membership
              ecosystem.

            </p>

            <p className="text-[34px] leading-[1.8] text-[#666666] mt-16">

              Our goal is to make real estate opportunities more
              accessible while empowering members to grow through
              community participation and network expansion.

            </p>

          </div>

        </div>

      </section>

      {/* ========================= */}
      {/* OUR STORY */}
      {/* ========================= */}

      <section className="bg-white pb-32">

        <div className="max-w-[1450px] mx-auto px-10">

          <div className="max-w-[1250px]">

            <h2 className="text-[40px] font-bold text-black mb-12">

              Our Story

            </h2>

            <p className="text-[34px] leading-[1.8] text-[#666666]">

              Founded with the vision of delivering high-quality
              developments and meaningful member experiences,
              BZB has grown into a platform where innovation,
              trust, and opportunity come together.

            </p>

            <p className="text-[34px] leading-[1.8] text-[#666666] mt-16">

              Every project we undertake reflects our commitment
              to excellence and customer satisfaction.

            </p>

          </div>

        </div>

      </section>

      {/* WHAT WE DO */}
      {/* ===================================== */}

      <section className="bg-[#F8F8F8] py-28">

        <div className="max-w-[1600px] mx-auto px-10">

          <h2 className="text-center text-[40px] font-bold text-black mb-20">
            What We Do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">

            {/* CARD 1 */}

            <div className="rounded-[30px] overflow-hidden bg-[#B89C12] shadow-xl hover:-translate-y-3 transition-all duration-300">

              <div className="h-[330px] relative">

                <Image
                  src="/images/about/helmet.png"
                  alt=""
                  fill
                  className="object-cover p-3 rounded-[30px]"
                />

              </div>

              <div className="p-10 h-[200px]">

                <h3 className="text-white text-[20px] font-bold leading-tight ">
                  Builders & Developers
                </h3>

                <p className="mt-3 text-white/90 text-[20px] leading-[1.6]">

                  Creating premium residential and commercial developments.

                </p>

              </div>

            </div>

            {/* CARD 2 */}

            <div className="rounded-[30px] overflow-hidden bg-[#B89C12] shadow-xl hover:-translate-y-3 transition-all duration-300">

              <div className="h-[330px] relative">

                <Image
                  src="/images/about/business-card.png"
                  alt=""
                  fill
                  className="object-cover p-3 rounded-[30px]"
                />

              </div>

              <div className="p-10 h-[200px]">

                <h3 className="text-white text-[20px] font-bold leading-tight">

                  Property Investment

                </h3>

                <p className="mt-3 text-white/90 text-[20px] leading-[1.6]">

                  Providing carefully selected investment opportunities.

                </p>

              </div>

            </div>

            {/* CARD 3 */}

            <div className="rounded-[30px] overflow-hidden bg-[#B89C12] shadow-xl hover:-translate-y-3 transition-all duration-300">

              <div className="h-[330px] relative">

                <Image
                  src="/images/about/mobile.png"
                  alt=""
                  fill
                  className="object-cover p-3 rounded-[30px]"
                />

              </div>

              <div className="p-10 h-[200px]">

                <h3 className="text-white text-[20px] font-bold leading-tight">

                  Referral Program

                </h3>

                <p className="mt-3 text-white/90 text-[20px] leading-[1.6]">

                  Helping members grow their network and unlock achievements.

                </p>

              </div>

            </div>

            {/* CARD 4 */}

            <div className="rounded-[30px] overflow-hidden bg-[#B89C12] shadow-xl hover:-translate-y-3 transition-all duration-300">

              <div className="h-[330px] relative">

                <Image
                  src="/images/about/app-icon.png"
                  alt=""
                  fill
                  className="object-cover p-3 rounded-[30px]"
                />

              </div>

              <div className="p-10 h-[200px]">

                <h3 className="text-white text-[20px] font-bold">

                  Member Services

                </h3>

                <p className="mt-3 text-white/90 text-[15px] leading-[1.6]">

                  Offering digital tools to manage referrals, payments and memberships.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ====================================== */}
      {/* VISION & MISSION */}
      {/* ====================================== */}

      <section className="bg-[#0F0F0F] py-24 overflow-hidden">

        <div className="max-w-[1600px] mx-auto px-10">

          <div className="grid lg:grid-cols-2 gap-24 items-center">

            {/* LEFT IMAGE */}

            <div className="relative flex justify-center">

              {/* Glow */}

              <div className="
          absolute
          w-[520px]
          h-[520px]
          rounded-full
          bg-[#E0BF18]
           bg-yellow-500/25
      blur-[120px]
          
          opacity-20
        " />

              <Image
                src="/images/about/vision.png"
                alt="Vision"
                width={700}
                height={900}
                className="
            relative
            z-10
            object-contain
          "
              />

            </div>

            {/* RIGHT CONTENT */}

            <div>

              {/* Vision */}

              <h2 className="
          text-[#D4AF11]
          text-[40px]
          font-bold
          mb-10
        ">
                Our Vision
              </h2>

              <p className="
          text-white/90
          text-[24px]
          leading-[1.8]
          mb-24
        ">
                To become a leading real estate and community-driven
                platform that empowers individuals through trusted
                property developments, innovative investment
                opportunities, and a rewarding referral ecosystem.

                We aspire to build lasting relationships where every
                member can achieve financial growth, create valuable
                connections, and contribute to a stronger, thriving
                community.
              </p>

              {/* Mission */}

              <h2 className="
          text-[#D4AF11]
          text-[40px]
          font-bold
          mb-10
        ">
                Our Mission
              </h2>

              <p className="
          text-white/90
          text-[24px]
          leading-[1.8]
        ">
                Our mission is to deliver high-quality, sustainable
                residential and commercial developments while creating
                a transparent and customer-focused experience.

                Through our innovative referral program, we aim to
                connect people, encourage community growth, and provide
                rewarding opportunities that enable members to expand
                their network, unlock achievements, and build a
                brighter future together.
              </p>

            </div>

          </div>

        </div>

      </section>
      {/* ===================================== */}
      {/* CONTACT US */}
      {/* ===================================== */}

      <section className="bg-[#F8F8F8] py-28">

        <div className="max-w-[1500px] mx-auto px-10">

          <div className="text-center mb-20">

            <p className="text-[#D4AF11] font-semibold tracking-[4px] uppercase">
              Get In Touch
            </p>

            <h2 className="mt-5 text-[40px] font-bold text-[#222]">
              Contact Us
            </h2>

            <p className="mt-6 text-[22px] text-gray-500 max-w-[750px] mx-auto leading-9">
              We'd love to hear from you. Fill in the form below and our
              team will get back to you as soon as possible.
            </p>

          </div>

          <div className="grid lg:grid-cols-1 gap-20">

            {/* LEFT */}


            {/* RIGHT */}

            <div className="bg-white rounded-[30px] shadow-xl p-12">

              <div className="grid md:grid-cols-2 gap-8">

                <input
                  type="text"
                  placeholder="First Name"
                  className="h-16 rounded-xl border border-gray-300 px-6 outline-none focus:border-[#D4AF11]"
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  className="h-16 rounded-xl border border-gray-300 px-6 outline-none focus:border-[#D4AF11]"
                />

              </div>

              <input
                type="email"
                placeholder="Email Address"
                className="mt-8 w-full h-16 rounded-xl border border-gray-300 px-6 outline-none focus:border-[#D4AF11]"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="mt-8 w-full h-16 rounded-xl border border-gray-300 px-6 outline-none focus:border-[#D4AF11]"
              />

              <textarea
                rows={6}
                placeholder="Your Message"
                className="mt-8 w-full rounded-xl border border-gray-300 p-6 outline-none focus:border-[#D4AF11]"
              />

              <Button
                className="
          mt-10
          bg-[#D4AF11]
          hover:bg-[#E7C41B]
          text-white
          rounded-xl
          h-16
          px-12
          font-semibold
          "
              >
                Send Message
              </Button>

            </div>

          </div>

        </div>

      </section>

    </>
  );
}
