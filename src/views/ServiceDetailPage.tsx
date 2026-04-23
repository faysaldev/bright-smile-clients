"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Check, CalendarCheck, Clock, DollarSign } from "lucide-react";
import { useGetServiceBySlugQuery } from "@/src/redux/features/services/servicesApi";
import { getIcon } from "@/src/utils/iconMap";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { data: service, isLoading, isError } = useGetServiceBySlugQuery(slug);

  if (isLoading) {
    return (
      <div className="pb-16 pt-8">
        <section className="section-padding">
          <div className="container-narrow max-w-3xl animate-pulse space-y-4">
            <div className="h-6 w-24 bg-muted rounded" />
            <div className="h-10 w-2/3 bg-muted rounded" />
            <div className="h-64 bg-muted rounded-2xl mt-8" />
          </div>
        </section>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="pb-16 pt-8">
        <section className="section-padding">
          <div className="container-narrow max-w-3xl text-center py-20">
            <h1 className="text-3xl font-heading font-bold mb-4">Service Not Found</h1>
            <p className="text-muted-foreground mb-6">The service you&apos;re looking for doesn&apos;t exist.</p>
            <Button asChild><Link href="/services">View All Services</Link></Button>
          </div>
        </section>
      </div>
    );
  }

  const Icon = getIcon(service.icon);

  return (
    <div className="pb-16 pt-8">
      <section className="section-padding bg-gradient-to-b from-secondary/50 to-background">
        <div className="container-narrow max-w-4xl">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> All Services
          </Link>
          <div className="flex items-start gap-5 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center flex-shrink-0">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-heading font-bold leading-tight">{service.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                  <DollarSign className="w-4 h-4" />{service.priceRange}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />{service.duration}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-heading font-bold mb-3">About This Service</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{service.description}</p>
              </div>
              {service.benefits?.length > 0 && (
                <div>
                  <h2 className="text-xl font-heading font-bold mb-4">What&apos;s Included</h2>
                  <div className="space-y-3">
                    {service.benefits.map((benefit: string) => (
                      <div key={benefit} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {service.process?.length > 0 && (
                <div>
                  <h2 className="text-xl font-heading font-bold mb-4">Treatment Process</h2>
                  <ol className="space-y-4">
                    {service.process.map((step: string, i: number) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                        <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="glass-card p-6 rounded-2xl sticky top-24">
                <h3 className="font-heading font-bold text-lg mb-4">Book This Service</h3>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Price Range</span>
                    <span className="font-bold text-primary">{service.priceRange}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{service.duration}</span>
                  </div>
                </div>
                <Button className="w-full gap-2 rounded-xl" asChild>
                  <Link href="/booking">
                    <CalendarCheck className="w-4 h-4" /> Book Appointment
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">Free consultation included</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
