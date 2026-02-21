"use client";

import { useEffect, useState } from "react";
import { BookOpen, Sparkles, Filter } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { useLanguage } from "@/lib/language-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const categories = [
    { key: "all", value: "all" },
    { key: "vedic-knowledge", value: "vedic-knowledge" },
    { key: "remedies", value: "remedies" },
    { key: "festivals", value: "festivals" },
];

export default function BlogPage() {
    const { t, language } = useLanguage();
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    const categoryLabelMap: Record<string, Record<string, string>> = {
        en: {
            all: t("allCategories"),
            "vedic-knowledge": "Vedic Knowledge",
            remedies: "Remedies",
            festivals: "Festivals",
        },
        hi: {
            all: t("allCategories"),
            "vedic-knowledge": "वैदिक ज्ञान",
            remedies: "उपाय",
            festivals: "त्योहार",
        },
        kn: {
            all: t("allCategories"),
            "vedic-knowledge": "ವೈದಿಕ ಜ್ಞಾನ",
            remedies: "ಪರಿಹಾರಗಳು",
            festivals: "ಹಬ್ಬಗಳು",
        },
    };

    const getCategoryLabel = (categoryKey: string) =>
        categoryLabelMap[language]?.[categoryKey] ?? categoryLabelMap.en[categoryKey] ?? categoryKey;

    const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = posts.slice(startIndex, endIndex);
    const hasPagination = posts.length > postsPerPage;

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const categoryQuery =
                activeCategory === "all" ? "" : `?category=${encodeURIComponent(activeCategory)}`;

            let lastError: unknown = null;
            for (let attempt = 0; attempt < 3; attempt++) {
                try {
                    const response = await fetch(`/api/blog-posts${categoryQuery}`, { cache: "no-store" });

                    if (!response.ok) {
                        throw new Error(`Blog posts request failed: ${response.status}`);
                    }

                    const data = await response.json();
                    setPosts(Array.isArray(data?.posts) ? data.posts : []);
                    setLoading(false);
                    return;
                } catch (err) {
                    lastError = err;
                    if (attempt < 2) {
                        await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
                    }
                }
            }

            throw lastError;
        } catch (err) {
            console.error("Error fetching posts:", err);
            setPosts([]);
            setError("Unable to load blog posts right now. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [activeCategory]);

    useEffect(() => {
        const updatePageSize = () => {
            setPostsPerPage(window.innerWidth >= 1024 ? 6 : 4);
        };

        updatePageSize();
        window.addEventListener("resize", updatePageSize);
        return () => window.removeEventListener("resize", updatePageSize);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    return (
        <div className="min-h-screen">
            {/* Hero Header */}
            <section className="relative overflow-hidden bg-maroon py-16 lg:py-24">
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <div className="absolute -top-20 -right-20 size-80 rounded-full border border-gold/15" />
                    <div className="absolute -bottom-20 -left-20 size-96 rounded-full border border-gold/10" />
                </div>
                <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
                    <BookOpen className="mx-auto size-10 text-gold" />
                    <h1 className="mt-4 font-serif text-2xl font-bold text-cream sm:text-3xl lg:text-5xl text-balance">
                        {t("blogTitle")}
                    </h1>
                    <p className="mt-3 text-cream/80">{t("blogSubtitle")}</p>
                </div>
            </section>

            {/* Blog Content */}
            <section className="py-12 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    {/* Categories Filter */}
                    <div className="mb-12 flex flex-col items-center gap-6">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-widest">
                            <Filter className="size-4" />
                            <span>Filter By</span>
                        </div>
                        <Tabs
                            defaultValue="all"
                            className="w-full max-w-2xl"
                            onValueChange={(value) => {
                                setCurrentPage(1);
                                setActiveCategory(value);
                            }}
                        >
                            <TabsList className="grid h-auto w-full grid-cols-2 gap-1 bg-maroon/18 p-1.5 lg:grid-cols-4">
                                {categories.map((cat) => (
                                    <TabsTrigger
                                        key={cat.value}
                                        value={cat.value}
                                        className="h-9 px-2 py-0 text-sm leading-none whitespace-nowrap bg-cream/90 text-maroon/80 data-[state=active]:bg-maroon/75 data-[state=active]:text-cream"
                                    >
                                        {getCategoryLabel(cat.key)}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>

                    {loading ? (
                        <div className="card-reveal is-visible grid gap-8 sm:grid-cols-2 lg:grid-cols-3" style={{ ["--reveal-delay" as any]: "80ms" }}>
                            {Array.from({ length: postsPerPage }).map((_, i) => (
                                <div key={i} className="flex flex-col gap-4">
                                    <Skeleton className="aspect-video w-full rounded-lg" />
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-8 w-full" />
                                    <Skeleton className="h-20 w-full" />
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gold/20 bg-card p-8 text-center">
                            <p className="text-base text-maroon">{error}</p>
                            <Button
                                variant="outline"
                                className="border-saffron text-saffron hover:bg-saffron hover:text-white"
                                onClick={fetchPosts}
                            >
                                Retry
                            </Button>
                        </div>
                    ) : posts.length > 0 ? (
                        <>
                            <div className="card-reveal is-visible grid gap-8 sm:grid-cols-2 lg:grid-cols-3" style={{ ["--reveal-delay" as any]: "80ms" }}>
                                {paginatedPosts.map((post) => (
                                    <BlogCard key={post._id} post={post} />
                                ))}
                            </div>

                            <div className="mt-10 flex flex-col items-center justify-center gap-4">
                                <p className="text-sm text-muted-foreground">
                                    Showing {startIndex + 1}-{Math.min(endIndex, posts.length)} of {posts.length} posts
                                </p>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-gold/30 text-maroon bg-card hover:bg-gold/15 disabled:opacity-40"
                                        disabled={currentPage === 1 || !hasPagination}
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    >
                                        Previous
                                    </Button>
                                    <span className="min-w-20 text-center text-sm font-medium text-maroon">
                                        {currentPage} / {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-gold/30 text-maroon bg-card hover:bg-gold/15 disabled:opacity-40"
                                        disabled={currentPage === totalPages || !hasPagination}
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <Sparkles className="size-12 text-maroon/20 mb-4" />
                            <p className="text-xl font-serif text-maroon/60">
                                {t("noPosts")}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}


