"use client";

import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { toast } from "sonner";

export default function ContactPage() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);
        toast.success(t("messageSent"));
        (e.target as HTMLFormElement).reset();
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
            href: "https://wa.me/919448313270",
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

            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Contact Details */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="font-serif text-2xl font-bold text-maroon lg:text-3xl">
                                    {t("contactTitle")}
                                </h2>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    Have questions about your birth chart or need guidance on a specific life challenge?
                                    Reach out to us, and our expert astrologers will be happy to assist you.
                                </p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                                {contactInfo.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        target={item.icon === MessageCircle ? "_blank" : undefined}
                                        rel={item.icon === MessageCircle ? "noopener noreferrer" : undefined}
                                        className="flex items-center gap-4 rounded-xl border border-gold/10 bg-card p-4 transition-all hover:border-gold/30 hover:shadow-md"
                                    >
                                        <div className={`flex size-12 items-center justify-center rounded-lg ${item.bg} ${item.color}`}>
                                            <item.icon className="size-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                                                {item.title}
                                            </p>
                                            <p className="text-lg font-semibold text-maroon">{item.value}</p>
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
                        <Card className="border-gold/20 shadow-lg">
                            <CardContent className="p-8">
                                <h3 className="mb-6 font-serif text-xl font-bold text-maroon">
                                    {t("sendMessage")}
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-maroon">{t("yourName")}</label>
                                            <Input placeholder="John Doe" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-maroon">{t("email")}</label>
                                            <Input type="email" placeholder="john@example.com" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-maroon">{t("phoneNumber")}</label>
                                        <Input type="tel" placeholder="+91 90000 00000" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-maroon">{t("selectService")}</label>
                                        <Input placeholder="e.g. Birth Chart Analysis" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-maroon">{t("describeYourConcern")}</label>
                                        <Textarea
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
