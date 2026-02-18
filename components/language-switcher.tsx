"use client";

import { useLanguage } from "@/lib/language-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
  { value: "kn", label: "ಕನ್ನಡ" },
] as const;

export function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <Select
      value={language}
      onValueChange={(val) => changeLanguage(val as "en" | "hi" | "kn")}
    >
      <SelectTrigger className="w-auto gap-2 border-gold/40 bg-card text-foreground">
        <Globe className="size-4 text-saffron" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
