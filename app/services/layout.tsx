import type { Metadata } from "next";

const title = "Vedic Astrology Services";
const description =
  "Explore VedicSages astrology services including birth chart analysis, remedies, relationship guidance, career insights, and spiritual consultations.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
