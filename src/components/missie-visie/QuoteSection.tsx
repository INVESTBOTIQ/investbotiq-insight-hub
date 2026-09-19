import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function QuoteSection() {
  return (
    <section className="py-20 px-4 bg-slate-50 border-b border-slate-200/80">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="rounded-3xl bg-slate-900 text-white p-10 sm:p-14 text-center shadow-xl border border-slate-800 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 text-indigo-300 mb-6">
            <Sparkles className="w-6 h-6" />
          </div>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            “Financiële vrijheid. Voor iedereen. Altijd.”
          </blockquote>
          <p className="mt-4 text-indigo-300 text-sm font-semibold tracking-wide">
            Samen bouwen we aan een duurzame toekomst
          </p>
        </motion.div>
      </div>
    </section>
  );
}
