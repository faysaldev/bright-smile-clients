"use client";

import { useRef, useEffect, useState } from "react";
import { Input } from "@/src/components/ui/input";
import {
  Search,
  User,
  Stethoscope,
  GraduationCap,
  Award,
  Briefcase,
  X,
  ArrowRight,
  Star,
  CheckCircle2,
  Calendar,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useGetAllDoctorsQuery } from "@/src/redux/features/doctors/doctorsApi";
import { gsap, ScrollTrigger } from "@/src/hooks/useGsap";
import { Button } from "@/src/components/ui/button";

const Specialists = () => {
  const [filter, setFilter] = useState("All");
  const [expFilter, setExpFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const { data: getDoctors, isLoading: getDoctorsLoading } =
    useGetAllDoctorsQuery({});

  const specialists = getDoctors || [];

  // Derived filters
  const allSpecialties = [
    "All",
    ...Array.from(new Set(specialists.map((d: any) => d.specialty))),
  ];
  const experienceLevels = [
    "All",
    "Junior (0-5 yrs)",
    "Senior (5-10 yrs)",
    "Expert (10+ yrs)",
  ];

  // Filtering Logic
  const filteredDoctors = specialists.filter((d: any) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.role.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = filter === "All" || d.specialty === filter;

    let matchesExperience = true;
    const years = parseInt(d.experience) || 0;
    if (expFilter === "Junior (0-5 yrs)") matchesExperience = years <= 5;
    else if (expFilter === "Senior (5-10 yrs)")
      matchesExperience = years > 5 && years <= 10;
    else if (expFilter === "Expert (10+ yrs)") matchesExperience = years > 10;

    return matchesSearch && matchesSpecialty && matchesExperience;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!gridRef.current || getDoctorsLoading) return;

    // Entrance Animation
    gsap.fromTo(
      gridRef.current.querySelectorAll(".doctor-card"),
      { y: 50, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [getDoctorsLoading, specialists, filter, expFilter, search]);

  // Modal Animation
  useEffect(() => {
    if (selectedDoctor && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" },
      );
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedDoctor]);

  if (getDoctorsLoading) {
    return (
      <div className="pb-16 pt-8">
        <section className="section-padding bg-gradient-to-b from-secondary/50 to-background">
          <div className="container-narrow text-center animate-pulse">
            <div className="h-6 w-20 bg-muted mx-auto rounded mb-4" />
            <div className="h-12 w-80 bg-muted mx-auto rounded" />
          </div>
        </section>
        <section className="section-padding">
          <div className="container-narrow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[400px] bg-muted rounded-3xl" />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="pb-16 pt-8">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-secondary/50 to-background overflow-hidden">
          <div className="container-narrow text-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
            <span className="text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">
              Our Experts
            </span>
            <h1 className="text-4xl sm:text-7xl font-heading font-black mt-2 mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Meet Our Dental Specialists
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg/relaxed font-medium">
              A team of world-class professionals dedicated to providing you
              with the highest standard of dental care and transformative
              smiles.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-narrow">
            {/* Filter Bar */}
            <div className="glass-card p-8 rounded-[2.5rem] mb-12 border border-primary/10 shadow-xl shadow-primary/5">
              <div className="flex flex-col lg:flex-row gap-8 items-end">
                <div className="w-full lg:flex-1 group">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 mb-2 block">
                    Search Specialist
                  </span>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="Search by name or role..."
                      className="pl-12 h-14 rounded-2xl bg-secondary/50 border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all text-base"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
                  <div className="flex-1 sm:flex-none">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 mb-2 block">
                      Specialty
                    </span>
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="h-14 px-6 rounded-2xl bg-secondary/50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-semibold min-w-[180px] w-full cursor-pointer appearance-none"
                    >
                      {allSpecialties.map((c: any) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 mb-2 block">
                      Experience
                    </span>
                    <select
                      value={expFilter}
                      onChange={(e) => setExpFilter(e.target.value)}
                      className="h-14 px-6 rounded-2xl bg-secondary/50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-semibold min-w-[180px] w-full cursor-pointer appearance-none"
                    >
                      {experienceLevels.map((l: any) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Grid */}
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredDoctors.map((d: any) => (
                <div
                  key={d._id}
                  onClick={() => setSelectedDoctor(d)}
                  className="doctor-card group cursor-pointer"
                >
                  <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-primary/20">
                    <img
                      src={d.image}
                      alt={d.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary-foreground text-[10px] font-bold uppercase tracking-widest mb-3 border border-primary/30">
                          {d.specialty}
                        </span>
                        <h3 className="text-2xl font-heading font-bold text-white mb-1">
                          {d.name}
                        </h3>
                        <p className="text-white/70 text-sm font-medium mb-4">
                          {d.role}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            <span className="text-white text-xs font-bold">
                              {d.experience} Exp
                            </span>
                          </div>
                          <span className="text-white text-xs font-bold flex items-center gap-2">
                            View Profile <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <div className="text-center py-32 glass-card rounded-[3rem] border-dashed border-2 border-primary/20">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-muted-foreground/30" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2">
                  No Specialists Found
                </h3>
                <p className="text-muted-foreground font-medium">
                  We couldn't find any specialist matching your current filters.
                  Try adjusting your search.
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setFilter("All");
                    setExpFilter("All");
                    setSearch("");
                  }}
                  className="mt-4 text-primary font-bold"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modal Profile */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/40 backdrop-blur-md transition-opacity animate-in fade-in duration-500"
            onClick={() => setSelectedDoctor(null)}
          />
          <div
            ref={modalRef}
            className="relative w-full max-w-4xl bg-card rounded-[2.5rem] shadow-2xl border border-primary/10 overflow-hidden max-h-[90vh] overflow-y-auto hide-scrollbar flex flex-col lg:flex-row"
          >
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-8 right-8 z-20 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg border border-primary/5"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left side: Image and quick info */}
            <div className="lg:w-[45%] relative min-h-[400px] lg:min-h-0 bg-secondary/20">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background lg:from-transparent via-transparent to-transparent font-medium" />

              <div className="absolute bottom-6 left-6 right-6 lg:hidden">
                <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-lg text-primary text-[9px] font-black uppercase tracking-[0.2em] border border-primary/30">
                  {selectedDoctor.specialty}
                </span>
                <h2 className="text-3xl font-heading font-black text-foreground mt-2 leading-tight">
                  {selectedDoctor.name}
                </h2>
                <p className="text-muted-foreground font-bold mt-0.5 text-sm">
                  {selectedDoctor.role}
                </p>
              </div>
            </div>

            {/* Right side: Detailed info */}
            <div className="lg:w-[55%] p-6 lg:p-12 flex flex-col">
              <div className="hidden lg:block mb-8">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.2em] border border-primary/20">
                  {selectedDoctor.specialty}
                </span>
                <h2 className="text-4xl font-heading font-black text-foreground mt-4 leading-[1.1] tracking-tight">
                  {selectedDoctor.name}
                </h2>
                <p className="text-lg text-muted-foreground font-semibold mt-1.5">
                  {selectedDoctor.role}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-4">
                <div className="glass-card p-5 rounded-2xl border-none bg-secondary/20 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest font-black text-muted-foreground/60 mb-0.5">
                      Expertise
                    </p>
                    <p className="font-bold text-base leading-none">
                      {selectedDoctor.experience}
                    </p>
                  </div>
                </div>
                <div className="glass-card p-6 rounded-3xl border-none bg-secondary/30 flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-inner">
                    <Star className="w-7 h-7 fill-amber-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/60 mb-0.5">
                      Rating
                    </p>
                    <p className="font-bold text-lg leading-none">4.9 / 5.0</p>
                  </div>
                </div>
              </div>

              <div className="space-y-10 flex-1">
                <section>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="font-heading font-black tracking-tight uppercase text-primary/80 text-[11px]">
                      Professional Story
                    </h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm font-medium opacity-90">
                    {selectedDoctor.bio}
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <section>
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <GraduationCap className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="font-heading font-black tracking-tight uppercase text-primary/80 text-[11px]">
                        Education
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      {selectedDoctor.education.map(
                        (edu: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 group"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs font-bold text-muted-foreground leading-snug group-hover:text-foreground transition-colors">
                              {edu}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </section>
                  <section>
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Stethoscope className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="font-heading font-black tracking-tight uppercase text-primary/80 text-[11px]">
                        Signature Expert
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        selectedDoctor.specialty,
                        "Advanced Care",
                        "Modern Dentistry",
                      ].map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-2 bg-secondary/80 rounded-xl text-[9px] font-black tracking-wider uppercase text-foreground/70 border border-primary/5 hover:bg-primary/5 transition-colors cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-primary/5 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 h-14 rounded-xl text-base font-black shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-500 hover:-translate-y-1"
                  asChild
                >
                  <Link href="/booking">Book Consultation Now</Link>
                </Button>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="px-6 h-14 rounded-xl bg-secondary/50 font-bold hover:bg-secondary text-muted-foreground transition-colors text-xs uppercase tracking-widest hidden lg:block"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Specialists;
