"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "recommendations", href: "/recommendations" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
];


export function Header() {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isIndicLanguage = language === "hi" || language === "kn";

  return (
    <header className="sticky top-0 z-50 border-b border-gold/30 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Sun className="size-8 text-saffron" />
          <span className="font-serif text-xl font-bold tracking-tight text-maroon">
            VedicSages
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-saffron",
                isIndicLanguage ? "font-semibold" : "font-medium",
                pathname === link.href
                  ? "text-saffron bg-muted"
                  : "text-foreground"
              )}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Button asChild className="bg-saffron text-white hover:bg-saffron/90 hover:shadow-lg hover:shadow-saffron/20 transition-all duration-300 active:scale-95">
            <Link href="/contact">{t("getReading")}</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 font-serif text-maroon">
                  <Sun className="size-6 text-saffron" />
                  VedicSages
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 pt-4" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-3 text-base transition-colors hover:bg-muted hover:text-saffron",
                      isIndicLanguage ? "font-semibold" : "font-medium",
                      pathname === link.href
                        ? "text-saffron bg-muted"
                        : "text-foreground"
                    )}
                  >
                    {t(link.key)}
                  </Link>
                ))}
                <Button
                  asChild
                  className="mt-4 bg-saffron text-white hover:bg-saffron/90 hover:shadow-lg hover:shadow-saffron/20 transition-all duration-300 active:scale-95"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/contact">{t("getReading")}</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
