import { buildPageMetadata } from "@/src/lib/metadata";
import BlogPage from "@/src/views/BlogPage";

export const metadata = buildPageMetadata({
  title: "Dental Health Blog",
  description:
    "Expert dental health tips, guides, and insights from our specialists. Stay informed about oral health, procedures, and the latest in cosmetic dentistry.",
  path: "/blog",
});

export default function Page() {
  return <BlogPage />;
}
