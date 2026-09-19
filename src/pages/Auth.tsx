
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";
import { ShieldCheck, UserCheck, ArrowRight, Lock, Mail, Sparkles } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"member" | "admin">("member");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, userRole, loginAs } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user && userRole) {
      console.log("Auth page already logged in as:", userRole, "with email:", user.email);
      if (userRole === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/member/dashboard", { replace: true });
      }
    }
  }, [user, userRole, navigate]);

  // Automatically adjust role suggestion when typing admin emails
  const handleEmailChange = (val: string) => {
    setEmail(val);
    const lower = val.toLowerCase();
    if (lower.includes("admin") || lower.includes("investbotiq")) {
      setSelectedRole("admin");
    }
  };

  const executeLogin = (targetEmail: string, role: "member" | "admin") => {
    const finalEmail = targetEmail.trim() || (role === "admin" ? "admin@investbotiq.com" : "lid@investbotiq.com");
    setLoading(true);

    try {
      loginAs(finalEmail, role);
      toast.success(
        role === "admin"
          ? "Succesvol ingelogd als Beheerder"
          : "Succesvol ingelogd als Lid"
      );
      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/member/dashboard", { replace: true });
      }
    } catch (err) {
      console.error("Login fout:", err);
      toast.error("Er is een fout opgetreden bij het inloggen");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Vul een emailadres in om in te loggen");
      return;
    }
    executeLogin(email, selectedRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200 dark:border-slate-800">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Inloggen bij Invest Bot IQ
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Log direct in met ieder gewenst emailadres
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Role selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Kies rol voor dit account
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
              <button
                type="button"
                onClick={() => setSelectedRole("member")}
                className={`flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                  selectedRole === "member"
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Lid portaal
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("admin")}
                className={`flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                  selectedRole === "admin"
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Beheerder
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                Emailadres
              </label>
              <Input
                type="text"
                placeholder="bijvoorbeeld: gebruiker@investbotiq.com"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className="bg-white dark:bg-slate-900"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Wachtwoord
              </label>
              <Input
                type="password"
                placeholder="Ieder wachtwoord is geldig"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white dark:bg-slate-900"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 flex items-center justify-center gap-2"
              disabled={loading}
            >
              <span>{loading ? "Bezig met inloggen..." : "Inloggen"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Quick preset logins */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <p className="text-xs text-center text-slate-500 font-medium">
              Snelle toegang met 1 klik:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => executeLogin("lid@investbotiq.com", "member")}
                className="text-xs flex items-center justify-center gap-1.5 hover:border-indigo-400"
              >
                <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
                Demo Lid
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => executeLogin("admin@investbotiq.com", "admin")}
                className="text-xs flex items-center justify-center gap-1.5 hover:border-indigo-400"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                Demo Beheerder
              </Button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500">
            <Link to="/" className="text-indigo-600 hover:underline">
              Terug naar de homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
