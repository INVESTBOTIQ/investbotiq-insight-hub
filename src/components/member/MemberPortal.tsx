import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { 
  TrendingUp, 
  PiggyBank, 
  Bot, 
  ListTodo, 
  Sparkles, 
  Clock, 
  CheckCircle, 
  ShieldCheck, 
  Copy, 
  Brain, 
  Users, 
  AlertTriangle, 
  Calendar, 
  Check, 
  ChevronDown, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowUp, 
  ArrowDown, 
  Euro, 
  Wand2, 
  ExternalLink 
} from "lucide-react";

export type MemberTab = "dashboard" | "voortgang" | "takenlijst" | "intelligence" | "referrals";

type Props = {
  initialTab?: MemberTab;
};

export default function MemberPortal({ initialTab = "dashboard" }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab from URL or prop
  const getTabFromPath = (): MemberTab => {
    const path = location.pathname;
    if (path.includes("progress") || path.includes("voortgang")) return "voortgang";
    if (path.includes("tasks") || path.includes("taken")) return "takenlijst";
    if (path.includes("ai-running") || path.includes("intelligence")) return "intelligence";
    if (path.includes("referrals")) return "referrals";
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<MemberTab>(getTabFromPath());
  const [isDark, setIsDark] = useState<boolean>(() => {
    return document.documentElement.classList.contains("dark") || 
      localStorage.getItem("theme") === "dark";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [voortgangPeriod, setVoortgangPeriod] = useState<"maandelijks" | "jaarlijks">("maandelijks");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Task list states
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Bankrekening verificatie bevestigen",
      status: "completed",
      priority: "low",
      date: "Voltooid",
      actionLabel: null,
      actionColor: null
    },
    {
      id: 2,
      title: "KYC Verificatie - Upload identiteitsbewijs",
      status: "pending",
      priority: "high",
      date: "22 Sep 2026",
      actionLabel: "Starten",
      actionColor: "red"
    },
    {
      id: 3,
      title: "BEL Contract digitaal accorderen",
      status: "in-progress",
      priority: "medium",
      date: "24 Sep 2026",
      actionLabel: "Bekijken",
      actionColor: "amber"
    }
  ]);

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
    
    // Optional URL sync
    const routeMap: Record<MemberTab, string> = {
      dashboard: "/member/dashboard",
      voortgang: "/member/progress",
      takenlijst: "/member/tasks",
      intelligence: "/member/ai-running",
      referrals: "/member/referrals"
    };
    navigate(routeMap[tab]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTaskState = (taskId: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: t.status === "completed" ? "pending" : "completed"
        };
      }
      return t;
    }));
  };

  const copyReferralLink = (textToCopy: string) => {
    try {
      navigator.clipboard.writeText(textToCopy);
    } catch {
      const tempInput = document.createElement("input");
      tempInput.value = textToCopy;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    }

    setToastMessage("Gekopieerd naar klembord!");
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const completedTasksCount = tasks.filter(t => t.status === "completed").length;
  const taskProgressPercent = Math.round((completedTasksCount / tasks.length) * 100);

  const getFirstName = () => {
    if (!user || !user.email) return "Lid";
    const name = user.email.split("@")[0];
    return name.charAt(0).toUpperCase() + name.slice(1).split(".")[0];
  };

  const referralCode = user?.id ? `INVUSER_${user.id.slice(0, 4).toUpperCase()}` : "INVUSER_3";
  const fullReferralUrl = `https://investbotiq.nl/?ref=${referralCode}`;

  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-[#0b0f19] dark:text-gray-100 min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0b0f19] shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none lg:hidden"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div 
              onClick={() => switchTab("dashboard")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/30">
                IQ
              </div>
              <span className="text-xl font-extrabold tracking-wider uppercase text-gray-900 dark:text-white">
                INVESTBOTIQ
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => switchTab("dashboard")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "dashboard"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Member Dashboard</span>
            </button>

            <button 
              onClick={() => switchTab("voortgang")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "voortgang"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <PiggyBank className="w-3.5 h-3.5" />
              <span>Voortgang</span>
            </button>

            <button 
              onClick={() => switchTab("takenlijst")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 relative ${
                activeTab === "takenlijst"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <ListTodo className="w-3.5 h-3.5" />
              <span>Takenlijst</span>
              <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-amber-500 text-white rounded-full font-bold">
                {tasks.filter(t => t.status !== "completed").length}
              </span>
            </button>

            <button 
              onClick={() => switchTab("intelligence")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "intelligence"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>CashFlow Intelligence</span>
            </button>

            <button 
              onClick={() => switchTab("referrals")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "referrals"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Mijn Referrals</span>
            </button>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Live Status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live</span>
            </div>

            {/* Theme Toggle Button */}
            <button 
              onClick={() => setIsDark(prev => !prev)}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-800"
              aria-label="Wissel thema"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-800">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-indigo-500/30">
                LID
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0b0f19] px-4 py-3 space-y-2 shadow-xl">
            <button 
              onClick={() => switchTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                activeTab === "dashboard"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <TrendingUp className={`w-5 h-5 ${activeTab === "dashboard" ? "text-white" : "text-indigo-600"}`} /> Member Dashboard
            </button>
            <button 
              onClick={() => switchTab("voortgang")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                activeTab === "voortgang"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <PiggyBank className={`w-5 h-5 ${activeTab === "voortgang" ? "text-white" : "text-indigo-600"}`} /> Voortgang
            </button>
            <button 
              onClick={() => switchTab("takenlijst")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                activeTab === "takenlijst"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span className="flex items-center gap-3">
                <ListTodo className={`w-5 h-5 ${activeTab === "takenlijst" ? "text-white" : "text-indigo-600"}`} /> Takenlijst
              </span>
              <span className="px-2 py-0.5 text-xs bg-amber-500 text-white rounded-full font-bold">
                {tasks.filter(t => t.status !== "completed").length}
              </span>
            </button>
            <button 
              onClick={() => switchTab("intelligence")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                activeTab === "intelligence"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Brain className={`w-5 h-5 ${activeTab === "intelligence" ? "text-white" : "text-indigo-600"}`} /> CashFlow Intelligence
            </button>
            <button 
              onClick={() => switchTab("referrals")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                activeTab === "referrals"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Users className={`w-5 h-5 ${activeTab === "referrals" ? "text-white" : "text-indigo-600"}`} /> Mijn Referrals
            </button>
          </div>
        )}
      </header>

      {/* Main Dynamic Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* VIEW 1: MEMBER DASHBOARD */}
        {activeTab === "dashboard" && (
          <section className="space-y-8 animate-fadeIn">
            
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Member Dashboard
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    <Sparkles className="w-3 h-3 text-indigo-500" /> Live
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Welkom terug, {getFirstName()}! Hier is het overzicht van uw cashflow en actieve flowlutas.
                </p>
              </div>
            </div>

            {/* Top KPI Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Card 1: Maandelijkse Cashflow */}
              <div className="glass-card rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl group">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Maandelijkse Cashflow
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  €1.620,00
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Actief uitbetaald per maand</span>
                </div>
              </div>

              {/* Card 2: Totale Opbouw */}
              <div className="glass-card rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl group">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all" />
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Totale Opbouw
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                    <PiggyBank className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  €48.500,00
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Gewaarborgde portefeuillevoortgang</span>
                </div>
              </div>

              {/* Card 3: Actieve Flowlutas */}
              <div className="glass-card rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl group">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all" />
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actieve Flowlutas
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  6
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draaiende bot eenheden</span>
                </div>
              </div>

              {/* Card 4: Open Taken */}
              <div 
                onClick={() => switchTab("takenlijst")}
                className="glass-card rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl group cursor-pointer"
              >
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Open Taken
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <ListTodo className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  {tasks.filter(t => t.status !== "completed").length}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Aandacht vereist</span>
                </div>
              </div>

            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Line Chart: Cashflow Ontwikkeling */}
              <div className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      Cashflow Ontwikkeling
                    </h3>
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                      Automatisch
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                    Cashflow groeit automatisch naarmate flowlutas worden geactiveerd. Elke 3 maanden activeert de IQ bot een nieuwe stap.
                  </p>
                </div>

                {/* Line Chart Graphic */}
                <div className="relative w-full h-64 sm:h-72 flex flex-col justify-end pt-4">
                  <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="memberCashflowGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 170 C 100 150, 180 120, 250 90 C 330 60, 420 30, 500 10 L 500 200 L 0 200 Z"
                      fill="url(#memberCashflowGradient)"
                    />
                    <path
                      d="M 0 170 C 100 150, 180 120, 250 90 C 330 60, 420 30, 500 10"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="3.5"
                    />
                    {/* Points */}
                    <circle cx="0" cy="170" r="4.5" fill="#818cf8" />
                    <circle cx="100" cy="148" r="4.5" fill="#818cf8" />
                    <circle cx="200" cy="115" r="4.5" fill="#818cf8" />
                    <circle cx="300" cy="75" r="4.5" fill="#818cf8" />
                    <circle cx="400" cy="45" r="4.5" fill="#818cf8" />
                    <circle cx="500" cy="10" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
                  </svg>
                  <div className="flex justify-between text-xs text-gray-400 pt-3 border-t border-gray-200/50 dark:border-gray-800/50">
                    <span>Jan (€550)</span>
                    <span>Feb (€750)</span>
                    <span>Mar (€950)</span>
                    <span>Apr (€1.200)</span>
                    <span>Mei (€1.500)</span>
                    <span className="text-emerald-500 font-bold">Jun (€1.800)</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200/60 dark:border-gray-800/60 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Wand2 className="w-4 h-4 text-indigo-500" />
                  <span>Je cashflow groeit door flowluta activaties volgens jouw Tier Plan.</span>
                </div>
              </div>

              {/* Secondary Bar Chart: Maandelijkse Voortgang */}
              <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    Maandelijkse Voortgang
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                    Overzicht van maandelijks opgebouwd volume
                  </p>
                </div>

                <div className="relative w-full h-56 flex items-end justify-between gap-4 px-2 pb-2">
                  {[
                    { label: "Jan", val: "€8k", percent: 35 },
                    { label: "Feb", val: "€12k", percent: 55 },
                    { label: "Mar", val: "€16k", percent: 70 },
                    { label: "Apr", val: "€22k", percent: 95 }
                  ].map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 font-mono">
                        {bar.val}
                      </span>
                      <div 
                        style={{ height: `${bar.percent}%` }}
                        className="w-full max-w-[36px] bg-blue-500 rounded-lg transition-all hover:bg-blue-400"
                      />
                      <span className="text-xs text-gray-400 font-medium">
                        {bar.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <span className="text-xs text-gray-400 italic">
                    Swipe over de grafiek voor maandelijks detail
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Widgets Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Recente Taken Widget */}
              <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Recente Taken
                    </h3>
                    <span className="text-xs font-medium text-gray-400">
                      {tasks.filter(t => t.status !== "completed").length} taken open
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Task 1 */}
                    <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10 flex items-start gap-3 transition-all hover:bg-red-50 dark:hover:bg-red-950/20">
                      <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          KYC Verificatie controleren en afronden
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> 21 Sep 2026
                        </p>
                      </div>
                    </div>

                    {/* Task 2 */}
                    <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-950/10 flex items-start gap-3 transition-all hover:bg-amber-50 dark:hover:bg-amber-950/20">
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          BEL Contract digitaal accorderen
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> 24 Sep 2026
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => switchTab("takenlijst")}
                  className="mt-6 w-full py-3 px-4 border border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all text-center block"
                >
                  Bekijk alle taken
                </button>
              </div>

              {/* Referral Widget Quick Banner */}
              <div className="glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-indigo-900/20 via-slate-900/40 to-purple-900/20">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Referral Programma
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
                      €100 bonus per lid
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    Nodig kennissen of relaties uit voor Invest Bot IQ. Zodra een nieuwe gebruiker start, ontvangt u €100 extra maandelijkse cashflow bonus.
                  </p>

                  <div className="space-y-3">
                    <div className="relative">
                      <input 
                        type="text" 
                        readOnly 
                        value={fullReferralUrl} 
                        className="w-full bg-gray-100 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-xs font-mono text-gray-800 dark:text-gray-200 focus:outline-none"
                      />
                    </div>

                    <button 
                      onClick={() => copyReferralLink(fullReferralUrl)}
                      className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Kopieer referral link</span>
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/40 dark:border-gray-800/40 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Gebruik het menu voor overige paginas</span>
                  <button 
                    onClick={() => switchTab("referrals")}
                    className="text-indigo-500 hover:underline font-semibold"
                  >
                    Details &rarr;
                  </button>
                </div>
              </div>

            </div>

          </section>
        )}

        {/* VIEW 2: VOORTGANG */}
        {activeTab === "voortgang" && (
          <section className="space-y-8 animate-fadeIn">
            
            {/* Title & Time Horizon Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Voortgang
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Volg uw financiële groei over tijd
                </p>
              </div>

              {/* Toggle Button Pills */}
              <div className="inline-flex p-1 bg-gray-200/70 dark:bg-gray-800/70 rounded-xl border border-gray-300/50 dark:border-gray-700/50 self-start sm:self-auto">
                <button 
                  onClick={() => setVoortgangPeriod("maandelijks")}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    voortgangPeriod === "maandelijks"
                      ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  Maandelijks
                </button>
                <button 
                  onClick={() => setVoortgangPeriod("jaarlijks")}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    voortgangPeriod === "jaarlijks"
                      ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  Jaarlijks
                </button>
              </div>
            </div>

            {/* Financial Metrics Stack */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Huidige opbouw */}
              <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Huidige opbouw
                </p>
                <div className="text-3xl font-black text-gray-900 dark:text-white mb-3">
                  €0,00
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                  <ArrowUp className="w-3 h-3" /> Geschatte groei dit jaar: +€72.000
                </span>
              </div>

              {/* Maandelijkse cashflow */}
              <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Maandelijkse cashflow
                </p>
                <div className="text-3xl font-black text-gray-900 dark:text-white mb-3">
                  €0,00
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                  <ArrowUp className="w-3 h-3" /> Geschatte groei dit jaar: +€720
                </span>
              </div>

              {/* Openstaande BEL leningen */}
              <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Openstaande BEL leningen
                </p>
                <div className="text-3xl font-black text-gray-900 dark:text-white mb-3">
                  €0,00
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                  <ArrowDown className="w-3 h-3" /> Geschatte afbouw dit jaar: -€8.800
                </span>
              </div>

            </div>

            {/* Interactive Chart Section: Financiële Ontwikkeling */}
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Financiële Ontwikkeling
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Visualisatie van vermogens en cashflowprojecties op lange termijn
                </p>
              </div>

              <div className="relative w-full h-72 flex flex-col justify-end pt-4">
                <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  {/* Opbouw Line (green) */}
                  <path
                    d="M 0 190 C 120 150, 250 100, 380 50 L 500 15"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />
                  {/* Cashflow Line (indigo) */}
                  <path
                    d="M 0 190 C 120 170, 250 140, 380 90 L 500 60"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3"
                  />
                  <circle cx="500" cy="15" r="5" fill="#10b981" />
                  <circle cx="500" cy="60" r="5" fill="#6366f1" />
                </svg>
                <div className="flex justify-between text-xs text-gray-400 pt-3 border-t border-gray-200/50 dark:border-gray-800/50 font-mono">
                  <span>2026</span>
                  <span>2027</span>
                  <span>2028</span>
                  <span>2029</span>
                  <span>2030</span>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-800/50 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-gray-600 dark:text-gray-300">Huidige opbouw (€)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className="text-gray-600 dark:text-gray-300">Maandelijkse cashflow (€)</span>
                </div>
              </div>
            </div>

          </section>
        )}

        {/* VIEW 3: TAKENLIJST */}
        {activeTab === "takenlijst" && (
          <section className="space-y-8 animate-fadeIn">
            
            {/* Task Completion Bar Banner */}
            <div className="glass-card rounded-2xl p-6 border-l-4 border-l-indigo-600">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Takenlijst
                </h2>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
                  Je hebt {completedTasksCount} van de {tasks.length} taken voltooid ({taskProgressPercent}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 h-3 rounded-full overflow-hidden p-0.5">
                <div 
                  className="bg-gradient-to-r from-indigo-600 to-violet-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${taskProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Filters & Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <select className="w-full appearance-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Alle statussen</option>
                  <option>Openstaand</option>
                  <option>Voltooid</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select className="w-full appearance-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Alle types</option>
                  <option>Verificatie</option>
                  <option>Contracten</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select className="w-full appearance-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Alle prioriteiten</option>
                  <option>Hoog</option>
                  <option>Gemiddeld</option>
                  <option>Laag</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select className="w-full appearance-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Deadline</option>
                  <option>Binnenkort verlopend</option>
                  <option>Nieuwste eerst</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Task Items List */}
            <div className="space-y-4">
              {tasks.map(task => {
                const isCompleted = task.status === "completed";
                return (
                  <div 
                    key={task.id}
                    className={`glass-card rounded-2xl p-5 flex items-start sm:items-center justify-between gap-4 transition-all ${
                      isCompleted 
                        ? "hover:border-emerald-500/50" 
                        : task.priority === "high" 
                        ? "hover:border-red-500/50" 
                        : "hover:border-amber-500/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => toggleTaskState(task.id)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-95 border ${
                          isCompleted
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border-transparent"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-white hover:bg-indigo-600 border-gray-300 dark:border-gray-700"
                        }`}
                        aria-label="Toggle taak status"
                      >
                        <Check className="w-5 h-5" />
                      </button>

                      <div>
                        <p className={`text-sm font-semibold text-gray-900 dark:text-gray-100 ${
                          isCompleted ? "line-through opacity-70" : ""
                        }`}>
                          {task.title}
                        </p>
                        <div className="mt-1 flex items-center gap-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            isCompleted 
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                              : task.priority === "high"
                              ? "bg-red-500/10 text-red-500 border-red-500/20"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          }`}>
                            {isCompleted ? "Voltooid" : task.priority === "high" ? "Aandacht vereist" : "In Behandeling"}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {task.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isCompleted ? (
                      <span className="text-xs text-emerald-500 font-medium hidden sm:inline-flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Actief
                      </span>
                    ) : (
                      <button className={`px-4 py-2 font-bold text-xs rounded-xl border transition-all ${
                        task.actionColor === "red"
                          ? "bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20"
                          : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/20"
                      }`}>
                        {task.actionLabel}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

          </section>
        )}

        {/* VIEW 4: CASHFLOW INTELLIGENCE */}
        {activeTab === "intelligence" && (
          <section className="space-y-8 animate-fadeIn">
            
            <div className="glass-card rounded-3xl p-8 lg:p-12 relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0d1322] to-[#0b0f19] border border-indigo-500/20 text-white shadow-2xl">
              
              {/* Header text */}
              <div className="text-center max-w-2xl mx-auto space-y-3 relative z-10">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Autonomous AI Engine
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  CashFlow Intelligence
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  CashFlow Intelligence beheert automatisch jouw financiële groei. Geen handmatige acties vereist.
                </p>
              </div>

              {/* Dynamic Animated Intelligence Particle Sphere */}
              <div className="my-10 flex items-center justify-center relative">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                  
                  {/* Pulse Glow Orbit Rings */}
                  <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-ping opacity-25" />
                  <div 
                    className="absolute inset-4 rounded-full border border-purple-500/40 animate-spin" 
                    style={{ animationDuration: "20s" }} 
                  />
                  <div 
                    className="absolute inset-10 rounded-full border-2 border-dashed border-violet-400/50 animate-spin" 
                    style={{ animationDuration: "12s", animationDirection: "reverse" }} 
                  />

                  {/* Glowing Orb Center */}
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 pulse-glow flex items-center justify-center shadow-glow-purple relative z-10">
                    <div className="text-center space-y-1">
                      <Brain className="w-12 h-12 text-white opacity-90 mx-auto" />
                      <div className="text-[11px] font-mono tracking-wider uppercase text-purple-100 font-bold">
                        IQ ACTIVE
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Intelligence Features / Bullet points */}
              <div className="max-w-xl mx-auto space-y-4 relative z-10">
                
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-200">
                    Verwerkt jouw huidige tier
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 font-bold" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-200">
                    Beheert cashflow van actieve spirits
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 font-bold" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-200">
                    Volgende spirit activatie binnen 2 maanden
                  </span>
                </div>

              </div>

              {/* Intelligence Status Footer Bar */}
              <div className="mt-10 pt-6 border-t border-white/10 max-w-2xl mx-auto flex flex-col gap-2 relative z-10">
                <div className="flex justify-between text-xs font-semibold text-gray-300">
                  <span>Intelligence Status</span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Actief
                  </span>
                </div>
                
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 via-indigo-500 to-purple-500 h-full rounded-full w-[78%]" />
                </div>
              </div>

            </div>

          </section>
        )}

        {/* VIEW 5: MIJN REFERRALS */}
        {activeTab === "referrals" && (
          <section className="space-y-8 animate-fadeIn">
            
            {/* Section Title & Subtitle */}
            <div className="pb-4 border-b border-gray-200 dark:border-gray-800">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Mijn Referrals
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Verdien €100 extra maandelijkse cashflow voor elke vriend die zich aanmeldt via jouw referral link.
              </p>
            </div>

            {/* Referral Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Succesvolle Referrals */}
              <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 text-xl font-bold">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                    Succesvolle Referrals
                  </span>
                  <span className="text-3xl font-black text-gray-900 dark:text-white">
                    0
                  </span>
                </div>
              </div>

              {/* In Behandeling */}
              <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 text-xl font-bold">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                    In Behandeling
                  </span>
                  <span className="text-3xl font-black text-gray-900 dark:text-white">
                    0
                  </span>
                </div>
              </div>

              {/* Totale Bonus */}
              <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 text-xl font-bold">
                  <Euro className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                    Totale Bonus
                  </span>
                  <span className="text-3xl font-black text-gray-900 dark:text-white">
                    €0,00
                  </span>
                </div>
              </div>

            </div>

            {/* Main Referral Share Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Je Referral Link
                </h2>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Deel deze link met vrienden en familie. Wanneer zij zich aanmelden en een Spirit activeren, ontvangen jullie beiden €100 extra maandelijkse cashflow.
              </p>

              {/* Referral Link Input & Copy CTA */}
              <div className="space-y-3">
                <div className="relative">
                  <input 
                    type="text" 
                    readOnly 
                    value={fullReferralUrl} 
                    className="w-full bg-gray-100 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-200 focus:outline-none"
                  />
                </div>

                <button 
                  onClick={() => copyReferralLink(fullReferralUrl)}
                  className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Kopieer referral link</span>
                </button>
              </div>

              {/* Highlight Rate Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-800 text-center space-y-1">
                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                  €100
                </div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  per succesvolle referral
                </p>
              </div>

              {/* Referral Activity Breakdown List */}
              <div className="space-y-3 pt-2">
                
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-100/70 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">
                    3 succesvolle referrals
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-100/70 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">
                    1 referral in behandeling
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-100/70 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
                  <span className="w-3 h-3 rounded-full bg-indigo-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">
                    €300 extra cashflow verdiend
                  </span>
                </div>

              </div>

            </div>

          </section>
        )}

      </main>

      {/* Dynamic Copy Toast Alert Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
          <div className="bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-700 dark:border-gray-200 animate-slide-in-right">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">{toastMessage}</p>
              <p className="text-[11px] opacity-80">Referral link is gereed om te delen.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
