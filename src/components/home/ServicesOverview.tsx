import { useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  Smile,
  Shield,
  Scissors,
  Heart,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useStaggerReveal } from "@/src/hooks/useGsap";

const services = [
  {
    icon: Sparkles,
    title: "Teeth Cleaning",
    desc: "Professional cleaning to keep your smile bright and healthy.",
    color: "from-sky-500/20 to-blue-500/20",
  },
  {
    icon: Smile,
    title: "Teeth Whitening",
    desc: "Advanced whitening treatments for a radiant, confident smile.",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: Shield,
    title: "Dental Implants",
    desc: "Permanent tooth replacement with natural-looking implants.",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Scissors,
    title: "Orthodontics",
    desc: "Braces and aligners for a perfectly straight smile.",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Heart,
    title: "Cosmetic Dentistry",
    desc: "Veneers, bonding, and smile makeovers tailored to you.",
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    icon: Zap,
    title: "Emergency Care",
    desc: "Same-day emergency appointments when you need us most.",
    color: "from-red-500/20 to-orange-500/20",
  },
];

const ServicesOverview = () => {
  const gridRef = useRef<any>(null);
  useStaggerReveal(gridRef);

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div className="text-center mb-14 gsap-reveal">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mt-2 mb-4">
            Comprehensive Dental Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From routine checkups to advanced procedures, we provide everything
            you need for a healthy, beautiful smile.
          </p>
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s) => (
            <Link
              href="/services"
              key={s.title}
              className="gsap-stagger glass-card p-7 rounded-2xl group hover:scale-[1.03] transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
              >
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {s.desc}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl px-8"
            asChild
          >
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
