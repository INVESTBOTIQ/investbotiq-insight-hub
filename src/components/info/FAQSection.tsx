import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle } from "lucide-react";

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

const FAQ_ITEMS = [
  {
    question: "Moet ik zelf investeren of handelen?",
    answer: "Nee, alles gebeurt volautomatisch door de IQ Bot volgens jouw ingestelde voorkeuren. Je hoeft zelf geen transacties uit te voeren of koersen in de gaten te houden."
  },
  {
    question: "Kan ik zelf investeringen en keuzes aanpassen?",
    answer: "Nee, de IQ Bot voert automatisch het beproefde algoritme plan uit. Je kunt wel altijd jouw inleg of doelstellingen beheren vanuit je Member Dashboard."
  },
  {
    question: "Hoe zie ik mijn cashflow groeien?",
    answer: "Via je persoonlijke Member Dashboard. Hier zie je in realtime de voortgang, maandelijkse uitkeringen, bot activiteit en overzichtelijke grafieken."
  },
  {
    question: "Is er een opzegtermijn of minimale contractduur?",
    answer: "Nee, bij Investbotiq zit je nergens aan vast. Je kunt op elk moment stoppen of jouw bot pauzeren zonder verborgen kosten."
  }
];

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaq = FAQ_ITEMS.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <FadeIn delay={0.05}>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-100/60 px-3.5 py-1.5 rounded-full border border-indigo-200/60">
              Veelgestelde vragen
            </span>
          </FadeIn>
          <FadeIn delay={0.12}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              FAQ
            </h2>
          </FadeIn>
          <FadeIn delay={0.18}>
            <p className="text-slate-600 text-sm sm:text-base">
              Heb je vragen? Hier vind je direct duidelijke antwoorden.
            </p>
          </FadeIn>
        </div>

        {/* FAQ Search input */}
        <FadeIn delay={0.22}>
          <div className="mb-8 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Zoek een vraag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs transition-all"
            />
          </div>
        </FadeIn>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaq.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200/80">
              <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm">Geen vragen gevonden voor deze zoekopdracht.</p>
            </div>
          ) : (
            filteredFaq.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <FadeIn delay={0.25 + idx * 0.05} key={item.question}>
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden transition-all">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-5 text-left font-bold text-slate-900 flex justify-between items-center gap-4 hover:bg-slate-50/80 transition-colors"
                    >
                      <span className="text-base text-slate-900">{item.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-indigo-600 transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3"
                        >
                          {item.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
