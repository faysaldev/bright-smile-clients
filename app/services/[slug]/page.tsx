import type { Metadata } from "next";
import ServiceDetailPage from "@/src/views/ServiceDetailPage";
import { siteConfig } from "@/src/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/services/${slug}`,
      { next: { revalidate: 3600 } },
    );
    if (res.ok) {
      const json = await res.json();
      const service = json?.data;
      if (service) {
        return {
          title: service.title,
          description: service.description,
          alternates: { canonical: `${siteConfig.url}/services/${slug}` },
          openGraph: {
            title: service.title,
            description: service.description,
            url: `${siteConfig.url}/services/${slug}`,
            images: [{ url: "/logo-bg.png", width: 1200, height: 630, alt: service.title }],
          },
          twitter: {
            title: service.title,
            description: service.description,
            images: ["/logo-bg.png"],
          },
        };
      }
    }
  } catch {
    // Fallback
  }

  return {
    title: "Dental Service",
    description: "Learn about our professional dental services at BrightSmile Dental.",
  };
}

export default function Page() {
  return <ServiceDetailPage />;
}
