import React, { useState } from "react";
import { Settings, Shield, Sliders, Bell, Database, Lock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const AdminSettingsTab: React.FC = () => {
  const [autoPayouts, setAutoPayouts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [minLoanThreshold, setMinLoanThreshold] = useState("5000");
  const [maxYieldCap, setMaxYieldCap] = useState("12.5");

  const handleSaveSettings = () => {
    toast.success("Systeeminstellingen succesvol opgeslagen");
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-purple-500" />
            Systeem & Platform Instellingen
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Configureer automatische uitbetalingsschema's, risicolimieten en AI engine parameters.
          </p>
        </div>

        <Button
          onClick={handleSaveSettings}
          className="rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/20"
        >
          <Save className="w-4 h-4" />
          Wijzigingen Opslaan
        </Button>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Algemene Automatisering */}
        <div className="rounded-3xl p-6 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Automatisering & Uitbetaling</h2>
              <p className="text-xs text-slate-400">Automatische cashflow cyclus instellen</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Maandelijkse Uitkeringen</p>
                <p className="text-xs text-slate-400">Automatisch cashflow crediteren op de 28e van de maand</p>
              </div>
              <Switch checked={autoPayouts} onCheckedChange={setAutoPayouts} />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Beheerder E-mail Meldingen</p>
                <p className="text-xs text-slate-400">Ontvang een notificatie bij elke nieuwe intake lead</p>
              </div>
              <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
            </div>
          </div>
        </div>

        {/* Section 2: Risico & Yield Limieten */}
        <div className="rounded-3xl p-6 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Risico & Algoritme Parameters</h2>
              <p className="text-xs text-slate-400">Veiligheidsmarges voor Flowlutas</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Minimale BEL-lening drempelwaarde (€)
              </label>
              <Input
                type="number"
                value={minLoanThreshold}
                onChange={(e) => setMinLoanThreshold(e.target.value)}
                className="rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Maximale maandelijkse yield cap (%)
              </label>
              <Input
                type="number"
                value={maxYieldCap}
                onChange={(e) => setMaxYieldCap(e.target.value)}
                className="rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
