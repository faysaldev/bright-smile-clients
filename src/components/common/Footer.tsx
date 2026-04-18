"use client";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useGetSettingsQuery } from "@/src/redux/features/settings/settingsApi";

const Footer = () => {
  const { data: settings } = useGetSettingsQuery(undefined);

  const openingHours = settings?.workingHours
    ? (typeof settings.workingHours === 'string' ? JSON.parse(settings.workingHours) : settings.workingHours)
    : [
        ["Monday – Friday", "8:00 AM – 6:00 PM"],
        ["Saturday", "9:00 AM – 3:00 PM"],
        ["Sunday", "Closed"],
      ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-narrow section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <img
                src="/logo-bg.png"
                alt="BrightSmile"
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Delivering world-class dental care with compassion and
              cutting-edge technology since 2005.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-70">
              {["Services", "About", "Blog", "FAQ", "Contact"].map((l) => (
                <li key={l}>
                  <Link
                    href={`/${l.toLowerCase()}`}
                    className="hover:opacity-100 transition-opacity"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {settings?.phone || "(123) 456-7890"}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> {settings?.email || "hello@brightsmile.com"}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" /> {settings?.address || "123 Dental Ave, Suite 100, New York, NY 10001"}
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-sm opacity-70">
              {openingHours.map(([day, hours]: [string, string]) => (
                <li key={day} className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {day}: {hours}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50">
          <p>© {new Date().getFullYear()} BrightSmile Dental. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:opacity-100">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:opacity-100">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
