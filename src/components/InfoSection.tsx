import React from "react";
import WhatIsSection from "./info/WhatIsSection";
import WhySection from "./info/WhySection";
import HowSection from "./info/HowSection";
import AdvantagesSection from "./info/AdvantagesSection";
import FinalCtaSection from "./info/FinalCtaSection";

type Props = {
  onOpenDemo?: () => void;
};

const InfoSection = React.forwardRef<HTMLDivElement, Props>(({ onOpenDemo }, ref) => (
  <div ref={ref} className="w-full flex flex-col z-20 relative">
    <WhatIsSection />
    <WhySection />
    <HowSection />
    <AdvantagesSection />
    <FinalCtaSection onOpenDemo={onOpenDemo} />
  </div>
));

InfoSection.displayName = "InfoSection";

export default InfoSection;
