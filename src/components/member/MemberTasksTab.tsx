import React, { useState } from "react";
import { 
  ListTodo, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  ShieldCheck, 
  Upload, 
  Plus, 
  Search, 
  Filter, 
  Check, 
  ChevronRight,
  Sparkles,
  ArrowRight,
  FileSignature,
  Building2,
  Lock,
  X
} from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TaskItem {
  id: number;
  title: string;
  category: "Verificatie" | "Contracten" | "Flowluta" | "Beveiliging";
  status: "completed" | "in-progress" | "pending";
  priority: "high" | "medium" | "low";
  dueDate: string;
  description: string;
  actionLabel: string | null;
  actionType: "kyc" | "contract" | "bank" | "flowluta" | null;
}

export const MemberTasksTab: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 1,
      title: "Bankrekening verificatie & IBAN koppeling",
      category: "Verificatie",
      status: "completed",
      priority: "low",
      dueDate: "Voltooid op 18 Aug 2026",
      description: "Uw IBAN rekening is succesvol gekoppeld en gevalideerd voor automatische maandelijkse cashflow uitbetalingen.",
      actionLabel: null,
      actionType: null
    },
    {
      id: 2,
      title: "KYC Verificatie - Upload identiteitsbewijs",
      category: "Verificatie",
      status: "pending",
      priority: "high",
      dueDate: "Binnen 3 dagen vereist (22 Sep 2026)",
      description: "Upload een geldig paspoort of ID-kaart ter afronding van de wettelijke Wwft & FINRA compliance voor uw Tier 2 activatie.",
      actionLabel: "Document Uploaden",
      actionType: "kyc"
    },
    {
      id: 3,
      title: "BEL Contract digitaal accorderen",
      category: "Contracten",
      status: "in-progress",
      priority: "medium",
      dueDate: "24 Sep 2026",
      description: "Controleer de overeenkomst voor de gewaarborgde vermogensinleg en zet uw digitale handtekening.",
      actionLabel: "Contract Accorderen",
      actionType: "contract"
    },
    {
      id: 4,
      title: "Twee-factor authenticatie (2FA) inschakelen",
      category: "Beveiliging",
      status: "completed",
      priority: "high",
      dueDate: "Voltooid op 12 Aug 2026",
      description: "Extra beveiligingslaag via Google Authenticator is actief.",
      actionLabel: null,
      actionType: null
    },
    {
      id: 5,
      title: "Flowluta #07 Capaciteit toewijzen",
      category: "Flowluta",
      status: "pending",
      priority: "medium",
      dueDate: "15 Okt 2026",
      description: "Reserveer uw zevende bot slot voor de geplande kwartaaluitbreiding naar Tier 3.",
      actionLabel: "Slot Reserveren",
      actionType: "flowluta"
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModal, setActiveModal] = useState<"kyc" | "contract" | "add_task" | null>(null);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");

  const completedCount = tasks.filter(t => t.status === "completed").length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const toggleTaskStatus = (id: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === "completed" ? "pending" : "completed";
        if (nextStatus === "completed") {
          toast.success(`Taak "${t.title}" gemarkeerd als voltooid!`);
        } else {
          toast.info(`Taak "${t.title}" heropend.`);
        }
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleActionClick = (task: TaskItem) => {
    if (task.actionType === "kyc") {
      setActiveModal("kyc");
    } else if (task.actionType === "contract") {
      setActiveModal("contract");
    } else {
      toast.info(`Actie gestart voor: ${task.title}`);
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: TaskItem = {
      id: Date.now(),
      title: newTaskTitle,
      category: "Flowluta",
      status: "pending",
      priority: "medium",
      dueDate: newTaskDate || "Binnenkort",
      description: "Zelf toegevoegde actieherinnering binnen uw persoonlijke ledenportaal.",
      actionLabel: "Bekijken",
      actionType: null
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setNewTaskDate("");
    setActiveModal(null);
    toast.success("Nieuwe herinnering succesvol toegevoegd");
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = 
      filterStatus === "all" ? true :
      filterStatus === "open" ? task.status !== "completed" :
      filterStatus === "completed" ? task.status === "completed" : true;

    const matchesCategory = 
      filterCategory === "all" ? true : task.category.toLowerCase() === filterCategory.toLowerCase();

    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Progress Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Taken & Actiecentrum
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Rond de onderstaande stappen af om uw accountveiligheid, contractuele garanties en Flowluta prestaties te waarborgen.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveModal("add_task")}
              className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all shadow-lg shadow-purple-600/25 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Taak Toevoegen</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 relative z-10 space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
            <span>Totale Voortgang</span>
            <span className="text-purple-600 dark:text-purple-400 font-extrabold">{completedCount} van de {tasks.length} taken voltooid ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="sm:col-span-2 lg:col-span-2 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Zoek in taken en acties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          >
            <option value="all">Alle statussen</option>
            <option value="open">Openstaand & Urgent</option>
            <option value="completed">Voltooid</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          >
            <option value="all">Alle categorieën</option>
            <option value="verificatie">Verificatie</option>
            <option value="contracten">Contracten</option>
            <option value="flowluta">Flowluta</option>
            <option value="beveiliging">Beveiliging</option>
          </select>
        </div>
      </div>

      {/* Task List Items */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-purple-500 mx-auto opacity-50" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Geen taken gevonden</h3>
            <p className="text-xs text-slate-500">Pas uw zoekfilter aan om andere resultaten te zien.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.status === "completed";
            const isHighPriority = task.priority === "high" && !isCompleted;

            return (
              <div
                key={task.id}
                className={`p-5 rounded-2xl bg-white dark:bg-slate-900/90 border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md ${
                  isCompleted
                    ? "border-slate-200/80 dark:border-slate-800 opacity-75"
                    : isHighPriority
                    ? "border-red-200 dark:border-red-900/50 bg-red-50/10 dark:bg-red-950/10 hover:border-red-400"
                    : "border-purple-100 dark:border-purple-900/30 hover:border-purple-400 dark:hover:border-purple-500/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Toggle Checkbox Button */}
                  <button
                    type="button"
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-95 border mt-0.5 ${
                      isCompleted
                        ? "bg-emerald-500 text-white border-transparent shadow-md shadow-emerald-500/30"
                        : isHighPriority
                        ? "bg-red-50 dark:bg-red-950/30 text-red-500 border-red-300 dark:border-red-800 hover:bg-red-500 hover:text-white"
                        : "bg-purple-50 dark:bg-slate-800 text-purple-600 border-purple-200 dark:border-slate-700 hover:bg-purple-600 hover:text-white"
                    }`}
                    title={isCompleted ? "Heropen taak" : "Markeer als voltooid"}
                  >
                    <Check className={`w-4 h-4 stroke-[2.5] ${isCompleted ? "opacity-100" : "opacity-40 hover:opacity-100"}`} />
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`text-sm sm:text-base font-extrabold text-slate-900 dark:text-white ${
                        isCompleted ? "line-through text-slate-400 dark:text-slate-500" : ""
                      }`}>
                        {task.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {task.category}
                      </span>
                      {isHighPriority && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/40 animate-pulse">
                          Urgent
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                      {task.description}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-purple-500" />
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Voltooid</span>
                    </span>
                  ) : task.actionLabel ? (
                    <button
                      type="button"
                      onClick={() => handleActionClick(task)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5 ${
                        isHighPriority
                          ? "bg-red-600 hover:bg-red-700 text-white shadow-red-600/20"
                          : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20"
                      }`}
                    >
                      <span>{task.actionLabel}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* KYC Upload Dialog */}
      <Dialog open={activeModal === "kyc"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-purple-500/30">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              KYC Document Verificatie
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600 dark:text-slate-300">
              Upload een kleurenscan of duidelijke foto van uw geldig legitimatiebewijs (paspoort of ID-kaart).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-6 rounded-2xl border-2 border-dashed border-purple-300 dark:border-purple-500/40 hover:border-purple-500 bg-purple-50/50 dark:bg-purple-950/20 text-center space-y-2 cursor-pointer transition-colors">
              <Upload className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto" />
              <p className="text-xs font-bold text-slate-900 dark:text-white">Sleep uw bestand hierheen of klik om te uploaden</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Ondersteunde formaten: PDF, PNG, JPG (max. 10MB)</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Documenten worden 256-bit versleuteld verwerkt conform AVG wetgeving.</span>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setActiveModal(null)} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
              Annuleren
            </Button>
            <Button 
              onClick={() => {
                toast.success("Document succesvol ontvangen. Verificatiestatus wordt binnen 24u bijgewerkt.");
                setActiveModal(null);
                setTasks(prev => prev.map(t => t.id === 2 ? { ...t, status: "in-progress", actionLabel: "In Behandeling" } : t));
              }} 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
            >
              Document Versturen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contract Sign Dialog */}
      <Dialog open={activeModal === "contract"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-purple-500/30">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <FileSignature className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              BEL Contract Digitaal Accorderen
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600 dark:text-slate-300">
              Controleer de voorwaarden voor gewaarborgde cashflow participatie en plaats uw digitale akkoord.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 max-h-48 overflow-y-auto space-y-2 font-mono text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
              <p className="font-bold text-slate-900 dark:text-white">OVERENKOMST INVESTBOTIQ GEWAARBORGD CASHFLOW PORTAAL</p>
              <p>Partij A: Investbotiq Platform Technologies</p>
              <p>Partij B: Geaccrediteerd Lid (Tier 2)</p>
              <p>1. De Flowlutas worden autonoom ingezet via smart algorithms.</p>
              <p>2. De maandelijkse cashflow wordt periodiek op de 28e van de maand uitgekeerd.</p>
              <p>3. Garanties en waarborgen conform algemene voorwaarden 2026.</p>
            </div>

            <label className="flex items-center gap-2 p-2 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/40 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-purple-600" />
              <span className="font-medium text-purple-900 dark:text-purple-200">Ik ga akkoord met de contractvoorwaarden en automatische liquiditeit.</span>
            </label>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setActiveModal(null)} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
              Later
            </Button>
            <Button 
              onClick={() => {
                toast.success("Contract succesvol digitaal ondertekend en opgeslagen!");
                setActiveModal(null);
                setTasks(prev => prev.map(t => t.id === 3 ? { ...t, status: "completed", actionLabel: null } : t));
              }} 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
            >
              Digitaal Ondertekenen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Task Modal */}
      <Dialog open={activeModal === "add_task"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-purple-500/30">
          <form onSubmit={handleCreateTask}>
            <DialogHeader>
              <DialogTitle className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Persoonlijke Taak of Herinnering
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-600 dark:text-slate-300">
                Voeg een actiepunt toe aan uw persoonlijke portaal.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Taak Omschrijving</label>
                <Input
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="bijv. Uitbetaling controleren op bank"
                  className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Streefdatum</label>
                <Input
                  value={newTaskDate}
                  onChange={(e) => setNewTaskDate(e.target.value)}
                  placeholder="bijv. 30 September 2026"
                  className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="ghost" onClick={() => setActiveModal(null)} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                Annuleren
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold">
                Opslaan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
};
