import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export default function SecurityCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-slate-900 text-white p-10 sm:p-14 text-center space-y-6 shadow-xl border border-slate-800 relative overflow-hidden"
    >
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
        <span>Gegarandeerde Privacy & Integriteit</span>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
        Uw zekerheid is onze hoogste prioriteit
      </h2>

      <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
        Ervaar de rust van een systeem dat gebouwd is op strikte beveiligingsnormen en heldere protocollen.
      </p>
      
      <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 px-8 rounded-xl shadow-lg shadow-indigo-600/30">
          <Link to="/auth" className="flex items-center gap-2">
            <span>Start veilig met Investbotiq</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
