"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Sparkles,
  Smile,
  Shield,
  Scissors,
  Heart,
  Zap,
  Check,
  ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { gsap, ScrollTrigger } from "@/src/hooks/useGsap";
import { useGetAllServicesQuery } from "@/src/redux/features/services/servicesApi";
import { getIcon } from "@/src/utils/iconMap";

const insuranceProviders = [
  {
    q: "Delta Dental",
    a: "We accept all Delta Dental PPO and Premier plans. Most preventive services are covered at 100%.",
  },
  {
    q: "Cigna Dental",
    a: "Full acceptance of Cigna DPPO plans with in-network benefits. Major procedures covered at 50-80%.",
  },
  {
    q: "Aetna Dental",
    a: "In-network provider for Aetna DMO and PPO plans. Preventive care fully covered.",
  },
  {
    q: "MetLife Dental",
    a: "We accept MetLife PDP and PDP Plus plans with competitive in-network rates.",
  },
  {
    q: "United Healthcare",
    a: "Full acceptance of UHC dental PPO plans. Contact us for specific coverage details.",
  },
];

const ServiceDescription = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = text.split(" ");
  const isLong = words.length > 25;
  const displayText = isExpanded ? text : words.slice(0, 25).join(" ") + (isLong ? "..." : "");

  return (
    <div className="mb-6">
      <p className="text-muted-foreground text-sm leading-relaxed transition-all duration-300">
        {displayText}
      </p>
      {isLong && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }}
          className="text-primary text-xs font-bold mt-2 hover:underline focus:outline-none"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

const Services = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { data: servicesData, isLoading } = useGetAllServicesQuery(undefined);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!gridRef.current || isLoading) return;
    gsap.fromTo(
      gridRef.current.querySelectorAll(".service-card"),
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      },
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [isLoading]);

  if (isLoading) {
    return (
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4 mx-auto" />
            <div className="h-12 bg-muted rounded w-1/2 mx-auto" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-muted rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="pb-16 pt-8">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-b from-secondary/50 to-background">
          <div ref={heroRef} className="container-narrow text-center">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-6xl font-heading font-bold mt-2 mb-4">
              Dental Services & Pricing
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Comprehensive care for every member of your family — from routine
              checkups to transformative procedures.
            </p>
          </div>
        </section>

        {/* Service Cards */}
        <section className="section-padding">
          <div
            ref={gridRef}
            className="container-narrow grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {servicesData?.map((s: any) => {
              const Icon = getIcon(s.icon);
              return (
                <div
                  key={s._id}
                  className="service-card glass-card p-8 rounded-2xl hover:shadow-xl transition-shadow group flex flex-col"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform ${s.color}`}
                      >
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-xl">
                          {s.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-primary font-bold text-lg">
                            {s.priceRange}
                          </span>
                          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                            {s.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <ServiceDescription text={s.description} />

                  <div className="space-y-2.5 mb-6 flex-grow">
                    {s.benefits?.map((step: string, i: number) => (
                      <div
                        key={step}
                        className="flex items-center gap-3 text-sm"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors mt-auto"
                    asChild
                  >
                    <Link href="/booking" className="gap-2">
                      Book This Service <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Insurance */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow max-w-3xl">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Insurance
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-2 mb-4">
                Accepted Insurance Providers
              </h2>
              <p className="text-muted-foreground">
                We work with most major dental insurance plans. Don't see yours?
                Contact us!
              </p>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {insuranceProviders.map((ins, i) => (
                <AccordionItem
                  key={i}
                  value={`ins-${i}`}
                  className="glass-card rounded-xl px-6 border-none"
                >
                  <AccordionTrigger className="text-left font-heading font-semibold text-base py-5 hover:no-underline">
                    {ins.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {ins.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-narrow text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Book your appointment today and experience dental care that
              exceeds expectations.
            </p>
            <Button
              size="lg"
              className="px-10 py-6 rounded-xl text-base"
              asChild
            >
              <Link href="/booking">Book an Appointment</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
