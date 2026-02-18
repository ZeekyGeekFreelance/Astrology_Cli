"use client";

import { Star, Sparkles, Wand2 } from "lucide-react";
import { RecommendationForms } from "@/components/recommendation-forms";
import { useLanguage } from "@/lib/language-context";

export default function RecommendationsPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen">
            {/* Hero Header */}
            <section className="relative overflow-hidden bg-maroon py-16 lg:py-24">
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <div className="absolute -top-20 -right-20 size-80 rounded-full border border-gold/15" />
                    <div className="absolute -bottom-20 -left-20 size-96 rounded-full border border-gold/10" />
                </div>
                <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
                    <Wand2 className="mx-auto size-10 text-gold" />
                    <h1 className="mt-4 font-serif text-3xl font-bold text-cream lg:text-5xl text-balance">
                        {t("recommendations")}
                    </h1>
                    <p className="mt-3 text-cream/80">
                        Ancient Vedic astrology combined with modern calculation to reveal your cosmic favorites
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 lg:py-24 bg-muted/30">
                <div className="mx-auto max-w-4xl px-4 lg:px-8">
                    <RecommendationForms />

                    {/* Additional Info */}
                    <div className="mt-16 grid gap-8 sm:grid-cols-2">
                        <div className="rounded-xl border border-gold/10 bg-card p-8">
                            <h3 className="font-serif text-xl font-bold text-maroon mb-4">How it works</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Our recommendation engine uses your Nakshatra (birth star) and Raashi (moon sign) to identify
                                syllables, numbers, and colors that resonate with your planetary energy. These elements are
                                calculated based on traditional Jyotish principles to enhance your cosmic harmony and attract prosperity.
                            </p>
                        </div>
                        <div className="rounded-xl border border-gold/10 bg-card p-8">
                            <h3 className="font-serif text-xl font-bold text-maroon mb-4">Applying Remedies</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                While these recommendations provide a great starting point, a full Birth Chart Analysis (Kundali)
                                is recommended for deeper life challenges. Incorporating your lucky colors and numbers into
                                daily routines helps align your energy with the beneficial planetary transits.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-12 bg-white text-center border-t border-gold/10">
                <Sparkles className="mx-auto size-8 text-gold opacity-50 mb-4" />
                <h2 className="font-serif text-2xl text-maroon italic opacity-80 px-4">
                    "The stars guide us, but we must choose to follow the path of light."
                </h2>
            </section>
        </div>
    );
}
