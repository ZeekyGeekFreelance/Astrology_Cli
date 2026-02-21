import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source);
}

function isLikelyDirectImageUrl(parsed: URL) {
  const path = parsed.pathname.toLowerCase();
  return (
    path.endsWith(".jpg") ||
    path.endsWith(".jpeg") ||
    path.endsWith(".png") ||
    path.endsWith(".webp") ||
    path.endsWith(".gif") ||
    path.endsWith(".avif") ||
    path.endsWith(".svg")
  );
}

export function normalizeExternalImageUrl(url?: string | null, width = 1600) {
  if (!url) return null;
  const cleanUrl = url.trim();
  if (!cleanUrl) return null;

  if (cleanUrl.startsWith("/") || cleanUrl.startsWith("data:")) return cleanUrl;

  try {
    const parsed = new URL(cleanUrl);

    if (isLikelyDirectImageUrl(parsed)) {
      return cleanUrl;
    }

    const safeWidth = Math.min(2000, Math.max(320, Number.isFinite(width) ? width : 1200));
    const screenshotTarget = `${parsed.origin}${parsed.pathname}`;

    // Render any webpage URL as an image preview fallback.
    return `https://image.thum.io/get/width/${safeWidth}/noanimate/${screenshotTarget}`;
  } catch {
    return cleanUrl;
  }
}
