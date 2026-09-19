
import React from "react";
import Header from "@/components/Header";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import CashflowSummary from "@/components/dashboard/CashflowSummary";
import TotalValueCard from "@/components/dashboard/TotalValueCard";
import FlowlutasCount from "@/components/dashboard/FlowlutasCount";
import OpenTasks from "@/components/dashboard/OpenTasks";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import TaskList from "@/components/dashboard/TaskList";
import ReferralBox from "@/components/dashboard/ReferralBox";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/components/AuthProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";

// Let only 'member' users access this page
const MemberDashboard = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();

  // Extract first name from email for personalized greeting
  const getFirstName = () => {
    if (!user || !user.email) return "";
    const emailParts = user.email.split('@');
    const namePart = emailParts[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1).split('.')[0];
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50 dark:bg-slate-950">
      <Header />
      <div className="flex flex-1">
        <CollapsibleSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                    Member Dashboard
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    Live
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {getFirstName() ? `Welkom terug, ${getFirstName()}! Hier is het overzicht van uw cashflow en actieve flowlutas.` : "Welkom bij uw Invest Bot IQ dashboard."}
                </p>
              </div>
            </div>
            
            {/* Four statistic cards */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <CashflowSummary />
              <TotalValueCard />
              <FlowlutasCount />
              <OpenTasks />
            </div>
            
            {/* Cashflow chart + task list */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {isMobile ? (
                  <ScrollArea className="w-full">
                    <div className="min-w-[600px]">
                      <DashboardSummary />
                    </div>
                  </ScrollArea>
                ) : (
                  <DashboardSummary />
                )}
              </div>
              <div>
                <TaskList />
              </div>
            </div>
            
            {/* Referral section */}
            <ReferralBox />

            {/* Mobile help hint */}
            {isMobile && (
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl text-center text-sm text-slate-500 border border-slate-200 dark:border-slate-800 shadow-xs">
                <p className="mb-1 font-medium">Swipe over de grafiek voor maandelijks detail</p>
                <p className="text-xs">Gebruik het menu linksboven voor overige pagina's</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

// Export with member-only access
export default withRoleGuard(MemberDashboard, ["member"]);
