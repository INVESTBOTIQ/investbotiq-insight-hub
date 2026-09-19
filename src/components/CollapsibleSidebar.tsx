import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import {
  Home,
  BarChart4,
  CheckSquare,
  Users,
  Sparkles,
  Bell,
  CircleDollarSign,
  Share2,
  UserCircle,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const CollapsibleSidebar = () => {
  const [expanded, setExpanded] = useState(() => {
    const storedState = localStorage.getItem("sidebar-expanded");
    return storedState === null ? true : storedState === "true";
  });
  const { userRole, signOut } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("U bent succesvol uitgelogd");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Er is een fout opgetreden bij het uitloggen");
    }
  };

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", String(expanded));
  }, [expanded]);
  
  if (isMobile) {
    return null;
  }
  
  const memberLinks = [
    { to: "/member/dashboard", icon: <Home className="h-4 w-4" />, label: "Dashboard" },
    { to: "/member/progress", icon: <BarChart4 className="h-4 w-4" />, label: "Voortgang" },
    { to: "/member/tasks", icon: <CheckSquare className="h-4 w-4" />, label: "Taken" },
    { to: "/member/referrals", icon: <Share2 className="h-4 w-4" />, label: "Referrals" },
    { to: "/member/ai-running", icon: <Sparkles className="h-4 w-4" />, label: "AI Bot" }
  ];

  const adminLinks = [
    { to: "/admin", icon: <Home className="h-4 w-4" />, label: "Dashboard" },
    { to: "/admin/users", icon: <Users className="h-4 w-4" />, label: "Gebruikers" },
    { to: "/admin/tasks", icon: <CheckSquare className="h-4 w-4" />, label: "Taken" },
    { to: "/admin/cashflows", icon: <CircleDollarSign className="h-4 w-4" />, label: "Cashflows" },
    { to: "/admin/flowlutas", icon: <Sparkles className="h-4 w-4" />, label: "Flowlutas" },
    { to: "/admin/referrals", icon: <Share2 className="h-4 w-4" />, label: "Referrals" },
    { to: "/admin/notifications", icon: <Bell className="h-4 w-4" />, label: "Notificaties" },
  ];

  const links = userRole === "admin" ? adminLinks : memberLinks;
  const profileLink = userRole === "admin" ? "/admin/profile" : "/member/profile";

  return (
    <div className="hidden md:block">
      <div 
        className={cn(
          "fixed z-20 left-0 top-16 h-[calc(100vh-4rem)] bg-background transition-all duration-300 border-r",
          expanded ? "w-64" : "w-16"
        )}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 py-4 px-2">
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.to}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                            !expanded && "justify-center px-2",
                            isActive
                              ? "bg-accent text-primary font-medium"
                              : "text-muted-foreground hover:text-primary"
                          )
                        }
                      >
                        {link.icon}
                        {expanded && <span className="truncate">{link.label}</span>}
                      </NavLink>
                    </TooltipTrigger>
                    {!expanded && (
                      <TooltipContent side="right" className="bg-background border">
                        {link.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t pt-3 px-2 pb-4 space-y-1">
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <NavLink
                  to={profileLink}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      !expanded && "justify-center px-2",
                      isActive
                        ? "bg-accent text-primary font-medium"
                        : "text-muted-foreground hover:text-primary"
                    )
                  }
                >
                  <UserCircle className="h-4 w-4" />
                  {expanded && <span className="truncate">Profiel</span>}
                </NavLink>
              </TooltipTrigger>
              {!expanded && (
                <TooltipContent side="right" className="bg-background border">
                  Profiel
                </TooltipContent>
              )}
            </Tooltip>

            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors",
                    !expanded && "justify-center px-2"
                  )}
                >
                  <LogOut className="h-4 w-4" />
                  {expanded && <span className="truncate font-medium">Uitloggen</span>}
                </button>
              </TooltipTrigger>
              {!expanded && (
                <TooltipContent side="right" className="bg-background border text-red-600">
                  Uitloggen
                </TooltipContent>
              )}
            </Tooltip>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded(prev => !prev)}
              className={cn(
                "w-full flex items-center justify-center transition-transform mt-2",
                !expanded && "rotate-180"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              {expanded && <span className="ml-2">Inklappen</span>}
            </Button>
          </div>
        </div>
      </div>
      
      <div className={cn("hidden md:block transition-all duration-300", expanded ? "w-64" : "w-16")} />
    </div>
  );
};

export default CollapsibleSidebar;
