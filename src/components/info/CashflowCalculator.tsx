import React, { useState, useId } from "react";
import { Sparkles, TrendingUp, Calendar, Coins } from "lucide-react";

export default function CashflowCalculator() {
  const [initialAmount, setInitialAmount] = useState(2500);
  const [monthlyAmount, setMonthlyAmount] = useState(250);
  const [years, setYears] = useState(3);
  const chartGradientId = useId();

  const months = years * 12;
  const annualBotReturn = 0.14; // 14% geschat per jaar

  // Berekening
  let currentBot = initialAmount;
  let currentSavings = initialAmount;
  const curvePoints: { x: number; bot: number; savings: number }[] = [];

  for (let i = 0; i <= months; i++) {
    curvePoints.push({
      x: i,
      bot: Math.round(currentBot),
      savings: Math.round(currentSavings)
    });
    currentBot = (currentBot + monthlyAmount) * (1 + annualBotReturn / 12);
    currentSavings = currentSavings + monthlyAmount;
  }

  const calculatedTotal = Math.round(currentBot);
  const monthlyEstCashflow = Math.round((calculatedTotal * annualBotReturn) / 12);

  // SVG Chart path calculation
  const maxVal = Math.max(...curvePoints.map(p => p.bot), 1);
  const chartWidth = 500;
  const chartHeight = 180;

  const pointsString = curvePoints
    .map((p, idx) => {
      const x = (idx / months) * chartWidth;
      const y = chartHeight - (p.bot / maxVal) * (chartHeight - 20) - 10;
      return `${x},${y}`;
    })
    .join(" ");

  const savingsPointsString = curvePoints
    .map((p, idx) => {
      const x = (idx / months) * chartWidth;
      const y = chartHeight - (p.savings / maxVal) * (chartHeight - 20) - 10;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPath = `M 0,${chartHeight} L ${pointsString} L ${chartWidth},${chartHeight} Z`;

  return (
    <section id="calculator" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Calculator Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Interactieve Simulatie
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Bereken jouw geschatte cashflow
              </h2>
              <p className="text-slate-400 text-sm">
                Schuif met de parameters en bekijk de verwachte geautomatiseerde opbouw door de IQ Bot.
              </p>
            </div>

            {/* Input 1: Start Bedrag */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-indigo-400" /> Eenmalige Inleg
                </label>
                <span className="font-bold text-emerald-400 font-mono text-base">
                  € {initialAmount.toLocaleString("nl-NL")}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>€500</span>
                <span>€25.000</span>
              </div>
            </div>

            {/* Input 2: Maandelijkse inleg */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="text-slate-300 font-medium flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> Maandelijkse Toevoeging
                </label>
                <span className="font-bold text-emerald-400 font-mono text-base">
                  € {monthlyAmount.toLocaleString("nl-NL")}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>€0</span>
                <span>€2.000</span>
              </div>
            </div>

            {/* Input 3: Looptijd */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-purple-400" /> Looptijd
                </label>
                <span className="font-bold text-indigo-400 font-mono text-base">
                  {years} Jaar
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>1 Jaar</span>
                <span>5 Jaar</span>
              </div>
            </div>
          </div>

          {/* Calculator Output Chart */}
          <div className="lg:col-span-7 bg-slate-800/50 p-6 sm:p-8 rounded-3xl border border-slate-700/80 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-6 border-b border-slate-700/80">
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Geschat Eindvermogen</p>
                <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
                  € {calculatedTotal.toLocaleString("nl-NL")}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-slate-400 uppercase font-semibold">Geschatte Maandelijkse Cashflow</p>
                <p className="text-xl sm:text-2xl font-bold text-indigo-300 font-mono">
                  € {monthlyEstCashflow.toLocaleString("nl-NL")} per maand
                </p>
              </div>
            </div>

            {/* Interactive SVG Chart */}
            <div className="h-56 sm:h-64 w-full relative">
              <div className="flex items-center justify-end gap-5 text-xs text-slate-400 mb-2 font-medium">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-0.5 bg-indigo-500 inline-block" /> IQ Bot Opbouw
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-0.5 bg-slate-500 border-b border-dashed inline-block" /> Reguliere Inleg
                </span>
              </div>

              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-44 overflow-visible">
                <defs>
                  <linearGradient id={chartGradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal Grid lines */}
                {[0.25, 0.5, 0.75, 1].map((ratio) => (
                  <line
                    key={ratio}
                    x1="0"
                    y1={chartHeight * (1 - ratio)}
                    x2={chartWidth}
                    y2={chartHeight * (1 - ratio)}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                  />
                ))}
                {/* Area under bot curve */}
                <path d={areaPath} fill={`url(#${chartGradientId})`} />
                {/* Savings dotted line */}
                <polyline
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  points={savingsPointsString}
                />
                {/* IQ Bot solid line */}
                <polyline
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3"
                  points={pointsString}
                />
              </svg>

              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>Start</span>
                <span>Na {years} {years === 1 ? "jaar" : "jaar"}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-4 text-center">
              Indicatieve berekening gebaseerd op historische IQ Bot algoritme prestaties.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
