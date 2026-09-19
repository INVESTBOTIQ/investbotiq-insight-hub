
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Sparkles } from "lucide-react";

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder"));
};

const FlowlutasCount = () => {
  const { data: flowlutasCount } = useQuery({
    queryKey: ["activeFlowlutas"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return 6;
      }
      try {
        const { count, error } = await supabase
          .from("flowlutas")
          .select("*", { count: "exact" });
        
        if (error) return 6;
        return count || 6;
      } catch {
        return 6;
      }
    },
  });

  return (
    <Card className="relative overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full pointer-events-none" />
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Actieve Flowlutas
        </CardTitle>
        <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
          <Bot className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {flowlutasCount || 0}
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-violet-600 dark:text-violet-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Draaiende bot eenheden</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlowlutasCount;
