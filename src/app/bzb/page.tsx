import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

import HeroLayout from '@/components/bzb/HeroLayout';
import ContactSection from '@/components/bzb/ContactSection';
import FAQSection from '@/components/bzb/FAQSection';
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
  const token = cookies().get('bzb_token')?.value;

  if (!token) {
    redirect('/login');
  }

  return (
    <>
      <HeroLayout />

      <section className="relative bg-white">
        <FeatureCards />
        <AboutCompany />
        <VisionMission />
      </section>

      <WhyChoose />
      <OurServices />
      <ContactSection />
      <FAQSection />
    </>
  );
}
