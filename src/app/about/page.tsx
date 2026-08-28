import HeroSection from "@/components/about/HeroSection";
import WhoWeAre from "@/components/about/WhoWeAre";
import OurStory from "@/components/about/OurStory";
import WhatWeDo from "@/components/about/WhatWeDo";
import VisionMission from "@/components/about/VisionMission";
import ContactSection from "@/components/about/ContactSection";
import "@/styles/animations.css";
export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <WhoWeAre />
      <OurStory />
      <WhatWeDo />
      <VisionMission />
      <ContactSection />
    </>
  );
}