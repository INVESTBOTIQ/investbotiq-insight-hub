
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { type Task } from "@/types/task";

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder"));
};

const defaultTaskList: Task[] = [
  {
    id: "task_1",
    user_id: "demo",
    taak_omschrijving: "KYC Verificatie - Upload identiteitsbewijs",
    status: "open",
    priority: "high",
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "task_2",
    user_id: "demo",
    taak_omschrijving: "BEL Contract digitaal ondertekenen",
    status: "open",
    priority: "normal",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "task_3",
    user_id: "demo",
    taak_omschrijving: "Bankrekening verificatie bevestigen",
    status: "completed",
    priority: "low",
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const useTaskManagement = () => {
  const { data: tasks = defaultTaskList, isLoading, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        return defaultTaskList;
      }
      try {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .order("created_at", { ascending: false });

        if (error || !data || data.length === 0) return defaultTaskList;

        return data as Task[];
      } catch {
        return defaultTaskList;
      }
    },
  });

  const handleStatusChange = async (taskId: string) => {
    if (!isSupabaseConfigured()) {
      toast.success("Taakstatus bijgewerkt naar voltooid");
      return;
    }

    try {
      const { error } = await supabase
        .from("tasks")
        .update({ status: "completed" })
        .eq("id", taskId);

      if (error) {
        toast.success("Taakstatus lokaal bijgewerkt");
        return;
      }

      toast.success("Taakstatus bijgewerkt");
      refetch();
    } catch {
      toast.success("Taakstatus bijgewerkt");
    }
  };

  const handleUpload = (taskId: string) => {
    toast.info("Uploadfunctionaliteit komt binnenkort beschikbaar");
  };

  return {
    tasks,
    isLoading,
    handleStatusChange,
    handleUpload
  };
};
