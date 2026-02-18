"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  onClick,
  className,
}: ServiceCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-gold/20 bg-card p-6 transition-all hover:border-gold/50 hover:shadow-lg cursor-pointer",
        className
      )}
    >
      {/* Gold corner accent */}
      <div className="absolute top-0 right-0 size-16 -translate-y-1/2 translate-x-1/2 rounded-full bg-gold/10" />

      <div className="relative flex flex-col gap-3">
        <div className="flex size-12 items-center justify-center rounded-lg bg-saffron/10 text-saffron transition-colors group-hover:bg-saffron/20">
          <Icon className="size-6" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-maroon">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
