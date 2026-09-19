import React from "react";
import { Bell, Send, CheckCircle2, MessageSquare, ShieldAlert } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComposeNotificationForm } from "@/components/notifications/ComposeNotificationForm";
import { NotificationsList } from "@/components/notifications/NotificationsList";

export const AdminNotificationsTab: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <Bell className="w-7 h-7 text-purple-500" />
            Notificaties & Systeemberichten
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Verzend gerichte updates naar specifieke leden of verstuur een systeembrede uitzending naar alle investeerders.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-bold flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4" />
          Communicatiecentrum
        </div>
      </div>

      {/* Tabs Container */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6">
        <Tabs defaultValue="compose" className="space-y-6">
          <TabsList className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
            <TabsTrigger value="compose" className="rounded-xl font-bold text-xs flex items-center gap-2">
              <Send className="w-4 h-4" />
              Nieuw Bericht Opstellen
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-xl font-bold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Verzonden Notificaties
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-4 pt-2">
            <div className="max-w-2xl">
              <ComposeNotificationForm />
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 pt-2">
            <NotificationsList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
