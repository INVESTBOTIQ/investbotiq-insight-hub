import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Share2, Users, CheckCircle, AlertCircle, CircleDollarSign, Search, RefreshCw } from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { toast } from "sonner";
import { useAdminReferrals } from "@/hooks/use-referrals";

export const AdminReferralsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "successful">("all");
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});

  const { data: referrals = [], refetch } = useAdminReferrals();

  const { data: stats = { 
    total: 0, 
    successful: 0, 
    pending: 0, 
    totalRewards: 0 
  }} = useQuery({
    queryKey: ["adminReferralStats", referrals],
    queryFn: async () => {
      const successful = referrals.filter(r => r.status === 'successful').length;
      const pending = referrals.filter(r => r.status === 'pending' && r.referred_user_id).length;
      const totalRewards = referrals.reduce((sum, r) => sum + (r.total_rewards || 0), 0);
      
      return {
        total: referrals.filter(r => r.referred_user_id).length,
        successful,
        pending,
        totalRewards
      };
    },
    enabled: referrals.length > 0
  });

  const markAsSuccessful = async (referralId: string) => {
    setIsProcessing(prev => ({ ...prev, [referralId]: true }));
    try {
      toast.success("Referral succesvol gemarkeerd en beloning toegekend");
      refetch();
    } catch (error) {
      toast.error("Er is een fout opgetreden");
    } finally {
      setIsProcessing(prev => ({ ...prev, [referralId]: false }));
    }
  };

  const filteredReferrals = referrals.filter(ref => {
    const matchesStatus = statusFilter === "all" || ref.status === statusFilter;
    const matchesSearch = 
      (ref.profiles?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ref.profiles?.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <Share2 className="w-7 h-7 text-cyan-500" />
            Referral & Ambassadeurs Programma
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Overzicht van alle referral invites, conversies en uitbetaalde commissies aan actieve investeerders.
          </p>
        </div>

        <Button
          onClick={() => refetch()}
          variant="outline"
          className="rounded-2xl border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Verversen
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs text-slate-400 font-semibold uppercase">Totale Verwijzingen</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stats.total}</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs text-slate-400 font-semibold uppercase">Succesvol Omgezet</p>
          <p className="text-2xl font-black text-emerald-500 mt-1">{stats.successful}</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs text-slate-400 font-semibold uppercase">In Behandeling</p>
          <p className="text-2xl font-black text-amber-500 mt-1">{stats.pending}</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs text-slate-400 font-semibold uppercase">Totale Beloningen</p>
          <p className="text-2xl font-black text-purple-500 mt-1">€ {stats.totalRewards.toLocaleString('nl-NL')}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Zoek op lid naam of email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
            className="rounded-xl text-xs font-bold"
          >
            Alles
          </Button>
          <Button
            size="sm"
            variant={statusFilter === "pending" ? "default" : "outline"}
            onClick={() => setStatusFilter("pending")}
            className="rounded-xl text-xs font-bold"
          >
            In Behandeling
          </Button>
          <Button
            size="sm"
            variant={statusFilter === "successful" ? "default" : "outline"}
            onClick={() => setStatusFilter("successful")}
            className="rounded-xl text-xs font-bold"
          >
            Succesvol
          </Button>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Referrer Lid</TableHead>
                <TableHead>Aangemelde Gebruiker</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Beloning</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead className="text-right">Actie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReferrals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-400 text-sm">
                    Geen referrals gevonden.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReferrals.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{r.profiles?.name || "Onbekend"}</p>
                        <p className="text-xs text-slate-400">{r.profiles?.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{r.referred_email || "Nog niet geregistreerd"}</span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={r.status === "successful" ? "default" : "outline"}
                        className={r.status === "successful" ? "bg-emerald-500" : "bg-amber-500/10 text-amber-600 border-amber-500/20"}
                      >
                        {r.status === "successful" ? "Succesvol" : "In Behandeling"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-purple-500">€ {r.total_rewards || 50},00</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-slate-400">
                        {r.created_at ? format(new Date(r.created_at), 'dd MMM yyyy') : '-'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {r.status !== "successful" && (
                        <Button
                          size="sm"
                          onClick={() => markAsSuccessful(r.id)}
                          disabled={isProcessing[r.id]}
                          className="rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
                        >
                          Goedkeuren
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
