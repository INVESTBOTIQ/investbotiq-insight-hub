import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog, Users, UserPlus, Shield, Sparkles, CircleDollarSign } from "lucide-react";
import { UserTable } from "@/components/admin/users/UserTable";
import { UserFilters } from "@/components/admin/users/UserFilters";
import { useUsers } from "@/hooks/useUsers";

export const AdminUsersTab: React.FC = () => {
  const { 
    users, 
    searchTerm, 
    setSearchTerm, 
    statusFilter, 
    setStatusFilter, 
    roleFilter, 
    setRoleFilter 
  } = useUsers();

  const totalCashflowSum = users.reduce((sum, u) => sum + (Number(u.cashflow) || 0), 0);
  const activeUsersCount = users.filter(u => u.status === "active").length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <Users className="w-7 h-7 text-purple-500" />
            Gebruikers Overzicht & Beheer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Beheer alle gebruikers in het Investbotiq ecosysteem. Bekijk hun maandelijkse cashflow, actieve spirits en leningen.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="px-4 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-bold">
            {users.length} Geregistreerde Accounts
          </div>
        </div>
      </div>

      {/* Mini Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Actieve Leden</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{activeUsersCount} / {users.length}</p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
            <CircleDollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Gekoppelde Cashflow</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">€ {totalCashflowSum.toLocaleString('nl-NL')}</p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Systeem Status</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">100% Synchroon</p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
        />
      </div>

      {/* Users Table Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCog className="w-5 h-5 text-purple-500" />
            Ledenbestand ({users.length})
          </h2>
          <span className="text-xs text-slate-400">Realtime overzicht</span>
        </div>

        <div className="overflow-x-auto">
          <UserTable users={users} />
        </div>
      </div>
    </div>
  );
};
