"use client";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Loader2 } from "lucide-react";
import { gsap, ScrollTrigger } from "@/src/hooks/useGsap";
import { useGetSettingsQuery } from "@/src/redux/features/settings/settingsApi";
import { useSubmitContactFormMutation } from "@/src/redux/features/contact/contactApi";
import { toast } from "sonner";

const Contact = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const { data: settings, isLoading: settingsLoading } = useGetSettingsQuery(undefined);
  const [submitContact, { isLoading: isSubmitting }] = useSubmitContactFormMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!formRef.current || !infoRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: formRef.current, start: "top 80%" },
    });
    tl.fromTo(
      formRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
    ).fromTo(
      infoRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.4",
    );
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact(formData).unwrap();
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send message");
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: settings?.phone || "(123) 456-7890",
      href: `tel:${settings?.phone || "+1234567890"}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: settings?.email || "hello@brightsmile.com",
      href: `mailto:${settings?.email || "hello@brightsmile.com"}`,
    },
    {
      icon: MapPin,
      label: "Address",
      value: settings?.address || "123 Dental Ave, Suite 100, New York, NY 10001",
    },
  ];

  const openingHours = settings?.workingHours 
    ? (typeof settings.workingHours === 'string' ? JSON.parse(settings.workingHours) : settings.workingHours)
    : [
        ["Monday – Friday", "8:00 AM – 6:00 PM"],
        ["Saturday", "9:00 AM – 3:00 PM"],
        ["Sunday", "Closed"],
      ];

  return (
    <>
      <div className="pb-16 pt-8">
        <section className="section-padding bg-gradient-to-b from-secondary/50 to-background">
          <div className="container-narrow text-center">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Contact
            </span>
            <h1 className="text-4xl sm:text-6xl font-heading font-bold mt-2 mb-4">
              Get in Touch
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We'd love to hear from you. Send us a message or visit our clinic.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-narrow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div ref={formRef}>
                <div className="glass-card p-8 sm:p-10 rounded-3xl shadow-xl border-primary/5">
                  <h3 className="font-heading font-bold text-xl mb-6">
                    Send Us a Message
                  </h3>
                  <form
                    className="space-y-5"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your Name"
                        className="rounded-xl py-5"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <Input
                        placeholder="Email Address"
                        type="email"
                        className="rounded-xl py-5"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <Input
                      placeholder="Phone Number"
                      type="tel"
                      className="rounded-xl py-5"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <Input 
                        placeholder="Subject" 
                        className="rounded-xl py-5" 
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                    <Textarea
                      placeholder="Your Message"
                      rows={5}
                      className="rounded-xl"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                    <Button 
                        className="w-full py-5 rounded-xl gap-2 text-base shadow-lg shadow-primary/20"
                        disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </div>

              <div ref={infoRef} className="space-y-6">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                      <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-sm">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-muted-foreground text-sm hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground text-sm">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="glass-card p-6 rounded-2xl border-primary/5">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-semibold">
                      Opening Hours
                    </h3>
                  </div>
                  <div className="space-y-2.5 text-sm">
                    {openingHours.map(([day, hours]: [string, string]) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-muted-foreground">{day}</span>
                        <span className="font-medium">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={`https://wa.me/${(settings?.phone || "1234567890").replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 glass-card p-5 rounded-2xl hover:scale-[1.02] transition-transform group border-green-500/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                    <MessageCircle className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold">
                      Chat on WhatsApp
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Quick replies during business hours
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-14 rounded-3xl overflow-hidden h-96 shadow-xl relative group">
              <iframe
                src={settings?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDguNSJX!5e0!3m2!1sen!2sus!4v1"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="BrightSmile Dental location"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
