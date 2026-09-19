
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  userRole: "admin" | "member" | "guest" | null;
  loading: boolean;
  loginAs: (email: string, role?: "admin" | "member") => void;
  signOut: () => Promise<void>;
};

const createMockUser = (email: string): User => {
  const safeId = "user_" + Math.abs(email.split("").reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)).toString(16);
  return {
    id: safeId,
    app_metadata: { provider: "email" },
    user_metadata: { full_name: email.split("@")[0] },
    aud: "authenticated",
    confirmation_sent_at: "",
    recovery_sent_at: "",
    email_change_sent_at: "",
    new_email: "",
    invited_at: "",
    action_link: "",
    email: email,
    phone: "",
    created_at: new Date().toISOString(),
    confirmed_at: new Date().toISOString(),
    email_confirmed_at: new Date().toISOString(),
    phone_confirmed_at: "",
    last_sign_in_at: new Date().toISOString(),
    role: "authenticated",
    updated_at: new Date().toISOString(),
    identities: [],
    factors: [],
  };
};

const createMockSession = (mockUser: User): Session => {
  return {
    access_token: "mock_access_token",
    token_type: "bearer",
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    refresh_token: "mock_refresh_token",
    user: mockUser,
  };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "member" | "guest" | null>(null);
  const [loading, setLoading] = useState(true);

  const loginAs = (email: string, role?: "admin" | "member") => {
    const cleanEmail = email.trim();
    const resolvedRole = role || (
      cleanEmail.toLowerCase().includes("admin") || cleanEmail.toLowerCase().includes("investbotiq") 
        ? "admin" 
        : "member"
    );
    const mockUser = createMockUser(cleanEmail);
    const mockSession = createMockSession(mockUser);

    try {
      localStorage.setItem("investbotiq_mock_user", JSON.stringify(mockUser));
      localStorage.setItem("investbotiq_mock_role", resolvedRole);
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }

    setUser(mockUser);
    setSession(mockSession);
    setUserRole(resolvedRole);
    setLoading(false);
  };

  const signOut = async () => {
    try {
      localStorage.removeItem("investbotiq_mock_user");
      localStorage.removeItem("investbotiq_mock_role");
    } catch (e) {
      console.warn("Could not clear localStorage:", e);
    }

    setUser(null);
    setSession(null);
    setUserRole(null);

    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Supabase signOut error:", err);
    }
  };

  const fetchUserRole = async (userId: string) => {
    try {
      const isConfigured = Boolean(
        import.meta.env?.VITE_SUPABASE_URL &&
        !import.meta.env.VITE_SUPABASE_URL.includes("placeholder")
      );
      if (!isConfigured) {
        return null;
      }
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error || !data) {
        return null;
      }
      
      return (data.role as "admin" | "member" | "guest") || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    // Check if we already have a saved session in localStorage
    try {
      const storedUserJson = localStorage.getItem("investbotiq_mock_user");
      const storedRole = localStorage.getItem("investbotiq_mock_role") as "admin" | "member" | "guest" | null;

      if (storedUserJson) {
        const parsedUser = JSON.parse(storedUserJson);
        setUser(parsedUser);
        setSession(createMockSession(parsedUser));
        setUserRole(storedRole || "member");
        setLoading(false);
        return;
      }
    } catch (e) {
      console.warn("Error reading stored user:", e);
    }

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(async () => {
            const role = await fetchUserRole(session.user.id);
            console.log("User role fetched:", role);
            setUserRole(role);
            setLoading(false);
          }, 0);
        } else {
          setUserRole(null);
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("Getting existing session:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const role = await fetchUserRole(session.user.id);
        console.log("Initial user role:", role);
        setUserRole(role);
      }
      setLoading(false);
    }).catch((err) => {
      console.warn("Error getting session:", err);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    session,
    userRole,
    loading,
    loginAs,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
