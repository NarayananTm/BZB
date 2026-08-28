import type { Metadata } from 'next';
// import { ArrowRight, Target, Heart, Zap, Building2, Award, Check } from 'lucide-react';
// import Hero from '@/components/sections/Hero';
// import { Button, FeatureCard, FAQ } from '@/components';
// import Section from '@/layouts/Section';
// import Container from '@/layouts/Container';
// import Link from 'next/link';
// import Image from 'next/image';

import HeroLayout from "@/components/bzb/HeroLayout";
import ContactSection from "@/components/bzb/ContactSection";
import FAQSection from "@/components/bzb/FAQSection";
import OurServices from '@/components/bzb/OurServices';
import WhyChoose from '@/components/bzb/WhyChoose';
import VisionMission from '@/components/bzb/VisionMission';
import AboutCompany from '@/components/bzb/AboutCompany';
import FeatureCards from '@/components/bzb/FeatureCards';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'About BZB | Born to Win',
  description:
    'Learn about BZB - a leading real estate platform combining Builders & Developers with a dynamic referral-based membership ecosystem.',
  keywords: ['real estate', 'builders', 'developers', 'property investment', 'about us'],
};

// const features = [
//   {
//     title: "Quality\nConstruction",
//     description:
//       "Built with premium materials and high engineering standards for durability and safety.",
//     icon: "/images/bzb/quality.png",
//   },
//   {
//     title: "On-Time\nProject Delivery",
//     description:
//       "Commitment to completing projects within the promised timeline.",
//     icon: "/images/bzb/delivery.png",
//   },
//   {
//     title: "Transparent\nProcess",
//     description:
//       "Clear pricing, legal compliance, and regular project updates for customers.",
//     icon: "/images/bzb/process.png",
//   },
//   {
//     title: "Innovative Design\n& Planning",
//     description:
//       "Modern, functional, and sustainable design that maximize comfort and value.",
//     icon: "/images/bzb/design.png",
//   },
// ];

// const faqItems = [
//   {
//     question: 'What is BZB?',
//     answer:
//       'BZB is a modern Builders & Developers platform committed to delivering quality real estate projects while creating rewarding opportunities for our members through our innovative referral program.',
//   },
//   {
//     question: 'How long has BZB been operating?',
//     answer:
//       'BZB has grown from a vision of delivering high-quality developments and meaningful member experiences into a trusted platform where innovation, trust, and opportunity come together.',
//   },
//   {
//     question: 'What makes BZB different?',
//     answer:
//       'We combine premium real estate developments with a dynamic referral-based membership ecosystem, creating multiple value streams for our members while maintaining transparency and trust.',
//   },
//   {
//     question: 'How can I invest with BZB?',
//     answer:
//       'You can become a member and access our curated property investment opportunities. As your network grows through our referral program, you unlock additional benefits and rewards.',
//   },
//   {
//     question: 'Is BZB available in my city?',
//     answer:
//       'BZB operates across multiple locations. Contact our team to learn about availability in your area and current projects near you.',
//   },
// ];

// const services = [
//   {
//     title: "Residential Projects",
//     description:
//       "Discover thoughtfully designed apartments, villas, gated communities, and premium homes built for modern families.",
//     image: "/images/bzb/residential.png",
//   },
//   {
//     title: "Commercial Developments",
//     description:
//       "Innovative office spaces, retail complexes, and commercial properties designed to support business growth.",
//     image: "/images/bzb/commercial.png",
//   },
//   {
//     title: "Land Development",
//     description:
//       "Professionally planned residential layouts and plotted developments with legal approvals and infrastructure.",
//     image: "/images/bzb/land.png",
//   },
// ];


// const reasons = [
//   "Trusted Developers",
//   "Premium Locations",
//   "Legal Transparency",
//   "Modern Architecture",
//   "Customer-Centric Service",
//   "Strong Investment Value",
// ];


export default function BZBPage() {

  const token = cookies().get('bzb_token')?.value;

  if (!token) {
    redirect('/login');
  }
  return (
    <>


<HeroLayout />

<section className="relative bg-white">

  {/* Floating Cards */}

  <FeatureCards />

  {/* About Company */}

  <AboutCompany />

  {/* Vision Mission */}

  <VisionMission />

</section>

<WhyChoose />

<OurServices />
<ContactSection />

    

    <FAQSection />
    </>
  );
}
