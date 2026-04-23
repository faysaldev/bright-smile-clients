import { buildPageMetadata } from "@/src/lib/metadata";
import ServicesPage from "@/src/views/ServicesPage";

export const metadata = buildPageMetadata({
  title: "Dental Services & Pricing",
  description:
    "Comprehensive dental services including teeth whitening, dental implants, veneers, orthodontics, and more. View our pricing and book your appointment.",
  path: "/services",
});

export default function Page() {
  return <ServicesPage />;
}
