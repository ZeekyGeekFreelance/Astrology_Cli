"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-maroon/75" />
      </div>

      {/* Decorative mandala-like circles */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -right-24 size-96 rounded-full border border-gold/20" />
        <div className="absolute -bottom-32 -left-32 size-[500px] rounded-full border border-gold/10" />
        <div className="absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium tracking-widest text-gold uppercase">
            {t("heroSubtitle")}
          </p>
          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-6xl text-balance">
            {t("heroTitle")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/85">
            {t("heroDescription")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full bg-saffron text-cream hover:bg-saffron/90 hover:shadow-lg hover:shadow-saffron/20 transition-all duration-300 active:scale-95 sm:w-auto"
            >
              <Link href="/contact">{t("getReading")}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full border-gold text-gold bg-transparent hover:bg-gold hover:text-maroon shadow-md transition-all duration-300 active:scale-95 sm:w-auto"
            >
              <Link href="/services">{t("exploreServices")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
