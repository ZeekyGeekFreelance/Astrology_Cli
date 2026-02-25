const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const toAbsoluteUrl = (value: string | undefined): string | undefined => {
  if (!value) return undefined;

  const trimmed = value.trim();
  if (!trimmed) return undefined;

  const normalized = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    return stripTrailingSlash(new URL(normalized).toString());
  } catch {
    return undefined;
  }
};

export const getSiteUrl = (): string | undefined => {
  return (
    toAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    toAbsoluteUrl(process.env.SITE_URL) ??
    toAbsoluteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    toAbsoluteUrl(process.env.VERCEL_URL)
  );
};

export const getSiteUrlObject = (): URL | undefined => {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return undefined;

  try {
    return new URL(siteUrl);
  } catch {
    return undefined;
  }
};