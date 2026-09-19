import React from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, TrendingUp, ShieldCheck, Cpu } from "lucide-react";

export default function IntroductionSection() {
  return (
    <section className="py-16 px-4 bg-white border-b border-slate-200/80">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }} 
            className="md:col-span-7 space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>Autonome Ecosysteem Architectuur</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Jouw persoonlijke CashFlow Intelligence Agent
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              CashFlow Intelligence is jouw persoonlijke Invest Agent. Wij geven je exclusieve toegang tot deze krachtige en geteste software. Ontvang continue maandelijkse cashflow via ons beproefde Tier systeem.
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              Laat ingewikkelde marktanalyses, emotionele investeringskeuzes en constante schermtijd achter je. De IQ Bot opereert met wiskundige precisie, beschermt kapitaal en distribueert cashflow rechtstreeks naar jouw beheer.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-2xl font-extrabold text-indigo-600">24/7</div>
                <div className="text-xs font-semibold text-slate-700 mt-0.5">Autonome Marktmonitoring</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-2xl font-extrabold text-emerald-600">100%</div>
                <div className="text-xs font-semibold text-slate-700 mt-0.5">In Eigen Beheer</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }} 
            className="md:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-sm rounded-3xl bg-slate-900 text-white p-7 shadow-2xl border border-slate-800 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Invest Agent IQ</h4>
                    <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Algoritme Actief
                    </span>
                  </div>
                </div>
              </div>

              <div className="py-5 space-y-3">
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
                  <span className="text-slate-400">Strategie</span>
                  <span className="font-semibold text-indigo-300">Time Gap Arbitrage</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
                  <span className="text-slate-400">Rendementscyclus</span>
                  <span className="font-semibold text-emerald-300">Maandelijks Uitbetaald</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
                  <span className="text-slate-400">Status Entiteiten</span>
                  <span className="font-semibold text-white">Geverifieerd & Beveiligd</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="p-3.5 rounded-xl bg-indigo-950/60 border border-indigo-800/50 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <p className="text-xs text-indigo-200 font-medium">
                    Geen dagelijkse handmatige acties vereist
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
