import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="rounded-3xl bg-slate-900 text-white p-10 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Direct Toegang</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Klaar voor uw eigen gestructureerde cashflowgroei?
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Meld u aan binnen het INVESTBOTIQ portaal en bekijk realtime hoe uw Tier strategie zich ontwikkelt.
          </p>
          
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 px-8 rounded-xl shadow-lg shadow-indigo-600/30">
              <Link to="/auth" className="flex items-center gap-2">
                <span>Start nu met INVESTBOTIQ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-slate-700 hover:bg-slate-800 text-white font-bold py-6 px-8 rounded-xl">
              <Link to="/alles-over-investbot/hoe-werkt-het">
                Hoe werkt het?
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
