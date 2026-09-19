import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Bot, Sparkles, Scale, HeartHandshake } from "lucide-react";

const VALUES = [
  {
    title: "Toegankelijkheid",
    description: "We maken structurele vermogensgroei bereikbaar voor iedereen, zonder vereiste voorkennis of gigantische startkapitalen.",
    icon: Users,
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    badge: "Inclusief"
  },
  {
    title: "Volledige Transparantie",
    description: "Geen verborgen constructies. U heeft 24/7 direct inzicht in alle flowlutas, uitkeringen en statusupdates in uw dashboard.",
    icon: ShieldCheck,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    badge: "Zekerheid"
  },
  {
    title: "Technologische Innovatie",
    description: "Doorlopende optimalisatie van het IQ Bot algoritme zorgt voor scherpe en wiskundig verantwoorde marktposities.",
    icon: Bot,
    color: "bg-purple-50 text-purple-600 border-purple-100",
    badge: "Data-gedreven"
  }
];

export default function ValuesSection() {
  return (
    <section className="py-16 px-4 bg-white border-b border-slate-200/80">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Karakter & Principes
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            De kernwaarden van Investbotiq
          </h2>
          <p className="text-slate-600 text-sm">
            Deze principes sturen elke beslissing en elk algoritme binnen ons platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-indigo-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${val.color}`}>
                    <val.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600">
                    {val.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {val.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {val.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
