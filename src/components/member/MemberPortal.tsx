import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { 
  TrendingUp, 
  PiggyBank, 
  Bot, 
  ListTodo, 
  Brain, 
  Users, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  LogOut,
  Shield,
  Sparkles,
  User,
  ChevronRight
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { MemberDashboardTab } from "./MemberDashboardTab";
import { MemberProgressTab } from "./MemberProgressTab";
import { MemberTasksTab } from "./MemberTasksTab";
import { MemberIntelligenceTab } from "./MemberIntelligenceTab";
import { MemberReferralsTab } from "./MemberReferralsTab";
import { MemberProfileTab } from "./MemberProfileTab";
import { toast } from "sonner";

export type MemberTab = "dashboard" | "voortgang" | "takenlijst" | "intelligence" | "referrals" | "profile";

interface Props {
  initialTab?: MemberTab;
}

export default function MemberPortal({ initialTab = "dashboard" }: Props) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab from URL or prop
  const getTabFromPath = (): MemberTab => {
    const path = location.pathname;
    if (path.includes("progress") || path.includes("voortgang")) return "voortgang";
    if (path.includes("tasks") || path.includes("taken")) return "takenlijst";
    if (path.includes("ai-running") || path.includes("intelligence")) return "intelligence";
    if (path.includes("referrals")) return "referrals";
    if (path.includes("profile") || path.includes("profiel")) return "profile";
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<MemberTab>(getTabFromPath());
  const [isDark, setIsDark] = useState<boolean>(() => {
    return document.documentElement.classList.contains("dark") || 
      localStorage.getItem("theme") === "dark";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync tab with URL
  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  // Sync theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const switchTab = (tab: MemberTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    
    const routeMap: Record<MemberTab, string> = {
      dashboard: "/member/dashboard",
      voortgang: "/member/progress",
      takenlijst: "/member/tasks",
      intelligence: "/member/ai-running",
      referrals: "/member/referrals",
      profile: "/member/profile"
    };
    navigate(routeMap[tab]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Succesvol uitgelogd");
      navigate("/auth");
    } catch (err) {
      toast.error("Fout bij uitloggen");
    }
  };

  const getUserDisplayName = () => {
    if (!user || !user.email) return "Investeerder";
    const name = user.email.split("@")[0];
    return name.charAt(0).toUpperCase() + name.slice(1).split(".")[0];
  };

  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-[#070913] dark:text-slate-100 min-h-screen flex flex-col antialiased selection:bg-purple-500 selection:text-white transition-colors duration-300">
      
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-purple-200/50 dark:border-purple-900/30 bg-white/90 dark:bg-[#070913]/90 backdrop-blur-xl shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-3">
          
          {/* Brand & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-slate-800 lg:hidden"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <BrandLogo subtitle="Member Portal" to="/member/dashboard" />
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <button 
              type="button"
              onClick={() => switchTab("dashboard")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "dashboard"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                  : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-white/60 dark:hover:bg-slate-800"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Member Dashboard</span>
            </button>

            <button 
              type="button"
              onClick={() => switchTab("voortgang")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "voortgang"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                  : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-white/60 dark:hover:bg-slate-800"
              }`}
            >
              <PiggyBank className="w-4 h-4" />
              <span>Voortgang</span>
            </button>

            <button 
              type="button"
              onClick={() => switchTab("takenlijst")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 relative ${
                activeTab === "takenlijst"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                  : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-white/60 dark:hover:bg-slate-800"
              }`}
            >
              <ListTodo className="w-4 h-4" />
              <span>Takenlijst</span>
              <span className="ml-0.5 px-1.5 py-0.5 text-[9px] bg-amber-500 text-white rounded-full font-black">
                2
              </span>
            </button>

            <button 
              type="button"
              onClick={() => switchTab("intelligence")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "intelligence"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                  : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-white/60 dark:hover:bg-slate-800"
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>CashFlow Intelligence</span>
            </button>

            <button 
              type="button"
              onClick={() => switchTab("referrals")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "referrals"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                  : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-white/60 dark:hover:bg-slate-800"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Mijn Referrals</span>
            </button>

            <button 
              type="button"
              onClick={() => switchTab("profile")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "profile"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                  : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-white/60 dark:hover:bg-slate-800"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profiel</span>
            </button>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Live Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Autonoom Live</span>
            </div>

            {/* Theme Toggle */}
            <button 
              type="button"
              onClick={() => setIsDark(prev => !prev)}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-slate-800 transition-colors"
              aria-label="Wissel thema"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-purple-600" />
              )}
            </button>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 border border-red-200 dark:border-red-900/40 transition-all flex items-center gap-1.5"
              title="Uitloggen"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Uitloggen</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-purple-200 dark:border-purple-900/30 bg-white dark:bg-[#070913] px-4 py-4 space-y-2 shadow-2xl animate-fadeIn">
            <button 
              type="button"
              onClick={() => switchTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === "dashboard"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                  : "text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800"
              }`}
            >
              <TrendingUp className="w-5 h-5" /> Member Dashboard
            </button>

            <button 
              type="button"
              onClick={() => switchTab("voortgang")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === "voortgang"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                  : "text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800"
              }`}
            >
              <PiggyBank className="w-5 h-5" /> Voortgang
            </button>

            <button 
              type="button"
              onClick={() => switchTab("takenlijst")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === "takenlijst"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                  : "text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800"
              }`}
            >
              <span className="flex items-center gap-3">
                <ListTodo className="w-5 h-5" /> Takenlijst
              </span>
              <span className="px-2 py-0.5 text-xs bg-amber-500 text-white rounded-full font-black">
                2
              </span>
            </button>

            <button 
              type="button"
              onClick={() => switchTab("intelligence")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === "intelligence"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                  : "text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800"
              }`}
            >
              <Brain className="w-5 h-5" /> CashFlow Intelligence
            </button>

            <button 
              type="button"
              onClick={() => switchTab("referrals")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === "referrals"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                  : "text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800"
              }`}
            >
              <Users className="w-5 h-5" /> Mijn Referrals
            </button>

            <button 
              type="button"
              onClick={() => switchTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === "profile"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                  : "text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800"
              }`}
            >
              <User className="w-5 h-5" /> Mijn Profiel
            </button>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40"
              >
                <LogOut className="w-4 h-4" />
                <span>Uitloggen</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Dynamic Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* VIEW 1: MEMBER DASHBOARD */}
        {activeTab === "dashboard" && (
          <MemberDashboardTab onSwitchTab={switchTab} userName={getUserDisplayName()} />
        )}

        {/* VIEW 2: VOORTGANG */}
        {activeTab === "voortgang" && (
          <MemberProgressTab onSwitchTab={switchTab} />
        )}

        {/* VIEW 3: TAKENLIJST */}
        {activeTab === "takenlijst" && (
          <MemberTasksTab />
        )}

        {/* VIEW 4: CASHFLOW INTELLIGENCE */}
        {activeTab === "intelligence" && (
          <MemberIntelligenceTab />
        )}

        {/* VIEW 5: MIJN REFERRALS */}
        {activeTab === "referrals" && (
          <MemberReferralsTab userEmail={user?.email} userId={user?.id} />
        )}

        {/* VIEW 6: MIJN PROFIEL */}
        {activeTab === "profile" && (
          <MemberProfileTab />
        )}

      </main>

    </div>
  );
}
