import { useRef, useEffect, useState, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { gsap, ScrollTrigger } from "@/src/hooks/useGsap";
import { useGetTestimonialsQuery } from "@/src/redux/features/testimonials/testimonialsApi";
import { Button } from "../ui/button";

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
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      },
    );
  }, []);

  const { data: testimonialsData, isLoading } = useGetTestimonialsQuery(undefined);
  
  const displayTestimonials =
    testimonialsData && testimonialsData.length > 0
      ? testimonialsData.filter((t: any) => !t.status || t.status === "approved")
      : [];

  const next = useCallback(() => {
    if (displayTestimonials.length === 0) return;
    setActive((prev) => (prev + 1) % displayTestimonials.length);
  }, [displayTestimonials.length]);

  const prev = () => {
    if (displayTestimonials.length === 0) return;
    setActive(
      (prev) =>
        (prev - 1 + displayTestimonials.length) % displayTestimonials.length,
    );
  };

  useEffect(() => {
    if (displayTestimonials.length === 0) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next, displayTestimonials.length]);

  if (isLoading || displayTestimonials.length === 0) return null;

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Patient Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mt-2">
            What Our Patients Say
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 text-primary/10 select-none">
            <Quote className="w-32 h-32 rotate-180" />
          </div>

          <div className="relative z-10 glass-card p-10 sm:px-16 sm:py-14 rounded-[2rem] shadow-2xl shadow-primary/5">
            <div className="flex flex-col items-center text-center">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < displayTestimonials[active].rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted border-muted"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed mb-10 italic">
                "{displayTestimonials[active].text}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent overflow-hidden">
                  <img
                    src={
                      displayTestimonials[active].avatar ||
                      "/default-avatar.png"
                    }
                    alt={displayTestimonials[active].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-heading font-bold">
                    {displayTestimonials[active].name}
                  </p>
                  <p className="text-sm text-muted-foreground">{displayTestimonials[active].role || "Patient"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full w-12 h-12 border-primary/20 hover:bg-primary hover:text-white transition-all shadow-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="flex gap-2">
              {displayTestimonials.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active === i ? "w-8 bg-primary" : "w-2 bg-primary/20"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full w-12 h-12 border-primary/20 hover:bg-primary hover:text-white transition-all shadow-md"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
