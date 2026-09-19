import React from "react";
import { motion } from "framer-motion";
import { Eye, Globe2, Sparkles, CheckCircle2 } from "lucide-react";

export default function VisionSection() {
  return (
    <section className="py-16 px-4 bg-slate-50 border-b border-slate-200/80">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }} 
            className="md:col-span-5 flex justify-center order-2 md:order-1"
          >
            <div className="w-full max-w-sm rounded-3xl bg-white p-7 shadow-lg border border-slate-200/90 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Globale Toegankelijkheid</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Een gedecentraliseerde infrastructuur waar geavanceerde handelsalgoritmes ten dienste staan van gewone mensen in plaats van alleen instituties.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Geautomatiseerde arbitrage</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }} 
            className="md:col-span-7 space-y-5 order-1 md:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold">
              <Eye className="w-3.5 h-3.5 text-purple-600" />
              <span>De Toekomst</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Onze Visie: Een Nieuwe Norm voor Passief Inkomen
            </h2>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Een wereld waarin duizenden leden via onze slimme bots automatisch vermogen opbouwen en structurele financiële vrijheid realiseren – veilig, transparant en schaalbaar.
            </p>
            
            <p className="text-base text-slate-600 leading-relaxed">
              Wij zien een toekomst voor ons waarin softwarematige intelligentie de drempel tot kapitaalcreatie definitief opheft.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
