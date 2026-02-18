"use client";

import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface ZodiacVisualizerProps {
    onSelect: (name: string) => void;
    selectedZodiac: string;
}

const zodiacs = [
    { name: "Aries", symbol: "♈", dates: "Mar 21 - Apr 19", color: "text-red-500", bg: "bg-red-500/10" },
    { name: "Taurus", symbol: "♉", dates: "Apr 20 - May 20", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { name: "Gemini", symbol: "♊", dates: "May 21 - Jun 20", color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { name: "Cancer", symbol: "♋", dates: "Jun 21 - Jul 22", color: "text-slate-400", bg: "bg-slate-400/10" },
    { name: "Leo", symbol: "♌", dates: "Jul 23 - Aug 22", color: "text-orange-500", bg: "bg-orange-500/10" },
    { name: "Virgo", symbol: "♍", dates: "Aug 23 - Sep 22", color: "text-green-600", bg: "bg-green-600/10" },
    { name: "Libra", symbol: "♎", dates: "Sep 23 - Oct 22", color: "text-pink-500", bg: "bg-pink-500/10" },
    { name: "Scorpio", symbol: "♏", dates: "Oct 23 - Nov 21", color: "text-red-700", bg: "bg-red-700/10" },
    { name: "Sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21", color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Capricorn", symbol: "♑", dates: "Dec 22 - Jan 19", color: "text-amber-800", bg: "bg-amber-800/10" },
    { name: "Aquarius", symbol: "♒", dates: "Jan 20 - Feb 18", color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Pisces", symbol: "♓", dates: "Feb 19 - Mar 20", color: "text-teal-500", bg: "bg-teal-500/10" },
];

export function ZodiacVisualizer({ onSelect, selectedZodiac }: ZodiacVisualizerProps) {
    const { t } = useLanguage();

    return (
        <div className="grid grid-cols-1 min-[320px]:grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-4">
            {zodiacs.map((z) => (
                <div
                    key={z.name}
                    onClick={() => onSelect(z.name)}
                    className={cn(
                        "group relative cursor-pointer overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:shadow-xl active:scale-95",
                        selectedZodiac === z.name
                            ? "border-saffron bg-saffron/5 shadow-lg shadow-saffron/10 scale-105"
                            : "border-gold/20 bg-card hover:border-saffron/40"
                    )}
                >
                    <div className={cn(
                        "mx-auto mb-3 flex size-12 items-center justify-center rounded-full text-2xl transition-transform duration-500 group-hover:rotate-[360deg]",
                        z.bg,
                        z.color
                    )}>
                        {z.symbol}
                    </div>
                    <div className="text-center">
                        <h4 className={cn(
                            "font-serif text-sm font-bold transition-colors",
                            selectedZodiac === z.name ? "text-saffron" : "text-maroon"
                        )}>
                            {z.name}
                        </h4>
                        <p className="mt-1 text-[10px] text-muted-foreground uppercase tracking-tighter">
                            {z.dates}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
