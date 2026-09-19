import React from "react";
import WhatIsSection from "./info/WhatIsSection";
import WhySection from "./info/WhySection";
import CashflowCalculator from "./info/CashflowCalculator";
import HowSection from "./info/HowSection";
import AdvantagesSection from "./info/AdvantagesSection";
import FAQSection from "./info/FAQSection";
import FinalCtaSection from "./info/FinalCtaSection";

type Props = {
  onOpenDemo?: () => void;
};

const InfoSection = React.forwardRef<HTMLDivElement, Props>(({ onOpenDemo }, ref) => (
  <div ref={ref} className="w-full flex flex-col z-20 relative">
    <WhatIsSection />
    <WhySection />
    <CashflowCalculator />
    <HowSection />
    <AdvantagesSection />
    <FAQSection />
    <FinalCtaSection onOpenDemo={onOpenDemo} />
  </div>
));

InfoSection.displayName = "InfoSection";

export default InfoSection;
