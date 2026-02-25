import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import { LayoutShell } from "@/components/layout-shell";
import "./globals.css";

// Fonts are preloaded here so all pages share the same typography tokens.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const siteName = "VedicSages";
const siteTitle = "VedicSages - Vedic Astrology & Spiritual Guidance";
const siteDescription =
  "Decode your cosmic destiny with personalized Vedic astrology consultations. Birth chart analysis, name suggestions, gemstone recommendations, and spiritual remedies.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: siteTitle,
    template: "%s | VedicSages",
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "Vedic astrology",
    "birth chart analysis",
    "astrology consultation",
    "name suggestion",
    "gemstone recommendation",
    "Bengaluru astrologer",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: siteTitle,
    description: siteDescription,
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteName,
    description: siteDescription,
    telephone: "+91 94483 13270",
    url: siteUrl || undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };

  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
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
