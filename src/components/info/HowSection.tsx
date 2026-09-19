import React from "react";
import { motion } from "framer-motion";

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

export default function HowSection() {
  const steps = [
    {
      number: "1",
      title: "Aanmelden",
      description: "Maak binnen twee minuten een persoonlijk account aan via ons beveiligde portaal.",
      badgeBg: "bg-indigo-600 shadow-indigo-500/20"
    },
    {
      number: "2",
      title: "Activeer de Bot",
      description: "Koppel de IQ Bot met één klik en stel jouw gewenste voorkeuren in.",
      badgeBg: "bg-indigo-600 shadow-indigo-500/20"
    },
    {
      number: "3",
      title: "Groei Elke Maand",
      description: "Leun achterover. De bot voert alles automatisch uit en rapporteert maandelijks jouw resultaten.",
      badgeBg: "bg-purple-600 shadow-purple-500/20"
    }
  ];

  return (
    <section id="hoe-het-werkt" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <FadeIn delay={0.05}>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-100/60 px-3.5 py-1.5 rounded-full border border-indigo-200/60">
              Eenvoudig proces
            </span>
          </FadeIn>
          <FadeIn delay={0.12}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Hoe werkt het?
            </h2>
          </FadeIn>
          <FadeIn delay={0.18}>
            <p className="text-base text-slate-600">
              In drie simpele stappen naar een geautomatiseerde passieve cashflow.
            </p>
          </FadeIn>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-300 via-indigo-500 to-purple-400 -translate-y-8 z-0 opacity-30" />

          {steps.map((step, idx) => (
            <FadeIn delay={0.1 + idx * 0.12} key={step.number}>
              <div className="relative z-10 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center h-full">
                <div className={`w-16 h-16 rounded-2xl ${step.badgeBg} text-white flex items-center justify-center font-extrabold text-2xl shadow-lg mb-6`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}

        </div>
      </div>
    </section>
  );
}
