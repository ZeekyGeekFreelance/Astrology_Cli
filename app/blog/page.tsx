"use client";

import { useEffect, useState } from "react";
import { BookOpen, Sparkles, Filter } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { DecorativeDivider } from "@/components/decorative-border";
import { useLanguage } from "@/lib/language-context";
import { client } from "@/lib/sanity/client";
import { POSTS_QUERY, POSTS_BY_CATEGORY_QUERY } from "@/lib/sanity/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
    { key: "all", value: "all" },
    { key: "daily-horoscope", value: "daily-horoscope" },
    { key: "vedic-knowledge", value: "vedic-knowledge" },
    { key: "remedies", value: "remedies" },
    { key: "festivals", value: "festivals" },
];

export default function BlogPage() {
    const { t } = useLanguage();
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            try {
                const query = activeCategory === "all" ? POSTS_QUERY : POSTS_BY_CATEGORY_QUERY;
                const params = activeCategory === "all" ? {} : { category: activeCategory };
                const data = await client.fetch(query, params);
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [activeCategory]);

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
                            <span>{t("allCategories")}</span>
                        </div>
                        <Tabs
                            defaultValue="all"
                            className="w-full max-w-2xl"
                            onValueChange={setActiveCategory}
                        >
                            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-muted/50 p-1">
                                {categories.map((cat) => (
                                    <TabsTrigger
                                        key={cat.value}
                                        value={cat.value}
                                        className="data-[state=active]:bg-card data-[state=active]:text-saffron"
                                    >
                                        {cat.key === "all" ? t("allCategories") : cat.key.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>

                    {loading ? (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="flex flex-col gap-4">
                                    <Skeleton className="aspect-video w-full rounded-lg" />
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-8 w-full" />
                                    <Skeleton className="h-20 w-full" />
                                </div>
                            ))}
                        </div>
                    ) : posts.length > 0 ? (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <BlogCard key={post._id} post={post} />
                            ))}
                        </div>
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
