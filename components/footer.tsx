"use client";

import Link from "next/link";
import { Sun, Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const quickLinks = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "panchang", href: "/panchang" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gold/30 bg-maroon text-cream">
      {/* Decorative gold line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Sun className="size-7 text-gold" />
              <span className="font-serif text-xl font-bold text-gold">
                VedicSages
              </span>
            </div>
            <p className="text-sm leading-relaxed text-cream/80">
              {t("footerTagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg font-semibold text-gold">
              {t("quickLinks")}
            </h3>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {quickLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-sm text-cream/80 transition-colors hover:text-gold"
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg font-semibold text-gold">
              {t("contactUs")}
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+919480708383"
                className="flex items-center gap-2 text-sm text-cream/80 transition-colors hover:text-gold"
              >
                <Phone className="size-4" />
                +91 94807 08383
              </a>
              <a
                href="https://wa.me/919448313270"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-cream/80 transition-colors hover:text-gold"
              >
                <MessageCircle className="size-4" />
                +91 94483 13270
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-cream/20 pt-6 text-center">
          <p className="text-xs text-cream/60">
            {"© "}{new Date().getFullYear()}{" VedicSages. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
