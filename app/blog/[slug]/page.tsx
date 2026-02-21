"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, User, ArrowLeft, Share2, Tag, MessageCircle, Send, Mail, Copy } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { resolveFeaturedPostImageUrl, resolveImageAlt, resolveImageUrl } from "@/lib/blog-image-resolver";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/lib/language-context";
import { toast } from "sonner";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { t, language } = useLanguage();
    const [post, setPost] = useState<any>(null);
    const [recentPosts, setRecentPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

    const fetchPost = async () => {
        setLoading(true);
        setError(null);
        try {
            let lastError: unknown = null;
            for (let attempt = 0; attempt < 3; attempt++) {
                try {
                    const response = await fetch(
                        `/api/blog-post?slug=${encodeURIComponent(slug)}`,
                        { cache: "no-store" },
                    );

                    if (!response.ok) {
                        throw new Error(`Blog post request failed: ${response.status}`);
                    }

                    const data = await response.json();
                    setPost(data?.post || null);
                    setRecentPosts(Array.isArray(data?.recentPosts) ? data.recentPosts : []);
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
            console.error("Error fetching post:", err);
            setError("Unable to load this article right now. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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

    if (error) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
                <h1 className="font-serif text-3xl font-bold text-maroon">{error}</h1>
                <div className="flex flex-col items-center gap-3 sm:flex-row">
                    <Button
                        variant="outline"
                        className="border-saffron text-saffron bg-transparent hover:bg-saffron hover:text-white transition-all duration-300"
                        onClick={fetchPost}
                    >
                        Retry
                    </Button>
                    <Button asChild variant="outline" className="border-saffron text-saffron bg-transparent hover:bg-saffron hover:text-white transition-all duration-300">
                        <Link href="/blog">{t("backToBlog")}</Link>
                    </Button>
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

    const imageUrl = resolveFeaturedPostImageUrl(post);

    const categoryLabelMap: Record<string, Record<string, string>> = {
        en: {
            "vedic-knowledge": "Vedic Knowledge",
            remedies: "Remedies",
            festivals: "Festivals",
        },
        hi: {
            "vedic-knowledge": "वैदिक ज्ञान",
            remedies: "उपाय",
            festivals: "त्योहार",
        },
        kn: {
            "vedic-knowledge": "ವೈದಿಕ ಜ್ಞಾನ",
            remedies: "ಪರಿಹಾರಗಳು",
            festivals: "ಹಬ್ಬಗಳು",
        },
    };

    const getCategoryLabel = (categoryValue?: string) => {
        if (!categoryValue) return "";
        return categoryLabelMap[language]?.[categoryValue] ?? categoryLabelMap.en[categoryValue] ?? categoryValue.replace("-", " ");
    };

    const getSharePayload = () => {
        if (typeof window === "undefined") return null;

        const url = window.location.href;
        const title = post?.title || "VedicSages Blog";
        const text = post?.excerpt || "Read this Vedic insight";

        return {
            title,
            text,
            url,
            combinedText: `${title}\n${text}\n${url}`,
        };
    };

    const copyViaTextarea = (text: string) => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        let copied = false;
        try {
            copied = document.execCommand("copy");
        } catch {
            copied = false;
        }

        document.body.removeChild(textarea);
        return copied;
    };

    const copyShareLink = async (url: string) => {
        try {
            if (window.isSecureContext && navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(url);
                toast.success("Blog link copied to clipboard");
                return true;
            }
        } catch {
            // Fall back to textarea copy below.
        }

        const copied = copyViaTextarea(url);
        if (copied) {
            toast.success("Blog link copied to clipboard");
            return true;
        }

        toast.error("Unable to copy link. Please copy from browser address bar.");
        return false;
    };

    const openShareTarget = (targetUrl: string) => {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
    };

    const handleShareOption = async (channel: "whatsapp" | "telegram" | "x" | "email" | "copy") => {
        const payload = getSharePayload();
        if (!payload) return;

        if (channel === "copy") {
            await copyShareLink(payload.url);
            setIsShareDialogOpen(false);
            return;
        }

        if (channel === "whatsapp") {
            openShareTarget(`https://wa.me/?text=${encodeURIComponent(payload.combinedText)}`);
        } else if (channel === "telegram") {
            openShareTarget(
                `https://t.me/share/url?url=${encodeURIComponent(payload.url)}&text=${encodeURIComponent(payload.title)}`,
            );
        } else if (channel === "x") {
            openShareTarget(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(payload.title)}&url=${encodeURIComponent(payload.url)}`,
            );
        } else {
            openShareTarget(
                `mailto:?subject=${encodeURIComponent(payload.title)}&body=${encodeURIComponent(`${payload.text}\n\n${payload.url}`)}`,
            );
        }

        setIsShareDialogOpen(false);
    };

    const handleShare = async () => {
        const payload = getSharePayload();
        if (!payload) return;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: payload.title,
                    text: payload.text,
                    url: payload.url,
                });
                return;
            } catch (err: any) {
                // Ignore user-cancelled share.
                if (err?.name === "AbortError") return;
            }
        }

        setIsShareDialogOpen(true);
    };

    return (
        <>
            <article className="pb-20">
            {/* Article Header */}
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
                        {t("backToBlog")}
                    </Link>
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-cream/80 sm:text-sm">
                        <span className="flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-3 py-1 text-gold">
                            <Tag className="size-4" />
                            {getCategoryLabel(post.category)}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="size-4" />
                            {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                        </span>
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

            {/* Featured Image */}
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

            {/* Content Section */}
            <div className="mx-auto mt-12 grid max-w-7xl gap-12 px-4 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
                {/* Main Content */}
                <div className="rounded-2xl border border-gold/20 bg-card p-6 shadow-sm sm:p-10">
                    <div className="blog-content prose prose-saffron prose-lg max-w-none prose-headings:font-serif prose-p:text-foreground/85 prose-li:text-foreground/85">
                        {post.body ? (
                            <PortableText
                                value={post.body}
                                components={{
                                    types: {
                                        image: ({ value }: any) => (
                                            (() => {
                                                const inlineImageUrl = resolveImageUrl(value, { width: 1200, fit: "max" });

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
                                            })()
                                        ),
                                        imageBlock: ({ value }: any) => {
                                            const blockImageUrl = resolveImageUrl(value, { width: 1200, fit: "max" });

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
                                            const legacyExternalImageUrl = resolveImageUrl(value, { width: 1200, fit: "max" });
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
                                            <h1 className="font-serif text-3xl font-bold text-maroon mt-10 mb-6">
                                                {children}
                                            </h1>
                                        ),
                                        h2: ({ children }) => (
                                            <h2 className="font-serif text-2xl font-bold text-maroon mt-10 mb-6 border-l-4 border-saffron pl-4">
                                                {children}
                                            </h2>
                                        ),
                                        h3: ({ children }) => (
                                            <h3 className="font-serif text-xl font-bold text-maroon mt-8 mb-4">
                                                {children}
                                            </h3>
                                        ),
                                        h4: ({ children }) => (
                                            <h4 className="font-serif text-lg font-semibold text-maroon mt-6 mb-3">
                                                {children}
                                            </h4>
                                        ),
                                    },
                                    list: {
                                        bullet: ({ children }) => (
                                            <ul className="list-disc pl-6 space-y-2 text-foreground/85">
                                                {children}
                                            </ul>
                                        ),
                                        number: ({ children }) => (
                                            <ol className="list-decimal pl-6 space-y-2 text-foreground/85">
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

                {/* Sidebar */}
                <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
                    {/* Recent Posts */}
                    <div className="rounded-2xl border border-gold/20 bg-card p-6 shadow-sm">
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
                                            {getCategoryLabel(rp.category)}
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
                    <div className="rounded-2xl border border-gold/20 bg-gradient-to-b from-muted/40 to-muted/10 p-6 text-center shadow-sm">
                        <h3 className="font-serif text-lg font-bold text-maroon mb-4">Share this wisdom</h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                size="icon"
                                variant="outline"
                                className="rounded-full border-gold/20 text-maroon bg-transparent hover:bg-gold hover:text-maroon transition-all duration-300"
                                onClick={handleShare}
                                aria-label="Share this article"
                            >
                                <Share2 className="size-4" />
                            </Button>
                        </div>
                    </div>
                </aside>
            </div>
            </article>

            <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                <DialogContent className="w-full max-w-[calc(100%-2rem)] border-gold/20 bg-card p-4 sm:max-w-sm sm:p-6">
                    <DialogHeader>
                        <DialogTitle className="font-serif text-maroon">Share this wisdom</DialogTitle>
                        <DialogDescription>
                            Choose how you want to share this article.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="justify-start gap-2 border-gold/20 text-maroon hover:bg-gold/20"
                            onClick={() => void handleShareOption("whatsapp")}
                        >
                            <MessageCircle className="size-4" />
                            WhatsApp
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="justify-start gap-2 border-gold/20 text-maroon hover:bg-gold/20"
                            onClick={() => void handleShareOption("telegram")}
                        >
                            <Send className="size-4" />
                            Telegram
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="justify-start gap-2 border-gold/20 text-maroon hover:bg-gold/20"
                            onClick={() => void handleShareOption("x")}
                        >
                            <Share2 className="size-4" />
                            X
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="justify-start gap-2 border-gold/20 text-maroon hover:bg-gold/20"
                            onClick={() => void handleShareOption("email")}
                        >
                            <Mail className="size-4" />
                            Email
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="col-span-2 justify-start gap-2 border-gold/20 text-maroon hover:bg-gold/20"
                            onClick={() => void handleShareOption("copy")}
                        >
                            <Copy className="size-4" />
                            Copy link
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
