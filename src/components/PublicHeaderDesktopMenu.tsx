import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";

interface Props {
  handleNav: (to: string) => void;
  onOpenDemo?: () => void;
}

const PublicHeaderDesktopMenu: React.FC<Props> = ({ handleNav, onOpenDemo }) => {
  const { user, userRole } = useAuth();
  const isMember = !!user && userRole === "member";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-slate-700">
      <a href="#wat-is-investbotiq" className="hover:text-indigo-600 transition-colors">
        Wat is Investbotiq
      </a>
      
      <a href="#hoe-het-werkt" className="hover:text-indigo-600 transition-colors">
        Hoe werkt het
      </a>
      
      <a href="#calculator" className="hover:text-indigo-600 transition-colors">
        Cashflow Calculator
      </a>
      
      <a href="#voordelen" className="hover:text-indigo-600 transition-colors">
        Voordelen
      </a>
      
      <a href="#faq" className="hover:text-indigo-600 transition-colors">
        FAQ
      </a>

      {/* Extra Paginas Dropdown met dekkend witte achtergrond */}
      <div 
        className="relative"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <button 
          onClick={() => setDropdownOpen(v => !v)}
          className="flex items-center gap-1 text-slate-700 hover:text-indigo-600 transition-colors font-semibold"
        >
          <span>Meer</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-full mt-2 w-48 rounded-2xl shadow-2xl bg-white border border-slate-200 p-2 z-50 text-xs"
            >
              <Link 
                to="/tier-plannen" 
                className="block px-3 py-2 rounded-xl text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
              >
                Tier Plannen
              </Link>
              <Link 
                to="/veiligheid" 
                className="block px-3 py-2 rounded-xl text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
              >
                Veiligheid
              </Link>
              <Link 
                to="/alles-over-investbot/wat-is-het" 
                className="block px-3 py-2 rounded-xl text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
              >
                Alles over Investbot
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions Buttons */}
      <div className="flex items-center gap-3 ml-2">
        {onOpenDemo && (
          <button 
            type="button"
            onClick={onOpenDemo} 
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-all flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
            <span>Bekijk Demo</span>
          </button>
        )}

        <Link
          to="/auth"
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 hover:shadow-lg transition-all transform active:scale-95 text-center"
        >
          Inloggen
        </Link>

        {isMember && (
          <Link
            to="/member/dashboard"
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-all"
          >
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
};

export default PublicHeaderDesktopMenu;
