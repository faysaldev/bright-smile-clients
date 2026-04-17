"use client";
import doctorImg from "@/src/assets/doctor.jpeg";
import { Award, Heart, Eye } from "lucide-react";

const About = () => (
  <>
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
            {[
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
            ].map((v) => (
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img
              src={doctorImg.src}
              alt="Dr. James Mitchell"
              className="rounded-2xl w-full aspect-[4/5] object-cover"
              loading="lazy"
              width={640}
              height={800}
            />
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Meet Dr. James Mitchell
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A graduate of Columbia University College of Dental Medicine,
                Dr. Mitchell has dedicated his career to transforming smiles and
                improving oral health. He is a Fellow of the American Academy of
                Cosmetic Dentistry and regularly attends international
                conferences to stay at the forefront of dental innovation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When he's not in the office, Dr. Mitchell volunteers with dental
                outreach programs providing free care to underserved
                communities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default About;
