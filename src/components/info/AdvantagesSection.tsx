import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

function FadeIn({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AdvantagesSection() {
  const advantages = [
    {
      title: "Geen minimale investering",
      description: "Start met elk gewenst bedrag op jouw eigen tempo."
    },
    {
      title: "Maandelijkse Rapportage",
      description: "Volledige helderheid in al jouw statistieken."
    },
    {
      title: "Merendeels Passief",
      description: "Geen urenlang scherm kijken of zelf handelen."
    },
    {
      title: "Passief Inkomen Focus",
      description: "Gefocust op maandelijkse regelmatige instroom."
    }
  ];

  return (
    <section id="voordelen" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.1}>
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
            
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Waarom Kiezen Voor Investbotiq
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Alle voordelen op een rij
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Ontworpen om passief vermogen op te bouwen zonder de gebruikelijke valkuilen en ingewikkelde stappen.
                </p>
              </div>

              {/* Right Column: 4 cards grid */}
              <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
                {advantages.map((item) => (
                  <div
                    key={item.title}
                    className="p-4.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-3 hover:border-slate-600 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-100">{item.title}</p>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
