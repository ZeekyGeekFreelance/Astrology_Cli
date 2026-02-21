"use client";

import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/lib/language-context";
import { toast } from "sonner";

export default function ContactPage() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);
    // Service selector state supports curated options + custom service entry.
    const [selectedServiceOption, setSelectedServiceOption] = useState("");
    const [customService, setCustomService] = useState("");

    // Curated services shown in the contact form dropdown.
    const curatedServices = [
        "Birth Chart Analysis",
        "Name Suggestion",
        "Lucky Number & Color",
        "Gemstone Recommendation",
        "Marriage / Relationship Guidance",
        "Health & Wellness Guidance",
        "Financial / Career Guidance",
        "Dosha Remedies",
        "Spiritual Protection",
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Build WhatsApp payload from current form inputs.
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const service = selectedServiceOption === "other"
            ? customService.trim()
            : selectedServiceOption.trim();
        const concern = String(formData.get("concern") || "").trim();

        const message = [
            "Namaste Guruji, I would like to connect for consultation.",
            "",
            `Name: ${name || "N/A"}`,
            `Email: ${email || "N/A"}`,
            `Phone: ${phone || "N/A"}`,
            `Service Needed: ${service || "N/A"}`,
            `Concern: ${concern || "N/A"}`,
        ].join("\n");

        setLoading(true);
        // Open WhatsApp chat with prefilled consultation details.
        window.open(
            `https://wa.me/919448313270?text=${encodeURIComponent(message)}`,
            "_blank",
            "noopener,noreferrer",
        );
        setLoading(false);
        toast.success("Opening WhatsApp with your details...");
        form.reset();
        setSelectedServiceOption("");
        setCustomService("");
    };

    const contactInfo = [
        {
            icon: Phone,
            title: t("phone"),
            value: "+91 94807 08383",
            href: "tel:+919480708383",
            color: "text-maroon",
            bg: "bg-maroon/10",
        },
        {
            icon: MessageCircle,
            title: t("whatsapp"),
            value: "+91 94483 13270",
            href: `https://wa.me/919448313270?text=${encodeURIComponent("Namaste Guruji, I would like to book an astrology consultation. Please share the next steps.")}`,
            color: "text-green-600",
            bg: "bg-green-600/10",
        },
        {
            icon: Mail,
            title: t("email"),
            value: "contact@vedicsages.com",
            href: "mailto:contact@vedicsages.com",
            color: "text-saffron",
            bg: "bg-saffron/10",
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Header */}
            <section className="relative overflow-hidden bg-maroon py-16 lg:py-24">
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <div className="absolute -top-20 -right-20 size-80 rounded-full border border-gold/15" />
                    <div className="absolute -bottom-20 -left-20 size-96 rounded-full border border-gold/10" />
                </div>
                <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
                    <Mail className="mx-auto size-10 text-gold" />
                    <h1 className="mt-4 font-serif text-3xl font-bold text-cream lg:text-5xl text-balance">
                        {t("contactPageTitle")}
                    </h1>
                    <p className="mt-3 text-cream/80">{t("contactPageSubtitle")}</p>
                </div>
            </section>

            <section className="overflow-x-hidden py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Contact Details */}
                        <div className="min-w-0 space-y-8">
                            <div>
                                <h2 className="font-serif text-2xl font-bold text-maroon lg:text-3xl">
                                    {t("contactTitle")}
                                </h2>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    Have questions about your birth chart or need guidance on a specific life challenge?
                                    Reach out to us, and our expert astrologers will be happy to assist you.
                                </p>
                            </div>

                            <div className="card-reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-1" style={{ ["--reveal-delay" as any]: "90ms" }}>
                                {contactInfo.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        target={item.icon === MessageCircle ? "_blank" : undefined}
                                        rel={item.icon === MessageCircle ? "noopener noreferrer" : undefined}
                                        className="flex min-w-0 items-center gap-4 rounded-xl border border-gold/10 bg-card p-4 transition-all hover:border-gold/30 hover:shadow-md"
                                    >
                                        <div className={`flex size-12 items-center justify-center rounded-lg ${item.bg} ${item.color}`}>
                                            <item.icon className="size-6" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                                                {item.title}
                                            </p>
                                            <p className="truncate text-lg font-semibold text-maroon">{item.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* Hours & Location */}
                            <div className="rounded-xl border border-gold/20 bg-muted/30 p-8 space-y-6">
                                <div className="flex gap-4">
                                    <Clock className="size-6 text-saffron shrink-0" />
                                    <div>
                                        <h3 className="font-serif font-bold text-maroon mb-2">{t("operatingHours")}</h3>
                                        <p className="text-sm text-muted-foreground">{t("mondayToSaturday")}</p>
                                        <p className="text-sm text-muted-foreground">{t("sunday")}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <MapPin className="size-6 text-saffron shrink-0" />
                                    <div>
                                        <h3 className="font-serif font-bold text-maroon mb-2">Our Ashram</h3>
                                        <p className="text-sm text-muted-foreground">
                                            VedicSages Centre, Bengaluru, Karnataka, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <Card className="card-reveal min-w-0 border-gold/20 shadow-lg" style={{ ["--reveal-delay" as any]: "130ms" }}>
                            <CardContent className="min-w-0 p-8">
                                <h3 className="mb-6 font-serif text-xl font-bold text-maroon">
                                    {t("sendMessage")}
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-maroon">{t("yourName")}</label>
                                            <Input name="name" placeholder="name" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-maroon">{t("email")}</label>
                                            <Input name="email" type="email" placeholder="name@example.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-maroon">{t("phoneNumber")}</label>
                                        <Input name="phone" type="tel" placeholder="+91 90000 00000" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-maroon">{t("selectService")}</label>
                                        <Select
                                            value={selectedServiceOption}
                                            onValueChange={setSelectedServiceOption}
                                        >
                                            <SelectTrigger className="w-full min-w-0 border-gold/20 bg-card">
                                                <SelectValue placeholder="Choose a service" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {curatedServices.map((serviceItem) => (
                                                    <SelectItem key={serviceItem} value={serviceItem}>
                                                        {serviceItem}
                                                    </SelectItem>
                                                ))}
                                                <SelectItem value="other">Other (Type custom)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {selectedServiceOption === "other" && (
                                            <Input
                                                value={customService}
                                                onChange={(e) => setCustomService(e.target.value)}
                                                placeholder="Type your service requirement"
                                            />
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-maroon">{t("describeYourConcern")}</label>
                                        <Textarea
                                            name="concern"
                                            placeholder="Your message here..."
                                            className="min-h-[120px]"
                                            required
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-saffron text-white hover:bg-saffron/90 hover:shadow-lg hover:shadow-saffron/20 transition-all duration-300 active:scale-95"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            "Sending..."
                                        ) : (
                                            <>
                                                {t("submit")} <Send className="ml-2 size-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Decoration */}
            <section className="py-12 bg-maroon text-center">
                <Sparkles className="mx-auto size-8 text-gold opacity-50 mb-4" />
                <h2 className="font-serif text-2xl text-cream italic opacity-80">
                    "As the stars are, so are we."
                </h2>
            </section>
        </div>
    );
}



