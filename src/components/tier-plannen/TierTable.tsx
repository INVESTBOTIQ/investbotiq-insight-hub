import React from "react";
import { FadeIn } from "../info/FadeInAnimation";
import { CheckCircle2, Award, Clock, TrendingUp } from "lucide-react";

export default function TierTable() {
  return (
    <FadeIn delay={0.2} className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-white mb-10">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600">
            <th className="py-4 px-6">Tier Level</th>
            <th className="py-4 px-6">Tijdsbestek</th>
            <th className="py-4 px-6">Actieve Flowlutas</th>
            <th className="py-4 px-6">Maandelijkse Cashflow</th>
            <th className="py-4 px-6">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          <tr className="hover:bg-indigo-50/40 transition-colors">
            <td className="py-4.5 px-6 font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Tier 2
            </td>
            <td className="py-4.5 px-6 text-slate-600">0 – 3 maanden</td>
            <td className="py-4.5 px-6 font-semibold text-slate-800">1 unit</td>
            <td className="py-4.5 px-6 font-extrabold text-emerald-600 text-base">€40,00</td>
            <td className="py-4.5 px-6">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Actief
              </span>
            </td>
          </tr>
          <tr className="hover:bg-indigo-50/40 transition-colors">
            <td className="py-4.5 px-6 font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Tier 3
            </td>
            <td className="py-4.5 px-6 text-slate-600">3 – 6 maanden</td>
            <td className="py-4.5 px-6 font-semibold text-slate-800">2 units</td>
            <td className="py-4.5 px-6 font-extrabold text-emerald-600 text-base">€80,00</td>
            <td className="py-4.5 px-6">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Actief
              </span>
            </td>
          </tr>
          <tr className="hover:bg-indigo-50/40 transition-colors">
            <td className="py-4.5 px-6 font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Tier 4
            </td>
            <td className="py-4.5 px-6 text-slate-600">6 – 9 maanden</td>
            <td className="py-4.5 px-6 font-semibold text-slate-800">3 units</td>
            <td className="py-4.5 px-6 font-extrabold text-emerald-600 text-base">€120,00</td>
            <td className="py-4.5 px-6">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Actief
              </span>
            </td>
          </tr>
          <tr className="hover:bg-indigo-50/40 transition-colors">
            <td className="py-4.5 px-6 font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Tier 5
            </td>
            <td className="py-4.5 px-6 text-slate-600">9 – 12 maanden</td>
            <td className="py-4.5 px-6 font-semibold text-slate-800">5 units</td>
            <td className="py-4.5 px-6 font-extrabold text-emerald-600 text-base">€200,00</td>
            <td className="py-4.5 px-6">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Actief
              </span>
            </td>
          </tr>
          <tr className="hover:bg-indigo-50/40 transition-colors bg-indigo-50/20">
            <td className="py-4.5 px-6 font-bold text-indigo-950 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Tier 6
            </td>
            <td className="py-4.5 px-6 text-slate-600">12 – 15 maanden</td>
            <td className="py-4.5 px-6 font-semibold text-slate-800">5 units</td>
            <td className="py-4.5 px-6 font-extrabold text-emerald-600 text-base">€200,00</td>
            <td className="py-4.5 px-6">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-indigo-600" /> Finishing Tier Plan
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </FadeIn>
  );
}
