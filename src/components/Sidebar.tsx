
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import {
  BarChart4,
  FileText,
  Home,
  UserCircle,
  CheckSquare,
  Users,
  Sparkles,
  Bell,
  CircleDollarSign,
  Share2,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Sidebar = () => {
  const [expanded, setExpanded] = React.useState(true);
  const { userRole, signOut } = useAuth();
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
  
  const memberLinks = [
    { to: '/member/dashboard', icon: <Home className="h-4 w-4" />, label: 'Dashboard' },
    { to: '/member/progress', icon: <BarChart4 className="h-4 w-4" />, label: 'Voortgang' },
    { to: '/member/tasks', icon: <CheckSquare className="h-4 w-4" />, label: 'Taken' },
    { to: '/member/referrals', icon: <Share2 className="h-4 w-4" />, label: 'Referrals' },
    { to: '/member/ai-running', icon: <Sparkles className="h-4 w-4" />, label: 'AI Bot' }
  ];

  const adminLinks = [
    { to: '/admin', icon: <Home className="h-4 w-4" />, label: 'Dashboard' },
    { to: '/admin/users', icon: <Users className="h-4 w-4" />, label: 'Gebruikers' },
    { to: '/admin/tasks', icon: <CheckSquare className="h-4 w-4" />, label: 'Taken' },
    { to: '/admin/cashflows', icon: <CircleDollarSign className="h-4 w-4" />, label: 'Cashflows' },
    { to: '/admin/flowlutas', icon: <Sparkles className="h-4 w-4" />, label: 'Flowlutas' },
    { to: '/admin/referrals', icon: <Share2 className="h-4 w-4" />, label: 'Referrals' },
    { to: '/admin/notifications', icon: <Bell className="h-4 w-4" />, label: 'Notificaties' },
  ];

  const links = userRole === 'admin' ? adminLinks : memberLinks;
  const profileLink = userRole === 'admin' ? '/admin/profile' : '/member/profile';

  return (
    <div className="relative hidden md:block">
      <aside
        className={cn(
          'fixed left-0 top-16 z-30 flex h-[calc(100vh-4rem)] flex-col border-r bg-background transition-all duration-300 lg:static lg:z-0',
          expanded ? 'w-64' : 'w-16'
        )}
      >
        <div className="flex h-full flex-col">
          <nav className="grid gap-1 px-2 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:text-primary',
                    isActive
                      ? 'bg-accent text-primary font-medium'
                      : 'text-muted-foreground'
                  )
                }
              >
                {link.icon}
                <span className={cn('truncate', !expanded && 'lg:hidden')}>
                  {link.label}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto px-2 py-4 space-y-1 border-t">
            <NavLink
              to={profileLink}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:text-primary',
                  isActive
                    ? 'bg-accent text-primary font-medium'
                    : 'text-muted-foreground'
                )
              }
            >
              <UserCircle className="h-4 w-4" />
              <span className={cn('truncate', !expanded && 'lg:hidden')}>
                Profiel
              </span>
            </NavLink>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span className={cn('truncate', !expanded && 'lg:hidden')}>
                Uitloggen
              </span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
