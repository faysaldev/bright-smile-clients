import { useRef, useEffect } from "react";
import { Users, Award, Star, Clock } from "lucide-react";
import { gsap, ScrollTrigger } from "@/src/hooks/useGsap";

const stats = [
  { icon: Users, value: 15000, label: "Happy Patients", suffix: "+" },
  { icon: Award, value: 20, label: "Years of Experience", suffix: "+" },
  { icon: Star, value: 4.9, label: "Average Rating", suffix: "★", decimals: 1 },
  { icon: Clock, value: 50000, label: "Procedures Done", suffix: "+" },
];

const TrustBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const counters = containerRef.current.querySelectorAll(".counter-value");

    counters.forEach((el, i) => {
      const stat = stats[i];
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          const formatted = stat.decimals
            ? obj.val.toFixed(stat.decimals)
            : Math.round(obj.val).toLocaleString();
          (el as HTMLElement).textContent = formatted + stat.suffix;
        },
      });
    });

    gsap.fromTo(
      containerRef.current.querySelectorAll(".stat-card"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="section-padding">
      <div
        ref={containerRef}
        className="container-narrow grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="stat-card glass-card p-6 sm:p-8 rounded-2xl text-center group hover:scale-105 transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <p className="counter-value text-3xl sm:text-4xl font-heading font-extrabold text-foreground mb-1">
              0
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;
