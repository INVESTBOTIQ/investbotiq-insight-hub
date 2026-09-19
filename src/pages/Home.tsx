import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import PublicHeader from "@/components/PublicHeader";
import HeroSection from "@/components/HeroSection";
import InfoSection from "@/components/InfoSection";
import { Bot, Globe } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const infoRef = useRef<HTMLDivElement>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Smooth scroll naar info section
  const handleScroll = () => {
    infoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased relative min-h-screen w-full overflow-x-hidden">
      
      {/* Background Ambient Glow Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" />
        <div 
          className="absolute top-10 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: "2s" }} 
        />
      </div>

      <PublicHeader />
      
      <main className="flex flex-col w-full relative z-10">
        <HeroSection onScrollToInfo={handleScroll} />
        <InfoSection ref={infoRef} onOpenDemo={() => setShowDemoModal(true)} />
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/30">
                <Bot className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Investbotiq</span>
            </div>

            {/* Nav links */}
            <div className="flex flex-wrap justify-center gap-6 text-xs font-medium">
              <a href="#wat-is-investbotiq" className="hover:text-white transition-colors">
                Wat is Investbotiq
              </a>
              <a href="#hoe-het-werkt" className="hover:text-white transition-colors">
                Hoe werkt het
              </a>
              <a href="#calculator" className="hover:text-white transition-colors">
                Calculator
              </a>
              <a href="#voordelen" className="hover:text-white transition-colors">
                Voordelen
              </a>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ
              </a>
              <Link to="/auth" className="hover:text-white transition-colors">
                Inloggen
              </Link>
            </div>

            {/* Language badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Nederlands (NL)</span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Investbotiq. Alle rechten voorbehouden.</p>
            <div className="flex gap-5 text-slate-400 text-xs">
              <a href="#" className="hover:text-white transition-colors">Algemene Voorwaarden</a>
              <a href="#" className="hover:text-white transition-colors">Privacybeleid</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Interactive Demo Modal */}
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
            <div className="text-xs text-slate-300">
              Dit is een demonstratie omgeving met gesimuleerde data.
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

    </div>
  );
}
