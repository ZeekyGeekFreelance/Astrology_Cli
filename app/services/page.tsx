"use client";

import { useState } from "react";
import {
  Star,
  Hash,
  Palette,
  Gem,
  ScrollText,
  Shield,
  Heart,
  Briefcase,
  Sparkles,
  UserCheck,
  Scale,
  Baby,
  Activity,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";
import { DetailedServiceCard } from "@/components/service-card-detailed";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const detailedServices = [
  {
    icon: Briefcase,
    titleKey: "financial",
    descriptionKey: "financialDesc",
    tags: ["Financial instability", "Investment guidance", "Job & promotions", "Business success"],
  },
  {
    icon: Heart,
    titleKey: "relationships",
    descriptionKey: "relationshipsDesc",
    tags: ["Pre-marriage issues", "Post-marriage problems", "Manglik Dosha (Kuja Dosha)", "Relationship harmony"],
  },
  {
    icon: Activity,
    titleKey: "health",
    descriptionKey: "healthDesc",
    tags: ["Health issues", "Mental wellness", "Sexual problems", "Chronic conditions"],
  },
  {
    icon: Scale,
    titleKey: "legalConsultancy",
    descriptionKey: "legalConsultancyDesc",
    tags: ["Court issues", "Legal disputes", "Property matters", "Contract timing"],
  },
  {
    icon: Baby,
    titleKey: "childrenProblems",
    descriptionKey: "childrenProblemsDesc",
    tags: ["Childbirth timing", "Children problems", "Education guidance", "Family harmony"],
  },
  {
    icon: Shield,
    titleKey: "spiritual",
    descriptionKey: "spiritualDesc",
    tags: ["Sadhe-Sati problems", "Black magic/Evil eye", "Personality crisis", "Destiny enhancement"],
  },
];

export default function ServicesPage() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<typeof detailedServices[0] | null>(null);

  const getWhatsAppLink = (serviceTitle: string) => {
    const message = `Namaste, I am interested in seeking guidance for ${serviceTitle}. Please let me know the process for consultation.`;
    return `https://wa.me/919448313270?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-maroon py-16 lg:py-24">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 -right-20 size-80 rounded-full border border-gold/15" />
          <div className="absolute -bottom-20 -left-20 size-96 rounded-full border border-gold/10" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
          <p className="text-sm font-medium tracking-widest text-gold uppercase">
            {t("servicesSubtitle")}
          </p>
          <h1 className="mt-3 font-serif text-2xl font-bold text-cream sm:text-3xl lg:text-5xl text-balance">
            {t("servicesPageTitle")}
          </h1>
          <p className="mt-4 text-cream/80">{t("servicesPageSubtitle")}</p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full bg-saffron text-cream hover:bg-saffron/90 hover:shadow-lg hover:shadow-saffron/20 transition-all duration-300 active:scale-95 sm:w-auto"
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
                Call Expert
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {detailedServices.map((service) => (
              <DetailedServiceCard
                key={service.titleKey}
                icon={service.icon}
                title={t(service.titleKey)}
                description={t(service.descriptionKey)}
                tags={service.tags}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 rounded-2xl border border-gold/20 bg-card p-12 text-center shadow-lg">
            <h3 className="font-serif text-3xl font-bold text-maroon">
              {t("ctaTitle")}
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              {t("ctaDescription")}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 w-full bg-saffron text-cream hover:bg-saffron/90 shadow-md active:scale-95 sm:w-auto"
            >
              <Link href="/contact">{t("bookConsultation")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Detail Pop-up */}
      <Dialog open={!!selectedService} onOpenChange={(open: boolean) => !open && setSelectedService(null)}>
        <DialogContent className="sm:max-w-2xl border-gold/20 bg-background">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-saffron/10 text-saffron">
                    <selectedService.icon className="size-6" />
                  </div>
                  <DialogTitle className="font-serif text-2xl font-bold text-maroon">
                    {t(selectedService.titleKey)}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-2">
                  {t(selectedService.descriptionKey)}
                  <br /><br />
                  Our expert astrologers provide deep insights into this area of life, utilizing ancient Vedic principles,
                  planetary alignments, and birth chart analysis to guide you towards the most auspicious path.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <h4 className="text-sm font-semibold text-maroon uppercase tracking-wider mb-3">Common Concerns Addressed:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-maroon/5 border border-maroon/10 px-4 py-1 text-sm text-maroon/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gold/10">
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-saffron text-saffron bg-transparent hover:bg-saffron hover:text-cream shadow-sm transition-all duration-300 active:scale-95"
                >
                  <a href="tel:+919480708383">
                    <Phone className="size-4 mr-2" />
                    Call for Consultation
                  </a>
                </Button>
                <Button
                  asChild
                  className="flex-1 bg-[#f47936] text-white hover:bg-[#f47936]/90 shadow-sm active:scale-95 border-none"
                >
                  <a
                    href={getWhatsAppLink(t(selectedService.titleKey))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4 mr-2" />
                    WhatsApp Inquiry
                  </a>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
