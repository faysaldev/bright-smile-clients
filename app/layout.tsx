import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/src/components/providers/StoreProvider";
import { LenisProvider } from "@/src/components/providers/LenisProvider";
import LayoutWrapper from "@/src/components/common/LayoutWrapper";
import ReduxProvider from "@/src/Provider/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrightSmile - Dental Clinic",
  description: "Bright smiles, seamless care. Book your appointment today.",
};

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
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <StoreProvider>
            <LenisProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </LenisProvider>
          </StoreProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
