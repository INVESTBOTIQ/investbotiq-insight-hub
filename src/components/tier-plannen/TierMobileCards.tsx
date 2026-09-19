import React from "react";
import { FadeIn } from "../info/FadeInAnimation";
import { CalendarDays, TrendingUp, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const tierData = [
  {
    tier: "Tier 2",
    status: "Actief",
    period: "0 – 3 maanden",
    units: "1 unit",
    cashflow: "€40,00/mnd"
  },
  {
    tier: "Tier 3",
    status: "Actief",
    period: "3 – 6 maanden",
    units: "2 units",
    cashflow: "€80,00/mnd"
  },
  {
    tier: "Tier 4",
    status: "Actief",
    period: "6 – 9 maanden",
    units: "3 units",
    cashflow: "€120,00/mnd"
  },
  {
    tier: "Tier 5",
    status: "Actief",
    period: "9 – 12 maanden",
    units: "5 units",
    cashflow: "€200,00/mnd"
  },
  {
    tier: "Tier 6",
    status: "Finishing Plan",
    period: "12 – 15 maanden",
    units: "5 units",
    cashflow: "€200,00/mnd"
  }
];

export default function TierMobileCards() {
  return (
    <div className="md:hidden space-y-4">
      {tierData.map((item, index) => (
        <FadeIn key={index} delay={0.2 + index * 0.05} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <h3 className="font-extrabold text-base text-slate-900">{item.tier}</h3>
            </div>
            <span className={cn(
              "px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1",
              item.status === "Actief" 
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                : "bg-indigo-50 text-indigo-700 border border-indigo-200"
            )}>
              <CheckCircle2 className="w-3 h-3" />
              {item.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 my-2">
            <div>
              <span className="text-slate-500 block">Periode</span>
              <span className="font-semibold text-slate-800">{item.period}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Flowlutas</span>
              <span className="font-semibold text-slate-800">{item.units}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-slate-500 font-medium">Maandelijkse Cashflow</span>
            <span className="text-lg font-extrabold text-emerald-600">{item.cashflow}</span>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
