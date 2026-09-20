import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Bot, Play, LogOut, LayoutDashboard, ShieldCheck } from "lucide-react";
import PublicHeaderDesktopMenu from "./PublicHeaderDesktopMenu";
import BrandLogo from "./BrandLogo";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";

type Props = {
  onOpenDemo?: () => void;
};

const PublicHeader: React.FC<Props> = ({ onOpenDemo }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, userRole, signOut } = useAuth();
  const isMember = !!user && userRole === "member";
  const isAdmin = !!user && userRole === "admin";

  const handleLogout = async () => {
    try {
      await signOut();
      setMenuOpen(false);
      toast.success("U bent succesvol uitgelogd");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Fout bij uitloggen");
    }
  };

  const handleNav = (to: string) => {
    navigate(to);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white border-b border-slate-200 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        <BrandLogo to="/" />
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
          <div className="space-y-1">
            <div className="px-3 py-1.5 text-xs font-bold text-purple-600 uppercase tracking-wider">
              Alles over INVESTBOTIQ
            </div>
            <Link 
              to="/alles-over-investbot/wat-is-het" 
              onClick={() => setMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-600 active:bg-purple-100 active:text-purple-800 transition-colors"
            >
              Wat is het?
            </Link>
            <Link 
              to="/alles-over-investbot/hoe-werkt-het" 
              onClick={() => setMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-600 active:bg-purple-100 active:text-purple-800 transition-colors"
            >
              Hoe werkt het?
            </Link>
            <Link 
              to="/alles-over-investbot/mission-vision" 
              onClick={() => setMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-600 active:bg-purple-100 active:text-purple-800 transition-colors"
            >
              Missie & Visie
            </Link>
            <Link 
              to="/faq" 
              onClick={() => setMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-600 active:bg-purple-100 active:text-purple-800 transition-colors"
            >
              FAQ
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <Link 
              to="/tier-plannen" 
              onClick={() => setMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-600 active:bg-purple-100 active:text-purple-800 transition-colors"
            >
              Tier Plannen
            </Link>
            <Link 
              to="/veiligheid" 
              onClick={() => setMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-600 active:bg-purple-100 active:text-purple-800 transition-colors"
            >
              Veiligheid
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
            {user ? (
              <>
                {isMember && (
                  <Link
                    to="/member/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="w-full py-3 rounded-xl text-center text-sm font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 active:bg-purple-200 border border-purple-200 transition-all flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-purple-600" />
                    <span>Mijn Dashboard</span>
                  </Link>
                )}

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="w-full py-3 rounded-xl text-center text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-200 border border-indigo-200 transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    <span>Beheerder Portaal</span>
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl text-center text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 active:bg-red-200 border border-red-200 transition-all flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>Uitloggen</span>
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMenuOpen(false)}
                className="w-full py-3 rounded-xl text-center text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-800 active:scale-95 shadow-md shadow-purple-500/25 transition-all block"
              >
                Inloggen
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;
