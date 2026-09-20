import React, { useState } from "react";
import { Link } from "react-router-dom";
import PublicHeader from "@/components/PublicHeader";
import BrandLogo from "@/components/BrandLogo";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Search, HelpCircle, Bot, ArrowRight, Sparkles } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "Algemeen" | "Rendement" | "Veiligheid" | "Technisch";
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Kan ik elk moment eruit stappen?",
    answer: "Ja, maar alleen als het account tijdig wordt gesloten via het overeengekomen protocol.",
    category: "Algemeen"
  },
  {
    question: "Wat gebeurt er met mijn gegevens?",
    answer: "Uw gegevens worden veilig en versleuteld opgeslagen en uitsluitend gebruikt voor de registratie van uw entiteiten en flowlutas.",
    category: "Veiligheid"
  },
  {
    question: "Kan ik in de schulden komen?",
    answer: "Technisch gezien niet volgens het protocol, uitgezonderd bij vroegtijdig stoppen zonder verplichtingen volgens de richtlijnen af te ronden.",
    category: "Veiligheid"
  },
  {
    question: "Hoelang moet ik meedoen om profijt te hebben?",
    answer: "Na maand 1 ervaart u al de eerste concrete cashflow resultaten volgens de planning van uw Tier.",
    category: "Rendement"
  },
  {
    question: "Hoe vaak moet ik er zelf mee bezig zijn?",
    answer: "In de eerste opstartmaand het meest voor verificatie, daarna slechts één keer per maand om statusrapportages in te zien.",
    category: "Algemeen"
  },
  {
    question: "Is het gegarandeerd dat ik eraan verdien?",
    answer: "Wanneer u het volledige gestructureerde protocol opvolgt en voltooit: ja, het model is hierop ontworpen.",
    category: "Rendement"
  },
  {
    question: "Komen er extra kosten bij kijken?",
    answer: "Nee, deelname aan het standaard INVESTBOTIQ traject brengt geen verborgen of onvoorziene extra kosten met zich mee.",
    category: "Algemeen"
  },
  {
    question: "Wat gebeurt er met het lening geld, waar wordt dit in geïnvesteerd?",
    answer: "Alle middelen blijven binnen het gecontroleerde interne ecosysteem en worden gealloceerd volgens bewezen risicomodellen.",
    category: "Technisch"
  },
  {
    question: "Wat onderscheidt INVESTBOTIQ van andere investeringen of leningen?",
    answer: "INVESTBOTIQ benut het unieke tijd kloof profijt principe (time gap profit), waardoor geautomatiseerde arbitrage mogelijk is.",
    category: "Technisch"
  },
  {
    question: "Moet ik zelf handelen of investeren?",
    answer: "Nee, de IQ Bot voert de strategie en transacties 100% autonoom uit.",
    category: "Technisch"
  },
  {
    question: "Kan ik zelf investeringen kiezen?",
    answer: "Nee, om stabiliteit en risicospreiding te borgen volgt de IQ Bot een wiskundig vastgelegd algoritme.",
    category: "Technisch"
  },
  {
    question: "Hoe zie ik mijn cashflow groeien?",
    answer: "Via uw persoonlijke beveiligde Member Dashboard heeft u real time inzicht in alle statistieken, uitbetalingen en tiers.",
    category: "Rendement"
  }
];

const CATEGORIES = ["Alles", "Algemeen", "Rendement", "Veiligheid", "Technisch"] as const;

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Alles");

  const filteredItems = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === "Alles" || item.category === selectedCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      <PublicHeader />
      
      {/* Hero Header */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 px-4 bg-white border-b border-slate-200 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-48 pointer-events-none overflow-hidden">
          <div className="absolute -top-12 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span>Kennisbank & Antwoorden</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Veelgestelde Vragen
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            Vind snel antwoord op al uw vragen over het INVESTBOTIQ ecosysteem, opbrengsten en veiligheid.
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Zoek direct in alle vragen en antwoorden..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm shadow-sm transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white shadow-sm shadow-purple-600/30 active:bg-purple-700"
                    : "bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-700 active:bg-purple-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Accordion List */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">Geen vragen gevonden</h3>
            <p className="text-sm text-slate-500 mt-1">
              Geen resultaten gevonden voor uw zoekopdracht. Probeer een andere term.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Alles");
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 active:bg-purple-200 transition"
            >
              Filters wissen
            </button>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-3.5">
            {filteredItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200 hover:border-purple-200 hover:shadow-md"
              >
                <AccordionTrigger className="px-6 py-4.5 text-left font-bold text-slate-900 text-sm sm:text-base hover:text-purple-600 active:text-purple-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                    <span>{item.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  <p className="pt-2">{item.answer}</p>
                  <div className="mt-3 inline-block px-2.5 py-0.5 rounded-full bg-slate-200/60 text-slate-600 text-[11px] font-medium">
                    Categorie: {item.category}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {/* CTA Card Below FAQ */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Nog specifieke vragen?
            </h3>
            <p className="text-slate-300 text-sm max-w-md">
              Meld u aan voor het portaal of bekijk de live demonstratie om het systeem in werking te zien.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              to="/auth"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm text-center shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Aanmelden</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* Unified Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <BrandLogo variant="dark" to="/" />

            <div className="flex flex-wrap justify-center gap-6 text-xs font-medium">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/tier-plannen" className="hover:text-white transition-colors">Tier Plannen</Link>
              <Link to="/veiligheid" className="hover:text-white transition-colors">Veiligheid</Link>
              <Link to="/alles-over-investbot/wat-is-het" className="hover:text-white transition-colors">Wat is het?</Link>
              <Link to="/alles-over-investbot/hoe-werkt-het" className="hover:text-white transition-colors">Hoe werkt het?</Link>
              <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link to="/auth" className="hover:text-white transition-colors">Inloggen</Link>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p>© {new Date().getFullYear()} INVESTBOTIQ. Alle rechten voorbehouden.</p>
            <div className="flex gap-6">
              <span className="text-slate-500">100% Geautomatiseerde Cashflow</span>
              <span className="text-slate-500">Eigen Beheer</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
