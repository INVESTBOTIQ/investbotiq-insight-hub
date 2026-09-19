import React, { useState, useEffect } from "react";
import { 
  Brain, 
  Sparkles, 
  Activity, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Check, 
  RefreshCw, 
  Sliders, 
  Layers, 
  TrendingUp, 
  Lock, 
  Play, 
  Pause,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

export const MemberIntelligenceTab: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [activeSimFlowlutas, setActiveSimFlowlutas] = useState<number>(6);
  const [riskProfile, setRiskProfile] = useState<"defensief" | "gebalanceerd" | "groeigericht">("gebalanceerd");
  const [autoCompound, setAutoCompound] = useState(true);
  
  // Real-time telemetry event stream
  const [liveLogs, setLiveLogs] = useState<Array<{ id: string; time: string; text: string; type: "success" | "info" | "purple" }>>([
    { id: "1", time: "Zojuist", text: "Micro-arbitrage scan voltooid over 14 DEX liquiditeitspools (+0.42%)", type: "success" },
    { id: "2", time: "2 min geleden", text: "Flowluta Beta #02 liquiditeitsverhouding opnieuw gekalibreerd", type: "purple" },
    { id: "3", time: "5 min geleden", text: "BEL leningen buffer gecontroleerd: 100% dekkingsgraad", type: "info" },
    { id: "4", time: "11 min geleden", text: "Maandelijkse cashflow reserve van €1.620,00 geborgd in kluis", type: "success" },
    { id: "5", time: "18 min geleden", text: "Marktvolatiliteit gecorrigeerd via Flowluta Zeta algoritme", type: "purple" },
  ]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const sampleEvents = [
        "Dynamische herverdeling uitgevoerd voor maximale cashflow stabiliteit",
        "Liquiditeitspaar BTC/EUR en ETH/EUR gescand op koersafwijkingen",
        "Compounding cyclus succesvol afgerond voor actieve portfolio",
        "Veiligheidscontrole uitgevoerd: alle sleutels in HSM kluis beveiligd",
        "Nieuwe rendementspiek gedetecteerd in Flowluta Alpha pool (+3.8%)"
      ];
      const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      const newLog = {
        id: Date.now().toString(),
        time: "Zojuist",
        text: randomEvent,
        type: (Math.random() > 0.5 ? "success" : "purple") as "success" | "purple"
      };

      setLiveLogs(prev => [newLog, ...prev.slice(0, 5)]);
    }, 9000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const simulatedMonthlyCashflow = activeSimFlowlutas * 270;
  const simulatedAnnualReturn = simulatedMonthlyCashflow * 12;

  const handleManualOptimize = () => {
    toast.success("AI Optimalisatie cyclus gestart! Alle 6 Flowlutas opnieuw afgesteld.");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Intelligence Center */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-10 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm dark:shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/5 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                Autonomous Engine V4.2
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800/60 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {isRunning ? "Live Actief" : "Gepauzeerd"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              CashFlow Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-1 leading-relaxed">
              Het autonome neurale netwerk van Investbotiq beheert, optimaliseert en beveiligt uw cashflowgeneratie 24/7 zonder handmatige interventie.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIsRunning(!isRunning);
                toast.info(isRunning ? "Bot monitoring gepauzeerd" : "Bot monitoring hervat");
              }}
              className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-2 active:scale-95"
            >
              {isRunning ? <Pause className="w-4 h-4 text-amber-500" /> : <Play className="w-4 h-4 text-emerald-500" />}
              <span>{isRunning ? "Pauzeren" : "Hervatten"}</span>
            </button>

            <button
              type="button"
              onClick={handleManualOptimize}
              className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Direct Optimaliseren</span>
            </button>
          </div>
        </div>

        {/* Central Animated Visualizer Orb */}
        <div className="relative z-10 py-12 flex flex-col items-center justify-center">
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
            {/* Dynamic Orbit Rings */}
            <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-ping opacity-25" />
            <div 
              className="absolute inset-2 rounded-full border border-purple-500/40 animate-spin" 
              style={{ animationDuration: "24s" }} 
            />
            <div 
              className="absolute inset-8 rounded-full border-2 border-dashed border-indigo-400/40 animate-spin" 
              style={{ animationDuration: "16s", animationDirection: "reverse" }} 
            />
            <div 
              className="absolute inset-16 rounded-full border border-violet-300/30 animate-spin" 
              style={{ animationDuration: "30s" }} 
            />

            {/* Core Neural Sphere */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-purple-700 via-indigo-600 to-violet-500 flex items-center justify-center shadow-2xl shadow-purple-600/50 relative z-10">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto shadow-inner">
                  <Brain className="w-9 h-9 text-white animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-mono font-black tracking-widest text-purple-200">
                    IQ BOT ACTIVE
                  </div>
                  <div className="text-[10px] text-purple-300/80">
                    Latency: 12ms | 99.98% Uptime
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Status Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mt-8">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md text-center">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block">Actieve Slots</span>
              <span className="text-lg font-black text-slate-900 dark:text-white">6 / 8 Flowlutas</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md text-center">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block">Markt Scansnelheid</span>
              <span className="text-lg font-black text-purple-600 dark:text-purple-300">120/sec</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md text-center">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block">Efficiëntiescore</span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">99.6%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md text-center">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider block">Volgende Cyclus</span>
              <span className="text-lg font-black text-indigo-600 dark:text-indigo-300">In 4 min</span>
            </div>
          </div>
        </div>

      </div>

      {/* Two Column Section: Live Decision Feed & Strategy Configurator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Live AI Decision Stream */}
        <div className="rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Live AI Beslissingsstroom
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Real-time feed
            </span>
          </div>

          <div className="space-y-3">
            {liveLogs.map((log) => (
              <div 
                key={log.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3 transition-all hover:border-purple-300 dark:hover:border-purple-600"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs mt-0.5 ${
                  log.type === "success" 
                    ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400" 
                    : "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400"
                }`}>
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                    {log.text}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {log.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategy Parameters & Calculator */}
        <div className="rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <Sliders className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                AI Parameters & Simulatie
              </h3>
            </div>

            <div className="space-y-6 pt-4">
              {/* Simulator Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Aantal Actieve Flowluta Slots</span>
                  <span className="text-purple-600 dark:text-purple-400 font-extrabold text-sm">{activeSimFlowlutas} Slots</span>
                </div>
                <Slider
                  value={[activeSimFlowlutas]}
                  onValueChange={(val) => setActiveSimFlowlutas(val[0])}
                  min={1}
                  max={12}
                  step={1}
                  className="py-2"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1 Slot (Tier 1)</span>
                  <span>6 Slots (Huidig)</span>
                  <span>12 Slots (Tier 3 Max)</span>
                </div>
              </div>

              {/* Simulation Output Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-indigo-50 to-slate-50 dark:from-purple-950/30 dark:via-slate-800 dark:to-slate-800 border border-purple-200 dark:border-purple-900/40 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-300">
                  <span>Geprojecteerde Maandelijkse Cashflow:</span>
                  <span className="text-lg font-black text-purple-600 dark:text-purple-400">
                    €{simulatedMonthlyCashflow.toLocaleString('nl-NL')},00 / mnd
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-300">
                  <span>Geprojecteerde Jaaropbrengst:</span>
                  <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                    €{simulatedAnnualReturn.toLocaleString('nl-NL')},00 / jaar
                  </span>
                </div>
              </div>

              {/* Risk Profile Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Risicoprofiel Bot
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["defensief", "gebalanceerd", "groeigericht"] as const).map((profile) => (
                    <button
                      key={profile}
                      type="button"
                      onClick={() => setRiskProfile(profile)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border ${
                        riskProfile === profile
                          ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {profile}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Alle strategieën opereren binnen de strengste risicolimieten en kapitaalbescherming.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
