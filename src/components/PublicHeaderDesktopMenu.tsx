import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Play, LogOut, LayoutDashboard, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";

interface Props {
  handleNav: (to: string) => void;
  onOpenDemo?: () => void;
}

const PublicHeaderDesktopMenu: React.FC<Props> = ({ handleNav, onOpenDemo }) => {
  const { user, userRole, signOut } = useAuth();
  const isMember = !!user && userRole === "member";
  const isAdmin = !!user && userRole === "admin";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("U bent succesvol uitgelogd");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Fout bij uitloggen");
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-slate-700">
      {/* Alles over INVESTBOTIQ Dropdown */}
      <div 
        className="relative"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <button 
          onClick={() => setDropdownOpen(v => !v)}
          className="flex items-center gap-1 text-slate-700 hover:text-purple-600 active:text-purple-800 transition-colors font-semibold"
        >
          <span>Alles over INVESTBOTIQ</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-full mt-2 w-56 rounded-2xl shadow-2xl bg-white border border-slate-200 p-2 z-50 text-xs"
            >
              <Link 
                to="/alles-over-investbot/wat-is-het" 
                className="block px-3 py-2 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-600 active:bg-purple-100 active:text-purple-800 font-medium transition-colors"
              >
                Wat is het?
              </Link>
              <Link 
                to="/alles-over-investbot/hoe-werkt-het" 
                className="block px-3 py-2 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-600 active:bg-purple-100 active:text-purple-800 font-medium transition-colors"
              >
                Hoe werkt het?
              </Link>
              <Link 
                to="/alles-over-investbot/mission-vision" 
                className="block px-3 py-2 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-600 active:bg-purple-100 active:text-purple-800 font-medium transition-colors"
              >
                Missie & Visie
              </Link>
              <Link 
                to="/faq" 
                className="block px-3 py-2 rounded-xl text-slate-800 hover:bg-purple-50 hover:text-purple-600 active:bg-purple-100 active:text-purple-800 font-medium transition-colors"
              >
                FAQ
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Link to="/tier-plannen" className="hover:text-purple-600 active:text-purple-800 transition-colors">
        Tier Plannen
      </Link>

      <Link to="/veiligheid" className="hover:text-purple-600 active:text-purple-800 transition-colors">
        Veiligheid
      </Link>

      {/* Actions Buttons */}
      <div className="flex items-center gap-2.5 ml-2">
        {user ? (
          <>
            {isMember && (
              <Link
                to="/member/dashboard"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 active:bg-purple-200 border border-purple-200 transition-all flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-4 h-4 text-purple-600" />
                <span>Dashboard</span>
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-200 border border-indigo-200 transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Beheerder</span>
              </Link>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 active:bg-red-200 border border-red-200 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4 text-red-600" />
              <span>Uitloggen</span>
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-500/20 hover:shadow-lg transition-all transform active:scale-95 active:bg-purple-800 text-center"
          >
            Inloggen
          </Link>
        )}
      </div>
    </nav>
  );
};

export default PublicHeaderDesktopMenu;
