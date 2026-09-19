import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";
import { ShieldCheck, UserCheck, ArrowRight, Lock, Mail, Sparkles, Bot, CheckCircle2 } from "lucide-react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"member" | "admin">("member");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, userRole, loginAs } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user && userRole) {
      if (userRole === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/member/dashboard", { replace: true });
      }
    }
  }, [user, userRole, navigate]);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    const lower = val.toLowerCase();
    if (lower.includes("admin") || lower.includes("beheer")) {
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="relative z-10 mb-8 text-center">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 p-0.5 shadow-xl shadow-indigo-500/30">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">Investbotiq</span>
        </Link>
        <p className="text-xs text-slate-400 mt-2 font-medium">Toegang tot uw persoonlijke vermogensportaal</p>
      </div>

      <Card className="w-full max-w-md shadow-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl relative z-10 text-white rounded-3xl overflow-hidden">
        <CardHeader className="text-center space-y-2 pb-4">
          <CardTitle className="text-2xl font-extrabold tracking-tight text-white">
            Welkom terug
          </CardTitle>
          <CardDescription className="text-slate-400 text-sm">
            Selecteer uw rol en meld u direct aan
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Role selector pill */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Kies type portaal
            </label>
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-800/90 rounded-2xl border border-slate-700/60">
              <button
                type="button"
                onClick={() => setSelectedRole("member")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold rounded-xl transition-all ${
                  selectedRole === "member"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Lid Portaal
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("admin")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold rounded-xl transition-all ${
                  selectedRole === "admin"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Beheerder
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                Emailadres
              </label>
              <Input
                type="text"
                placeholder="bijvoorbeeld: gebruiker@investbotiq.com"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className="bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 rounded-xl h-11 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                Wachtwoord
              </label>
              <Input
                type="password"
                placeholder="Ieder wachtwoord is geldig in demo modus"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 rounded-xl h-11 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mt-2 h-11"
              disabled={loading}
            >
              <span>{loading ? "Bezig met inloggen..." : "Inloggen"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <p className="text-[11px] font-semibold text-slate-400 text-center uppercase tracking-wider">
              Snelle demo accounts
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail("investbotiq@gmail.com");
                  setSelectedRole("member");
                  executeLogin("investbotiq@gmail.com", "member");
                }}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors text-left flex flex-col gap-0.5"
              >
                <span className="text-indigo-400 font-bold">Lid Account</span>
                <span className="text-[10px] text-slate-400 truncate">investbotiq@gmail.com</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@investbotiq.com");
                  setSelectedRole("admin");
                  executeLogin("admin@investbotiq.com", "admin");
                }}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors text-left flex flex-col gap-0.5"
              >
                <span className="text-purple-400 font-bold">Beheer Account</span>
                <span className="text-[10px] text-slate-400 truncate">admin@investbotiq.com</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-1">
            <Link
              to="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Terug naar Homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
