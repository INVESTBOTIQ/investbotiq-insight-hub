
import React from "react";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import MissionSection from "@/components/missie-visie/MissionSection";
import VisionSection from "@/components/missie-visie/VisionSection";
import QuoteSection from "@/components/missie-visie/QuoteSection";
import ValuesSection from "@/components/missie-visie/ValuesSection";
import CTASection from "@/components/missie-visie/CTASection";

export default function MissieVisie() {
  return (
    <InfoPageLayout 
      title="Missie & Visie van INVESTBOTIQ"
      subtitle="Financiële vrijheid. Voor iedereen. Altijd."
    >
      <MissionSection />
      <VisionSection />
      <QuoteSection />
      <ValuesSection />
      <CTASection />
    </InfoPageLayout>
  );
}
