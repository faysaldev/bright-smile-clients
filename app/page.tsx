import { buildPageMetadata } from "@/src/lib/metadata";
import HomePage from "@/src/views/HomePage";

export const metadata = buildPageMetadata({
  title: "BrightSmile Dental — Premium Dental Care",
  description:
    "Experience modern dentistry with personalized treatment plans, advanced technology, and a team that truly cares about your comfort. Book your appointment today.",
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
