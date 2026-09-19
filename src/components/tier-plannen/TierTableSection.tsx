import React, { useState } from "react";
import TierDescription from "./TierDescription";
import TierSelector from "./TierSelector";
import TierTable from "./TierTable";
import TierMobileCards from "./TierMobileCards";
import { FadeIn } from "../info/FadeInAnimation";

export default function TierTableSection() {
  const [selectedTier, setSelectedTier] = useState<string>("inbotiq2");

  return (
    <section className="py-16 px-4 bg-slate-50 border-b border-slate-200/80">
      <div className="container mx-auto max-w-6xl">
        <TierDescription />
        <TierSelector 
          selectedTier={selectedTier} 
          onTierChange={setSelectedTier} 
        />
        
        {selectedTier === "inbotiq2" && (
          <FadeIn delay={0.1}>
            <TierTable />
            <TierMobileCards />
          </FadeIn>
        )}

        {selectedTier === "inbotiq1" && (
          <FadeIn delay={0.1}>
            <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-lg mx-auto">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                InBotIQ1 Tier 1 – Binnenkort Beschikbaar
              </h3>
              <p className="text-sm text-slate-600">
                We werken hard aan de validatie van InBotIQ1. 
                Houd uw portaal in de gaten voor updates over de uitrol.
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
