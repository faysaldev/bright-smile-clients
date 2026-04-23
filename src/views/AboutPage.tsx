"use client";

import { Award, Heart, Eye } from "lucide-react";
import DoctorIntro from "@/src/components/home/DoctorIntro";

const values = [
  {
    icon: Heart,
    title: "Our Mission",
    desc: "To deliver compassionate, world-class dental care in a welcoming environment where every patient feels valued.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "To be the most trusted dental practice in the region, setting the standard for patient experience and clinical excellence.",
  },
  {
    icon: Award,
    title: "Our Values",
    desc: "Integrity, innovation, empathy, and excellence guide everything we do — from treatment plans to patient interactions.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-16 pt-8">
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mt-2 mb-4">
              Our Story
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Founded in 2005, BrightSmile Dental has been dedicated to
              providing exceptional dental care to our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {values.map((v) => (
              <div
                key={v.title}
                className="glass-card p-8 rounded-2xl text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

          <DoctorIntro />
        </div>
      </section>
    </div>
  );
}
