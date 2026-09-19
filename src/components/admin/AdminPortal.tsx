import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { 
  TrendingUp, 
  Users, 
  UserPlus, 
  ListChecks, 
  CircleDollarSign, 
  Sparkles, 
  Bell, 
  Share2, 
  Settings, 
  User, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  LogOut, 
  ShieldCheck, 
  LayoutDashboard 
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { AdminDashboardTab } from "./AdminDashboardTab";
import { AdminUsersTab } from "./AdminUsersTab";
import { AdminLeadsTab } from "./AdminLeadsTab";
import { AdminTasksTab } from "./AdminTasksTab";
import { AdminCashflowsTab } from "./AdminCashflowsTab";
import { AdminFlowlutasTab } from "./AdminFlowlutasTab";
import { AdminNotificationsTab } from "./AdminNotificationsTab";
import { AdminReferralsTab } from "./AdminReferralsTab";
import { AdminSettingsTab } from "./AdminSettingsTab";
import { AdminProfileTab } from "./AdminProfileTab";
import { toast } from "sonner";

export type AdminTab = 
  | "dashboard" 
  | "users" 
  | "leads" 
  | "tasks" 
  | "cashflows" 
  | "flowlutas" 
  | "notifications" 
  | "referrals" 
  | "settings" 
  | "profile";

interface Props {
  initialTab?: AdminTab;
}

export default function AdminPortal({ initialTab = "dashboard" }: Props) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getTabFromPath = (): AdminTab => {
    const path = location.pathname;
    if (path.includes("/admin/leads")) return "leads";
    if (path.includes("/admin/users")) return "users";
    if (path.includes("/admin/tasks")) return "tasks";
    if (path.includes("/admin/cashflows")) return "cashflows";
    if (path.includes("/admin/flowlutas")) return "flowlutas";
    if (path.includes("/admin/notifications")) return "notifications";
    if (path.includes("/admin/referrals")) return "referrals";
    if (path.includes("/admin/settings")) return "settings";
    if (path.includes("/admin/profile")) return "profile";
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<AdminTab>(getTabFromPath());
  const [isDark, setIsDark] = useState<boolean>(() => {
    return document.documentElement.classList.contains("dark") || 
      localStorage.getItem("theme") === "dark";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const switchTab = (tab: AdminTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);

    const routeMap: Record<AdminTab, string> = {
      dashboard: "/admin",
      users: "/admin/users",
      leads: "/admin/leads",
      tasks: "/admin/tasks",
      cashflows: "/admin/cashflows",
      flowlutas: "/admin/flowlutas",
      notifications: "/admin/notifications",
      referrals: "/admin/referrals",
      settings: "/admin/settings",
      profile: "/admin/profile",
    };
    navigate(routeMap[tab]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Succesvol uitgelogd");
      navigate("/auth");
    } catch (err) {
      toast.error("Fout bij uitloggen");
    }
  };

  const getAdminDisplayName = () => {
    if (!user || !user.email) return "Beheerder";
    const name = user.email.split("@")[0];
    return name.charAt(0).toUpperCase() + name.slice(1).split(".")[0];
  };

  const navItems = [
    { tab: "dashboard" as AdminTab, label: "Dashboard", icon: LayoutDashboard },
    { tab: "users" as AdminTab, label: "Gebruikers", icon: Users },
    { tab: "leads" as AdminTab, label: "Leads", icon: UserPlus },
    { tab: "tasks" as AdminTab, label: "Taken", icon: ListChecks },
    { tab: "cashflows" as AdminTab, label: "Cashflows", icon: CircleDollarSign },
    { tab: "flowlutas" as AdminTab, label: "Flowlutas", icon: TrendingUp },
    { tab: "notifications" as AdminTab, label: "Notificaties", icon: Bell },
    { tab: "referrals" as AdminTab, label: "Referrals", icon: Share2 },
    { tab: "settings" as AdminTab, label: "Instellingen", icon: Settings },
    { tab: "profile" as AdminTab, label: "Profiel", icon: User },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-[#070913] dark:text-slate-100 min-h-screen flex flex-col antialiased selection:bg-purple-500 selection:text-white transition-colors duration-300">
      
      {/* Top Sticky Navigation Header (Identical structure to Member Portal) */}
      <header className="sticky top-0 z-40 w-full border-b border-purple-200/50 dark:border-purple-900/30 bg-white/90 dark:bg-[#070913]/90 backdrop-blur-xl shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-3">
          
          {/* Brand & Mobile Hamburger Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-slate-800 xl:hidden"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <BrandLogo subtitle="Admin Portal" to="/admin" />
          </div>

          {/* Desktop Navigation Tabs (Horizontal Scroll / Pills) */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  type="button"
                  onClick={() => switchTab(item.tab)}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                      : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-white/60 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Live Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Beheer Actief</span>
            </div>

            {/* Theme Toggle */}
            <button 
              type="button"
              onClick={() => setIsDark(prev => !prev)}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-slate-800 transition-colors"
              aria-label="Wissel thema"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-purple-600" />
              )}
            </button>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 border border-red-200 dark:border-red-900/40 transition-all flex items-center gap-1.5"
              title="Uitloggen"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Uitloggen</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-b border-purple-200 dark:border-purple-900/30 bg-white dark:bg-[#070913] px-4 py-4 space-y-1.5 shadow-2xl animate-fadeIn">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab;
              return (
                <button 
                  key={item.tab}
                  type="button"
                  onClick={() => switchTab(item.tab)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                      : "text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {item.label}
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40"
              >
                <LogOut className="w-4 h-4" />
                <span>Uitloggen</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Dynamic Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === "dashboard" && (
          <AdminDashboardTab onSwitchTab={switchTab} adminName={getAdminDisplayName()} />
        )}
        {activeTab === "users" && (
          <AdminUsersTab />
        )}
        {activeTab === "leads" && (
          <AdminLeadsTab />
        )}
        {activeTab === "tasks" && (
          <AdminTasksTab />
        )}
        {activeTab === "cashflows" && (
          <AdminCashflowsTab />
        )}
        {activeTab === "flowlutas" && (
          <AdminFlowlutasTab />
        )}
        {activeTab === "notifications" && (
          <AdminNotificationsTab />
        )}
        {activeTab === "referrals" && (
          <AdminReferralsTab />
        )}
        {activeTab === "settings" && (
          <AdminSettingsTab />
        )}
        {activeTab === "profile" && (
          <AdminProfileTab />
        )}
      </main>

    </div>
  );
}
