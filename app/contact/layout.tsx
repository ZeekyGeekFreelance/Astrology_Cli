import type { Metadata } from "next";

const title = "Contact Vedic Astrologer";
const description =
  "Book a Vedic astrology consultation with VedicSages via phone, WhatsApp, or contact form for personalized guidance.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
