import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { CalendarCheck, ArrowRight, Play } from "lucide-react";
import heroImg from "@/src/assets/hero-clinic.jpeg";
import { useHeroAnimation } from "@/src/hooks/useGsap";

const HeroSection = () => {
  const ref = useRef<any>(null);
  useHeroAnimation(ref);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={heroImg.src}
          alt="Modern dental clinic"
          className="w-full h-full object-cover"
          width={1280}
          height={864}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/20" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-[15%] w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse hidden lg:block" />
      <div
        className="absolute bottom-1/4 right-[25%] w-48 h-48 bg-accent/10 rounded-full blur-2xl animate-pulse hidden lg:block"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative container-narrow px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          <span className="hero-badge inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/10">
            ✨ Bright smiles, seamless care
          </span>
          <h1 className="hero-title text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold leading-[1.1] mb-6 text-primary-foreground">
            Your Smile Deserves{" "}
            <span className="font-decorative italic text-primary relative">
              the Best Care
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
              >
                <path
                  d="M2 6C50 2 150 2 198 6"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="hero-desc text-lg sm:text-xl mb-10 text-primary-foreground/80 max-w-lg leading-relaxed">
            Experience modern dentistry with personalized treatment plans,
            advanced technology, and a team that truly cares about your comfort.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="gap-2 text-base px-8 py-6 rounded-xl shadow-lg shadow-primary/25"
              asChild
            >
              <Link href="/booking">
                <CalendarCheck className="w-5 h-5" />
                Book Appointment
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 text-base border-primary-foreground/30 text-black hover:bg-primary-foreground/10 px-8 py-6 rounded-xl"
              asChild
            >
              <Link href="/services">
                Our Services <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mini stats row */}
          <div className="mt-12 flex gap-8 text-primary-foreground/90">
            {[
              { val: "15K+", label: "Happy Patients" },
              { val: "20+", label: "Years Experience" },
              { val: "4.9★", label: "Rating" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-heading font-bold">{s.val}</p>
                <p className="text-xs text-primary-foreground/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
