import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import { 
  UserCheck, 
  Bot, 
  TrendingUp, 
  ShieldCheck, 
  Coins, 
  Layers, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  CalendarCheck
} from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Aanmelden & Verificatie",
    description: "U registreert zich eenvoudig met uw basisgegevens en volgt het verificatieprotocol voor uw entiteiten.",
    icon: UserCheck,
    color: "bg-indigo-600 text-white",
    cardBorder: "border-indigo-100",
    badge: "Stap 1"
  },
  {
    num: "02",
    title: "Activatie van de IQ Bot",
    description: "De geavanceerde IQ Bot activeert uw persoonlijke flowlutas en start de geautomatiseerde marktstrategie.",
    icon: Bot,
    color: "bg-purple-600 text-white",
    cardBorder: "border-purple-100",
    badge: "Stap 2"
  },
  {
    num: "03",
    title: "Structurele Maandelijkse Cashflow",
    description: "Iedere maand wordt de gegenereerde cashflow gedistribueerd naar uw beheer en visueel bijgewerkt in uw dashboard.",
    icon: TrendingUp,
    color: "bg-emerald-600 text-white",
    cardBorder: "border-emerald-100",
    badge: "Stap 3"
  }
];

const TIERS_TIMELINE = [
  { tier: "Tier 1", label: "Start & Setup", duration: "Mnd 1" },
  { tier: "Tier 2", label: "Eerste Cashflow", duration: "Mnd 2-3" },
  { tier: "Tier 3", label: "Versnelling", duration: "Mnd 4-6" },
  { tier: "Tier 4", label: "Schaalvergroting", duration: "Mnd 7-9" },
  { tier: "Tier 5", label: "Stabilisatie", duration: "Mnd 10-12" },
  { tier: "Tier 6", label: "Financiële Vrijheid", duration: "Mnd 13+" },
];

const BENEFITS = [
  {
    title: "Geen minimale inleg vereist",
    description: "Start zonder gigantische startkapitalen. Het ecosysteem bouwt stapsgewijs kapitaal op.",
    icon: Coins,
    color: "text-indigo-600 bg-indigo-50 border-indigo-100"
  },
  {
    title: "100% Autonoom proces",
    description: "Geen complexe handelsgrafieken of dagelijkse verplichtingen. De IQ Bot handelt volledig zelfstandig.",
    icon: Bot,
    color: "text-purple-600 bg-purple-50 border-purple-100"
  },
  {
    title: "Groeiende maandelijkse cashflow",
    description: "Volg direct hoe uw cashflow per kwartaal doorgroeit naarmate u hogere Tiers bereikt.",
    icon: TrendingUp,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100"
  },
  {
    title: "Beveiligd en geverifieerd",
    description: "Uw vermogen blijft altijd binnen beschermde kaders en op uw eigen naam geregistreerd.",
    icon: ShieldCheck,
    color: "text-blue-600 bg-blue-50 border-blue-100"
  }
];

export default function HoeWerktHet() {
  return (
    <InfoPageLayout
      title="Hoe werkt Investbotiq?"
      subtitle="Eenvoudig, transparant en 100% geautomatiseerd voor duurzame cashflow."
      badge="Stappenplan & Proces"
    >
      {/* 3 Steps Section */}
      <section className="py-16 px-4 bg-white border-b border-slate-200/80">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Eenvoudig in 3 stappen
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Van registratie naar consistente cashflow
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Ons gestandaardiseerde protocol leidt u stap voor stap naar financiële rust.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-slate-300 font-mono">
                      {step.num}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${step.color} shadow-md`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="inline-block text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full mb-3">
                    {step.badge}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Traject Timeline Section */}
      <section className="py-16 px-4 bg-slate-50 border-b border-slate-200/80">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Voortgang en Tiers
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Uw geplande groeitraject
            </h2>
            <p className="text-slate-600 text-sm">
              Elke tier markeert een nieuwe fase in cashflow verhoging en portfolio optimalisatie.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TIERS_TIMELINE.map((item, index) => (
              <motion.div
                key={item.tier}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center space-y-2 hover:border-indigo-400 hover:shadow-md transition-all"
              >
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
                  {item.duration}
                </span>
                <div className="text-base font-extrabold text-slate-900">
                  {item.tier}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 px-4 bg-white border-b border-slate-200/80">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Onze Sterktes
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Bewezen voordelen voor onze leden
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {BENEFITS.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex items-start gap-4 hover:border-slate-300 transition-colors"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Contrast Interactive CTA */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Klaar voor de volgende stap?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Start vandaag uw eigen cashflow traject
          </h2>

          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Bekijk de exacte cijfers per Tier of log in om uw persoonlijke roadmap te openen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-indigo-600/30">
              <Link to="/tier-plannen" className="flex items-center gap-2">
                <span>Bekijk alle Tier Plannen</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="bg-transparent border-slate-700 hover:bg-slate-800 text-white font-bold px-8 py-6 rounded-xl">
              <Link to="/member/dashboard">
                Open Member Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </InfoPageLayout>
  );
}
