import React from "react";
import { motion } from "framer-motion";
import { Flag, Target, Sparkles, TrendingUp } from "lucide-react";

export default function MissionSection() {
  return (
    <section className="py-16 px-4 bg-white border-b border-slate-200/80">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }} 
            className="md:col-span-7 space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
              <Flag className="w-3.5 h-3.5 text-indigo-600" />
              <span>Ons Fundament</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Onze Missie: Financiële Autonomie Zonder Barrières
            </h2>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Wij geloven dat iedereen het recht heeft op vermogensgroei – zonder kunstmatige drempels, zonder afwijzingen en zonder afhankelijk te zijn van traditionele bankiers of externe risicokapitalisten.
            </p>
            
            <p className="text-base text-slate-600 leading-relaxed">
              Daarom ontwikkelen wij een intelligent ecosysteem dat toegang biedt tot structurele maandelijkse cashflow en zekerheid, ongeacht uw achtergrond, voorkennis of startkapitaal.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }} 
            className="md:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-sm rounded-3xl bg-slate-900 text-white p-7 shadow-xl border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Doelgericht Protocol</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Een heldere, wiskundige opbouw die maand na maand voorspelbare mijlpalen bereikt via het gecertificeerde Tier systeem.
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-indigo-300 font-semibold">
                <span>100% Autonoom</span>
                <span className="text-emerald-400">Continue Optimalisatie</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
