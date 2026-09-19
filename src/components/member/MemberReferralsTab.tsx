import React, { useState } from "react";
import { 
  Users, 
  Copy, 
  Check, 
  Gift, 
  Share2, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  QrCode, 
  MessageSquare, 
  Mail, 
  Send,
  HelpCircle,
  Award
} from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ReferralMember {
  id: string;
  name: string;
  email: string;
  date: string;
  tier: string;
  status: "Actief" | "In Verificatie" | "Uitnodiging";
  monthlyBonus: string;
}

interface Props {
  userEmail?: string;
  userId?: string;
}

export const MemberReferralsTab: React.FC<Props> = ({ userEmail, userId }) => {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const referralCode = userId ? `IBQ_${userId.slice(0, 4).toUpperCase()}` : "IBQ_GOLD77";
  const referralLink = `https://investbotiq.nl/?ref=${referralCode}`;

  const [referralsList] = useState<ReferralMember[]>([
    { id: "1", name: "Mark van Dijk", email: "m.vandijk@example.com", date: "14 Aug 2026", tier: "Tier 2", status: "Actief", monthlyBonus: "€100,00" },
    { id: "2", name: "Sophie de Boer", email: "sophie.b@example.com", date: "02 Aug 2026", tier: "Tier 1", status: "Actief", monthlyBonus: "€100,00" },
    { id: "3", name: "Dennis Janssen", email: "d.janssen@example.com", date: "21 Jul 2026", tier: "Tier 2", status: "Actief", monthlyBonus: "€100,00" },
    { id: "4", name: "Lars Kuipers", email: "lars.k@example.com", date: "09 Sep 2026", tier: "In afwachting", status: "In Verificatie", monthlyBonus: "€0,00" },
    { id: "5", name: "Elena Bakker", email: "elena.bakker@example.com", date: "16 Sep 2026", tier: "In afwachting", status: "In Verificatie", monthlyBonus: "€0,00" },
  ]);

  const activeReferralsCount = referralsList.filter(r => r.status === "Actief").length;
  const pendingCount = referralsList.filter(r => r.status === "In Verificatie").length;
  const totalMonthlyBonus = activeReferralsCount * 100;

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(referralLink);
    } catch {
      const tempInput = document.createElement("input");
      tempInput.value = referralLink;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    }

    setCopied(true);
    toast.success("Referral link gekopieerd naar klembord!");
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = `Investeer slimmer met geautomatiseerde AI cashflow via Investbotiq. Gebruik mijn exclusieve referral link voor gegarandeerde toelating: ${referralLink}`;

  const handleShareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const handleShareEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent("Uitnodiging voor Investbotiq Cashflow Portaal")}&body=${encodeURIComponent(shareText)}`, "_blank");
  };

  const handleShareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`, "_blank");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-10 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm dark:shadow-2xl">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/5 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60 flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                Referral Partner Programma
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800/60">
                €100/mnd per actief lid
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Deel Investbotiq & Verdien Meer Cashflow
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Voor iedere relatie die via uw persoonlijke referral link lid wordt en een Flowluta activeert, ontvangt u maandelijks €100 extra levenslange cashflow bovenop uw eigen rendement.
            </p>
          </div>

          {/* Quick Copy Box */}
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 sm:p-5 space-y-3 w-full lg:w-96 shrink-0 shadow-sm dark:shadow-lg">
            <span className="text-xs font-bold text-purple-700 dark:text-purple-300 block">Uw Persoonlijke Uitnodigingslink</span>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-purple-700 dark:text-purple-300 focus:outline-none select-all"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/30 transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Gekopieerd!" : "Kopieer Link"}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 border border-slate-200 dark:border-slate-600 text-xs font-bold transition-all flex items-center justify-center"
                title="Toon QR Code"
              >
                <QrCode className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Referral Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Stat 1: Actieve Leden */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-purple-100 dark:border-purple-900/30 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actieve Referrals</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {activeReferralsCount}
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">
            Geverifieerd & Cashflow Actief
          </span>
        </div>

        {/* Stat 2: Extra Maandbonus */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-purple-100 dark:border-purple-900/30 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Maandelijkse Bonus</span>
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">
            €{totalMonthlyBonus},00
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1 block">
            Bovenop uw reguliere uitkering
          </span>
        </div>

        {/* Stat 3: In Verificatie */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-purple-100 dark:border-purple-900/30 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">In Verificatie</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {pendingCount}
          </div>
          <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1 block">
            Potentieel +€200/mnd extra
          </span>
        </div>

        {/* Stat 4: Partner Level */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-purple-100 dark:border-purple-900/30 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Partner Status</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            Zilver Partner
          </div>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1 block">
            Nog 2 tot Goud (+5% pool bonus)
          </span>
        </div>

      </div>

      {/* Social Sharing Direct Triggers */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-purple-600" />
            <span>Direct Delen via Sociale Kanalen</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Nodig relaties direct uit met een kant-en-klaar uitnodigingsbericht.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 transition-all flex items-center justify-center gap-2 text-xs font-bold"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Deel via WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleShareTelegram}
            className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/40 hover:bg-sky-100 dark:hover:bg-sky-900/40 text-sky-800 dark:text-sky-200 transition-all flex items-center justify-center gap-2 text-xs font-bold"
          >
            <Send className="w-4 h-4 text-sky-600" />
            <span>Deel via Telegram</span>
          </button>

          <button
            type="button"
            onClick={handleShareEmail}
            className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-purple-800 dark:text-purple-200 transition-all flex items-center justify-center gap-2 text-xs font-bold"
          >
            <Mail className="w-4 h-4 text-purple-600" />
            <span>Deel via E-mail</span>
          </button>
        </div>
      </div>

      {/* Referral Network Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/90 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Mijn Aangemelde Netwerk
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Real-time overzicht van vrienden en relaties die uw referral link hebben gebruikt.
            </p>
          </div>

          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-3 py-1 rounded-full self-start sm:self-auto">
            {referralsList.length} Totale Registraties
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3 font-semibold">Lid / Contact</th>
                <th className="pb-3 font-semibold">Datum</th>
                <th className="pb-3 font-semibold">Tier Status</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Maandelijkse Bonus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {referralsList.map((ref) => {
                const isActive = ref.status === "Actief";
                return (
                  <tr key={ref.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 font-bold flex items-center justify-center text-xs">
                          {ref.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900 dark:text-white">{ref.name}</p>
                          <p className="text-[10px] text-slate-400">{ref.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-400">{ref.date}</td>
                    <td className="py-3.5 text-slate-700 dark:text-slate-300">{ref.tier}</td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                      }`}>
                        {isActive ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {ref.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-extrabold text-purple-600 dark:text-purple-400 text-sm">
                      {ref.monthlyBonus}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={showQrModal} onOpenChange={setShowQrModal}>
        <DialogContent className="sm:max-w-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-purple-500/30 text-center">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-slate-900 dark:text-white">Scan Referral QR Code</DialogTitle>
            <DialogDescription className="text-xs text-slate-600 dark:text-slate-300">
              Laat uw relatie deze code scannen met hun camera om direct te openen.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 flex flex-col items-center justify-center space-y-3">
            <div className="p-4 bg-white dark:bg-white rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(referralLink)}`}
                alt="Referral QR Code"
                className="w-44 h-44 rounded-lg"
              />
            </div>
            <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300">{referralCode}</span>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};
