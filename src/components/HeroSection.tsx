import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ArrowRight, 
  Compass, 
  Play, 
  TrendingUp, 
  CheckCircle2, 
  RefreshCw, 
  Bot, 
  ChevronRight, 
  Lock, 
  Sparkles 
} from "lucide-react";

type Props = {
  onScrollToInfo: () => void;
};

const HeroSection: React.FC<Props> = ({ onScrollToInfo }) => {
  const [showDemoModal, setShowDemoModal] = useState(false);

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
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <section className="relative z-10 w-full pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            
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
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
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
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Geen kennis vereist, geen zorgen. Gewoon laten groeien.
              </p>
            </FadeIn>

            {/* Hero Action Buttons Stack */}
            <FadeIn delay={0.24}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                {/* Primary CTA */}
                <Button
                  asChild
                  className="w-full sm:w-auto px-8 py-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-bold text-base shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 group"
                >
                  <Link to="/auth">
                    <span>Inloggen</span>
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
                <Button
                  variant="outline"
                  onClick={() => setShowDemoModal(true)}
                  className="w-full sm:w-auto px-6 py-6 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-indigo-700 font-semibold text-base hover:bg-indigo-100/80 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                  <span>Bekijk demo</span>
                </Button>
              </div>
            </FadeIn>

            {/* Trust Stats */}
            <FadeIn delay={0.30}>
              <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">€2.4M+</p>
                  <p className="text-xs text-slate-500 font-medium">Gegenereerde Cashflow</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">99.8%</p>
                  <p className="text-xs text-slate-500 font-medium">Bot Uptime</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">100%</p>
                  <p className="text-xs text-slate-500 font-medium">In Eigen Beheer</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Hero Visual Preview Column */}
          <div className="lg:col-span-5 relative">
            {/* Decorative Orb Floating */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse pointer-events-none" />

            {/* Dashboard Preview Card */}
            <FadeIn delay={0.2}>
              <div className="relative rounded-3xl bg-slate-900 text-white p-6 sm:p-7 shadow-2xl border border-slate-800 backdrop-blur-xl">
                
                {/* Card Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                        <Bot className="w-4 h-4 text-indigo-400" />
                        IQ Bot Live Monitor
                      </h3>
                      <p className="text-xs text-slate-400">Automatische Strategie Actief</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Passief Actief
                  </span>
                </div>

                {/* Main Metric Box */}
                <div className="py-5 space-y-1.5">
                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                    Totale Gegenereerde Cashflow
                  </p>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-black text-white tracking-tight">€ 14.820,45</span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                      <TrendingUp className="w-3.5 h-3.5" /> +12,4% per maand
                    </span>
                  </div>
                </div>

                {/* Mini Chart Visual Curve */}
                <div className="h-28 w-full bg-slate-800/60 rounded-2xl p-3 border border-slate-700/50 relative overflow-hidden mb-4 flex flex-col justify-end">
                  <div className="absolute top-2 left-3 text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-400" /> Gestage vermogensopbouw
                  </div>
                  <svg viewBox="0 0 300 80" className="w-full h-20 overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 65 Q 40 60, 80 52 T 160 40 T 240 22 T 300 8 L 300 80 L 0 80 Z"
                      fill="url(#curveGradient)"
                    />
                    <path
                      d="M0 65 Q 40 60, 80 52 T 160 40 T 240 22 T 300 8"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="3"
                    />
                    <circle cx="300" cy="8" r="4" fill="#10b981" />
                  </svg>
                </div>

                {/* Recent Bot Execution Log */}
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Laatste Automatische Acties
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 flex items-center justify-between border border-slate-700/40">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-slate-200">Maandelijkse Cashflow Reinvest</span>
                      </div>
                      <span className="font-mono text-emerald-400 font-bold">+€ 340,00</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/80 flex items-center justify-between border border-slate-700/40">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span className="text-slate-200">Portfolio Herbalancering</span>
                      </div>
                      <span className="text-slate-400 font-mono">Voltooid</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Geen handmatige actie vereist</span>
                  <button
                    onClick={() => setShowDemoModal(true)}
                    className="text-indigo-400 font-semibold hover:text-indigo-300 flex items-center gap-1 transition-colors"
                  >
                    Open Dashboard Demo <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>

      {/* Interactive Demo Dashboard Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-4xl w-[92vw] bg-slate-900 text-white border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl">
          <DialogHeader className="pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-extrabold text-white">
                  IQ Bot Member Dashboard (Demo)
                </DialogTitle>
                <p className="text-xs text-slate-400">
                  Live gesimuleerde weergave van jouw account
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="grid sm:grid-cols-3 gap-4 my-6">
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
              <p className="text-xs text-slate-400 font-medium">Totaal Saldo</p>
              <p className="text-2xl font-bold text-white mt-1">€ 12.450,00</p>
              <span className="text-xs text-emerald-400 font-semibold">+8,4% deze maand</span>
            </div>
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
              <p className="text-xs text-slate-400 font-medium">Automatische Uitkering</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">€ 310,00 per maand</p>
              <span className="text-xs text-slate-400">Volgende uitbetaling: 1e v/d maand</span>
            </div>
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
              <p className="text-xs text-slate-400 font-medium">Bot Status</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold text-slate-200">IQ Bot Actief (v2.4)</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-800 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-bold text-slate-200">Maandelijkse Cashflow Opbouw</h4>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono">
                Live Simulatie
              </span>
            </div>
            <div className="h-32 flex items-end justify-between gap-2 pt-4">
              {[210, 245, 260, 280, 295, 310, 325, 330, 340].map((val, idx) => {
                const heightPercent = Math.round((val / 360) * 100);
                const months = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep"];
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] text-indigo-300 font-mono hidden sm:inline">€{val}</span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full max-w-[28px] bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md transition-all hover:brightness-125"
                    />
                    <span className="text-[10px] text-slate-400">{months[idx]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
            <div className="text-xs text-slate-300 flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Dit is een demonstratie omgeving met gesimuleerde data.</span>
            </div>
            <Button
              asChild
              className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <Link to="/auth" onClick={() => setShowDemoModal(false)}>
                Start Echte Account
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
