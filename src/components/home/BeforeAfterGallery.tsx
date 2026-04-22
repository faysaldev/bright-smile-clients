import { useRef, useState, useCallback, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/src/hooks/useGsap";
import teethAfter from "@/src/assets/results/teeth-after.png";
import teethBefore from "@/src/assets/results/teeth-before.png";

const cases = [
  {
    title: "Teeth Whitening",
    desc: "8 shades brighter in a single session",
    before: teethBefore,
    after: teethAfter,
  },
  { title: "Dental Veneers", desc: "Complete smile transformation" },
  { title: "Orthodontics", desc: "18-month clear aligner treatment" },
];

const ComparisonSlider = ({
  index,
  before,
  after,
}: {
  index: number;
  before?: any;
  after?: any;
}) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(5, Math.min(95, x)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    };
    const onUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [updatePosition]);

  const hues = [199, 160, 270];
  const hue = hues[index % hues.length];

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-col-resize select-none"
      onMouseDown={(e) => {
        isDragging.current = true;
        updatePosition(e.clientX);
      }}
      onTouchStart={(e) => {
        isDragging.current = true;
        updatePosition(e.touches[0].clientX);
      }}
    >
      {/* "After" side */}
      <div
        className="absolute inset-0 bg-slate-100"
        style={{
          background: after
            ? "none"
            : `linear-gradient(135deg, hsl(${hue} 70% 90%), hsl(${hue} 80% 80%))`,
        }}
      >
        {after ? (
          <img
            src={after.src || after}
            alt="After"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-sm mx-auto mb-3 flex items-center justify-center text-3xl">
                😁
              </div>
              <span className="text-sm font-semibold bg-emerald-500 text-white px-3 py-1 rounded-full">
                After
              </span>
            </div>
          </div>
        )}
      </div>
      {/* "Before" side */}
      <div
        className="absolute inset-0 overflow-hidden bg-slate-200"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          background: before
            ? "none"
            : `linear-gradient(135deg, hsl(${hue} 20% 75%), hsl(${hue} 15% 60%))`,
        }}
      >
        {before ? (
          <img
            src={before.src || before}
            alt="Before"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-3 flex items-center justify-center text-3xl">
                  🙂
                </div>
                <span className="text-sm font-semibold bg-muted text-muted-foreground px-3 py-1 rounded-full">
                  Before
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-0.5 h-full bg-white shadow-lg" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M5 3L2 8L5 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M11 3L14 8L11 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const BeforeAfterGallery = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".ba-card"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      },
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-14 gsap-reveal">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Results
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mt-2 mb-4">
            Before & After
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See the transformations our patients have experienced. Drag the
            slider to compare.
          </p>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <div key={c.title} className="ba-card">
              <ComparisonSlider
                index={i}
                before={c.before}
                after={c.after}
              />
              <div className="mt-4 text-center">
                <h3 className="font-heading font-semibold text-lg">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
