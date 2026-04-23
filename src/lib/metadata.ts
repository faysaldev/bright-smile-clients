import type { Metadata } from "next";

const SITE_URL = "https://bright-smile-fm.vercel.app";
const SITE_NAME = "BrightSmile Dental";
const DEFAULT_DESCRIPTION =
  "BrightSmile Dental — Modern dental care with personalized treatment plans, advanced technology, and a team that truly cares. Book your appointment today.";

export const siteConfig = {
  url: SITE_URL,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  ogImage: `${SITE_URL}/logo-bg.png`,
} as const;

/**
 * Shared metadata defaults inherited by all pages.
 * Each page can override title / description via its own `metadata` export.
 */
export const sharedMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Premium Dental Care`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "dental clinic",
    "dentist",
    "teeth whitening",
    "dental implants",
    "orthodontics",
    "dental veneers",
    "cosmetic dentistry",
    "family dentist",
    "emergency dentist",
    "dental care",
    "oral health",
    "BrightSmile",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Premium Dental Care`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/logo-bg.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Your Smile Deserves the Best Care`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Premium Dental Care`,
    description: DEFAULT_DESCRIPTION,
    images: ["/logo-bg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

/** Helper to build page-level metadata with OG overrides. */
export function buildPageMetadata({
  title,
  description,
  path = "",
  ogImageAlt,
}: {
  title: string;
  description: string;
  path?: string;
  ogImageAlt?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: "/logo-bg.png",
          width: 1200,
          height: 630,
          alt: ogImageAlt || title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: ["/logo-bg.png"],
    },
  };
}
