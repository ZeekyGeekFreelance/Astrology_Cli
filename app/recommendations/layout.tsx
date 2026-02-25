import type { Metadata } from "next";

const title = "Astrology Recommendations";
const description =
  "Get Vedic astrology recommendations for lucky names, numbers, colors, and gemstones based on your birth details.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/recommendations",
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/recommendations",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RecommendationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
