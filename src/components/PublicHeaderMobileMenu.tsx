import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, ChevronDown, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";

const NAV_ITEMS = [
  {
    title: "Home",
    to: "/",
    desktopOnly: false
  },
  {
    title: "Alles over INVESTBOTIQ",
    submenu: [
      { label: "Wat is het?", to: "/alles-over-investbot/wat-is-het" },
      { label: "Hoe werkt het?", to: "/alles-over-investbot/hoe-werkt-het" },
      { label: "Missie & Visie", to: "/alles-over-investbot/mission-vision" },
      { label: "FAQ", to: "/faq" }
    ],
    desktopOnly: false
  },
  { title: "Tier Plannen", to: "/tier-plannen", desktopOnly: false },
  { title: "Veiligheid", to: "/veiligheid", desktopOnly: false }
];

interface Props {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Logo: React.ReactNode;
}

const PublicHeaderMobileMenu: React.FC<Props> = ({ menuOpen, setMenuOpen, Logo }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const { user, userRole } = useAuth();
  const isMember = !!user && userRole === "member";
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 z-50 flex justify-end"
          onClick={() => setMenuOpen(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="h-full w-4/5 max-w-xs sm:max-w-md bg-white shadow-2xl flex flex-col p-0 z-[100]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
              {Logo}
              <button
                className="p-2 rounded-full hover:bg-slate-100 text-slate-800 transition"
                onClick={() => setMenuOpen(false)}
                aria-label="Sluit menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col gap-1 px-6 py-5 bg-white overflow-y-auto">
              <button
                className="font-semibold py-2.5 px-3 rounded-xl hover:bg-indigo-50 text-slate-800 text-left transition"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/");
                }}
              >
                Home
              </button>
              <div className="w-full">
                <button
                  className="flex items-center w-full justify-between font-semibold py-2.5 px-3 rounded-xl hover:bg-indigo-50 text-slate-800 transition"
                  onClick={() => setSubmenuOpen((o) => !o)}
                >
                  <span>Alles over INVESTBOTIQ</span>
                  <ChevronDown className={`ml-1 h-5 w-5 transition-transform ${submenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {submenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col mt-1 ml-4"
                    >
                      {NAV_ITEMS[1].submenu?.map((item) => (
                        <button
                          key={item.label}
                          className="py-2 px-3 w-full text-left text-slate-700 rounded-lg hover:text-indigo-600 hover:bg-indigo-50 transition font-medium text-sm"
                          onClick={() => {
                            setMenuOpen(false);
                            setSubmenuOpen(false);
                            navigate(item.to);
                          }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {NAV_ITEMS.slice(2).map((item) => (
                <button
                  key={item.title}
                  className="font-semibold py-2.5 px-3 rounded-xl hover:bg-indigo-50 text-slate-800 text-left transition"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate(item.to!);
                  }}
                >
                  {item.title}
                </button>
              ))}
              <button
                className="font-semibold py-2.5 px-3 rounded-xl hover:bg-indigo-50 text-slate-800 text-left transition flex items-center"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/auth");
                }}
              >
                <LogIn className="mr-2 h-4 w-4" /> Inloggen
              </button>
            </nav>
            <div className="border-t border-slate-200 mt-0 pt-4 pb-6 px-6 flex flex-col gap-2.5 bg-white">
              {!user && (
                <>
                  <Link
                    to="/auth"
                    className="block w-full py-2.5 px-3 rounded-xl bg-indigo-600 text-white font-semibold text-center hover:bg-indigo-700 transition shadow-md shadow-indigo-500/20"
                    onClick={() => setMenuOpen(false)}
                  >
                    Registreren
                  </Link>
                  <Link
                    to="/auth"
                    className="block w-full py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 font-semibold text-center hover:bg-slate-200 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Inloggen
                  </Link>
                </>
              )}
              {isMember && (
                <Link
                  to="/member/dashboard"
                  className="block w-full py-2.5 px-3 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-center hover:bg-indigo-100 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Member Dashboard
                </Link>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PublicHeaderMobileMenu;
