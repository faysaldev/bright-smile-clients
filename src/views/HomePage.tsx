"use client";

import HeroSection from "@/src/components/home/HeroSection";
import TrustBar from "@/src/components/home/TrustBar";
import ServicesOverview from "@/src/components/home/ServicesOverview";
import ProcessSection from "@/src/components/home/ProcessSection";
import WhyChooseUs from "@/src/components/home/WhyChooseUs";
import DoctorIntro from "@/src/components/home/DoctorIntro";
import BeforeAfterGallery from "@/src/components/home/BeforeAfterGallery";
import Testimonials from "@/src/components/home/Testimonials";
import FAQSection from "@/src/components/home/FAQSection";
import BookingCTA from "@/src/components/home/BookingCTA";
import { useScrollReveal } from "@/src/hooks/useGsap";

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesOverview />
      <ProcessSection />
      <WhyChooseUs />
      <DoctorIntro />
      <BeforeAfterGallery />
      <Testimonials />
      <FAQSection />
      <BookingCTA />
    </>
  );
}
