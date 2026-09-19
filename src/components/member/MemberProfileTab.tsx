import React from "react";
import { User, ShieldCheck } from "lucide-react";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import SecurityCard from "@/components/profile/SecurityCard";
import { useAuth } from "@/components/AuthProvider";

export const MemberProfileTab: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <User className="w-7 h-7 text-purple-500" />
            Ledenprofiel & Beveiliging
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Beheer uw persoonlijke investeerdersgegevens, telefoonnummer en wachtwoord.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          Investeerder Account Actief
        </div>
      </div>

      <div className="space-y-6">
        {user && <PersonalInfoCard user={user} />}
        <SecurityCard />
      </div>
    </div>
  );
};
