import { buildPageMetadata } from "@/src/lib/metadata";
import AboutPage from "@/src/views/AboutPage";

export const metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Founded in 2005, BrightSmile Dental has been dedicated to providing exceptional dental care. Learn about our mission, vision, values, and expert team.",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
