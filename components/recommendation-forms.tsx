"use client";

import { useEffect, useRef, useState } from "react";
import {
  Star,
  Hash,
  Palette,
  Gem,
  RefreshCw,
  Sparkles,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { ZodiacVisualizer } from "./zodiac-visualizer";

// Input datasets used by the recommendation calculator.
const nakshatras = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni",
  "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha",
  "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha",
  "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
  "Uttara Bhadrapada", "Revati",
];

const raashis = [
  "Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)",
  "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchika (Scorpio)",
  "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)",
];

const westernZodiacs = [
  { name: "Aries", raashi: "Mesha (Aries)" },
  { name: "Taurus", raashi: "Vrishabha (Taurus)" },
  { name: "Gemini", raashi: "Mithuna (Gemini)" },
  { name: "Cancer", raashi: "Karka (Cancer)" },
  { name: "Leo", raashi: "Simha (Leo)" },
  { name: "Virgo", raashi: "Kanya (Virgo)" },
  { name: "Libra", raashi: "Tula (Libra)" },
  { name: "Scorpio", raashi: "Vrishchika (Scorpio)" },
  { name: "Sagittarius", raashi: "Dhanu (Sagittarius)" },
  { name: "Capricorn", raashi: "Makara (Capricorn)" },
  { name: "Aquarius", raashi: "Kumbha (Aquarius)" },
  { name: "Pisces", raashi: "Meena (Pisces)" },
];

const nakshatraNames = {
  Ashwini: ["Chu", "Che", "Cho", "La"],
  Bharani: ["Lee", "Lu", "Le", "Lo"],
  Krittika: ["A", "Ee", "Oo", "E"],
  Rohini: ["O", "Va", "Vi", "Vu"],
  Mrigashira: ["Ve", "Vo", "Ka", "Ke"],
  Ardra: ["Ku", "Gha", "Na", "Cha"],
  Punarvasu: ["Ke", "Ko", "Ha", "Hi"],
  Pushya: ["Hu", "He", "Ho", "Da"],
  Ashlesha: ["De", "Du", "De", "Do"],
  Magha: ["Ma", "Me", "Mu", "Mi"],
  "Purva Phalguni": ["Mo", "Ta", "Ti", "Tu"],
  "Uttara Phalguni": ["To", "Pa", "Pi", "Pu"],
  Hasta: ["Pu", "Sha", "Na", "Tha"],
  Chitra: ["Pe", "Po", "Ra", "Ri"],
  Swati: ["Ru", "Re", "Ro", "Ta"],
  Vishakha: ["Ti", "Tu", "Te", "To"],
  Anuradha: ["Na", "Ni", "Nu", "Ne"],
  Jyeshtha: ["No", "Ya", "Yi", "Yu"],
  Mula: ["Ye", "Yo", "Ba", "Bi"],
  "Purva Ashadha": ["Bu", "Da", "Di", "Du"],
  "Uttara Ashadha": ["Be", "Bo", "Ja", "Ji"],
  Shravana: ["Ju", "Je", "Jo", "Khi"],
  Dhanishta: ["Ga", "Gi", "Gu", "Ge"],
  Shatabhisha: ["Go", "Sa", "Si", "Su"],
  "Purva Bhadrapada": ["Se", "So", "Da", "Di"],
  "Uttara Bhadrapada": ["Du", "Tha", "Jha", "Na"],
  Revati: ["De", "Do", "Cha", "Chi"],
};

const raashiDetails = {
  "Mesha (Aries)": { number: 9, color: "Red", gemstone: "Ruby", colorHex: "#FF0000" },
  "Vrishabha (Taurus)": { number: 6, color: "White/Cream", gemstone: "Diamond", colorHex: "#FFFDD0" },
  "Mithuna (Gemini)": { number: 5, color: "Green", gemstone: "Emerald", colorHex: "#008000" },
  "Karka (Cancer)": { number: 2, color: "White/Silver", gemstone: "Pearl", colorHex: "#C0C0C0" },
  "Simha (Leo)": { number: 1, color: "Orange/Gold", gemstone: "Ruby", colorHex: "#FFA500" },
  "Kanya (Virgo)": { number: 5, color: "Green", gemstone: "Emerald", colorHex: "#008000" },
  "Tula (Libra)": { number: 6, color: "White", gemstone: "Diamond", colorHex: "#FFFFFF" },
  "Vrishchika (Scorpio)": { number: 9, color: "Red", gemstone: "Coral", colorHex: "#FF0000" },
  "Dhanu (Sagittarius)": { number: 3, color: "Yellow", gemstone: "Yellow Sapphire", colorHex: "#FFFF00" },
  "Makara (Capricorn)": { number: 8, color: "Blue/Black", gemstone: "Blue Sapphire", colorHex: "#0000FF" },
  "Kumbha (Aquarius)": { number: 8, color: "Blue/Black", gemstone: "Blue Sapphire", colorHex: "#0000FF" },
  "Meena (Pisces)": { number: 3, color: "Yellow", gemstone: "Yellow Sapphire", colorHex: "#FFFF00" },
};

export function RecommendationForms() {
  const { t, language } = useLanguage();
  // Mode toggle: western sun-sign flow vs vedic nakshatra/raashi flow.
  const [mode, setMode] = useState<"vedic" | "western">("western");
  const [selectedNakshatra, setSelectedNakshatra] = useState("");
  const [selectedRaashi, setSelectedRaashi] = useState("");
  const [selectedZodiac, setSelectedZodiac] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const generateButtonRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    // Guard incomplete submissions before triggering calculation.
    if (mode === "vedic" && (!selectedNakshatra || !selectedRaashi)) return;
    if (mode === "western" && !selectedZodiac) return;

    setLoading(true);
    setTimeout(() => {
      let finalRaashi = selectedRaashi;
      let syllables = ["Ka", "Kh", "Ga", "Gh"];

      if (mode === "western") {
        const zodiac = westernZodiacs.find((z) => z.name === selectedZodiac);
        finalRaashi = zodiac?.raashi || "";
        syllables = ["Cosmic Energy", "High Vibration", "Alignment"];
      } else {
        syllables = nakshatraNames[selectedNakshatra as keyof typeof nakshatraNames] || ["Ka", "Kh", "Ga", "Gh"];
      }

      const raashiInfo = raashiDetails[finalRaashi as keyof typeof raashiDetails];

      setResults({
        nakshatra: mode === "vedic" ? selectedNakshatra : t("recommendationsAccordingToZodiac"),
        raashi: finalRaashi,
        syllables: mode === "vedic" ? syllables : [],
        isWestern: mode === "western",
        ...raashiInfo,
      });
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    // Mobile UX: after selecting western zodiac, auto-scroll to Generate button.
    if (mode !== "western" || !selectedZodiac) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) return;

    const timeoutId = window.setTimeout(() => {
      generateButtonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [mode, selectedZodiac]);

  const localizedColorMap: Record<string, Record<string, string>> = {
    hi: {
      Red: "लाल",
      "White/Cream": "सफेद/क्रीम",
      Green: "हरा",
      "White/Silver": "सफेद/चांदी",
      "Orange/Gold": "नारंगी/सुनहरा",
      White: "सफेद",
      "Blue/Black": "नीला/काला",
      Yellow: "पीला",
    },
    kn: {
      Red: "ಕೆಂಪು",
      "White/Cream": "ಬಿಳಿ/ಕ್ರೀಮ್",
      Green: "ಹಸಿರು",
      "White/Silver": "ಬಿಳಿ/ಬೆಳ್ಳಿ",
      "Orange/Gold": "ಕಿತ್ತಳೆ/ಚಿನ್ನ",
      White: "ಬಿಳಿ",
      "Blue/Black": "ನೀಲಿ/ಕಪ್ಪು",
      Yellow: "ಹಳದಿ",
    },
  };

  const localizedGemMap: Record<string, Record<string, string>> = {
    hi: {
      Ruby: "माणिक्य",
      Diamond: "हीरा",
      Emerald: "पन्ना",
      Pearl: "मोती",
      Coral: "मूंगा",
      "Yellow Sapphire": "पुखराज",
      "Blue Sapphire": "नीलम",
    },
    kn: {
      Ruby: "ಮಾಣಿಕ್ಯ",
      Diamond: "ವಜ್ರ",
      Emerald: "ಪಚ್ಚೆ",
      Pearl: "ಮುತ್ತು",
      Coral: "ಪಗಡ",
      "Yellow Sapphire": "ಪುಷ್ಯರಾಗ",
      "Blue Sapphire": "ನೀಲಮಣಿ",
    },
  };

  const localizeColor = (color: string) =>
    localizedColorMap[language]?.[color] ?? color;

  const localizeGemstone = (gem: string) =>
    localizedGemMap[language]?.[gem] ?? gem;

  return (
    <div className="space-y-8">
      <Card className="border-gold/20 shadow-lg overflow-hidden">
        <CardHeader className="text-center bg-muted/30 pb-8">
          <CardTitle className="font-serif text-2xl text-maroon">
            {t("recommendations")}
          </CardTitle>
          <CardDescription>
            {t("recommendationsMethodHint")}
          </CardDescription>

          <Tabs
            defaultValue="western"
            className="w-full max-w-md mx-auto mt-6"
            onValueChange={(v: string) => setMode(v as any)}
          >
            <TabsList className="grid w-full grid-cols-2 bg-maroon/5 p-1">
              <TabsTrigger
                value="western"
                className="data-[state=active]:bg-saffron data-[state=active]:text-white"
              >
                <span className="hidden sm:inline">{t("recommendationsWesternZodiac")}</span>
                <span className="sm:hidden">{t("recommendationsWesternShort")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="vedic"
                className="data-[state=active]:bg-saffron data-[state=active]:text-white"
              >
                <span className="hidden sm:inline">{t("recommendationsVedicBirthChart")}</span>
                <span className="sm:hidden">{t("recommendationsVedicShort")}</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="space-y-8 pt-8">
          {mode === "vedic" ? (
            /* Updated this div to reduce gap in landscape/desktop */
            <div className="grid gap-6 sm:grid-cols-2 max-w-xl mx-auto">
              <div className="space-y-2 flex flex-col items-center text-center">
                <label className="text-sm font-medium text-maroon">
                  {t("selectNakshatra")}
                </label>
                <Select
                  onValueChange={setSelectedNakshatra}
                  value={selectedNakshatra}
                >
                  <SelectTrigger className="border-gold/20 bg-card">
                    <SelectValue placeholder={t("recommendationsChooseNakshatra")} />
                  </SelectTrigger>
                  <SelectContent>
                    {nakshatras.map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground italic">
                  {t("recommendationsBirthStarHint")}
                </p>
              </div>
              <div className="space-y-2 flex flex-col items-center text-center">
                <label className="text-sm font-medium text-maroon">
                  {t("selectRaashi")}
                </label>
                <Select
                  onValueChange={setSelectedRaashi}
                  value={selectedRaashi}
                >
                  <SelectTrigger className="border-gold/20 bg-card">
                    <SelectValue placeholder={t("recommendationsChooseRaashi")} />
                  </SelectTrigger>
                  <SelectContent>
                    {raashis.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground italic">
                  {t("recommendationsMoonSignHint")}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="font-serif text-lg font-bold text-maroon mb-1">
                  {t("recommendationsSelectSunSign")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("recommendationsClickZodiac")}
                </p>
              </div>
              <ZodiacVisualizer
                selectedZodiac={selectedZodiac}
                onSelect={setSelectedZodiac}
              />
            </div>
          )}

          <div ref={generateButtonRef} className="flex justify-center pt-4">
            <Button
              className="w-full max-w-sm bg-saffron text-white hover:bg-saffron/90 hover:shadow-lg hover:shadow-saffron/20 transition-all duration-300 active:scale-95 py-6 text-base sm:text-lg"
              onClick={handleGenerate}
              disabled={
                loading ||
                (mode === "vedic"
                  ? !selectedNakshatra || !selectedRaashi
                  : !selectedZodiac)
              }
            >
              {loading ? (
                <RefreshCw className="mr-2 size-5 animate-spin" />
              ) : (
                <Sparkles className="mr-2 size-5" />
              )}
              <span className="truncate">
                {loading ? t("recommendationsGenerating") : t("generate")}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-8">
          <div
            className={cn(
              "grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
              results.isWestern
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : "sm:grid-cols-2 lg:grid-cols-4",
            )}
          >
            {!results.isWestern && (
              <ResultCard
                icon={Star}
                title={t("luckyNames")}
                value={
                  results.syllables?.length ? results.syllables.join(", ") : "-"
                }
                desc={t("recommendationsRecommendedSyllables")}
                color="bg-saffron/10 text-saffron"
              />
            )}

            <ResultCard
              icon={Hash}
              title={t("luckyNumber")}
              value={results.number}
              desc={t("recommendationsPrimaryCosmicNumber")}
              color="bg-maroon/10 text-maroon"
            />

            <ResultCard
              icon={Palette}
              title={t("luckyColor")}
              value={localizeColor(results.color)}
              desc={t("recommendationsAuraEnhancingColor")}
              color="bg-gold/10 text-gold"
              customElement={
                <div
                  className="mt-2 size-6 rounded-full border border-gold/20"
                  style={{ backgroundColor: results.colorHex }}
                />
              }
            />

            <ResultCard
              icon={Gem}
              title={t("gemstones")}
              value={localizeGemstone(results.gemstone)}
              desc={t("recommendationsBalancingStone")}
              color="bg-blue-600/10 text-blue-600"
            />
          </div>

          <div className="rounded-2xl border border-gold/20 bg-muted/60 p-6 sm:p-8 text-center space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-saffron">
                {t("recommendationsSeekDeeperGuidance")}
              </p>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon">
                {t("recommendationsPersonalizedReading")}
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                {t("recommendationsPersonalizedReadingDesc")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                variant="outline"
                className="border-saffron text-saffron bg-transparent hover:bg-saffron hover:text-cream transition-all duration-300 active:scale-95 h-12 px-6"
              >
                <a href="tel:+919480708383">
                  <Phone className="size-4 mr-2" />
                  {t("recommendationsCallAstrologer")}
                </a>
              </Button>

              <Button
                asChild
                className="bg-[#cf5a1b] text-white hover:bg-[#cf5a1b]/70 active:scale-95 border-none h-12 px-6"
              >
                <a
                  href={`https://wa.me/919480708383?text=${encodeURIComponent("Namaste Guruji, I would like to book an astrology consultation. Please share the next steps.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4 mr-2" />
                  {t("recommendationsChatWhatsApp")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultCard({
  icon: Icon,
  title,
  value,
  desc,
  color,
  customElement,
}: any) {
  return (
    // Shared presentation card for each generated recommendation result.
    <Card className="border-gold/20 overflow-hidden transition-all duration-300 hover:border-gold/40 hover:shadow-xl group">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div
          className={cn(
            "mb-4 flex size-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110",
            color,
          )}
        >
          <Icon className="size-7" />
        </div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2 group-hover:text-saffron transition-colors">
          {title}
        </p>
        <div className="min-h-[3rem] flex items-center justify-center">
          <p className="font-serif text-xl font-bold text-maroon">{value}</p>
        </div>
        {customElement}
        <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </CardContent>
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </Card>
  );
}


