"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DecorativeDivider } from "@/components/decorative-border";
import { useLanguage } from "@/lib/language-context";

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Bengaluru",
    text: "VedicSages provided an incredibly accurate birth chart analysis. Their gemstone recommendations changed my career trajectory within months.",
  },
  {
    name: "Priya Sharma",
    location: "Mysuru",
    text: "The name suggestion for our newborn was so thoughtfully done. The pandit explained every detail about the Nakshatram alignment. Truly grateful.",
  },
  {
    name: "Anand Murthy",
    location: "Hubli",
    text: "After years of financial struggles, the remedies suggested by VedicSages brought remarkable improvement. Their Sadhe-Sati guidance was spot on.",
  },
  {
    name: "Kavitha Rao",
    location: "Mangaluru",
    text: "The marriage compatibility analysis was thorough and deeply insightful. VedicSages helped us make a confident and blessed decision.",
  },
];

export function TestimonialsSection() {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-maroon lg:text-4xl text-balance">
            {t("testimonialsTitle")}
          </h2>
          <DecorativeDivider className="mt-4" />
        </div>

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="min-w-0 flex-[0_0_100%] px-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <div className="flex h-full flex-col gap-4 rounded-lg border border-gold/20 bg-card p-6">
                    <Quote className="size-8 text-gold/40" />
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground italic">
                      {'"'}{item.text}{'"'}
                    </p>
                    <div className="border-t border-gold/10 pt-4">
                      <p className="font-serif font-semibold text-maroon">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="border-gold/30 text-maroon hover:bg-gold/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <div
                  key={idx}
                  className={`size-2 rounded-full transition-colors ${
                    idx === selectedIndex ? "bg-saffron" : "bg-gold/30"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="border-gold/30 text-maroon hover:bg-gold/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
