import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PublicHeader from "@/components/PublicHeader";
import BrandLogo from "@/components/BrandLogo";
import { Bot, Shield, ChevronRight } from "lucide-react";

interface InfoPageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  showGradientBackground?: boolean;
}

export default function InfoPageLayout({
  children,
  title,
  subtitle,
  badge = "Investbotiq Informatie",
  showGradientBackground = true,
}: InfoPageLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 px-4 overflow-hidden border-b border-slate-200/80 bg-white">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-16 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute top-4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-5 shadow-2xs"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-600" />
              <span>{badge}</span>
            </motion.div>
          )}

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </section>
      
      {/* Page Body Content */}
      <main className="flex-1 w-full relative z-10">
        {children}
      </main>
      
      {/* Unified Professional Footer */}
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
            <p>© {new Date().getFullYear()} Investbotiq. Alle rechten voorbehouden.</p>
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
