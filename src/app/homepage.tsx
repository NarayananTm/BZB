import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components';
import ContactForm from '@/components/sections/ContactForm';

export const metadata: Metadata = {
  title: 'Home | BZB - Born to Win',
  description:
    'Build your future with BZB. Invest in real estate, grow your network through referrals, and unlock exclusive rewards.',
  keywords: [
    'real estate investment',
    'referral program',
    'property investment',
    'membership',
  ],
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}

      <section className="relative  overflow-hidden">

        {/* Background */}
        <Image
          src="/images/hero/BZB hom baner.png"
          alt="Background"
          fill
          priority
          className="absolute inset-0 object-cover z-0"
        />

        {/* Dark Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,.75) 0%, rgba(0,0,0,.65) 30%, rgba(0,0,0,.50) 55%, rgba(0,0,0,.25) 75%, rgba(0,0,0,0) 100%)",
          }}
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
      w-[558]
      h-auto
      z-20
      pointer-events-none
      select-none
    "
        />

        <div className="relative z-30 max-w-[1500px] mx-auto h-full">

          <div className="grid lg:grid-cols-[48%_52%] h-full">

            {/* LEFT CONTENT */}

            <div className="flex flex-col justify-center pl-16">

              <h1 className="text-white font-black leading-[1.05] text-[64px]">
                Build Your
                <br />
                Future with
                <span className="text-[#F3C300] text-[64px] "> BZB</span>
              </h1>

              <h2 className="mt-6 text-[#F3C300] text-[34px] font-semibold">
                Invest. Refer. Grow. Reward.
              </h2>

              <p className="mt-8 max-w-[500px] text-[20px] leading-9 text-gray-300">
                Join BZB and become part of a community where real estate
                opportunities meet rewarding referrals. Explore trusted
                projects, grow your network, unlock exclusive rewards,
                and manage everything from one powerful platform.
              </p>

              <Button
                href="/member/dashboard"
                className="
            mt-10
          bg-primary-700 text-white hover:bg-primary-800
            rounded-xl
            h-14
            px-10
            text-lg
            font-semibold
            w-[30%]
            
          "
              >
                Get Started →
              </Button>

            </div>

            {/* PHONE */}

            <div className="relative flex justify-end items-center">

              <Image
                src="/images/hero/BZB Mobile App.png"
                alt="Phone"
                quality={100}
                priority
                width={420}
                height={460}
                
                className="
            relative
            z-40
            mr-28
            mt-[300px]
            mb-[100px]
            
            drop-shadow-[0_25px_50px_rgba(0,0,0,.45)]
          "
              />

            </div>

          </div>

        </div>

      </section>

      {/* About BZB Section */}
      <section className="bg-white py-0 overflow-hidden">

        <div className="max-w-[1650px] mx-auto px-12">

          <div className="grid lg:grid-cols-[720px_1fr] gap-28 items-center">

            {/* LEFT */}

            <div className="relative">

              {/* Yellow Card */}

              <div className="relative w-[760px] h-[960px] bg-[#D8B300] overflow-hidden button-shadow-[0_25px_50px_rgba(0,0,0,.45)] rounded-b-[40px]" >

                {/* Background */}

                <Image
                  src="/images/hero/Rectangle232.svg"
                  alt=""
                  fill
                  className="object-cover absolute inset-0"
                  quality={100} 
                  priority
                />

                {/* Watermark */}

                <div className="absolute inset-0 flex justify-center pt-2  opacity-15">

                  <Image
                    src="/images/hero/Vector94.svg"
                    alt=""
                    width={660}
                    height={660}
                  />

                </div>

                {/* House */}

                <Image
                  src="/images/hero/MaskGroup.svg"
                  alt=""
                  width={660}
                  height={620}
                  className="
              absolute
              bottom-0
              left-1/2
              right-0
              -translate-x-1/2
              quality={100} 
              priority
            "
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="max-w-[760px] py-28">

              <p className="text-black text-[30px] font-semibold">
                About BZB
              </p>

              <h2 className="mt-7 text-[45px] font-bold leading-[1.05] text-[#707070]">
                Building Dreams.
                <br />
                Creating Opportunities.
              </h2>

              <p className="mt-12 text-[22px] leading-[1.9] text-[#666]">
                BZB is a modern Builders & Developers platform committed
                to delivering quality real estate projects while creating
                rewarding opportunities for our members.
              </p>

              <p className="mt-10 text-[22px] leading-[1.9] text-[#666]">
                Whether you&apos;re looking to own a property, invest in real
                estate, or earn through referrals, BZB provides a
                transparent and trusted ecosystem designed for long-term
                growth.
              </p>

              <p className="mt-10 text-[22px] leading-[1.9] text-[#666]">
                Our mission is to make property ownership and wealth
                creation accessible through innovation, integrity, and
                community.
              </p>

              <Button
                href="/bzb"
                className="
            mt-12
            h-[58px]
            px-10
            rounded-lg
            bg-primary-700
             text-white
             hover:bg-primary-800
            font-semibold
            text-[20px] 
          "
              >
                Get Started
              </Button>

            </div>

          </div>

        </div>

      </section>

      {/* Referral Program Section */}
      <section className="relative bg-dark-900 py-16 lg:py-24 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid2)" />
          </svg>
        </div>

        <div className="relative container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">


          {/* Left Content */}
          <div className="z-10">
            <p className="font-semibold text-[20px] text-primary-500 uppercase tracking-wider mb-2">
              Referral Program
              <br />
              <br />
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[40px] text-white leading-tight mb-4">
              Refer. Grow.<br />
              Earn Together.
            </h2>
            <p className="text-gray-400 text-[22px] leading-relaxed mb-6">
              <br />
              Invite your friends and family to join the BZB community.
              <br />
              <br />
              Every successful referral helps you progress through
              <br />
              referral levels, expand your network, and unlock exciting
              <br />
              rewards.
              <br />
              <br />
              The more your network grows, the greater your
              <br />
              opportunities become.
            </p>
            <Button
              size="lg"
              href="/referral"
              className="bg-primary-700 text-white hover:bg-primary-800"
            >
              Start Referring
            </Button>
          </div>
          {/*  Right iPhone with QR */}
          <div className="relative h-96 lg:h-full flex items-center justify-center">
            <Image
              src="/images/hero/Referral-Program-iPhone-14.png"
              alt="Referral Program QR Code"
              width={300}
              height={600}
              className="object-contain drop-shadow-2xl
              quality={100} 
              priority"
            />
          </div>
        </div>
      </section>

      {/* About Us Preview */}
      <section className="bg-gray-100 py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className=" text-[25px] font-bold text-dark-900 leading-tight mb-6">
              About Us
            </h2>
            <h3 className="text-[40px] font-bold text-dark-400 mb-6">
              Building Trust.<br />
              Creating Opportunities.
            </h3>
            <p className="text-gray-700  text-[22px] leading-relaxed mb-4">
              BZB is a trusted platform that combines Builders &
              <br />
              Developers with a dynamic referral-based membership
              <br />
              ecosystem.
            </p>
            <p className="text-gray-600 text-[20px] leading-relaxed mb-8">
              Our goal is to make real estate opportunities more
              <br />
              accessible while empowering members to grow through
              <br />
              community participation and network expansion.
            </p>
            <Button
              size="lg"
              href="/about"
              className="bg-primary-700 text-white hover:bg-primary-800"
            >
              <span className="flex items-center gap-2 text-white">
                View More
              </span>
            </Button>
          </div>

          {/* Right Icon/Image */}
          <div className="flex justify-center items-center h-96">
            <Image
              src="/images/logo/BZB Logo.png"
              alt="BZB Icon"
              width={300}
              height={300}
              quality={100} 
              priority
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-2xl">
          <h2 className=" text-[40px] font-bold text-dark-900 mb-12 text-center">
            Contact
          </h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
