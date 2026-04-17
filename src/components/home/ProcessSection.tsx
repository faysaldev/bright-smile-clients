import { useRef, useEffect } from "react";
import { PhoneCall, ClipboardList, Smile, Heart } from "lucide-react";
import { gsap, ScrollTrigger } from "@/src/hooks/useGsap";

const steps = [
  {
    icon: PhoneCall,
    step: "01",
    title: "Book Your Visit",
    desc: "Schedule online or call us — pick a time that works for you.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Consultation",
    desc: "Meet your doctor, discuss your goals, and get a personalized plan.",
  },
  {
    icon: Smile,
    step: "03",
    title: "Treatment",
    desc: "Relax while we work our magic with state-of-the-art technology.",
  },
  {
    icon: Heart,
    step: "04",
    title: "Smile Bright",
    desc: "Leave with a stunning smile and a plan to keep it healthy.",
  },
];

const ProcessSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".process-step"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      },
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div className="text-center mb-14 gsap-reveal">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mt-2 mb-4">
            4 Simple Steps
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Your journey to a perfect smile is easier than you think.
          </p>
        </div>
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="process-step relative text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 text-border z-10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </div>
              )}
              <div className="text-5xl font-heading font-extrabold text-primary/10 mb-2">
                {s.step}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                <s.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
