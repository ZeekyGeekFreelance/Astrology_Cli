"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, User, ArrowLeft, Share2, Tag } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity/client";
import { POST_BY_SLUG_QUERY, RECENT_POSTS_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/lib/language-context";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { t } = useLanguage();
    const [post, setPost] = useState<any>(null);
    const [recentPosts, setRecentPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            try {
                const [postData, recentData] = await Promise.all([
                    client.fetch(POST_BY_SLUG_QUERY, { slug }),
                    client.fetch(RECENT_POSTS_QUERY),
                ]);
                setPost(postData);
                setRecentPosts(recentData);
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
                <Skeleton className="h-4 w-24 mb-6" />
                <Skeleton className="h-12 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-8" />
                <Skeleton className="aspect-video w-full rounded-xl mb-12" />
                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
                <h1 className="font-serif text-3xl font-bold text-maroon mb-4">Post Not Found</h1>
                <Button asChild variant="outline" className="border-saffron text-saffron bg-transparent hover:bg-saffron hover:text-white transition-all duration-300">
                    <Link href="/blog">Back to Blog</Link>
                </Button>
            </div>
        );
    }

    const imageUrl = post.image ? urlFor(post.image).url() : null;

    return (
        <article className="pb-20">
            {/* Article Header */}
            <header className="relative bg-muted/30 py-16 lg:py-24">
                <div className="mx-auto max-w-4xl px-4 lg:px-8">
                    <Link
                        href="/blog"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-saffron hover:opacity-80"
                    >
                        <ArrowLeft className="size-4" />
                        {t("backToBlog")}
                    </Link>
                    <div className="mb-4 flex items-center gap-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        <span className="flex items-center gap-2 text-saffron">
                            <Tag className="size-4" />
                            {post.category.replace("-", " ")}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="size-4" />
                            {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                        </span>
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-maroon lg:text-5xl text-balance leading-tight">
                        {post.title}
                    </h1>
                    {post.author && (
                        <div className="mt-6 flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-maroon/10 text-maroon">
                                <User className="size-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-maroon">{post.author}</p>
                                <p className="text-xs text-muted-foreground">Expert Vedic Astrologer</p>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Featured Image */}
            {imageUrl && (
                <div className="mx-auto -mt-10 max-w-5xl px-4 lg:px-8">
                    <div className="aspect-video overflow-hidden rounded-xl border border-gold/20 shadow-xl">
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Content Section */}
            <div className="mx-auto mt-12 grid max-w-7xl gap-12 px-4 lg:mt-20 lg:grid-cols-[1fr_300px] lg:px-8">
                {/* Main Content */}
                <div className="prose prose-saffron prose-lg max-w-none">
                    {post.body ? (
                        <PortableText
                            value={post.body}
                            components={{
                                types: {
                                    image: ({ value }: any) => (
                                        <div className="my-10 overflow-hidden rounded-lg border border-gold/10">
                                            <img
                                                src={urlFor(value).url()}
                                                alt="Content Image"
                                                className="w-full"
                                            />
                                        </div>
                                    ),
                                },
                                block: {
                                    h2: ({ children }) => (
                                        <h2 className="font-serif text-2xl font-bold text-maroon mt-10 mb-6">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="font-serif text-xl font-bold text-maroon mt-8 mb-4">
                                            {children}
                                        </h3>
                                    ),
                                },
                            }}
                        />
                    ) : (
                        <p>{post.excerpt}</p>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="space-y-12">
                    {/* Recent Posts */}
                    <div>
                        <h3 className="mb-6 font-serif text-lg font-bold text-maroon border-b border-gold/20 pb-2">
                            {t("recentPosts")}
                        </h3>
                        <div className="space-y-6">
                            {recentPosts
                                .filter((rp) => rp._id !== post._id)
                                .slice(0, 5)
                                .map((rp) => (
                                    <Link
                                        key={rp._id}
                                        href={`/blog/${rp.slug.current}`}
                                        className="group block"
                                    >
                                        <p className="text-xs text-saffron uppercase tracking-widest mb-1">
                                            {rp.category.replace("-", " ")}
                                        </p>
                                        <h4 className="font-serif text-sm font-semibold text-maroon group-hover:text-saffron transition-colors line-clamp-2">
                                            {rp.title}
                                        </h4>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {format(new Date(rp.publishedAt), "MMM d, yyyy")}
                                        </p>
                                    </Link>
                                ))}
                        </div>
                    </div>

                    {/* Share */}
                    <div className="rounded-lg border border-gold/20 bg-muted/30 p-6 text-center">
                        <h3 className="font-serif text-lg font-bold text-maroon mb-4">Share this wisdom</h3>
                        <div className="flex justify-center gap-4">
                            <Button size="icon" variant="outline" className="rounded-full border-gold/20 text-maroon bg-transparent hover:bg-gold hover:text-maroon transition-all duration-300">
                                <Share2 className="size-4" />
                            </Button>
                        </div>
                    </div>
                </aside>
            </div>
        </article>
    );
}
