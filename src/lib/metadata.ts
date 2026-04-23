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
    // Brand
    "BrightSmile Dental",
    "BrightSmile",
    "dental by faysal",
    "bright smile dentist",
    // Core services
    "dental clinic",
    "dentist",
    "dental care",
    "oral health",
    "dental treatment",
    "dental checkup",
    "dental cleaning",
    // Cosmetic
    "teeth whitening",
    "cosmetic dentistry",
    "dental veneers",
    "smile makeover",
    "teeth bleaching",
    "porcelain veneers",
    "smile design",
    // Restorative
    "dental implants",
    "dental crowns",
    "dental bridges",
    "tooth extraction",
    "root canal treatment",
    "dental fillings",
    "composite bonding",
    // Orthodontics
    "orthodontics",
    "braces",
    "clear aligners",
    "Invisalign",
    "teeth straightening",
    // Specialist types
    "family dentist",
    "emergency dentist",
    "pediatric dentist",
    "cosmetic dentist",
    "general dentist",
    "oral surgeon",
    // Patient intent
    "book dentist appointment",
    "dental appointment online",
    "affordable dentist",
    "best dentist near me",
    "dentist near me",
    "local dentist",
    "dental consultation",
    // Additional
    "gum disease treatment",
    "teeth sensitivity",
    "dentures",
    "dental x-ray",
    "preventive dentistry",
    "same day dental appointment",
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
