"use client";

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
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DecorativeDivider } from "@/components/decorative-border";
import { useLanguage } from "@/lib/language-context";
import Link from "next/link";

const serviceDetails = [
  {
    icon: Star,
    titleKey: "nameSuggestion",
    content: {
      en: "Our Nakshatram-based naming service draws upon ancient Vedic principles to suggest names that resonate with your child's cosmic blueprint. Each name is carefully selected based on the birth star (Nakshatra), Raashi (moon sign), and the planetary positions at the time of birth. A harmonious name channels positive energy and sets the foundation for a prosperous life. We analyze syllable vibrations, numerological significance, and traditional compatibility to provide multiple auspicious options.",
      hi: "हमारी नक्षत्र-आधारित नामकरण सेवा प्राचीन वैदिक सिद्धांतों पर आधारित है जो आपके बच्चे की ब्रह्मांडीय रूपरेखा के अनुरूप नाम सुझाती है। प्रत्येक नाम जन्म नक्षत्र, राशि और जन्म के समय ग्रहों की स्थिति के आधार पर सावधानीपूर्वक चुना जाता है।",
      kn: "ನಮ್ಮ ನಕ್ಷತ್ರ-ಆಧಾರಿತ ನಾಮಕರಣ ಸೇವೆಯು ನಿಮ್ಮ ಮಗುವಿನ ವಿಶ್ವ ನಕ್ಷೆಗೆ ಹೊಂದಿಕೆಯಾಗುವ ಹೆಸರುಗಳನ್ನು ಸೂಚಿಸಲು ಪ್ರಾಚೀನ ವೈದಿಕ ತತ್ವಗಳನ್ನು ಬಳಸುತ್ತದೆ.",
    },
  },
  {
    icon: Hash,
    titleKey: "luckyNumber",
    content: {
      en: "Your lucky number is derived from a sophisticated calculation involving your Nakshatram, Raashi, and the positions of ruling planets at birth. In Vedic numerology, each number carries specific vibrations that influence various aspects of life -- career decisions, financial investments, auspicious dates for ceremonies, and more. We provide your primary lucky number along with secondary fortunate numbers and explain how to incorporate them into daily decisions for maximum benefit.",
      hi: "आपका भाग्यशाली अंक एक जटिल गणना से प्राप्त होता है जिसमें आपके नक्षत्र, राशि और जन्म के समय शासक ग्रहों की स्थिति शामिल होती है। वैदिक अंक शास्त्र में, प्रत्येक अंक विशिष्ट कंपन लेकर आता है।",
      kn: "ನಿಮ್ಮ ಅದೃಷ್ಟ ಸಂಖ್ಯೆಯನ್ನು ನಿಮ್ಮ ನಕ್ಷತ್ರ, ರಾಶಿ ಮತ್ತು ಜನ್ಮ ಸಮಯದಲ್ಲಿ ಆಳುವ ಗ್ರಹಗಳ ಸ್ಥಾನಗಳನ್ನು ಒಳಗೊಂಡ ಸಂಕೀರ್ಣ ಲೆಕ್ಕಾಚಾರದಿಂದ ಪಡೆಯಲಾಗಿದೆ.",
    },
  },
  {
    icon: Palette,
    titleKey: "luckyColor",
    content: {
      en: "Colors profoundly influence our energy fields and life experiences. Based on your planetary chart, we identify the colors that strengthen your aura, attract prosperity, and bring emotional balance. Your lucky colors are determined by analyzing the ruling planet of your Raashi, the influence of your ascendant (Lagna), and the current planetary transit (Dasha) period. We advise on wearing these colors, using them in your living spaces, and timing their use for maximum effect.",
      hi: "रंग हमारे ऊर्जा क्षेत्रों और जीवन अनुभवों को गहराई से प्रभावित करते हैं। आपके ग्रह चार्ट के आधार पर, हम उन रंगों की पहचान करते हैं जो आपकी आभा को मजबूत करते हैं।",
      kn: "ಬಣ್ಣಗಳು ನಮ್ಮ ಶಕ್ತಿ ಕ್ಷೇತ್ರಗಳು ಮತ್ತು ಜೀವನ ಅನುಭವಗಳನ್ನು ಆಳವಾಗಿ ಪ್ರಭಾವಿಸುತ್ತವೆ.",
    },
  },
  {
    icon: Gem,
    titleKey: "gemstones",
    content: {
      en: "Vedic gemstone therapy (Ratna Shastra) prescribes specific precious and semi-precious stones to harmonize planetary energies. Based on your birth chart, we recommend stones from our comprehensive range: Ruby (Manikya) for Sun, Pearl (Moti) for Moon, Coral (Moonga) for Mars, Emerald (Panna) for Mercury, Yellow Sapphire (Pukhraj) for Jupiter, Diamond (Heera) for Venus, Blue Sapphire (Neelam) for Saturn, Hessonite (Gomed) for Rahu, and Cat's Eye (Lehsunia) for Ketu. Each recommendation includes proper wearing procedure, mantra, and auspicious timing.",
      hi: "वैदिक रत्न चिकित्सा (रत्न शास्त्र) ग्रहों की ऊर्जा को संतुलित करने के लिए विशिष्ट कीमती और अर्ध-कीमती पत्थर निर्धारित करती है।",
      kn: "ವೈದಿಕ ರತ್ನ ಚಿಕಿತ್ಸೆ (ರತ್ನ ಶಾಸ್ತ್ರ) ಗ್ರಹಗಳ ಶಕ್ತಿಗಳನ್ನು ಸಮನ್ವಯಗೊಳಿಸಲು ನಿರ್ದಿಷ್ಟ ಅಮೂಲ್ಯ ಮತ್ತು ಅರೆ-ಅಮೂಲ್ಯ ಕಲ್ಲುಗಳನ್ನು ಸೂಚಿಸುತ್ತದೆ.",
    },
  },
  {
    icon: ScrollText,
    titleKey: "birthChartAnalysis",
    content: {
      en: "A comprehensive Kundali (birth chart) analysis is the cornerstone of Vedic astrology. Using your exact date, time, and place of birth, we construct a detailed chart mapping the positions of all nine planets (Navagrahas) across the twelve houses. This reveals your life patterns, strengths, challenges, favorable periods (Dasha), and karmic influences. Our analysis covers personality traits, career potential, financial prospects, relationship compatibility, health predispositions, and spiritual evolution. We also provide yearly predictions and transit analysis.",
      hi: "एक व्यापक कुंडली (जन्म चार्ट) विश्लेषण वैदिक ज्योतिष की आधारशिला है। आपकी सटीक तिथि, समय और जन्म स्थान का उपयोग करके, हम सभी नौ ग्रहों की स्थिति का विस्तृत चार्ट बनाते हैं।",
      kn: "ಸಮಗ್ರ ಕುಂಡಲಿ (ಜನ್ಮ ಚಾರ್ಟ್) ವಿಶ್ಲೇಷಣೆಯು ವೈದಿಕ ಜ್ಯೋತಿಷ್ಯದ ಮೂಲಾಧಾರವಾಗಿದೆ.",
    },
  },
  {
    icon: Shield,
    titleKey: "doshaRemedies",
    content: {
      en: "Planetary doshas can create significant obstacles in life. We specialize in identifying and providing effective remedies for: Manglik Dosha (Mars affliction) affecting marriage prospects, Kuja Dosha, Sadhe-Sati (Saturn's 7.5-year transit) bringing career and financial challenges, Kaal Sarp Dosha restricting growth, Drishti Dosha (evil eye) causing unexplained setbacks, and Pitru Dosha (ancestral karma) impacting family harmony. Remedies include specific mantras, pujas, gemstones, charitable acts, and Vedic rituals tailored to your unique chart.",
      hi: "ग्रह दोष जीवन में महत्वपूर्ण बाधाएं पैदा कर सकते हैं। हम मांगलिक दोष, कुज दोष, साढ़े साती, काल सर्प दोष, दृष्टि दोष और पितृ दोष की पहचान और प्रभावी उपाय प्रदान करने में विशेषज्ञ हैं।",
      kn: "ಗ್ರಹ ದೋಷಗಳು ಜೀವನದಲ್ಲಿ ಮಹತ್ವದ ಅಡೆತಡೆಗಳನ್ನು ಸೃಷ್ಟಿಸಬಹುದು. ಮಾಂಗಲಿಕ ದೋಷ, ಕುಜ ದೋಷ, ಸಾಡೆ ಸಾತಿ ಮತ್ತು ಇತರ ದೋಷಗಳಿಗೆ ಪರಿಹಾರಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ.",
    },
  },
  {
    icon: Heart,
    titleKey: "relationships",
    content: {
      en: "Our marriage and relationship counseling integrates Vedic astrological analysis with practical guidance. For pre-marriage consultations, we perform detailed Kundali Milan (horoscope matching) analyzing all 36 Gunas for compatibility. For post-marriage challenges, we identify planetary causes of discord and provide targeted remedies. We also guide on auspicious wedding dates (Muhurtham), help resolve Manglik Dosha concerns, and provide ongoing compatibility support through changing planetary periods.",
      hi: "हमारा विवाह और संबंध परामर्श वैदिक ज्योतिषीय विश्लेषण को व्यावहारिक मार्गदर्शन के साथ एकीकृत करता है।",
      kn: "ನಮ್ಮ ವಿವಾಹ ಮತ್ತು ಸಂಬಂಧ ಸಲಹೆಯು ವೈದಿಕ ಜ್ಯೋತಿಷ್ಯ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಪ್ರಾಯೋಗಿಕ ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ ಸಂಯೋಜಿಸುತ್ತದೆ.",
    },
  },
  {
    icon: Briefcase,
    titleKey: "financial",
    content: {
      en: "Financial astrology provides insights into your wealth potential, favorable investment periods, and career trajectory based on the 2nd (wealth), 10th (career), and 11th (gains) houses of your birth chart. We help identify the right times for major financial decisions, business ventures, property purchases, and career changes. Our analysis of planetary Dashas and transits reveals upcoming periods of financial growth or caution, helping you plan strategically.",
      hi: "वित्तीय ज्योतिष आपकी जन्म कुंडली के 2वें (धन), 10वें (करियर), और 11वें (लाभ) भावों के आधार पर आपकी धन क्षमता, अनुकूल निवेश अवधि और करियर पथ के बारे में अंतर्दृष्टि प्रदान करता है।",
      kn: "ಆರ್ಥಿಕ ಜ್ಯೋತಿಷ್ಯವು ನಿಮ್ಮ ಜನ್ಮ ಕುಂಡಲಿಯ 2ನೇ (ಸಂಪತ್ತು), 10ನೇ (ವೃತ್ತಿ), ಮತ್ತು 11ನೇ (ಲಾಭ) ಭಾವಗಳ ಆಧಾರದ ಮೇಲೆ ಒಳನೋಟಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.",
    },
  },
  {
    icon: UserCheck,
    titleKey: "personalityDevelopment",
    content: {
      en: "Vedic wisdom offers powerful tools for personal transformation and destiny enhancement. Through analysis of your birth chart, we identify your innate strengths and areas for growth. Our personality development guidance includes recommended Vedic rituals (Homas and Pujas), daily practices (Sandhyavandana), planetary mantras for empowerment, meditation techniques aligned with your Nakshatra, and lifestyle adjustments that harmonize with your cosmic blueprint for maximum personal and spiritual growth.",
      hi: "वैदिक ज्ञान व्यक्तिगत परिवर्तन और भाग्य वृद्धि के लिए शक्तिशाली उपकरण प्रदान करता है।",
      kn: "ವೈದಿಕ ಜ್ಞಾನವು ವೈಯಕ್ತಿಕ ರೂಪಾಂತರ ಮತ್ತು ಭಾಗ್ಯ ವೃದ್ಧಿಗೆ ಶಕ್ತಿಶಾಲಿ ಸಾಧನಗಳನ್ನು ನೀಡುತ್ತದೆ.",
    },
  },
];

export default function ServicesPage() {
  const { t, language } = useLanguage();

  return (
    <div>
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
          <h1 className="mt-3 font-serif text-3xl font-bold text-cream lg:text-5xl text-balance">
            {t("servicesPageTitle")}
          </h1>
          <p className="mt-4 text-cream/80">{t("servicesPageSubtitle")}</p>
        </div>
      </section>

      {/* Services Accordion */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <Accordion type="single" collapsible className="flex flex-col gap-4">
            {serviceDetails.map((service) => (
              <AccordionItem
                key={service.titleKey}
                value={service.titleKey}
                className="overflow-hidden rounded-lg border border-gold/20 bg-card px-6 data-[state=open]:border-gold/40"
              >
                <AccordionTrigger className="gap-4 py-5 hover:no-underline [&>svg]:text-saffron">
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-saffron/10 text-saffron">
                      <service.icon className="size-5" />
                    </div>
                    <span className="text-left font-serif text-lg font-semibold text-maroon">
                      {t(service.titleKey)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {service.content[language] || service.content.en}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA */}
          <div className="mt-12 rounded-lg border border-gold/30 bg-muted/50 p-8 text-center">
            <h3 className="font-serif text-xl font-bold text-maroon">
              {t("ctaTitle")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("ctaDescription")}
            </p>
            <Button
              asChild
              className="mt-6 bg-saffron text-cream hover:bg-saffron/90"
            >
              <Link href="/contact">{t("bookConsultation")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
