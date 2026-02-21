import { normalizeExternalImageUrl, urlFor } from "@/lib/sanity/image";

type MaybeRecord = Record<string, any> | null | undefined;

type ResolveOptions = {
  width: number;
  height?: number;
  fit?: "crop" | "max";
};

function asRecord(value: unknown): MaybeRecord {
  if (typeof value === "object" && value !== null) {
    return value as Record<string, any>;
  }
  return null;
}

function getAssetSource(value: unknown): { asset: { _ref: string } } | null {
  const record = asRecord(value);
  if (!record) return null;

  if (record.asset?._ref) return record as { asset: { _ref: string } };
  if (record.uploaded?.asset?._ref) return record.uploaded as { asset: { _ref: string } };
  if (record.image?.asset?._ref) return record.image as { asset: { _ref: string } };

  return null;
}

function pickFirstString(values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return null;
}

function getExternalUrl(value: unknown): string | null {
  if (typeof value === "string") return value.trim() || null;

  const record = asRecord(value);
  if (!record) return null;

  return pickFirstString([
    record.externalUrl,
    record.externalImageUrl,
    record.url,
    record.src,
    record.href,
    record.link,
    record.imageUrl,
    record.uploaded?.externalUrl,
  ]);
}

export function resolveImageAlt(value: unknown, fallback = "Image") {
  const record = asRecord(value);
  return pickFirstString([record?.alt]) || fallback;
}

export function resolveImageUrl(value: unknown, options: ResolveOptions): string | null {
  const source = getAssetSource(value);
  if (source) {
    let builder = urlFor(source).width(options.width).auto("format");
    if (options.height) builder = builder.height(options.height);
    if (options.fit) builder = builder.fit(options.fit);
    return builder.url();
  }

  return normalizeExternalImageUrl(getExternalUrl(value), options.width);
}

export function resolveFeaturedPostImageUrl(post: unknown) {
  const record = asRecord(post);
  if (!record) return null;

  return resolveImageUrl(
    {
      ...(record.image || {}),
      externalImageUrl: record.externalImageUrl,
    },
    { width: 1600, height: 900, fit: "crop" },
  );
}

export function resolveCardPostImageUrl(post: unknown) {
  const record = asRecord(post);
  if (!record) return null;

  return resolveImageUrl(
    {
      ...(record.image || {}),
      externalImageUrl: record.externalImageUrl,
    },
    { width: 960, height: 540, fit: "crop" },
  );
}
