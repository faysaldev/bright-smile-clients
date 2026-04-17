import { useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { CalendarCheck, Phone } from "lucide-react";
import { gsap, ScrollTrigger } from "@/src/hooks/useGsap";

const BookingCTA = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 40, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      },
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="section-padding">
      <div ref={ref} className="container-narrow">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-accent to-primary p-10 sm:p-16 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Ready for Your Best Smile?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Book your appointment today and take the first step toward a
              healthier, brighter smile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 text-base px-8 py-6 rounded-xl shadow-lg"
                asChild
              >
                <Link href="/booking">
                  <CalendarCheck className="w-5 h-5" /> Book Online
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 rounded-xl"
                asChild
              >
                <a href="tel:+1234567890">
                  <Phone className="w-5 h-5" /> Call Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;
