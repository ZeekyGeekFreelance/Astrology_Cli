"use client";

import { useEffect } from "react";
import { LanguageProvider } from "@/lib/language-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { usePathname } from "next/navigation";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  // Route-aware shell behavior (hide marketing chrome in admin studio).
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    if (typeof window === "undefined" || isAdminRoute) return;

    // Any element marked with `card-reveal` is animated on first viewport entry.
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".card-reveal"),
    );
    if (elements.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((el) => {
      if (el.classList.contains("is-visible")) return;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname, isAdminRoute]);

  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        {/* Public site chrome */}
        {!isAdminRoute && <Header />}
        {/* Route content */}
        <main className="flex-1">{children}</main>
        {!isAdminRoute && <Footer />}
      </div>
    </LanguageProvider>
  );
}
