import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  UserPlus, 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  FileText,
  BadgeCheck
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Json } from "@/integrations/supabase/types";

type Lead = {
  id: string;
  role: string;
  general: {
    voornaam: string;
    achternaam: string;
    email: string;
    telefoon?: string;
    [key: string]: any;
  };
  status: string;
  created_at: string;
  answers: any;
  updated_at: string;
};

type SupabaseLead = {
  id: string;
  role: string;
  general: Json;
  status: string;
  created_at: string;
  answers: Json;
  updated_at: string;
};

export const AdminLeadsTab: React.FC = () => {
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const { data: leads = [], isLoading, error } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("registration_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      return (data as SupabaseLead[]).map(lead => ({
        ...lead,
        general: typeof lead.general === 'string' 
          ? JSON.parse(lead.general) 
          : lead.general as Lead['general']
      })) as Lead[];
    }
  });

  const filteredLeads = leads.filter(lead => {
    const matchesRole = roleFilter === "all" || lead.role === roleFilter;
    const name = `${lead.general?.voornaam || ''} ${lead.general?.achternaam || ''}`.toLowerCase();
    const email = (lead.general?.email || '').toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <UserPlus className="w-7 h-7 text-purple-500" />
            Registratie Leads & Intake
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Inkomende aanmeldingen van potentiële leden. Bekijk hun antwoorden en activeer het onboarding traject.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-bold">
          {leads.length} Totale Leads
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Zoek op naam of e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px] rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <SelectValue placeholder="Filter op profiel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Rollen</SelectItem>
              <SelectItem value="starter">Starter</SelectItem>
              <SelectItem value="builder">Builder</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="elite">Elite</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Leads List */}
      <div className="rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-500" />
            Inzendingen ({filteredLeads.length})
          </h2>
          <span className="text-xs text-slate-400">Laatste registraties</span>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            Geen leads gevonden die voldoen aan de zoekcriteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLeads.map((lead) => (
              <div 
                key={lead.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-4 hover:border-purple-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
                      {lead.role || "Standaard"}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(lead.created_at).toLocaleDateString('nl-NL')}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {lead.general?.voornaam || "Onbekend"} {lead.general?.achternaam || ""}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {lead.general?.email || "Geen email"}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedLead(lead)}
                  variant="outline"
                  className="w-full rounded-xl border-purple-300 dark:border-purple-800 text-xs font-bold hover:bg-purple-600 hover:text-white transition-colors"
                >
                  Bekijk Intake Details
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lead Details Modal */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8">
          {selectedLead && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-purple-500" />
                  Intake Lead: {selectedLead.general?.voornaam} {selectedLead.general?.achternaam}
                </DialogTitle>
                <DialogDescription className="text-slate-500 dark:text-slate-400 text-xs">
                  Geregistreerd op {new Date(selectedLead.created_at).toLocaleString('nl-NL')}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 my-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Contactgegevens</h4>
                  <p className="text-sm"><strong>E-mail:</strong> {selectedLead.general?.email}</p>
                  {selectedLead.general?.telefoon && (
                    <p className="text-sm"><strong>Telefoon:</strong> {selectedLead.general?.telefoon}</p>
                  )}
                  <p className="text-sm"><strong>Gekozen Rol/Tier:</strong> <span className="capitalize text-purple-500 font-bold">{selectedLead.role}</span></p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Intake Vragen & Antwoorden</h4>
                  {selectedLead.answers ? (
                    <pre className="text-xs bg-slate-900 text-slate-200 p-3 rounded-xl overflow-x-auto">
                      {JSON.stringify(selectedLead.answers, null, 2)}
                    </pre>
                  ) : (
                    <p className="text-xs text-slate-400">Geen specifieke extra vragen beantwoord.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
