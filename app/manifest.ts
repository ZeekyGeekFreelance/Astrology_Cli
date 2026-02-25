import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VedicSages",
    short_name: "VedicSages",
    description:
      "Vedic astrology consultations, birth chart analysis, remedies, and spiritual guidance.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff7f0",
    theme_color: "#CF5A1B",
    icons: [
      {
        src: "/icon-light-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
