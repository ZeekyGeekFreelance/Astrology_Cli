"use client";

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
  { icon: Star, titleKey: "nameSuggestion", descKey: "nameSuggestionDesc" },
  { icon: Hash, titleKey: "luckyNumber", descKey: "luckyNumberDesc" },
  { icon: Palette, titleKey: "luckyColor", descKey: "luckyColorDesc" },
  { icon: Gem, titleKey: "gemstones", descKey: "gemstonesDesc" },
  {
    icon: ScrollText,
    titleKey: "birthChartAnalysis",
    descKey: "birthChartAnalysisDesc",
  },
  { icon: Shield, titleKey: "doshaRemedies", descKey: "doshaRemediesDesc" },
];

const challenges = [
  { icon: Briefcase, titleKey: "financial", descKey: "financialDesc" },
  { icon: Heart, titleKey: "relationships", descKey: "relationshipsDesc" },
  { icon: Activity, titleKey: "health", descKey: "healthDesc" },
  { icon: Sparkles, titleKey: "spiritual", descKey: "spiritualDesc" },
];

const stats = [
  { icon: Award, valueKey: "yearsExperience", value: "25+" },
  { icon: Users, valueKey: "happyClients", value: "10,000+" },
  { icon: Calendar, valueKey: "consultations", value: "50,000+" },
];

export default function HomePage() {
  const { t } = useLanguage();

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

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard
                key={s.titleKey}
                icon={s.icon}
                title={t(s.titleKey)}
                description={t(s.descKey)}
                onClick={() => window.location.href = "/services"}
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

          <div className="grid gap-6 sm:grid-cols-2">
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
      <section className="border-y border-gold/20 bg-maroon py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center justify-center gap-12 px-4 sm:grid-cols-3 lg:px-8">
          {stats.map((s) => (
            <div
              key={s.valueKey}
              className="flex flex-col items-center gap-2 text-center"
            >
              <s.icon className="size-8 text-gold" />
              <span className="font-serif text-3xl font-bold text-cream">
                {s.value}
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
              className="w-full bg-[#f47936] text-white hover:bg-[#f47936]/50 shadow-lg active:scale-95 sm:w-auto"
            >
              <a
                href="https://wa.me/919448313270"
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
