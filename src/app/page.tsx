import type { Metadata } from "next";

import HeroSection from "@/components/sections/home/HeroSection";
import AboutSection from "@/components/sections/home/AboutSection";
import ReferralSection from "@/components/sections/home/ReferralSection";
import AboutPreviewSection from "@/components/sections/home/AboutPreviewSection";
import ContactSection from "@/components/sections/home/ContactSection";
import '@/styles/home-animations.css';

export const metadata: Metadata = {
  title: "Home | BZB - Born to Win",
  description:
    "Build your future with BZB. Invest in real estate, grow your network through referrals, and unlock exclusive rewards.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ReferralSection />
      <AboutPreviewSection />
      <ContactSection />
    </>
  );
}