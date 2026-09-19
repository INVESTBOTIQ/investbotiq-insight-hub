import React from "react";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, EyeOff, Server, KeyRound, Cpu } from "lucide-react";

const features = [
  {
    title: "End to End Encryptie",
    description: "Alleen u en de geautoriseerde IQ Bot processen hebben toegang tot uw gegevens. Alle communicatie is 256-bit versleuteld.",
    icon: Lock,
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    badge: "AES-256"
  },
  {
    title: "JWT Sessiebeveiliging & RLS",
    description: "Multi factor tokens en Row Level Security garanderen dat data strikt gescheiden blijft op database niveau.",
    icon: ShieldCheck,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    badge: "Zero-Trust"
  },
  {
    title: "Geen Externe Koppelingen",
    description: "Geen ongecontroleerde API-koppelingen naar externe platformen of brokers. Alle stromen blijven intern afgeschermd.",
    icon: EyeOff,
    color: "bg-purple-50 text-purple-600 border-purple-100",
    badge: "Geïsoleerd"
  },
  {
    title: "Audit Logging & Integriteit",
    description: "Elke transactie en statuswijziging van een flowluta wordt onveranderbaar geregistreerd voor volledige transparantie.",
    icon: Server,
    color: "bg-blue-50 text-blue-600 border-blue-100",
    badge: "24/7 Monitoring"
  }
];

export default function SecurityFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature, idx) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${feature.color} group-hover:scale-110 transition-transform`}>
              <feature.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              {feature.badge}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {feature.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
