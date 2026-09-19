import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export default function NoExternalAccess() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.6 }} 
      className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
    >
      <div className="w-20 h-20 rounded-3xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 text-indigo-400">
        <ShieldCheck className="w-10 h-10" />
      </div>
      
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Lock className="w-3 h-3" />
          <span>Volledige Gegevenssoevereiniteit</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Uw data en kapitaal worden nooit gedeeld
        </h3>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
          Wij verkopen of delen nooit gegevens met externe derden. Alles blijft strikt bewaard binnen het beveiligde Investbotiq ecosysteem. Geen externe brokers, geen doorverkoop en geen risicovolle blootstellingen.
        </p>
      </div>
    </motion.div>
  );
}
