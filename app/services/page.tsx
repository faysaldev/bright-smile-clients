"use client";
import { useRef, useEffect } from "react";
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

const services = [
  {
    icon: Sparkles,
    title: "Teeth Cleaning",
    price: "$75–$200",
    desc: "Professional cleaning removes plaque, tartar, and stains to keep your teeth healthy and bright. Includes full oral examination.",
    steps: [
      "Oral exam",
      "Ultrasonic scaling",
      "Polishing",
      "Fluoride treatment",
    ],
    duration: "45 min",
    color: "from-sky-500/20 to-blue-500/20",
  },
  {
    icon: Smile,
    title: "Teeth Whitening",
    price: "$250–$500",
    desc: "In-office and take-home whitening options to brighten your smile by up to 8 shades.",
    steps: [
      "Shade assessment",
      "Gum protection",
      "Whitening application",
      "Results review",
    ],
    duration: "60 min",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: Shield,
    title: "Dental Implants",
    price: "$1,500–$6,000",
    desc: "Permanent titanium implants that look and function like natural teeth.",
    steps: [
      "CT scan & planning",
      "Implant placement",
      "Healing period",
      "Crown attachment",
    ],
    duration: "Multiple visits",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Scissors,
    title: "Orthodontics",
    price: "$3,000–$7,000",
    desc: "Traditional braces and clear aligners for children, teens, and adults.",
    steps: [
      "Consultation",
      "Custom treatment plan",
      "Regular adjustments",
      "Retention",
    ],
    duration: "12–24 months",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Heart,
    title: "Cosmetic Dentistry",
    price: "$500–$3,000",
    desc: "Veneers, bonding, and complete smile makeovers tailored to your goals.",
    steps: [
      "Design consultation",
      "Digital preview",
      "Preparation",
      "Final placement",
    ],
    duration: "2–3 visits",
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    icon: Zap,
    title: "Emergency Care",
    price: "Varies",
    desc: "Same-day emergency appointments for pain, broken teeth, and dental trauma.",
    steps: [
      "Call our office",
      "Triage assessment",
      "Immediate treatment",
      "Follow-up plan",
    ],
    duration: "Same day",
    color: "from-red-500/20 to-orange-500/20",
  },
];

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

const Services = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!gridRef.current) return;
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
  }, []);

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
            {services.map((s) => (
              <div
                key={s.title}
                className="service-card glass-card p-8 rounded-2xl hover:shadow-xl transition-shadow group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <s.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl">
                        {s.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-primary font-bold text-lg">
                          {s.price}
                        </span>
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                          {s.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {s.desc}
                </p>
                <div className="space-y-2.5 mb-6">
                  {s.steps.map((step, i) => (
                    <div key={step} className="flex items-center gap-3 text-sm">
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
                  className="w-full rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <Link href="/booking" className="gap-2">
                    Book This Service <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
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
