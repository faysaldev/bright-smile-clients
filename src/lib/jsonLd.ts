import { siteConfig } from "./metadata";

/**
 * JSON-LD structured data for Google rich results.
 * Renders a LocalBusiness + DentalClinic schema.
 */
export function getDentalClinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo-bg.png`,
    image: `${siteConfig.url}/logo-bg.png`,
    telephone: "+1234567890",
    email: "hello@brightsmile.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Dental Ave, Suite 100",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7484,
      longitude: -73.9857,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "15:00",
      },
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "15000",
      bestRating: "5",
    },
    sameAs: [],
  };
}

/** JSON-LD for a blog post (Article schema). */
export function getBlogPostJsonLd(post: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishDate?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: post.url,
    image: post.image || `${siteConfig.url}/logo-bg.png`,
    datePublished: post.publishDate || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: post.authorName || "BrightSmile Dental",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo-bg.png`,
      },
    },
  };
}

/** JSON-LD for FAQ pages. */
export function getFaqJsonLd(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
