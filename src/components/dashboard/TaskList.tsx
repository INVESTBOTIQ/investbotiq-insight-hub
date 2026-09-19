
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Check, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { type Task } from "@/types/task";
import { cn } from "@/lib/utils";

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder"));
};

const defaultRecentTasks: Task[] = [
  {
    id: "task_1",
    user_id: "demo",
    taak_omschrijving: "KYC Verificatie controleren en afronden",
    status: "open",
    priority: "high",
    deadline: new Date(Date.now() + 2 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "task_2",
    user_id: "demo",
    taak_omschrijving: "BEL Contract digitaal accorderen",
    status: "open",
    priority: "normal",
    deadline: new Date(Date.now() + 5 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_at: new Date().toISOString()
  }
];

const TaskList = () => {
  const navigate = useNavigate();
  
  const { data: recentTasks = defaultRecentTasks, isLoading } = useQuery({
    queryKey: ["recentTasks"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return defaultRecentTasks;
      }
      try {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("status", "open")
          .order("created_at", { ascending: false })
          .limit(3);

        if (error || !data || data.length === 0) return defaultRecentTasks;
        return data as Task[];
      } catch {
        return defaultRecentTasks;
      }
    },
  });

  // Get status icon based on task priority or deadline
  const getStatusIcon = (task: Task) => {
    // This is a placeholder logic - adjust based on your actual task model
    const priority = task.priority || "normal";
    
    switch(priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "normal":
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <Check className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <Card className="h-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Recente Taken
          </CardTitle>
          <span className="text-xs font-medium text-slate-500">
            {recentTasks.length} taken
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="flex flex-col space-y-2 animate-pulse">
            <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
            <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
            <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
          </div>
        ) : recentTasks.length > 0 ? (
          <>
            <div className="space-y-2">
              {recentTasks.map(task => (
                <div 
                  key={task.id} 
                  className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer group shadow-2xs"
                  onClick={() => navigate(`/member/tasks/${task.id}`)}
                >
                  <div className="mt-0.5 p-1 rounded-md bg-white dark:bg-slate-900 shadow-xs">
                    {getStatusIcon(task)}
                  </div>
                  <div className="text-sm flex-1 min-w-0">
                    <p className={cn(
                      "font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate",
                      task.priority === "high" ? "text-rose-600 dark:text-rose-400 font-semibold" : ""
                    )}>
                      {task.taak_omschrijving}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{task.deadline ? new Date(task.deadline).toLocaleDateString("nl-NL") : "Geen deadline ingesteld"}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full text-xs mt-2 border-dashed border-slate-300 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition-colors" 
              onClick={() => navigate("/member/tasks")}
            >
              Bekijk alle taken
            </Button>
          </>
        ) : (
          <div className="text-center py-8 space-y-2">
            <p className="text-slate-500 text-sm">Geen openstaande taken</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/member/tasks")}
            >
              Ga naar Taken
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
