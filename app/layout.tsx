import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import { LayoutShell } from "@/components/layout-shell";
import "./globals.css";

// Fonts are preloaded here so all pages share the same typography tokens.
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "VedicSages - Vedic Astrology & Spiritual Guidance",
  description:
    "Unlock your cosmic destiny with personalized Vedic astrology consultations. Birth chart analysis, name suggestions, gemstone recommendations, and spiritual remedies.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#CF5A1B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {/* App-wide providers, header/footer shell, and route content */}
        <LayoutShell>{children}</LayoutShell>
        {/* Global toast notifications */}
        <Toaster />
        {/* Vercel page analytics */}
        <Analytics />
      </body>
    </html>
  );
}
