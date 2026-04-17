import { useRef, useEffect } from "react";
import doctorImg from "@/src/assets/doctor.jpeg";
import { Award, GraduationCap, Stethoscope, Heart } from "lucide-react";
import { gsap, ScrollTrigger } from "@/src/hooks/useGsap";

const credentials = [
  {
    icon: GraduationCap,
    label: "Columbia University College of Dental Medicine",
  },
  { icon: Award, label: "Fellow, American Academy of Cosmetic Dentistry" },
  { icon: Stethoscope, label: "20+ Years of Clinical Experience" },
  { icon: Heart, label: "Active Community Volunteer" },
];

const DoctorIntro = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
    });
    tl.fromTo(
      ref.current.querySelector(".doc-img"),
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    ).fromTo(
      ref.current.querySelector(".doc-text"),
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5",
    );
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="section-padding bg-secondary/30">
      <div ref={ref} className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="doc-img relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl" />
            <img
              src={doctorImg.src}
              alt="Dr. James Mitchell"
              className="relative rounded-3xl w-full aspect-[4/5] object-cover shadow-2xl"
              loading="lazy"
              width={640}
              height={800}
            />
            <div className="absolute -bottom-4 -right-4 glass-card px-5 py-3 rounded-xl flex items-center gap-3 shadow-lg">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Award className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm">20+ Years</p>
                <p className="text-xs text-muted-foreground">of Excellence</p>
              </div>
            </div>
          </div>
          <div className="doc-text">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Lead Dentist
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-2 mb-6">
              Dr. James Mitchell
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
              With over two decades of experience, Dr. Mitchell combines
              cutting-edge techniques with genuine compassion. His mission is
              simple: help every patient achieve the smile they deserve.
            </p>
            <div className="space-y-4">
              {credentials.map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorIntro;
