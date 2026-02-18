"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface DetailedServiceCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    tags: string[];
    onClick?: () => void;
    className?: string;
}

export function DetailedServiceCard({
    icon: Icon,
    title,
    description,
    tags,
    onClick,
    className,
}: DetailedServiceCardProps) {
    return (
        <Card
            onClick={onClick}
            className={cn(
                "group relative h-full overflow-hidden border-gold/20 bg-card p-6 transition-all hover:border-gold/50 hover:shadow-lg cursor-pointer",
                className
            )}
        >
            <CardContent className="flex h-full flex-col p-0">
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex size-14 items-center justify-center rounded-xl bg-saffron/10 text-saffron shadow-inner group-hover:bg-saffron/20 transition-all duration-300">
                        <Icon className="size-7" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-maroon group-hover:text-saffron transition-colors">
                        {title}
                    </h3>
                </div>

                <p className="mb-8 text-base leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                    {description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-maroon/5 border border-maroon/10 px-4 py-1.5 text-xs font-medium text-maroon/70 hover:bg-maroon/10 hover:text-maroon transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
