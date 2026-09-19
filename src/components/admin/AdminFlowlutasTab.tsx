import React, { useState } from "react";
import { TrendingUp, Sparkles, Activity, Layers, LineChart } from "lucide-react";
import { FlowlutasDataGrid } from "@/components/flowlutas/FlowlutasDataGrid";
import { FlowlutasChart } from "@/components/flowlutas/FlowlutasChart";
import { FlowlutasFilters } from "@/components/flowlutas/FlowlutasFilters";
import { FlowlutaTimeline } from "@/components/flowlutas/FlowlutaTimeline";
import { FlowlutaCashflowAnalysis } from "@/components/flowlutas/FlowlutaCashflowAnalysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdminFlowlutasTab: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTierFilter = (tier: string) => setSelectedTier(tier);
  const handleStatusFilter = (status: string) => setSelectedStatus(status);
  const handleSearch = (search: string) => setSearchQuery(search);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <TrendingUp className="w-7 h-7 text-purple-500" />
            Flowlutas & Trading Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Monitor de geautomatiseerde AI yield engines, liquiditeitsbalansen en prestaties over alle tiers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            6 Actieve Flowlutas
          </div>
          <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            99.8% Systeem Uptime
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
        <FlowlutasFilters
          onTierFilter={handleTierFilter}
          onStatusFilter={handleStatusFilter}
          onSearch={handleSearch}
        />
      </div>

      {/* Tabs Container */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
            <TabsTrigger value="overview" className="rounded-xl font-bold text-xs">Overzicht</TabsTrigger>
            <TabsTrigger value="timeline" className="rounded-xl font-bold text-xs">Tijdlijn</TabsTrigger>
            <TabsTrigger value="cashflow" className="rounded-xl font-bold text-xs">Cashflow Analyse</TabsTrigger>
            <TabsTrigger value="chart" className="rounded-xl font-bold text-xs">Prestatie Trend</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-2">
            <FlowlutasDataGrid 
              selectedTier={selectedTier}
              selectedStatus={selectedStatus}
              searchQuery={searchQuery}
            />
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4 pt-2">
            <FlowlutaTimeline />
          </TabsContent>

          <TabsContent value="cashflow" className="space-y-4 pt-2">
            <FlowlutaCashflowAnalysis />
          </TabsContent>

          <TabsContent value="chart" className="space-y-4 pt-2">
            <FlowlutasChart />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
