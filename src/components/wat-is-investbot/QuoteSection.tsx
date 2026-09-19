import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function QuoteSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-10 sm:p-14 text-center text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 text-indigo-300 mb-6 backdrop-blur-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-snug">
            “Geen emoties, geen zorgen. De IQ Bot regelt het gestructureerd voor je.”
          </blockquote>
          <p className="mt-4 text-indigo-200 text-sm font-medium uppercase tracking-widest">
            Investbotiq Filosofie
          </p>
        </motion.div>
      </div>
    </section>
  );
}
