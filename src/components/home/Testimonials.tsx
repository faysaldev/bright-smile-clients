import { useRef, useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { gsap, ScrollTrigger } from "@/src/hooks/useGsap";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient since 2019",
    text: "BrightSmile completely transformed my dental experience. The team is incredibly gentle and professional. I actually look forward to my visits now!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Patient since 2020",
    text: "After years of dental anxiety, I finally found a practice that makes me feel comfortable. Dr. Mitchell is exceptional — truly world-class care.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Patient since 2021",
    text: "The teeth whitening results were amazing! My smile has never looked better. The staff went above and beyond to make sure I was happy.",
    rating: 5,
  },
  {
    name: "David Thompson",
    role: "Patient since 2018",
    text: "From implants to routine cleaning, every visit has been a wonderful experience. The technology they use is cutting-edge.",
    rating: 5,
  },
  {
    name: "Lisa Park",
    role: "Patient since 2022",
    text: "My kids love coming here! The pediatric care is outstanding, and the office is so welcoming. Highly recommend for families.",
    rating: 5,
  },
  {
    name: "James Wright",
    role: "Patient since 2017",
    text: "Best dental practice in the city, hands down. Professional, caring, and always on time. Five stars aren't enough!",
    rating: 5,
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      },
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const next = () => setActive((a) => (a + 1) % testimonials.length);
  const prev = () =>
    setActive((a) => (a - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[active];

  return (
    <section className="section-padding bg-gradient-to-b from-secondary/40 to-background">
      <div ref={sectionRef} className="container-narrow">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mt-2 mb-4">
            What Our Patients Say
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 sm:p-12 rounded-3xl relative">
            <Quote className="w-12 h-12 text-primary/20 absolute top-6 left-6" />
            <div className="text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 text-primary-foreground text-xl font-bold">
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-lg sm:text-xl leading-relaxed text-foreground mb-6 font-medium italic">
                "{t.text}"
              </p>
              <p className="font-heading font-bold text-lg">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === active ? "bg-primary w-8" : "bg-border hover:bg-muted-foreground/40"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
