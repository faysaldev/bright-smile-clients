import { useRef } from "react";
import {
  ShieldCheck,
  HeartHandshake,
  Microscope,
  Smile,
  Clock,
  CreditCard,
} from "lucide-react";
import { useStaggerReveal } from "@/src/hooks/useGsap";

const features = [
  {
    icon: ShieldCheck,
    title: "Advanced Technology",
    desc: "State-of-the-art equipment including 3D imaging and laser dentistry for precise, comfortable treatments.",
  },
  {
    icon: HeartHandshake,
    title: "Patient-First Care",
    desc: "Your comfort and trust matter most. We take the time to listen, explain, and personalize every treatment.",
  },
  {
    icon: Microscope,
    title: "Expert Specialists",
    desc: "Our team includes board-certified specialists with decades of combined experience.",
  },
  {
    icon: Smile,
    title: "Gentle Approach",
    desc: "Anxiety-free dentistry with sedation options and a calming, spa-like environment.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Early morning, evening, and Saturday appointments to fit your busy lifestyle.",
  },
  {
    icon: CreditCard,
    title: "Transparent Pricing",
    desc: "No hidden fees. We work with all major insurance providers and offer flexible payment plans.",
  },
];

const WhyChooseUs = () => {
  const ref = useRef<HTMLDivElement>(null);
  useStaggerReveal(ref);

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Why BrightSmile
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mt-2 mb-4">
            Why Patients Choose Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We combine clinical excellence with genuine compassion to deliver an
            experience that goes beyond expectations.
          </p>
        </div>
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="gsap-stagger p-7 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all">
                <f.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
