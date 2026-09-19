import React, { useState } from "react";
import { CircleDollarSign, BarChart3, TrendingUp, History, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CashflowSearch } from "@/components/cashflow/CashflowSearch";
import { CashflowTable } from "@/components/cashflow/CashflowTable";
import { CashflowHistoryTable } from "@/components/cashflow/CashflowHistoryTable";
import { useCashflowManagement } from "@/hooks/useCashflowManagement";
import { toast } from "sonner";

const mockUsers = [
  {
    id: "1",
    email: "jan.jansen@example.com",
    name: "Jan Jansen",
    currentCashflow: 1420,
    previousCashflow: 1200,
    changePercentage: 18.33,
    lastUpdated: "15 Apr 2025"
  },
  {
    id: "2",
    email: "emma.visser@example.com",
    name: "Emma Visser",
    currentCashflow: 1780,
    previousCashflow: 1620,
    changePercentage: 9.88,
    lastUpdated: "12 Apr 2025"
  },
  {
    id: "3",
    email: "lucas.dewit@example.com",
    name: "Lucas de Wit",
    currentCashflow: 2240,
    previousCashflow: 2040,
    changePercentage: 9.80,
    lastUpdated: "18 Apr 2025"
  },
  {
    id: "4",
    email: "sophie.bakker@example.com",
    name: "Sophie Bakker",
    currentCashflow: 920,
    previousCashflow: 920,
    changePercentage: 0,
    lastUpdated: "10 Apr 2025"
  },
  {
    id: "5",
    email: "thomas.meijer@example.com",
    name: "Thomas Meijer",
    currentCashflow: 1650,
    previousCashflow: 1450,
    changePercentage: 13.79,
    lastUpdated: "20 Apr 2025"
  },
];

export const AdminCashflowsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>("1");

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { cashflowValues, isUpdating, handleCashflowChange, handleSave } = useCashflowManagement(mockUsers);

  const totalMonthlyCashflow = Object.values(cashflowValues).reduce((acc: number, val: any) => acc + (Number(val) || 0), 0);

  const handleExportReports = () => {
    toast.success("Cashflow rapportage geëxporteerd naar CSV");
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <CircleDollarSign className="w-7 h-7 text-emerald-500" />
            Cashflow Beheer & Uitkeringen
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Pas de maandelijkse cashflow aan per gebruiker. Wijzigingen worden direct gesynchroniseerd met de ledenportalen.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={handleExportReports}
            variant="outline" 
            className="rounded-2xl border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Rapportage
          </Button>
          <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            Totaal: € {totalMonthlyCashflow.toLocaleString('nl-NL')} / mnd
          </div>
        </div>
      </div>

      {/* Search & Action Bar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <CashflowSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <span className="text-xs text-slate-400">
          {filteredUsers.length} gebruikers getoond
        </span>
      </div>

      {/* Main Cashflow Table Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            Actuele Cashflow Verdeling
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Wijzig het bedrag en klik op opslaan om de portefeuille van het lid bij te werken.
          </p>
        </div>

        <div className="overflow-x-auto">
          <CashflowTable
            users={filteredUsers}
            cashflowValues={cashflowValues}
            isUpdating={isUpdating}
            onCashflowChange={handleCashflowChange}
            onSave={handleSave}
          />
        </div>

        {/* Cashflow History Section */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-4 h-4 text-purple-500" />
            Historische Uitkeringslogboek
          </h3>
          {selectedUserId && <CashflowHistoryTable userId={selectedUserId} />}
        </div>
      </div>
    </div>
  );
};
