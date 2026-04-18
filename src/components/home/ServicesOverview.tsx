import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useStaggerReveal } from "@/src/hooks/useGsap";
import { useGetAllServicesQuery } from "@/src/redux/features/services/servicesApi";
import { getIcon } from "@/src/utils/iconMap";

const ServicesOverview = () => {
  const gridRef = useRef<any>(null);
  useStaggerReveal(gridRef);
  const { data: services, isLoading } = useGetAllServicesQuery(undefined);

  if (isLoading) {
    return (
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4 mx-auto" />
            <div className="h-12 bg-muted rounded w-1/2 mx-auto" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-muted rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div className="text-center mb-14 gsap-reveal">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold mt-2 mb-4">
            Comprehensive Dental Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From routine checkups to advanced procedures, we provide everything
            you need for a healthy, beautiful smile.
          </p>
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services?.map((s: any) => {
            const Icon = getIcon(s.icon);
            return (
              <Link
                href={`/services/${s.slug}`}
                key={s.slug}
                className="gsap-stagger glass-card p-7 rounded-2xl group hover:scale-[1.03] transition-all duration-300 hover:shadow-xl cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {s.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl px-8"
            asChild
          >
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
