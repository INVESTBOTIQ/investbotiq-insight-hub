import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Compass, 
  Play
} from "lucide-react";

type Props = {
  onScrollToInfo: () => void;
  onOpenDemo?: () => void;
};

function FadeIn({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const HeroSection: React.FC<Props> = ({ onScrollToInfo, onOpenDemo }) => {
  return (
    <section className="relative z-10 w-full pt-20 pb-20 md:pt-28 md:pb-32 overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Pill Badge */}
          <FadeIn delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
              <span className="font-bold">IQ Bot v2.4 Actief</span>
              <span className="text-slate-300">•</span>
              <span>100% Geautomatiseerd</span>
            </div>
          </FadeIn>

          {/* Main Headline */}
          <FadeIn delay={0.12}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
              Laat de{" "}
              <span className="gradient-text">
                IQ Bot
              </span>{" "}
              automatisch jouw{" "}
              <span className="underline decoration-indigo-500/30 underline-offset-8">
                cashflow opbouwen
              </span>
            </h1>
          </FadeIn>

          {/* Hero Subtitle */}
          <FadeIn delay={0.18}>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Geen technische kennis vereist. Geen dagelijkse zorgen. Sluit je aan en laat jouw kapitaal gestructureerd en passief groeien.
            </p>
          </FadeIn>

          {/* Hero Action Buttons Stack */}
          <FadeIn delay={0.24}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {/* Primary CTA */}
              <Button
                asChild
                className="w-full sm:w-auto px-8 py-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-bold text-base shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 group"
              >
                <Link to="/auth">
                  <span>Start Direct</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {/* Secondary CTA */}
              <Button
                variant="outline"
                onClick={onScrollToInfo}
                className="w-full sm:w-auto px-6 py-6 rounded-2xl bg-white border border-slate-200 text-slate-800 font-semibold text-base hover:bg-slate-50 hover:border-slate-300 shadow-2xs transition-all text-center flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>Bekijk hoe het werkt</span>
              </Button>

              {/* Demo Button */}
              {onOpenDemo && (
                <Button
                  variant="outline"
                  onClick={onOpenDemo}
                  className="w-full sm:w-auto px-6 py-6 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-indigo-700 font-semibold text-base hover:bg-indigo-100/80 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                  <span>Bekijk demo</span>
                </Button>
              )}
            </div>
          </FadeIn>

          {/* Trust Stats */}
          <FadeIn delay={0.30}>
            <div className="pt-8 border-t border-slate-200/60 grid grid-cols-3 gap-6 max-w-xl mx-auto text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">€2.4M+</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Gegenereerde Cashflow</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">99.8%</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Bot Uptime</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">In Eigen Beheer</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
