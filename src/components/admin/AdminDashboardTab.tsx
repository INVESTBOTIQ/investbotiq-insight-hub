import React, { useState } from "react";
import { 
  Users, 
  CircleDollarSign, 
  Sparkles, 
  CheckSquare, 
  TrendingUp, 
  Bell, 
  ShieldCheck, 
  ArrowUpRight, 
  Activity, 
  AlertTriangle, 
  Share2, 
  UserPlus, 
  Layers, 
  Calendar,
  Clock,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from "recharts";
import { AdminTab } from "./AdminPortal";

interface Props {
  onSwitchTab: (tab: AdminTab) => void;
  adminName: string;
}

const adminPlatformChartData = [
  { month: "Jan", cashflow: 11200, users: 14, loans: 65000 },
  { month: "Feb", cashflow: 12800, users: 16, loans: 80000 },
  { month: "Mrt", cashflow: 14100, users: 18, loans: 95000 },
  { month: "Apr", cashflow: 15600, users: 20, loans: 110000 },
  { month: "Mei", cashflow: 16900, users: 22, loans: 128000 },
  { month: "Jun", cashflow: 18400, users: 24, loans: 145000 },
];

export const AdminDashboardTab: React.FC<Props> = ({ onSwitchTab, adminName }) => {
  const [chartView, setChartView] = useState<"cashflow" | "loans">("cashflow");

  const activities = [
    { 
      id: 1, 
      type: "spirit", 
      title: "Flowluta Geactiveerd", 
      message: "Spirit Gamma geactiveerd voor Lucas de Wit", 
      time: "5 minuten geleden",
      badge: "Tier 2"
    },
    { 
      id: 2, 
      type: "lead", 
      title: "Nieuwe Registratie Lead", 
      message: "Aanvraag ontvangen van Thomas Meijer (Starter)", 
      time: "18 minuten geleden",
      badge: "Nieuw"
    },
    { 
      id: 3, 
      type: "task", 
      title: "Taak Voltooid", 
      message: "Contract ondertekend door Sophie Bakker", 
      time: "35 minuten geleden",
      badge: "Klaar"
    },
    { 
      id: 4, 
      type: "payout", 
      title: "Cashflow Batch", 
      message: "Automatische maanduitkering klaargezet voor 24 leden", 
      time: "2 uur geleden",
      badge: "€ 18.400"
    }
  ];

  const quickNavCards = [
    {
      tab: "users" as AdminTab,
      title: "Gebruikers Beheer",
      desc: "24 actieve leden en rollen beheren",
      icon: Users,
      color: "from-blue-500/20 to-indigo-500/20 text-blue-500 dark:text-blue-400"
    },
    {
      tab: "leads" as AdminTab,
      title: "Nieuwe Leads",
      desc: "Inkomende aanmeldingen & intake",
      icon: UserPlus,
      color: "from-purple-500/20 to-violet-500/20 text-purple-500 dark:text-purple-400"
    },
    {
      tab: "tasks" as AdminTab,
      title: "Taken Beheer",
      desc: "Taken toewijzen en deadlines bewaken",
      icon: CheckSquare,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-500 dark:text-emerald-400"
    },
    {
      tab: "cashflows" as AdminTab,
      title: "Cashflow Beheer",
      desc: "Uitbetalingen & maandsaldi bijwerken",
      icon: CircleDollarSign,
      color: "from-amber-500/20 to-orange-500/20 text-amber-500 dark:text-amber-400"
    },
    {
      tab: "flowlutas" as AdminTab,
      title: "Flowlutas Engine",
      desc: "AI trading algoritmes en yield",
      icon: TrendingUp,
      color: "from-rose-500/20 to-pink-500/20 text-rose-500 dark:text-rose-400"
    },
    {
      tab: "referrals" as AdminTab,
      title: "Referral Programma",
      desc: "Beloningen en ambassadeurs",
      icon: Share2,
      color: "from-cyan-500/20 to-blue-500/20 text-cyan-500 dark:text-cyan-400"
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Admin Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm dark:shadow-2xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-purple-500/5 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-20 w-48 h-48 bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                Hoofdbeheerder
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800/60 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Ecosysteem Actief & Stabiel
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Beheerderspaneel, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:via-indigo-400 dark:to-purple-300">{adminName}</span>
            </h1>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Volledig centraal overzicht van alle actieve leden, cashflow verdelingen, Flowluta algorithms en inkomende leads.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onSwitchTab("users")}
              className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Users className="w-4 h-4" />
              <span>Gebruikers Beheren</span>
            </button>
            <button
              type="button"
              onClick={() => onSwitchTab("cashflows")}
              className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 font-bold text-xs flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
            >
              <CircleDollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Cashflows Aanpassen</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Actieve Leden */}
        <div 
          onClick={() => onSwitchTab("users")}
          className="rounded-3xl p-6 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              +3 deze maand
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Actieve Members
          </p>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            24
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span>100% geverifieerd</span>
            <span className="text-purple-500 flex items-center gap-0.5 font-bold">Bekijk <ArrowRight className="w-3 h-3" /></span>
          </div>
        </div>

        {/* Card 2: Totale Maandelijkse Cashflow */}
        <div 
          onClick={() => onSwitchTab("cashflows")}
          className="rounded-3xl p-6 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <CircleDollarSign className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              +12,4% YoY
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Totale Maand Cashflow
          </p>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            € 18.400
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span>Gem. € 766 per lid</span>
            <span className="text-emerald-500 flex items-center gap-0.5 font-bold">Details <ArrowRight className="w-3 h-3" /></span>
          </div>
        </div>

        {/* Card 3: BEL Leningen */}
        <div 
          onClick={() => onSwitchTab("users")}
          className="rounded-3xl p-6 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 dark:text-amber-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              17 contracten
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            BEL Leningen Volume
          </p>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            € 145.000
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span>0% wanbetaling</span>
            <span className="text-amber-500 flex items-center gap-0.5 font-bold">Overzicht <ArrowRight className="w-3 h-3" /></span>
          </div>
        </div>

        {/* Card 4: Actieve Spirits / Flowlutas */}
        <div 
          onClick={() => onSwitchTab("flowlutas")}
          className="rounded-3xl p-6 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 dark:text-purple-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
              99.8% Uptime
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Actieve Spirits & Flowlutas
          </p>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            31
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span>6 strategietypes</span>
            <span className="text-purple-400 flex items-center gap-0.5 font-bold">Status <ArrowRight className="w-3 h-3" /></span>
          </div>
        </div>
      </div>

      {/* Main Grid: Platform Growth Chart & Live Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Platform Growth Chart */}
        <div className="lg:col-span-2 rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                Platform Groei & Cashflow Volume
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Totale geaggregeerde cashflow en leenvolume van alle aangesloten leden
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setChartView("cashflow")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  chartView === "cashflow"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-purple-600"
                }`}
              >
                Cashflow (€)
              </button>
              <button
                type="button"
                onClick={() => setChartView("loans")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  chartView === "loans"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-purple-600"
                }`}
              >
                BEL Leningen (€)
              </button>
            </div>
          </div>

          <div className="h-[280px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={adminPlatformChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="adminCashflowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="adminLoansGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} tickFormatter={(val) => `€${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "1rem", color: "#fff" }}
                  formatter={(value: any) => [`€ ${Number(value).toLocaleString('nl-NL')}`, chartView === "cashflow" ? "Totale Cashflow" : "BEL Volume"]}
                />
                <Area 
                  type="monotone" 
                  dataKey={chartView === "cashflow" ? "cashflow" : "loans"} 
                  stroke={chartView === "cashflow" ? "#9333ea" : "#f59e0b"} 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill={chartView === "cashflow" ? "url(#adminCashflowGradient)" : "url(#adminLoansGradient)"} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: Systeem Alerts & Recente Activiteit */}
        <div className="space-y-6">
          {/* Alerts card */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-amber-500/10 via-slate-900/40 to-slate-900/90 border border-amber-500/30 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Aandachtspunten</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">2 openstaande acties</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <div 
                onClick={() => onSwitchTab("tasks")}
                className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between cursor-pointer hover:border-amber-500/40 transition-all text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">3 gebruikers hebben openstaande taken</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div 
                onClick={() => onSwitchTab("leads")}
                className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between cursor-pointer hover:border-purple-500/40 transition-all text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">5 nieuwe leads wachten op intake</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Live Activity Stream */}
          <div className="rounded-3xl p-6 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-500" />
                Live Activiteiten Stream
              </h3>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Live</span>
            </div>

            <div className="space-y-3">
              {activities.map((act) => (
                <div key={act.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{act.title}</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-purple-500/10 text-purple-500 dark:text-purple-300">
                      {act.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">{act.message}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {act.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Module Shortcuts Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
          Directe Toegang tot Beheermodules
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickNavCards.map((nav) => {
            const Icon = nav.icon;
            return (
              <div
                key={nav.tab}
                onClick={() => onSwitchTab(nav.tab)}
                className="rounded-3xl p-5 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${nav.color} flex items-center justify-center font-bold group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">
                      {nav.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {nav.desc}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
