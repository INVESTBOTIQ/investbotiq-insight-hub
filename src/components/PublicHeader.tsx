import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Bot, Play } from "lucide-react";
import PublicHeaderDesktopMenu from "./PublicHeaderDesktopMenu";
import { useAuth } from "@/components/AuthProvider";

type Props = {
  onOpenDemo?: () => void;
};

const PublicHeader: React.FC<Props> = ({ onOpenDemo }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const isMember = !!user && userRole === "member";

  const handleNav = (to: string) => {
    navigate(to);
    setMenuOpen(false);
  };

  const Logo = (
    <Link 
      to="/" 
      className="flex items-center gap-3 group select-none" 
      aria-label="Investbotiq Homepage"
    >
      <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
        <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
          <Bot className="w-5 h-5 text-indigo-100 group-hover:rotate-12 transition-transform duration-300" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
          Investbotiq
        </span>
        <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider mt-1">
          IQ Bot Automated
        </span>
      </div>
    </Link>
  );

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white border-b border-slate-200 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {Logo}
        <div className="flex items-center space-x-4">
          <PublicHeaderDesktopMenu handleNav={handleNav} onOpenDemo={onOpenDemo} />
          <button 
            className="md:hidden p-2.5 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none" 
            aria-label={menuOpen ? "Sluit menu" : "Open menu"} 
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobiel menu met 100% dekkende witte achtergrond zonder transparantie */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-5 pt-3 pb-6 space-y-3 shadow-xl">
          <a 
            href="#wat-is-investbotiq" 
            onClick={() => setMenuOpen(false)} 
            className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            Wat is Investbotiq
          </a>
          <a 
            href="#hoe-het-werkt" 
            onClick={() => setMenuOpen(false)} 
            className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            Hoe werkt het
          </a>
          <a 
            href="#calculator" 
            onClick={() => setMenuOpen(false)} 
            className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            Cashflow Calculator
          </a>
          <a 
            href="#voordelen" 
            onClick={() => setMenuOpen(false)} 
            className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            Voordelen
          </a>
          <a 
            href="#faq" 
            onClick={() => setMenuOpen(false)} 
            className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            FAQ
          </a>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <Link 
              to="/tier-plannen" 
              onClick={() => setMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              Tier Plannen
            </Link>
            <Link 
              to="/veiligheid" 
              onClick={() => setMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              Veiligheid
            </Link>
            <Link 
              to="/alles-over-investbot/wat-is-het" 
              onClick={() => setMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              Alles over Investbot
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
            {onOpenDemo && (
              <button 
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenDemo();
                }} 
                className="w-full py-3 rounded-xl text-center text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                <span>Bekijk Demo</span>
              </button>
            )}

            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="w-full py-3 rounded-xl text-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/25 transition-all block"
            >
              Inloggen
            </Link>

            {isMember && (
              <Link
                to="/member/dashboard"
                onClick={() => setMenuOpen(false)}
                className="w-full py-3 rounded-xl text-center text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-all block"
              >
                Member Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;
