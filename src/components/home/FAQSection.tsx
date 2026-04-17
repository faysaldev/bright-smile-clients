import { useRef, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { gsap, ScrollTrigger } from "@/src/hooks/useGsap";

const faqs = [
  {
    q: "Does teeth whitening hurt?",
    a: "Professional whitening may cause temporary sensitivity, but we use desensitizing agents to minimize discomfort. Most patients report no pain at all.",
  },
  {
    q: "How often should I visit the dentist?",
    a: "We recommend a checkup and cleaning every 6 months. Patients with specific conditions may need more frequent visits.",
  },
  {
    q: "Do you accept insurance?",
    a: "Yes! We work with most major dental insurance providers. Our team will help verify your coverage and maximize your benefits.",
  },
  {
    q: "What should I do in a dental emergency?",
    a: "Call us immediately at (123) 456-7890. We offer same-day emergency appointments during business hours and can guide you over the phone.",
  },
  {
    q: "Are dental implants safe?",
    a: "Absolutely. Dental implants have a 95%+ success rate and are considered one of the safest and most effective dental procedures available.",
  },
];

const FAQSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      },
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="section-padding">
      <div ref={ref} className="container-narrow max-w-3xl">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mt-2 mb-4">
            Common Questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="glass-card rounded-xl px-6 border-none"
            >
              <AccordionTrigger className="text-left font-heading font-semibold text-base py-5 hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
