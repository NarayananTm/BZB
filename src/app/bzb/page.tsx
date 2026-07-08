import type { Metadata } from 'next';

import HeroLayout from "@/components/bzb/HeroLayout";
import ContactSection from "@/components/bzb/ContactSection";
import FAQSection from "@/components/bzb/FAQSection";
import OurServices from '@/components/bzb/OurServices';
import WhyChoose from '@/components/bzb/WhyChoose';
import VisionMission from '@/components/bzb/VisionMission';
import AboutCompany from '@/components/bzb/AboutCompany';
import FeatureCards from '@/components/bzb/FeatureCards';

export const metadata: Metadata = {
  title: 'About BZB | Born to Win',
  description:
    'Learn about BZB - a leading real estate platform combining Builders & Developers with a dynamic referral-based membership ecosystem.',
  keywords: ['real estate', 'builders', 'developers', 'property investment', 'about us'],
};

export default function BZBPage() {
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
