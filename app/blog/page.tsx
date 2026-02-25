import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Filter, Sparkles } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/sanity/client";
import { POSTS_BY_CATEGORY_QUERY, POSTS_QUERY } from "@/lib/sanity/queries";
import { getSiteUrl } from "@/lib/site-url";

type BlogPageProps = {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
};

type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  image?: {
    alt?: string;
    externalUrl?: string;
    asset?: { _ref: string };
  };
  externalImageUrl?: string;
  publishedAt: string;
  author?: string;
  category: string;
};

const POSTS_PER_PAGE = 6;

const categories = [
  { value: "all", label: "All" },
  { value: "vedic-knowledge", label: "Vedic Knowledge" },
  { value: "remedies", label: "Remedies" },
  { value: "festivals", label: "Festivals" },
] as const;

const allowedCategories = new Set(categories.map((category) => category.value));

const getCategoryLabel = (categoryValue: string) => {
  return (
    categories.find((category) => category.value === categoryValue)?.label ??
    categoryValue
  );
};

const parsePositiveInt = (value: string | undefined, fallback = 1) => {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const normalizeCategory = (value: string | undefined) => {
  if (!value || !allowedCategories.has(value as (typeof categories)[number]["value"])) {
    return "all";
  }

  return value;
};

const buildBlogHref = (category: string, page: number) => {
  const params = new URLSearchParams();

  if (category !== "all") params.set("category", category);
  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
};

const getPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  try {
    const query = category === "all" ? POSTS_QUERY : POSTS_BY_CATEGORY_QUERY;
    const params = category === "all" ? {} : { category };
    const posts = await client.fetch<BlogPost[]>(query, params);
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error("Blog page fetch failed:", error);
    return [];
  }
};

export const revalidate = 300;

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const category = normalizeCategory(resolvedSearchParams.category);
  const page = parsePositiveInt(resolvedSearchParams.page, 1);
  const categoryLabel = getCategoryLabel(category);
  const siteUrl = getSiteUrl();
  const canonicalPath = buildBlogHref(category, page);

  const title =
    category === "all"
      ? "Vedic Astrology Blog"
      : `${categoryLabel} Articles - Vedic Astrology Blog`;
  const description =
    category === "all"
      ? "Read Vedic astrology articles on remedies, festivals, birth chart insights, and spiritual guidance from VedicSages."
      : `Explore ${categoryLabel.toLowerCase()} articles from VedicSages with practical Vedic astrology insights and remedies.`;

  return {
    title,
    description,
    keywords: [
      "Vedic astrology blog",
      "astrology remedies",
      "birth chart insights",
      "spiritual guidance",
      category === "all" ? "vedic astrology" : categoryLabel,
    ],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: siteUrl ? `${siteUrl}${canonicalPath}` : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const category = normalizeCategory(resolvedSearchParams.category);
  const requestedPage = parsePositiveInt(resolvedSearchParams.page, 1);
  const posts = await getPostsByCategory(category);

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, endIndex);
  const hasPagination = posts.length > POSTS_PER_PAGE;

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-maroon py-16 lg:py-24">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 -right-20 size-80 rounded-full border border-gold/15" />
          <div className="absolute -bottom-20 -left-20 size-96 rounded-full border border-gold/10" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
          <BookOpen className="mx-auto size-10 text-gold" />
          <h1 className="mt-4 font-serif text-2xl font-bold text-cream sm:text-3xl lg:text-5xl text-balance">
            Vedic Wisdom Blog
          </h1>
          <p className="mt-3 text-cream/80">
            Insights, remedies, and traditional Vedic astrology guidance for
            modern life.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-widest">
              <Filter className="size-4" />
              <span>Filter By</span>
            </div>
            <div className="grid w-full max-w-2xl grid-cols-2 gap-2 lg:grid-cols-4">
              {categories.map((cat) => {
                const isActive = category === cat.value;
                return (
                  <Link
                    key={cat.value}
                    href={buildBlogHref(cat.value, 1)}
                    className={`rounded-md px-3 py-2 text-center text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-maroon text-cream"
                        : "bg-maroon/10 text-maroon hover:bg-maroon/20"
                    }`}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {paginatedPosts.length > 0 ? (
            <>
              <div
                className="card-reveal is-visible grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                style={{ ["--reveal-delay" as any]: "80ms" }}
              >
                {paginatedPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, posts.length)} of {" "}
                  {posts.length} posts
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-gold/30 text-maroon bg-card hover:bg-gold/15 disabled:opacity-40"
                    disabled={currentPage === 1 || !hasPagination}
                  >
                    <Link href={buildBlogHref(category, Math.max(currentPage - 1, 1))}>
                      Previous
                    </Link>
                  </Button>
                  <span className="min-w-20 text-center text-sm font-medium text-maroon">
                    {currentPage} / {totalPages}
                  </span>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-gold/30 text-maroon bg-card hover:bg-gold/15 disabled:opacity-40"
                    disabled={currentPage === totalPages || !hasPagination}
                  >
                    <Link
                      href={buildBlogHref(category, Math.min(currentPage + 1, totalPages))}
                    >
                      Next
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Sparkles className="mb-4 size-12 text-maroon/20" />
              <p className="text-xl font-serif text-maroon/60">
                No posts found for this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
