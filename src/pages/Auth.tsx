import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";
import { 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  Sparkles, 
  Bot, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  KeyRound,
  Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    const finalEmail = targetEmail.trim() || (role === "admin" ? "admin@investbotiq.com" : "investbotiq@gmail.com");
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-950 via-[#0c0a1d] to-slate-950 text-white p-4 sm:p-6 relative overflow-hidden">
      
      {/* Dynamic ambient color glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-br from-purple-600/25 via-indigo-600/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-700/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle background grid accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Brand Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-8 flex justify-center"
      >
        <BrandLogo variant="dark" size="lg" to="/" />
      </motion.div>

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/40 via-purple-500/10 to-slate-800 shadow-2xl shadow-purple-950/50">
          <Card className="w-full shadow-none border-0 bg-slate-900/90 backdrop-blur-2xl text-white rounded-[23px] overflow-hidden">
            
            <CardHeader className="text-center space-y-2 pb-4 pt-7 px-6 sm:px-8">
              <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mx-auto">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Veilig Inlogsysteem</span>
              </div>
              
              <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white pt-1">
                Welkom terug
              </CardTitle>
              <CardDescription className="text-slate-300 text-xs sm:text-sm">
                Log in op jouw persoonlijke portaal
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 px-6 sm:px-8 pb-8">
              
              {/* Role selector segmented control */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Type Portaal</span>
                  <span className="text-purple-400 text-[10px] lowercase font-normal">
                    {selectedRole === "member" ? "voor leden & investeerders" : "voor beheerders"}
                  </span>
                </label>
                
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole("member");
                      if (email === "admin@investbotiq.com") setEmail("investbotiq@gmail.com");
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold rounded-xl transition-all duration-200 active:scale-95 ${
                      selectedRole === "member"
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 font-extrabold"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-purple-200" />
                    <span>Lid Portaal</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole("admin");
                      if (email === "investbotiq@gmail.com" || !email) setEmail("admin@investbotiq.com");
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold rounded-xl transition-all duration-200 active:scale-95 ${
                      selectedRole === "admin"
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 font-extrabold"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-200" />
                    <span>Beheerder</span>
                  </button>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                
                {/* Email input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-purple-400" />
                      Emailadres
                    </span>
                  </label>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="bijv: investbotiq@gmail.com"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      className="bg-slate-950/70 border-slate-700/80 text-white placeholder:text-slate-500 rounded-xl h-11 px-3.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Password input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-purple-400" />
                      Wachtwoord
                    </span>
                    <span className="text-[10px] text-purple-300/80 font-normal">
                      Demo modus actief
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Ieder wachtwoord is geldig"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-950/70 border-slate-700/80 text-white placeholder:text-slate-500 rounded-xl h-11 pl-3.5 pr-10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-300 p-1 rounded-md transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 active:from-purple-700 active:to-indigo-700 text-white font-extrabold py-3.5 rounded-xl shadow-xl shadow-purple-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-3 h-12 text-sm"
                  disabled={loading}
                >
                  <span>{loading ? "Bezig met inloggen..." : "Inloggen bij INVESTBOTIQ"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              {/* Quick Demo Fill Buttons with rich colors */}
              <div className="pt-3 border-t border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Snelle demo accounts
                  </p>
                  <span className="text-[10px] text-purple-400 font-semibold flex items-center gap-1">
                    <KeyRound className="w-3 h-3" /> Klik om in te loggen
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("investbotiq@gmail.com");
                      setSelectedRole("member");
                      executeLogin("investbotiq@gmail.com", "member");
                    }}
                    className="p-3 rounded-2xl bg-gradient-to-br from-slate-950 to-purple-950/30 hover:from-purple-900/30 hover:to-purple-800/20 border border-purple-500/30 hover:border-purple-500/60 text-xs font-semibold text-slate-200 transition-all text-left flex flex-col gap-1 group active:scale-95 shadow-md shadow-purple-950/30"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-purple-300 font-bold group-hover:text-purple-200 transition-colors">
                        Lid Account
                      </span>
                      <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <span className="text-[10px] text-slate-400 truncate group-hover:text-slate-300">
                      investbotiq@gmail.com
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEmail("admin@investbotiq.com");
                      setSelectedRole("admin");
                      executeLogin("admin@investbotiq.com", "admin");
                    }}
                    className="p-3 rounded-2xl bg-gradient-to-br from-slate-950 to-indigo-950/30 hover:from-indigo-900/30 hover:to-indigo-800/20 border border-indigo-500/30 hover:border-indigo-500/60 text-xs font-semibold text-slate-200 transition-all text-left flex flex-col gap-1 group active:scale-95 shadow-md shadow-indigo-950/30"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-indigo-300 font-bold group-hover:text-indigo-200 transition-colors">
                        Beheer Account
                      </span>
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <span className="text-[10px] text-slate-400 truncate group-hover:text-slate-300">
                      admin@investbotiq.com
                    </span>
                  </button>
                </div>
              </div>

              {/* Bottom links */}
              <div className="pt-2 flex flex-col items-center gap-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span>Nog geen account?</span>
                  <Link
                    to="/register"
                    className="text-purple-400 hover:text-purple-300 font-bold underline underline-offset-4 transition-colors"
                  >
                    Registreer hier
                  </Link>
                </div>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-white transition-colors text-[11px]"
                >
                  Terug naar Homepage
                </Link>
              </div>

            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Security Assurance Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 flex items-center justify-center gap-6 text-[11px] text-slate-400 relative z-10"
      >
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-purple-400" />
          <span>256 bit SSL Encryptie</span>
        </div>
        <span className="text-slate-700">•</span>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Beveiligde Toegang</span>
        </div>
      </motion.div>

    </div>
  );
}
