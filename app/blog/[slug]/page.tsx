import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Mail,
  MessageCircle,
  Send,
  Share2,
  Tag,
  User,
} from "lucide-react";
import { PortableText } from "@portabletext/react";
import { resolveFeaturedPostImageUrl, resolveImageAlt, resolveImageUrl } from "@/lib/blog-image-resolver";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/sanity/client";
import {
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
  RECENT_POSTS_QUERY,
} from "@/lib/sanity/queries";
import { getSiteUrl } from "@/lib/site-url";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: any;
  category?: string;
  image?: unknown;
  externalImageUrl?: string;
  publishedAt?: string;
  _updatedAt?: string;
  author?: string;
};

type RecentPost = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  category?: string;
};

type PostSlugRecord = {
  slug?: string;
};

const categoryLabelMap: Record<string, string> = {
  "vedic-knowledge": "Vedic Knowledge",
  remedies: "Remedies",
  festivals: "Festivals",
};

const getCategoryLabel = (categoryValue?: string) => {
  if (!categoryValue) return "Astrology";
  return categoryLabelMap[categoryValue] ?? categoryValue.replace(/-/g, " ");
};

const toFormattedDate = (value?: string, fallback = "") => {
  if (!value) return fallback;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return fallback;
  return format(parsed, "MMMM d, yyyy");
};

const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const post = await client.fetch<BlogPost | null>(POST_BY_SLUG_QUERY, { slug });
    return post ?? null;
  } catch (error) {
    console.error("Blog post fetch failed:", error);
    return null;
  }
});

const getRecentPosts = cache(async (): Promise<RecentPost[]> => {
  try {
    const posts = await client.fetch<RecentPost[]>(RECENT_POSTS_QUERY);
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error("Recent posts fetch failed:", error);
    return [];
  }
});

export const revalidate = 300;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  try {
    const posts = await client.fetch<PostSlugRecord[]>(POST_SLUGS_QUERY);
    return (posts ?? [])
      .map((post) => post.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ slug }));
  } catch (error) {
    console.error("Static blog slug generation failed:", error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const siteUrl = getSiteUrl();
  const canonicalPath = `/blog/${slug}`;
  const canonicalUrl = siteUrl ? `${siteUrl}${canonicalPath}` : undefined;
  const imageUrl = resolveFeaturedPostImageUrl(post);
  const description =
    post.excerpt?.trim() ||
    "Read this Vedic astrology article from VedicSages for practical guidance and remedies.";

  return {
    title: post.title,
    description,
    keywords: [
      "Vedic astrology blog",
      "astrology remedies",
      categoryLabelMap[post.category ?? ""] ?? "astrology",
      post.title,
    ],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: canonicalUrl,
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: resolveImageAlt(post.image, post.title),
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const [post, recentPosts] = await Promise.all([
    getPostBySlug(slug),
    getRecentPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const imageUrl = resolveFeaturedPostImageUrl(post);
  const publishedDate = toFormattedDate(post.publishedAt, "");
  const categoryLabel = getCategoryLabel(post.category);

  const siteUrl = getSiteUrl();
  const canonicalPath = `/blog/${slug}`;
  const canonicalUrl = siteUrl ? `${siteUrl}${canonicalPath}` : canonicalPath;
  const shareBody = `${post.excerpt || "Read this Vedic astrology article."}\n\n${canonicalUrl}`;

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${post.title}\n${shareBody}`)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(post.title)}`;
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(canonicalUrl)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareBody)}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || undefined,
    articleSection: categoryLabel,
    datePublished: post.publishedAt || undefined,
    dateModified: post._updatedAt || post.publishedAt || undefined,
    image: imageUrl ? [imageUrl] : undefined,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "VedicSages",
      url: siteUrl || undefined,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <article className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <header className="relative z-0 overflow-hidden bg-gradient-to-br from-maroon via-maroon to-[#5a1522] py-16 text-cream lg:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -top-16 right-0 size-72 rounded-full border border-gold/30" />
          <div className="absolute -bottom-24 left-8 size-96 rounded-full border border-gold/20" />
        </div>
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-4 py-2 text-sm font-medium text-gold hover:bg-white/20"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-cream/80 sm:text-sm">
            <span className="flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-3 py-1 text-gold">
              <Tag className="size-4" />
              {categoryLabel}
            </span>
            {publishedDate && (
              <span className="flex items-center gap-2">
                <Calendar className="size-4" />
                {publishedDate}
              </span>
            )}
          </div>
          <h1 className="font-serif text-3xl font-bold text-cream lg:text-5xl text-balance leading-tight">
            {post.title}
          </h1>
          {post.author && (
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-white/10 px-4 py-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-gold/15 text-gold">
                <User className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-cream">{post.author}</p>
                <p className="text-xs text-cream/70">Expert Vedic Astrologer</p>
              </div>
            </div>
          )}
        </div>
      </header>

      {imageUrl && (
        <div className="relative z-20 mx-auto -mt-10 max-w-5xl px-4 lg:px-8">
          <div className="aspect-video overflow-hidden rounded-xl border border-gold/20 shadow-xl">
            <img
              src={imageUrl}
              alt={resolveImageAlt(post.image, post.title)}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="mx-auto mt-12 grid max-w-7xl gap-12 px-4 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div className="rounded-2xl border border-gold/20 bg-card p-6 shadow-sm sm:p-10">
          <div className="blog-content prose prose-saffron prose-lg max-w-none prose-headings:font-serif prose-p:text-foreground/85 prose-li:text-foreground/85">
            {post.body ? (
              <PortableText
                value={post.body}
                components={{
                  types: {
                    image: ({ value }: any) => {
                      const inlineImageUrl = resolveImageUrl(value, {
                        width: 1200,
                        fit: "max",
                      });

                      if (!inlineImageUrl) return null;

                      return (
                        <div className="mx-auto my-10 w-full max-w-3xl overflow-hidden rounded-xl border border-gold/15 bg-muted/20 p-2">
                          <img
                            src={inlineImageUrl}
                            alt={resolveImageAlt(value, "Content image")}
                            className="h-auto w-full rounded-lg object-contain"
                            loading="lazy"
                          />
                        </div>
                      );
                    },
                    imageBlock: ({ value }: any) => {
                      const blockImageUrl = resolveImageUrl(value, {
                        width: 1200,
                        fit: "max",
                      });

                      if (!blockImageUrl) return null;

                      return (
                        <div className="mx-auto my-10 w-full max-w-3xl overflow-hidden rounded-xl border border-gold/15 bg-muted/20 p-2">
                          <img
                            src={blockImageUrl}
                            alt={resolveImageAlt(value, "Content image")}
                            className="h-auto w-full rounded-lg object-contain"
                            loading="lazy"
                          />
                        </div>
                      );
                    },
                    externalImage: ({ value }: any) => {
                      const legacyExternalImageUrl = resolveImageUrl(value, {
                        width: 1200,
                        fit: "max",
                      });

                      if (!legacyExternalImageUrl) return null;

                      return (
                        <div className="mx-auto my-10 w-full max-w-3xl overflow-hidden rounded-xl border border-gold/15 bg-muted/20 p-2">
                          <img
                            src={legacyExternalImageUrl}
                            alt={resolveImageAlt(value, "Content image")}
                            className="h-auto w-full rounded-lg object-contain"
                            loading="lazy"
                          />
                        </div>
                      );
                    },
                  },
                  block: {
                    normal: ({ children }) => (
                      <p className="whitespace-pre-line text-foreground/85 leading-relaxed">
                        {children}
                      </p>
                    ),
                    h1: ({ children }) => (
                      <h1 className="mt-10 mb-6 font-serif text-3xl font-bold text-maroon">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mt-10 mb-6 border-l-4 border-saffron pl-4 font-serif text-2xl font-bold text-maroon">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mt-8 mb-4 font-serif text-xl font-bold text-maroon">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="mt-6 mb-3 font-serif text-lg font-semibold text-maroon">
                        {children}
                      </h4>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="list-disc space-y-2 pl-6 text-foreground/85">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal space-y-2 pl-6 text-foreground/85">
                        {children}
                      </ol>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }) => (
                      <li className="leading-relaxed">{children}</li>
                    ),
                    number: ({ children }) => (
                      <li className="leading-relaxed">{children}</li>
                    ),
                  },
                }}
              />
            ) : post.excerpt ? (
              <p>{post.excerpt}</p>
            ) : (
              <p className="text-muted-foreground">Content will be added soon.</p>
            )}
          </div>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-gold/20 bg-card p-6 shadow-sm">
            <h3 className="mb-6 border-b border-gold/20 pb-2 font-serif text-lg font-bold text-maroon">
              Recent Posts
            </h3>
            <div className="space-y-6">
              {recentPosts
                .filter((rp) => rp._id !== post._id)
                .slice(0, 5)
                .map((rp) => (
                  <Link key={rp._id} href={`/blog/${rp.slug.current}`} className="group block">
                    <p className="mb-1 text-xs uppercase tracking-widest text-saffron">
                      {getCategoryLabel(rp.category)}
                    </p>
                    <h4 className="line-clamp-2 font-serif text-sm font-semibold text-maroon transition-colors group-hover:text-saffron">
                      {rp.title}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {toFormattedDate(rp.publishedAt, "Recent")}
                    </p>
                  </Link>
                ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gold/20 bg-gradient-to-b from-muted/40 to-muted/10 p-6 text-center shadow-sm">
            <h3 className="mb-4 font-serif text-lg font-bold text-maroon">Share this wisdom</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="justify-start gap-2 border-gold/20 text-maroon hover:bg-gold/20"
              >
                <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="justify-start gap-2 border-gold/20 text-maroon hover:bg-gold/20"
              >
                <a href={telegramShareUrl} target="_blank" rel="noopener noreferrer">
                  <Send className="size-4" />
                  Telegram
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="justify-start gap-2 border-gold/20 text-maroon hover:bg-gold/20"
              >
                <a href={xShareUrl} target="_blank" rel="noopener noreferrer">
                  <Share2 className="size-4" />X
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="justify-start gap-2 border-gold/20 text-maroon hover:bg-gold/20"
              >
                <a href={emailShareUrl}>
                  <Mail className="size-4" />
                  Email
                </a>
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
