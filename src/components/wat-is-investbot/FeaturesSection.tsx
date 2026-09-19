import React from "react";
import { motion } from "framer-motion";
import { Coins, Users, CheckCircle2, LayoutDashboard, ShieldCheck, Zap } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const features = [
  {
    title: "Automatisch vermogen opbouwen",
    description: "De IQ Bot bouwt gestructureerd een maandelijkse cashflow op zonder dat u continu handmatig hoeft in te grijpen.",
    icon: Coins,
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-100",
    iconColor: "text-indigo-600",
    accentBadge: "Passieve Groei"
  },
  {
    title: "Geen technische voorkennis vereist",
    description: "U hoeft geen ervaren handelaar of ontwikkelaar te zijn. De IQ Bot automatiseert de complexe data en uitvoering.",
    icon: Users,
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100",
    iconColor: "text-purple-600",
    accentBadge: "Gebruiksvriendelijk"
  },
  {
    title: "Transparant en voorspelbaar",
    description: "Volledig overzicht in het groeitraject van uw cashflow. U weet vooraf precies welke mijlpalen uw Tier volgt.",
    icon: CheckCircle2,
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    iconColor: "text-emerald-600",
    accentBadge: "Vaste Planning"
  },
  {
    title: "Centraal overzicht in één portaal",
    description: "Eén modern portaal voor al uw data, flowlutas en uitbetalingen. Overzichtelijk, veilig en altijd bereikbaar.",
    icon: LayoutDashboard,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    iconColor: "text-blue-600",
    accentBadge: "Realtime Inzicht"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-slate-50 border-b border-slate-200/80">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Voordelen van het Ecosysteem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Waarom kiezen voor Investbotiq?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Ontworpen voor maximale zekerheid, eenvoud en meetbare resultaten.
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true }} 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.title} 
              variants={itemVariants} 
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-2xl flex items-center justify-center border ${feature.borderColor} group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                    {feature.accentBadge}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
