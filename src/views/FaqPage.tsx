"use client";

import FAQSection from "@/src/components/home/FAQSection";
import BookingCTA from "@/src/components/home/BookingCTA";
import { useScrollReveal } from "@/src/hooks/useGsap";

export default function FaqPage() {
  useScrollReveal();

  return (
    <div className="pb-16 pt-8">
      <section className="section-padding bg-gradient-to-b from-secondary/50 to-background">
        <div className="container-narrow text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Help Center
          </span>
          <h1 className="text-4xl sm:text-6xl font-heading font-bold mt-2 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Find quick answers to common questions about our dental services,
            insurance, and procedures.
          </p>
        </div>
      </section>
      <FAQSection />
      <BookingCTA />
    </div>
  );
}
