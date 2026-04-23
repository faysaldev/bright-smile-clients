import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/src/components/common/LayoutWrapper";
import ReduxProvider from "@/src/Provider/ReduxProvider";
import { LenisProvider } from "@/src/components/providers/LenisProvider";
import { Toaster } from "sonner";
import { sharedMetadata } from "@/src/lib/metadata";
import { getDentalClinicJsonLd } from "@/src/lib/jsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getDentalClinicJsonLd()),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <LenisProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </LenisProvider>
          <Toaster position="top-center" richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}
