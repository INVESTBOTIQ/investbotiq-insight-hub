import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  UserCheck, 
  ShieldCheck, 
  FileText, 
  Layers, 
  ArrowRight,
  Sparkles
} from "lucide-react";

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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function WhatIsSection() {
  const features = [
    {
      icon: TrendingUp,
      title: "Automatische Groei",
      description: "De IQ Bot voert continu doordachte cashflow strategieën uit. Jouw portfolio groeit passief zonder dagelijkse inmenging."
    },
    {
      icon: UserCheck,
      title: "Geen Kennis Nodig",
      description: "Geen ingewikkelde grafieken of marktanalyses. Het platform is ontworpen om direct toegankelijk te zijn voor iedereen."
    },
    {
      icon: ShieldCheck,
      title: "Alles in Eigen Beheer",
      description: "Geen externe tussenpartijen. Je behoudt volledige transparantie en controle via de IQ Bot interface."
    },
    {
      icon: FileText,
      title: "Transparante Rapportage",
      description: "Volg maandelijks de opbouw van je rendement met overzichtelijke dashboards en geautomatiseerde verslagen."
    },
    {
      icon: Layers,
      title: "Gestructureerde Opbouw",
      description: "Geleidelijke, voorspelbare vermogensopbouw gericht op een gezonde, duurzame cashflow op lange termijn."
    }
  ];

  return (
    <section id="wat-is-investbotiq" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <FadeIn delay={0.05}>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
              Over het platform
            </span>
          </FadeIn>
          <FadeIn delay={0.12}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Wat is Investbotiq?
            </h2>
          </FadeIn>
          <FadeIn delay={0.18}>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Investbotiq is een platform dat automatisch gestructureerde cashflow voor jou genereert met behulp van de IQ Bot. Geen lastige investeringskeuzes, geen technische kennis vereist.
            </p>
          </FadeIn>
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeIn delay={0.1 + idx * 0.08} key={item.title}>
                <div className="h-full p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}

          {/* 6th Card: Action Card */}
          <FadeIn delay={0.5}>
            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-xl shadow-indigo-500/20 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-indigo-200">
                  <Sparkles className="w-3.5 h-3.5" /> Start Vandaag
                </span>
                <h3 className="text-2xl font-extrabold mt-2 mb-3">
                  Klaar om te automatiseren?
                </h3>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  Activeer de IQ Bot in minder dan drie minuten en bekijk direct de eerste resultaten.
                </p>
              </div>
              <Link
                to="/auth"
                className="mt-6 w-full py-3.5 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 transition-colors shadow-sm flex items-center justify-center gap-2 group text-sm"
              >
                <span>Maak een account aan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
