"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Star, Sparkles, Zap, Sunrise, Sunset, CalendarDays } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { DecorativeDivider } from "@/components/decorative-border";
import { useLanguage } from "@/lib/language-context";
import { client } from "@/lib/sanity/client";
import { PANCHANG_TODAY_QUERY, PANCHANG_LATEST_QUERY } from "@/lib/sanity/queries";
import { format } from "date-fns";

interface PanchangData {
  _id: string;
  date: string;
  tithi: string;
  vara: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  sunrise?: string;
  sunset?: string;
  specialEvent?: string;
}

const panchangElements = [
  { key: "tithi", icon: Moon, color: "text-saffron", bg: "bg-saffron/10" },
  { key: "vara", icon: CalendarDays, color: "text-maroon", bg: "bg-maroon/10" },
  { key: "nakshatra", icon: Star, color: "text-gold", bg: "bg-gold/10" },
  { key: "yoga", icon: Sparkles, color: "text-saffron", bg: "bg-saffron/10" },
  { key: "karana", icon: Zap, color: "text-maroon", bg: "bg-maroon/10" },
];

// Sample/fallback data when Sanity has no entries
const samplePanchang: PanchangData = {
  _id: "sample",
  date: format(new Date(), "yyyy-MM-dd"),
  tithi: "Dashami (Shukla Paksha)",
  vara: "Budhavara (Wednesday)",
  nakshatra: "Pushya",
  yoga: "Shubha",
  karana: "Vishti",
  sunrise: "6:28 AM",
  sunset: "6:15 PM",
  specialEvent: "Auspicious day for new beginnings",
};

export default function PanchangPage() {
  const { t } = useLanguage();
  const [panchang, setPanchang] = useState<PanchangData | null>(null);
  const [loading, setLoading] = useState(true);
  const [usingSample, setUsingSample] = useState(false);

  useEffect(() => {
    async function fetchPanchang() {
      try {
        const today = format(new Date(), "yyyy-MM-dd");
        // Try today's panchang first
        let data = await client.fetch(PANCHANG_TODAY_QUERY, { date: today });
        if (!data) {
          // Fall back to latest entry
          data = await client.fetch(PANCHANG_LATEST_QUERY);
        }
        if (data) {
          setPanchang(data);
        } else {
          // Use sample data if Sanity has no entries
          setPanchang(samplePanchang);
          setUsingSample(true);
        }
      } catch {
        // On error (e.g. Sanity not configured), use sample data
        setPanchang(samplePanchang);
        setUsingSample(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPanchang();
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-maroon py-16 lg:py-24">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 -right-20 size-80 rounded-full border border-gold/15" />
          <div className="absolute -bottom-20 -left-20 size-96 rounded-full border border-gold/10" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
          <Sun className="mx-auto size-10 text-gold" />
          <h1 className="mt-4 font-serif text-3xl font-bold text-cream lg:text-5xl text-balance">
            {t("panchangPageTitle")}
          </h1>
          <p className="mt-3 text-cream/80">{t("panchangPageSubtitle")}</p>
        </div>
      </section>

      {/* Panchang Content */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          {/* Date Header */}
          <div className="mb-10 text-center">
            <h2 className="font-serif text-2xl font-bold text-maroon lg:text-3xl">
              {t("panchangTitle")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {panchang?.date
                ? format(new Date(panchang.date + "T12:00:00"), "EEEE, MMMM d, yyyy")
                : format(new Date(), "EEEE, MMMM d, yyyy")}
            </p>
            <DecorativeDivider className="mt-4" />
            {usingSample && (
              <p className="mt-3 rounded-md bg-gold/10 px-4 py-2 text-xs text-muted-foreground inline-block">
                Sample data shown. Add entries via the /admin panel.
              </p>
            )}
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-lg" />
              ))}
            </div>
          ) : panchang ? (
            <>
              {/* Special Event Banner */}
              {panchang.specialEvent && (
                <div className="mb-8 flex items-center justify-center gap-3 rounded-lg border border-gold/30 bg-gold/10 px-6 py-4">
                  <Sparkles className="size-5 text-gold" />
                  <p className="font-serif font-semibold text-maroon">
                    {panchang.specialEvent}
                  </p>
                </div>
              )}

              {/* Five Elements Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {panchangElements.map((el) => {
                  const value =
                    panchang[el.key as keyof PanchangData] as string;
                  return (
                    <div
                      key={el.key}
                      className="flex flex-col items-center gap-3 rounded-lg border border-gold/20 bg-card p-6 text-center transition-all hover:border-gold/40 hover:shadow-md"
                    >
                      <div
                        className={`flex size-14 items-center justify-center rounded-full ${el.bg}`}
                      >
                        <el.icon className={`size-7 ${el.color}`} />
                      </div>
                      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                        {t(el.key)}
                      </p>
                      <p className="font-serif text-lg font-semibold text-maroon">
                        {value || "---"}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Sunrise/Sunset */}
              {(panchang.sunrise || panchang.sunset) && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-8 rounded-lg border border-gold/20 bg-muted/50 p-6">
                  {panchang.sunrise && (
                    <div className="flex items-center gap-3">
                      <Sunrise className="size-6 text-saffron" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">
                          {t("sunrise")}
                        </p>
                        <p className="font-serif text-lg font-semibold text-maroon">
                          {panchang.sunrise}
                        </p>
                      </div>
                    </div>
                  )}
                  {panchang.sunset && (
                    <div className="flex items-center gap-3">
                      <Sunset className="size-6 text-maroon" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">
                          {t("sunset")}
                        </p>
                        <p className="font-serif text-lg font-semibold text-maroon">
                          {panchang.sunset}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="rounded-lg border border-gold/20 bg-card p-12 text-center">
              <p className="text-muted-foreground">{t("noData")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
