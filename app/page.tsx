"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Star,
  Hash,
  Palette,
  Gem,
  ScrollText,
  Shield,
  Briefcase,
  Heart,
  Activity,
  Sparkles,
  Phone,
  MessageCircle,
  Users,
  Calendar,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/service-card";
import { DecorativeDivider } from "@/components/decorative-border";
import { useLanguage } from "@/lib/language-context";
import { HeroSection } from "@/components/hero-section";
import { TestimonialsSection } from "@/components/testimonials-section";

const services = [
  {
    icon: Star,
    titleKey: "nameSuggestion",
    descKey: "nameSuggestionDesc",
    href: "/recommendations",
  },
  {
    icon: Hash,
    titleKey: "luckyNumber",
    descKey: "luckyNumberDesc",
    href: "/recommendations",
  },
  {
    icon: Palette,
    titleKey: "luckyColor",
    descKey: "luckyColorDesc",
    href: "/recommendations",
  },
  {
    icon: Gem,
    titleKey: "gemstones",
    descKey: "gemstonesDesc",
    href: "/recommendations",
  },
  {
    icon: ScrollText,
    titleKey: "birthChartAnalysis",
    descKey: "birthChartAnalysisDesc",
    href: "/recommendations",
  },
  {
    icon: Shield,
    titleKey: "doshaRemedies",
    descKey: "doshaRemediesDesc",
    href: "/services",
  },
];

const challenges = [
  { icon: Briefcase, titleKey: "financial", descKey: "financialDesc" },
  { icon: Heart, titleKey: "relationships", descKey: "relationshipsDesc" },
  { icon: Activity, titleKey: "health", descKey: "healthDesc" },
  { icon: Sparkles, titleKey: "spiritual", descKey: "spiritualDesc" },
];

const stats = [
  { icon: Award, valueKey: "yearsExperience", target: 25, suffix: "+" },
  { icon: Users, valueKey: "happyClients", target: 10000, suffix: "+" },
  { icon: Calendar, valueKey: "consultations", target: 50000, suffix: "+" },
];

// Stats count-up starts very near final value to keep the motion subtle.
const getStatStartValue = (target: number) => Math.max(0, target - 4);

export default function HomePage() {
  const { t } = useLanguage();
  const statsSectionRef = useRef<HTMLElement>(null);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>(() =>
    stats.map((item) => getStatStartValue(item.target)),
  );

  useEffect(() => {
    // Start stats animation only when stats section is visible.
    const sectionEl = statsSectionRef.current;
    if (!sectionEl || hasAnimatedStats) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimatedStats(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, [hasAnimatedStats]);

  useEffect(() => {
    // Animate stat numbers from start value -> target.
    if (!hasAnimatedStats) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimatedValues(stats.map((item) => item.target));
      return;
    }

    const duration = 1400;
    const startTime = performance.now();

    let frameId = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues(
        stats.map((item) => {
          const startValue = getStatStartValue(item.target);
          return Math.round(startValue + (item.target - startValue) * eased);
        }),
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [hasAnimatedStats]);

  return (
    <div>
      {/* Hero */}
      <HeroSection />

      {/* Services Overview */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-medium tracking-widest text-saffron uppercase">
              {t("servicesSubtitle")}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-maroon lg:text-4xl text-balance">
              {t("servicesTitle")}
            </h2>
            <DecorativeDivider className="mt-4" />
          </div>

          <div className="card-reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ ["--reveal-delay" as any]: "80ms" }}>
            {services.map((s) => (
              <ServiceCard
                key={s.titleKey}
                icon={s.icon}
                title={t(s.titleKey)}
                description={t(s.descKey)}
                onClick={() => (window.location.href = s.href)}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button
              asChild
              variant="outline"
              className="border-saffron text-saffron bg-transparent hover:bg-saffron hover:text-white transition-all duration-300"
            >
              <Link href="/services">{t("exploreServices")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Life Challenges */}
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-maroon lg:text-4xl text-balance">
              {t("problemsTitle")}
            </h2>
            <DecorativeDivider className="mt-4" />
          </div>

          <div className="card-reveal grid gap-6 sm:grid-cols-2" style={{ ["--reveal-delay" as any]: "120ms" }}>
            {challenges.map((c) => (
              <div
                key={c.titleKey}
                className="flex gap-4 rounded-lg border border-gold/20 bg-card p-6 cursor-pointer hover:border-gold/40 transition-all active:scale-95"
                onClick={() => (window.location.href = "/services")}
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-maroon/10 text-maroon">
                  <c.icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-maroon">
                    {t(c.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {t(c.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsSectionRef} className="border-y border-gold/20 bg-maroon py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center justify-center gap-12 px-4 sm:grid-cols-3 lg:px-8">
          {/* Animated counters */}
          {stats.map((s, index) => (
            <div
              key={s.valueKey}
              className="flex flex-col items-center gap-2 text-center"
            >
              <s.icon className="size-8 text-gold" />
              <span className="font-serif text-3xl font-bold text-cream">
                {animatedValues[index].toLocaleString()}
                {s.suffix}
              </span>
              <span className="text-sm text-cream/70">{t(s.valueKey)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-saffron py-16 lg:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full border-[40px] border-cream" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-cream lg:text-4xl text-balance">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/90">
            {t("ctaDescription")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full bg-cream text-maroon hover:bg-cream/90 transition-all shadow-md active:scale-95 sm:w-auto"
            >
              <Link href="/contact">{t("bookConsultation")}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full border-cream text-cream bg-transparent hover:bg-cream hover:text-maroon shadow-md transition-all duration-300 active:scale-95 sm:w-auto"
            >
              <a href="tel:+919480708383">
                <Phone className="size-4 mr-2" />
                +91 94807 08383
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="w-full border bg-[#f47936] text-white hover:bg-[#f47936]/50 shadow-lg active:scale-95 sm:w-auto"
            >
              <a
                href={`https://wa.me/919448313270?text=${encodeURIComponent("Namaste Guruji, I would like to book an astrology consultation. Please share the next steps.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}




