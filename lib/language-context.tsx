"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi" | "kn";

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Main dictionary for shared UI labels/content across all supported languages.
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: "Home",
    services: "Services",
    blog: "Blog",
    contact: "Contact",
    birthChart: "Birth Chart",

    // Hero
    heroTitle: "Decode Your Cosmic Destiny",
    heroSubtitle: "Ancient Vedic Wisdom for Modern Life",
    heroDescription:
      "Discover personalized guidance through the sacred science of Jyotish. Let the stars illuminate your path to prosperity, love, and spiritual growth.",
    getReading: "Get Your Reading",
    exploreServices: "Explore Services",

    // Services
    servicesTitle: "Sacred Services",
    servicesSubtitle: "Personalized Vedic Guidance",
    nameSuggestion: "Name Suggestion",
    nameSuggestionDesc:
      "Auspicious names aligned with your Nakshatram for success and harmony",
    luckyNumber: "Lucky Number",
    luckyNumberDesc:
      "Discover your power number based on planetary positions",
    luckyColor: "Lucky Color",
    luckyColorDesc:
      "Colors that enhance your aura and attract positive energy",
    gemstones: "Sacred Gemstones",
    gemstonesDesc: "Precious stones to balance planetary influences",
    birthChartAnalysis: "Birth Chart Analysis",
    birthChartAnalysisDesc:
      "Complete Kundali analysis based on your exact birth details",
    doshaRemedies: "Dosha Remedies",
    doshaRemediesDesc:
      "Effective solutions for Manglik, Kuja, and other planetary doshas",

    // Problems
    problemsTitle: "Life Challenges We Address",
    financial: "Financial & Career",
    financialDesc:
      "Overcome financial obstacles, secure investments, job applications, and promotions.",
    relationships: "Marriage & Relationships",
    relationshipsDesc:
      "Pre-marriage compatibility, post-marriage harmony, and Manglik Dosha remedies.",
    health: "Health & Wellness",
    healthDesc:
      "Holistic guidance for physical, mental, and spiritual well-being through Vedic wisdom.",
    spiritual: "Spiritual Remedies",
    spiritualDesc:
      "Protection from Drishti Dosha (Evil Eye), Sadhe-Sati solutions, and destiny enhancement.",
    legalConsultancy: "Legal Matters",
    legalConsultancyDesc: "Astrological guidance for court cases, legal disputes, and favorable outcomes.",
    childrenProblems: "Children & Family",
    childrenProblemsDesc: "Guidance for childbirth, naming ceremonies, and children-related concerns.",

    // Contact
    contactTitle: "Connect With Us",
    contactSubtitle: "Begin your journey to cosmic clarity",
    phone: "Phone",
    whatsapp: "WhatsApp",


    // Form
    yourName: "Your Name",
    email: "Email",
    phoneNumber: "Phone Number",
    birthDate: "Birth Date",
    birthTime: "Birth Time",
    birthPlace: "Birth Place",
    selectService: "Select Service",
    describeYourConcern: "Describe Your Concern",
    submit: "Submit",

    // Footer
    footerTagline: "Illuminating paths through ancient wisdom",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    followUs: "Follow Us",

    // Testimonials
    testimonialsTitle: "What Our Seekers Say",
    yearsExperience: "Years of Experience",
    happyClients: "Happy Clients",
    consultations: "Consultations",

    // CTA
    ctaTitle: "Ready to Transform Your Life?",
    ctaDescription:
      "Take the first step towards cosmic clarity and divine guidance",
    bookConsultation: "Book Consultation",
    callExpert: "Call Expert",
    personalityDevelopment: "Personality Development",

    // Recommendations
    recommendations: "Recommendations",
    luckyNames: "Lucky Names",
    luckyNamesDesc: "Get name suggestions based on Nakshatra",
    luckyNumberAndColor: "Lucky Number & Color",
    luckyNumberAndColorDesc: "Calculate your cosmic power numbers and colors",
    generate: "Generate",
    calculationResults: "Calculation Results",
    selectNakshatra: "Select Nakshatra",
    selectRaashi: "Select Raashi",
    recommendationsHeroSubtitle: "Ancient Vedic astrology combined with modern calculation to reveal your cosmic favorites",
    recommendationsHowItWorksTitle: "How it works",
    recommendationsHowItWorksBody: "Our recommendation engine uses your Nakshatra (birth star) and Raashi (moon sign) to identify syllables, numbers, and colors that resonate with your planetary energy. These elements are calculated based on traditional Jyotish principles to enhance your cosmic harmony and attract prosperity.",
    recommendationsApplyingRemediesTitle: "Applying Remedies",
    recommendationsApplyingRemediesBody: "While these recommendations provide a great starting point, a full Birth Chart Analysis (Kundali) is recommended for deeper life challenges. Incorporating your lucky colors and numbers into daily routines helps align your energy with the beneficial planetary transits.",
    recommendationsQuote: "The stars guide us, but we must choose to follow the path of light.",
    recommendationsMethodHint: "Select your preferred method and find your cosmic alignment",
    recommendationsWesternZodiac: "Western Zodiac",
    recommendationsWesternShort: "Western",
    recommendationsVedicBirthChart: "Vedic (Birth Chart)",
    recommendationsVedicShort: "Vedic",
    recommendationsChooseNakshatra: "Choose Nakshatra",
    recommendationsBirthStarHint: "Based on your birth star",
    recommendationsChooseRaashi: "Choose Raashi",
    recommendationsMoonSignHint: "Based on your moon sign",
    recommendationsSelectSunSign: "Select Your Sun Sign",
    recommendationsClickZodiac: "Click on your zodiac card to begin",
    recommendationsGenerating: "Generating...",
    recommendationsAccordingToZodiac: "According to Zodiac",
    recommendationsRecommendedSyllables: "Recommended starting syllables",
    recommendationsPrimaryCosmicNumber: "Primary cosmic number",
    recommendationsAuraEnhancingColor: "Aura enhancing color",
    recommendationsBalancingStone: "Balancing planetary stone",
    recommendationsSeekDeeperGuidance: "Seek Deeper Guidance",
    recommendationsPersonalizedReading: "Want a Personalised Reading?",
    recommendationsPersonalizedReadingDesc: "Your cosmic blueprint goes beyond numbers. Connect with our Vedic experts for a deeper interpretation of your birth chart and life path.",
    recommendationsCallAstrologer: "Call an Astrologer",
    recommendationsChatWhatsApp: "Chat on WhatsApp",
    // Services Page
    servicesPageTitle: "Our Sacred Services",
    servicesPageSubtitle:
      "Comprehensive Vedic guidance for every aspect of your life",
    learnMore: "Learn More",

    // Blog
    blogTitle: "Vedic Wisdom Blog",
    blogSubtitle: "Insights, guidance, and ancient knowledge for modern seekers",
    readMore: "Read More",
    allCategories: "All",
    noPosts: "No posts found. Check back soon for new content.",
    backToBlog: "Back to Blog",
    recentPosts: "Recent Posts",


    // Contact Page
    contactPageTitle: "Get in Touch",
    contactPageSubtitle: "We are here to guide you on your spiritual journey",
    sendMessage: "Send Message",
    messageSent: "Your message has been sent successfully!",
    operatingHours: "Operating Hours",
    mondayToSaturday: "Monday - Saturday: 9:00 AM - 7:00 PM",
    sunday: "Sunday: By Appointment Only",
  },
  hi: {
    // Navigation
    home: "होम",
    services: "सेवाएं",
    blog: "ब्लॉग",
    contact: "संपर्क",
    birthChart: "जन्म कुंडली",

    // Hero
    heroTitle: "अपनी ब्रह्मांडीय नियति को जानें",
    heroSubtitle: "आधुनिक जीवन के लिए प्राचीन वैदिक ज्ञान",
    heroDescription:
      "ज्योतिष की पवित्र विज्ञान के माध्यम से व्यक्तिगत मार्गदर्शन प्राप्त करें। तारे आपके समृद्धि, प्रेम और आध्यात्मिक विकास के मार्ग को प्रकाशित करें।",
    getReading: "अपना फलादेश प्राप्त करें",
    exploreServices: "सेवाएं देखें",

    // Services
    servicesTitle: "पवित्र सेवाएं",
    servicesSubtitle: "व्यक्तिगत वैदिक मार्गदर्शन",
    nameSuggestion: "नाम सुझाव",
    nameSuggestionDesc:
      "सफलता और सामंजस्य के लिए आपके नक्षत्र के अनुसार शुभ नाम",
    luckyNumber: "भाग्यशाली अंक",
    luckyNumberDesc:
      "ग्रहों की स्थिति के आधार पर अपना शक्ति अंक जानें",
    luckyColor: "भाग्यशाली रंग",
    luckyColorDesc:
      "वे रंग जो आपकी आभा को बढ़ाते हैं और सकारात्मक ऊर्जा आकर्षित करते हैं",
    gemstones: "पवित्र रत्न",
    gemstonesDesc:
      "ग्रहों के प्रभाव को संतुलित करने के लिए बहुमूल्य पत्थर",
    birthChartAnalysis: "जन्म कुंडली विश्लेषण",
    birthChartAnalysisDesc:
      "आपके सटीक जन्म विवरण के आधार पर पूर्ण कुंडली विश्लेषण",
    doshaRemedies: "दोष उपाय",
    doshaRemediesDesc:
      "मांगलिक, कुज और अन्य ग्रह दोषों के प्रभावी समाधान",

    // Problems
    problemsTitle: "जीवन की चुनौतियाँ जिनका हम समाधान करते हैं",
    financial: "वित्तीय और करियर",
    financialDesc:
      "वित्तीय बाधाओं को दूर करें, निवेश सुरक्षित करें, और सही करियर पथ खोजें",
    relationships: "रिश्ते और विवाह",
    relationshipsDesc:
      "विवाह पूर्व अनुकूलता, विवाह के बाद सामंजस्य, और मांगलिक दोष उपाय",
    health: "स्वास्थ्य और कल्याण",
    healthDesc:
      "शारीरिक, मानसिक और आध्यात्मिक कल्याण के लिए समग्र मार्गदर्शन",
    spiritual: "आध्यात्मिक उपाय",
    spiritualDesc:
      "दृष्टि दोष से सुरक्षा, साढ़े साती समाधान, और भाग्य वृद्धि",
    legalConsultancy: "कानूनी मार्गदर्शन",
    legalConsultancyDesc: "अदालती मामलों और कानूनी विवादों के लिए विशेषज्ञ ज्योतिषीय मार्गदर्शन",
    childrenProblems: "संतान परामर्श",
    childrenProblemsDesc: "बच्चों से जुड़ी समस्याओं और उनके कल्याण के लिए समाधान",

    // Contact
    contactTitle: "हमसे जुड़ें",
    contactSubtitle: "ब्रह्मांडीय स्पष्टता की अपनी यात्रा शुरू करें",
    phone: "फ़ोन",
    whatsapp: "व्हाट्सएप",


    // Form
    yourName: "आपका नाम",
    email: "ईमेल",
    phoneNumber: "फ़ोन नंबर",
    birthDate: "जन्म तिथि",
    birthTime: "जन्म समय",
    birthPlace: "जन्म स्थान",
    selectService: "सेवा चुनें",
    describeYourConcern: "अपनी समस्या बताएं",
    submit: "जमा करें",

    // Footer
    footerTagline: "प्राचीन ज्ञान से मार्ग प्रकाशित करना",
    quickLinks: "त्वरित लिंक",
    contactUs: "संपर्क करें",
    followUs: "हमें फॉलो करें",

    // Testimonials
    testimonialsTitle: "हमारे साधकों की राय",
    yearsExperience: "वर्षों का अनुभव",
    happyClients: "खुश ग्राहक",
    consultations: "परामर्श",

    // CTA
    ctaTitle: "अपना जीवन बदलने के लिए तैयार हैं ?",
    ctaDescription: "ब्रह्मांडीय स्पष्टता और दिव्य मार्गदर्शन की ओर पहला कदम उठाएं",
    bookConsultation: "परामर्श बुक करें",
    callExpert: "विशेषज्ञ से जुड़े",
    personalityDevelopment: "व्यक्तित्व विकास",

    // Services Page
    servicesPageTitle: "हमारी पवित्र सेवाएं",
    servicesPageSubtitle: "आपके जीवन के हर पहलू के लिए व्यापक वैदिक मार्गदर्शन",
    learnMore: "और जानें",

    // Blog
    blogTitle: "वैदिक ज्ञान ब्लॉग",
    blogSubtitle: "आधुनिक साधकों के लिए अंतर्दृष्टि, मार्गदर्शन और प्राचीन ज्ञान",
    readMore: "और पढ़ें",
    allCategories: "सभी",
    noPosts: "कोई पोस्ट नहीं मिली। नई सामग्री के लिए जल्द वापस आएं।",
    backToBlog: "ब्लॉग पर वापस",
    recentPosts: "हाल की पोस्ट",


    // Contact Page
    contactPageTitle: "संपर्क करें",
    contactPageSubtitle: "हम आपकी आध्यात्मिक यात्रा में मार्गदर्शन के लिए यहाँ हैं",
    sendMessage: "संदेश भेजें",
    messageSent: "आपका संदेश सफलतापूर्वक भेजा गया है!",
    operatingHours: "कार्य समय",
    mondayToSaturday: "सोमवार - शनिवार: सुबह 9:00 - शाम 7:00",
    sunday: "रविवार: केवल अपॉइंटमेंट द्वारा",
  },
  kn: {
    // Navigation
    home: "ಮುಖಪುಟ",
    services: "ಸೇವೆಗಳು",
    blog: "ಬ್ಲಾಗ್",
    contact: "ಸಂಪರ್ಕ",
    birthChart: "ಜನ್ಮ ಕುಂಡಲಿ",

    // Hero
    heroTitle: "ನಿಮ್ಮ ವಿಶ್ವ ವಿಧಿಯನ್ನು ತಿಳಿಯಿರಿ",
    heroSubtitle: "ಆಧುನಿಕ ಜೀವನಕ್ಕಾಗಿ ಪ್ರಾಚೀನ ವೈದಿಕ ಜ್ಞಾನ",
    heroDescription:
      "ಜ್ಯೋತಿಷ್ಯದ ಪವಿತ್ರ ವಿಜ್ಞಾನದ ಮೂಲಕ ವೈಯಕ್ತಿಕ ಮಾರ್ಗದರ್ಶನವನ್ನು ಕಂಡುಕೊಳ್ಳಿ.",
    getReading: "ನಿಮ್ಮ ಫಲಾದೇಶ ಪಡೆಯಿರಿ",
    exploreServices: "ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",

    // Services
    servicesTitle: "ಪವಿತ್ರ ಸೇವೆಗಳು",
    servicesSubtitle: "ವೈಯಕ್ತಿಕ ವೈದಿಕ ಮಾರ್ಗದರ್ಶನ",
    nameSuggestion: "ಹೆಸರು ಸಲಹೆ",
    nameSuggestionDesc:
      "ಯಶಸ್ಸು ಮತ್ತು ಸಾಮರಸ್ಯಕ್ಕಾಗಿ ನಿಮ್ಮ ನಕ್ಷತ್ರಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಶುಭ ಹೆಸರುಗಳು",
    luckyNumber: "ಅದೃಷ್ಟ ಸಂಖ್ಯೆ",
    luckyNumberDesc:
      "ಗ್ರಹಗಳ ಸ್ಥಾನದ ಆಧಾರದ ಮೇಲೆ ನಿಮ್ಮ ಶಕ್ತಿ ಸಂಖ್ಯೆಯನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ",
    luckyColor: "ಅದೃಷ್ಟ ಬಣ್ಣ",
    luckyColorDesc:
      "ನಿಮ್ಮ ಪ್ರಭಾವಲಯವನ್ನು ಹೆಚ್ಚಿಸುವ ಮತ್ತು ಧನಾತ್ಮಕ ಶಕ್ತಿಯನ್ನು ಆಕರ್ಷಿಸುವ ಬಣ್ಣಗಳು",
    gemstones: "ಪವಿತ್ರ ರತ್ನಗಳು",
    gemstonesDesc:
      "ಗ್ರಹಗಳ ಪ್ರಭಾವವನ್ನು ಸಮತೋಲನಗೊಳಿಸಲು ಅಮೂಲ್ಯ ಕಲ್ಲುಗಳು",
    birthChartAnalysis: "ಜನ್ಮ ಕುಂಡಲಿ ವಿಶ್ಲೇಷಣೆ",
    birthChartAnalysisDesc:
      "ನಿಮ್ಮ ನಿಖರ ಜನ್ಮ ವಿವರಗಳ ಆಧಾರದ ಮೇಲೆ ಸಂಪೂರ್ಣ ಕುಂಡಲಿ ವಿಶ್ಲೇಷಣೆ",
    doshaRemedies: "ದೋಷ ಪರಿಹಾರಗಳು",
    doshaRemediesDesc:
      "ಮಾಂಗಲಿಕ, ಕುಜ ಮತ್ತು ಇತರ ಗ್ರಹ ದೋಷಗಳಿಗೆ ಪರಿಣಾಮಕಾರಿ ಪರಿಹಾರಗಳು",

    // Problems
    problemsTitle: "ನಾವು ಪರಿಹರಿಸುವ ಜೀವನ ಸವಾಲುಗಳು",
    financial: "ಆರ್ಥಿಕ ಮತ್ತು ವೃತ್ತಿ",
    financialDesc:
      "ಆರ್ಥಿಕ ಅಡೆತಡೆಗಳನ್ನು ನಿವಾರಿಸಿ, ಹೂಡಿಕೆಗಳನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸಿ",
    relationships: "ಸಂಬಂಧಗಳು ಮತ್ತು ವಿವಾಹ",
    relationshipsDesc:
      "ವಿವಾಹ ಪೂರ್ವ ಹೊಂದಾಣಿಕೆ, ವಿವಾಹದ ನಂತರ ಸಾಮರಸ್ಯ",
    health: "ಆರೋಗ್ಯ ಮತ್ತು ಕ್ಷೇಮ",
    healthDesc:
      "ದೈಹಿಕ, ಮಾನಸಿಕ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಯೋಗಕ್ಷೇಮಕ್ಕಾಗಿ ಸಮಗ್ರ ಮಾರ್ಗದರ್ಶನ",
    spiritual: "ಆಧ್ಯಾತ್ಮಿಕ ಪರಿಹಾರಗಳು",
    spiritualDesc:
      "ದೃಷ್ಟಿ ದೋಷದಿಂದ ರಕ್ಷಣೆ, ಸಾಡೆ ಸಾತಿ ಪರಿಹಾರಗಳು",
    legalConsultancy: "ಕಾನೂನು ಮಾರ್ಗದರ್ಶನ",
    legalConsultancyDesc: "ನ್ಯಾಯಾಲಯದ ಸಮಸ್ಯೆಗಳು ಮತ್ತು ಕಾನೂನು ವಿವಾದಗಳಿಗೆ ತಜ್ಞ ಜ್ಯೋತಿಷ್ಯ ಮಾರ್ಗದರ್ಶನ",
    childrenProblems: "ಮಕ್ಕಳ ಸಮಾಲೋಚನೆ",
    childrenProblemsDesc: "ಮಕ್ಕಳಿಗೆ ಸಂಬಂಧಿಸಿದ ಸಮಸ್ಯೆಗಳು ಮತ್ತು ಅವರ ಯೋಗಕ್ಷೇಮಕ್ಕಾಗಿ ಪರಿಹಾರಗಳು",

    // Contact
    contactTitle: "ನಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ",
    contactSubtitle: "ವಿಶ್ವ ಸ್ಪಷ್ಟತೆಯ ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ",
    phone: "ದೂರವಾಣಿ",
    whatsapp: "ವಾಟ್ಸಾಪ್",


    // Form
    yourName: "ನಿಮ್ಮ ಹೆಸರು",
    email: "ಇಮೇಲ್",
    phoneNumber: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    birthDate: "ಜನ್ಮ ದಿನಾಂಕ",
    birthTime: "ಜನ್ಮ ಸಮಯ",
    birthPlace: "ಜನ್ಮ ಸ್ಥಳ",
    selectService: "ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    describeYourConcern: "ನಿಮ್ಮ ಕಾಳಜಿಯನ್ನು ವಿವರಿಸಿ",
    submit: "ಸಲ್ಲಿಸಿ",

    // Footer
    footerTagline: "ಪ್ರಾಚೀನ ಜ್ಞಾನದ ಮೂಲಕ ಮಾರ್ಗಗಳನ್ನು ಬೆಳಗಿಸುವುದು",
    quickLinks: "ತ್ವರಿತ ಲಿಂಕ್\u200Cಗಳು",
    contactUs: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
    followUs: "ನಮ್ಮನ್ನು ಅನುಸರಿಸಿ",

    // Testimonials
    testimonialsTitle: "ನಮ್ಮ ಸಾಧಕರು ಏನು ಹೇಳುತ್ತಾರೆ",
    yearsExperience: "ವರ್ಷಗಳ ಅನುಭವ",
    happyClients: "ಸಂತೋಷ ಗ್ರಾಹಕರು",
    consultations: "ಸಮಾಲೋಚನೆಗಳು",

    // CTA
    ctaTitle: "ನಿಮ್ಮ ಜೀವನವನ್ನು ಬದಲಾಯಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
    ctaDescription:
      "ವಿಶ್ವ ಸ್ಪಷ್ಟತೆ ಮತ್ತು ದೈವಿಕ ಮಾರ್ಗದರ್ಶನದ ಕಡೆಗೆ ಮೊದಲ ಹೆಜ್ಜೆ ಇಡಿ",
    bookConsultation: "ಸಮಾಲೋಚನೆ ಬುಕ್ ಮಾಡಿ",
    callExpert: "ತಜ್ಞರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ",
    personalityDevelopment: "ವ್ಯಕ್ತಿತ್ವ ಅಭಿವೃದ್ಧಿ",

    // Services Page
    servicesPageTitle: "ನಮ್ಮ ಪವಿತ್ರ ಸೇವೆಗಳು",
    servicesPageSubtitle:
      "ನಿಮ್ಮ ಜೀವನದ ಪ್ರತಿಯೊಂದು ಅಂಶಕ್ಕೂ ಸಮಗ್ರ ವೈದಿಕ ಮಾರ್ಗದರ್ಶನ",
    learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",

    // Blog
    blogTitle: "ವೈದಿಕ ಜ್ಞಾನ ಬ್ಲಾಗ್",
    blogSubtitle:
      "ಆಧುನಿಕ ಸಾಧಕರಿಗಾಗಿ ಒಳನೋಟಗಳು, ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಪ್ರಾಚೀನ ಜ್ಞಾನ",
    readMore: "ಇನ್ನಷ್ಟು ಓದಿ",
    allCategories: "ಎಲ್ಲಾ",
    noPosts: "ಯಾವುದೇ ಪೋಸ್ಟ್\u200Cಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಹೊಸ ವಿಷಯಕ್ಕಾಗಿ ಶೀಘ್ರದಲ್ಲೇ ಪರಿಶೀಲಿಸಿ.",
    backToBlog: "ಬ್ಲಾಗ್\u200Cಗೆ ಹಿಂತಿರುಗಿ",
    recentPosts: "ಇತ್ತೀಚಿನ ಪೋಸ್ಟ್\u200Cಗಳು",


    // Contact Page
    contactPageTitle: "ಸಂಪರ್ಕದಲ್ಲಿರಿ",
    contactPageSubtitle:
      "ನಿಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರಯಾಣದಲ್ಲಿ ಮಾರ್ಗದರ್ಶನ ಮಾಡಲು ನಾವು ಇಲ್ಲಿದ್ದೇವೆ",
    sendMessage: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    messageSent: "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ!",
    operatingHours: "ಕಾರ್ಯ ಸಮಯ",
    mondayToSaturday: "ಸೋಮವಾರ - ಶನಿವಾರ: ಬೆಳಿಗ್ಗೆ 9:00 - ಸಂಜೆ 7:00",
    sunday: "ಭಾನುವಾರ: ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಮೂಲಕ ಮಾತ್ರ",
  },
};

// Targeted overrides for recommendation flow where wording differs by locale.
const recommendationTranslations: Record<Exclude<Language, "en">, Record<string, string>> = {
  hi: {
    recommendations: "परामर्श",
    luckyNames: "शुभ नाम",
    luckyNamesDesc: "नक्षत्र के आधार पर नाम सुझाव पाएँ",
    luckyNumberAndColor: "शुभ अंक और रंग",
    luckyNumberAndColorDesc: "अपने कॉस्मिक पावर नंबर और रंग जानें",
    generate: "जनरेट करें",
    calculationResults: "परिणाम",
    selectNakshatra: "नक्षत्र चुनें",
    selectRaashi: "राशि चुनें",
    recommendationsHeroSubtitle:
      "प्राचीन वैदिक ज्योतिष और आधुनिक गणना का संगम, आपके लिए शुभ सुझाव।",
    recommendationsHowItWorksTitle: "यह कैसे काम करता है",
    recommendationsHowItWorksBody:
      "हमारा इंजन आपके नक्षत्र और राशि के आधार पर ऐसे अक्षर, अंक और रंग सुझाता है जो आपकी ग्रह ऊर्जा से मेल खाते हैं।",
    recommendationsApplyingRemediesTitle: "उपाय कैसे लागू करें",
    recommendationsApplyingRemediesBody:
      "ये सुझाव एक अच्छी शुरुआत हैं। गहरे जीवन प्रश्नों के लिए पूर्ण कुंडली विश्लेषण अधिक उपयोगी है।",
    recommendationsQuote: "तारे मार्ग दिखाते हैं, चलना हमें ही होता है।",
    recommendationsMethodHint: "अपना तरीका चुनें और कॉस्मिक सामंजस्य जानें",
    recommendationsWesternZodiac: "पश्चिमी राशि",
    recommendationsWesternShort: "पश्चिमी",
    recommendationsVedicBirthChart: "वैदिक (कुंडली)",
    recommendationsVedicShort: "वैदिक",
    recommendationsChooseNakshatra: "नक्षत्र चुनें",
    recommendationsBirthStarHint: "जन्म नक्षत्र के आधार पर",
    recommendationsChooseRaashi: "राशि चुनें",
    recommendationsMoonSignHint: "चंद्र राशि के आधार पर",
    recommendationsSelectSunSign: "अपनी सूर्य राशि चुनें",
    recommendationsClickZodiac: "शुरू करने के लिए राशि कार्ड चुनें",
    recommendationsGenerating: "जनरेट हो रहा है...",
    recommendationsAccordingToZodiac: "राशि के अनुसार",
    recommendationsRecommendedSyllables: "सुझाए गए शुरुआती अक्षर",
    recommendationsPrimaryCosmicNumber: "मुख्य कॉस्मिक नंबर",
    recommendationsAuraEnhancingColor: "आभा बढ़ाने वाला रंग",
    recommendationsBalancingStone: "ग्रह संतुलन के लिए रत्न",
    recommendationsSeekDeeperGuidance: "और गहरा मार्गदर्शन",
    recommendationsPersonalizedReading: "क्या आप व्यक्तिगत रीडिंग चाहते हैं?",
    recommendationsPersonalizedReadingDesc:
      "आपका कॉस्मिक ब्लूप्रिंट केवल अंकों से आगे है। विस्तृत वैदिक मार्गदर्शन के लिए हमारे विशेषज्ञों से जुड़ें।",
    recommendationsCallAstrologer: "ज्योतिषी को कॉल करें",
    recommendationsChatWhatsApp: "व्हाट्सऐप पर चैट करें",
  },
  kn: {
    recommendations: "ಶಿಫಾರಸುಗಳು",
    luckyNames: "ಶುಭ ಹೆಸರುಗಳು",
    luckyNamesDesc: "ನಕ್ಷತ್ರದ ಆಧಾರದ ಮೇಲೆ ಹೆಸರು ಸಲಹೆಗಳು",
    luckyNumberAndColor: "ಅದೃಷ್ಟ ಸಂಖ್ಯೆ ಮತ್ತು ಬಣ್ಣ",
    luckyNumberAndColorDesc: "ನಿಮ್ಮ ಕಾಸ್ಮಿಕ ಪವರ್ ಸಂಖ್ಯೆ ಮತ್ತು ಬಣ್ಣ ತಿಳಿಯಿರಿ",
    generate: "ರಚಿಸಿ",
    calculationResults: "ಫಲಿತಾಂಶಗಳು",
    selectNakshatra: "ನಕ್ಷತ್ರ ಆಯ್ಕೆಮಾಡಿ",
    selectRaashi: "ರಾಶಿ ಆಯ್ಕೆಮಾಡಿ",
    recommendationsHeroSubtitle:
      "ಪ್ರಾಚೀನ ವೇದಿಕ ಜ್ಯೋತಿಷ್ಯ ಮತ್ತು ಆಧುನಿಕ ಗಣನೆಯ ಸಂಗಮದಿಂದ ನಿಮ್ಮ ಶುಭ ಆಯ್ಕೆಗಳು.",
    recommendationsHowItWorksTitle: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    recommendationsHowItWorksBody:
      "ನಿಮ್ಮ ನಕ್ಷತ್ರ ಮತ್ತು ರಾಶಿಯ ಆಧಾರದ ಮೇಲೆ ನಿಮ್ಮ ಗ್ರಹಶಕ್ತಿಗೆ ಹೊಂದುವ ಅಕ್ಷರ, ಸಂಖ್ಯೆ ಮತ್ತು ಬಣ್ಣಗಳನ್ನು ಇದು ಸೂಚಿಸುತ್ತದೆ.",
    recommendationsApplyingRemediesTitle: "ಉಪಾಯಗಳನ್ನು ಅನ್ವಯಿಸುವುದು",
    recommendationsApplyingRemediesBody:
      "ಈ ಸಲಹೆಗಳು ಒಳ್ಳೆಯ ಆರಂಭ. ಆಳವಾದ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸಂಪೂರ್ಣ ಕುಂಡಲಿ ವಿಶ್ಲೇಷಣೆ ಸಹಾಯಕ.",
    recommendationsQuote: "ನಕ್ಷತ್ರಗಳು ದಾರಿಯನ್ನು ತೋರಿಸುತ್ತವೆ, ನಡೆಯುವುದು ನಮ್ಮ ಕೆಲಸ.",
    recommendationsMethodHint: "ನಿಮಗೆ ಸೂಕ್ತ ವಿಧಾನ ಆಯ್ಕೆಮಾಡಿ",
    recommendationsWesternZodiac: "ಪಾಶ್ಚಾತ್ಯ ರಾಶಿ",
    recommendationsWesternShort: "ಪಾಶ್ಚಾತ್ಯ",
    recommendationsVedicBirthChart: "ವೇದಿಕ (ಕುಂಡಲಿ)",
    recommendationsVedicShort: "ವೇದಿಕ",
    recommendationsChooseNakshatra: "ನಕ್ಷತ್ರ ಆಯ್ಕೆಮಾಡಿ",
    recommendationsBirthStarHint: "ಜನ್ಮ ನಕ್ಷತ್ರದ ಆಧಾರದಲ್ಲಿ",
    recommendationsChooseRaashi: "ರಾಶಿ ಆಯ್ಕೆಮಾಡಿ",
    recommendationsMoonSignHint: "ಚಂದ್ರ ರಾಶಿಯ ಆಧಾರದಲ್ಲಿ",
    recommendationsSelectSunSign: "ನಿಮ್ಮ ಸೂರ್ಯ ರಾಶಿ ಆಯ್ಕೆಮಾಡಿ",
    recommendationsClickZodiac: "ಆರಂಭಿಸಲು ರಾಶಿ ಕಾರ್ಡ್ ಆಯ್ಕೆಮಾಡಿ",
    recommendationsGenerating: "ರಚಿಸಲಾಗುತ್ತಿದೆ...",
    recommendationsAccordingToZodiac: "ರಾಶಿಯ ಪ್ರಕಾರ",
    recommendationsRecommendedSyllables: "ಶಿಫಾರಸಾದ ಆರಂಭದ ಅಕ್ಷರಗಳು",
    recommendationsPrimaryCosmicNumber: "ಮುಖ್ಯ ಕಾಸ್ಮಿಕ ಸಂಖ್ಯೆ",
    recommendationsAuraEnhancingColor: "ಆಭಾ ಹೆಚ್ಚಿಸುವ ಬಣ್ಣ",
    recommendationsBalancingStone: "ಗ್ರಹ ಸಮತೋಲನದ ರತ್ನ",
    recommendationsSeekDeeperGuidance: "ಇನ್ನಷ್ಟು ಆಳವಾದ ಮಾರ್ಗದರ್ಶನ",
    recommendationsPersonalizedReading: "ವೈಯಕ್ತಿಕ ಓದು ಬೇಕೆ?",
    recommendationsPersonalizedReadingDesc:
      "ನಿಮ್ಮ ಕಾಸ್ಮಿಕ ರೂಪರೇಖೆ ಸಂಖ್ಯೆಗಳಿಗಿಂತ ಹೆಚ್ಚಿನದು. ವಿವರವಾದ ವೇದಿಕ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ನಮ್ಮ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    recommendationsCallAstrologer: "ಜ್ಯೋತಿಷಿಗೆ ಕರೆ ಮಾಡಿ",
    recommendationsChatWhatsApp: "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಚಾಟ್ ಮಾಡಿ",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Restore previously selected language from local storage.
    const saved = localStorage.getItem("vedicsages_language");
    if (saved && translations[saved as Language]) {
      setLanguage(saved as Language);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    // Persist language choice so refresh/navigation keeps the same locale.
    setLanguage(lang);
    localStorage.setItem("vedicsages_language", lang);
  };

  const t = (key: string): string => {
    // Resolve key from recommendation overrides first, then main dictionary.
    if (language !== "en" && recommendationTranslations[language]?.[key]) {
      return recommendationTranslations[language][key];
    }
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export default LanguageContext;

