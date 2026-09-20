import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onOpenDemo?: () => void;
};

export default function FinalCtaSection({ onOpenDemo }: Props) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Klaar om jouw cashflow op te bouwen?
          </h2>
          <p className="text-indigo-100 text-base max-w-xl mx-auto leading-relaxed">
            Geen ingewikkelde stappen. Sluit je aan bij INVESTBOTIQ en laat de IQ Bot direct voor je werken.
          </p>
          
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Button
              asChild
              className="w-full sm:w-auto px-8 py-6 bg-white text-purple-700 font-bold rounded-2xl hover:bg-purple-50 hover:text-purple-800 active:bg-purple-100 active:text-purple-900 active:scale-95 shadow-lg transition-all text-base"
            >
              <Link to="/auth" className="flex items-center gap-2">
                <span>Aanmelden en Starten</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            
            {onOpenDemo && (
              <Button
                type="button"
                variant="outline"
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-8 py-6 bg-purple-900/40 hover:bg-purple-800/60 active:bg-purple-800 active:scale-95 text-white font-bold rounded-2xl border border-white/20 transition-all text-base flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Bekijk Demo Dashboard</span>
              </Button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
