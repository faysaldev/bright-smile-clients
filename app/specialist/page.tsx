import { buildPageMetadata } from "@/src/lib/metadata";
import SpecialistPage from "@/src/views/SpecialistPage";

export const metadata = buildPageMetadata({
  title: "Our Dental Specialists",
  description:
    "Meet our team of world-class dental specialists. Board-certified experts in cosmetic dentistry, orthodontics, implants, and more.",
  path: "/specialist",
});

export default function Page() {
  return <SpecialistPage />;
}
