import React, { useState } from "react";
import { type TaskSortBy } from "@/types/task";
import { CheckSquare, ListChecks, Filter, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { TaskHeader } from "@/components/tasks/TaskHeader";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskProgress } from "@/components/tasks/TaskProgress";
import { useTaskManagement } from "@/hooks/useTaskManagement";

export const AdminTasksTab: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<TaskSortBy>("deadline");

  const { tasks, handleStatusChange, handleUpload } = useTaskManagement();

  const completedCount = tasks.filter(t => t.status === "completed").length;
  const pendingCount = tasks.filter(t => t.status === "pending" || t.status === "in_progress").length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <CheckSquare className="w-7 h-7 text-emerald-500" />
            Taken Beheer & Workflow
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Configureer, wijs toe en monitor platformtaken voor alle aangesloten investeerders en beheerders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            {completedCount} Voltooid
          </div>
          <div className="px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {pendingCount} Openstaand
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
        <TaskProgress tasks={tasks} />
      </div>

      {/* Tasks Table & Filters Container */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 space-y-6">
        <TaskHeader
          statusFilter={statusFilter}
          typeFilter={typeFilter}
          priorityFilter={priorityFilter}
          sortBy={sortBy}
          onStatusChange={setStatusFilter}
          onTypeChange={setTypeFilter}
          onPriorityChange={setPriorityFilter}
          onSortChange={setSortBy}
        />

        <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
          <TaskList
            tasks={tasks}
            statusFilter={statusFilter}
            typeFilter={typeFilter}
            priorityFilter={priorityFilter}
            sortBy={sortBy}
            onStatusChange={handleStatusChange}
            onUpload={handleUpload}
          />
        </div>
      </div>
    </div>
  );
};
