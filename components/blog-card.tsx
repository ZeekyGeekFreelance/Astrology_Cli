"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity/image";

interface BlogCardProps {
    post: {
        title: string;
        slug: { current: string };
        excerpt?: string;
        image?: any;
        publishedAt: string;
        author?: string;
        category: string;
    };
}

export function BlogCard({ post }: BlogCardProps) {
    const imageUrl = post.image ? urlFor(post.image).url() : null;

    return (
        <article className="group overflow-hidden rounded-lg border border-gold/20 bg-card transition-all hover:border-gold/40 hover:shadow-lg">
            <Link href={`/blog/${post.slug.current}`} className="block aspect-video overflow-hidden">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-maroon/5 text-maroon/20">
                        <Calendar className="size-12" />
                    </div>
                )}
            </Link>
            <div className="p-6">
                <div className="mb-3 flex items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <span className="text-saffron">{post.category.replace("-", " ")}</span>
                    <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {format(new Date(post.publishedAt), "MMM d, yyyy")}
                    </span>
                </div>
                <h3 className="mb-2 font-serif text-xl font-bold text-maroon line-clamp-2 group-hover:text-saffron transition-colors">
                    <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
                </h3>
                {post.excerpt && (
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt}
                    </p>
                )}
                <div className="flex items-center justify-between">
                    {post.author && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <User className="size-3" />
                            <span>{post.author}</span>
                        </div>
                    )}
                    <Button asChild variant="ghost" size="sm" className="ml-auto text-saffron hover:text-white hover:bg-saffron transition-all duration-300 p-2 font-bold active:scale-95">
                        <Link href={`/blog/${post.slug.current}`} className="flex items-center gap-2">
                            Read More <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </article>
    );
}
