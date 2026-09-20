
import { Role } from "../../MultiStepForm";

// Define questions per role for display
export const roleQuestions: Record<Role, { id: string; question: string }[]> = {
  member: [
    { id: "financiele_situatie", question: "Huidige financiële situatie" },
    { id: "voornaamste_doel", question: "Voornaamste doel met INVESTBOTIQ" }
  ],
  student: [
    { id: "studie", question: "Studeert momenteel" },
    { id: "instituut", question: "Verbonden aan instituut" }
  ],
  ouder: [
    { id: "voor_wie", question: "Formulier ingevuld voor" },
    { id: "zelf_investeren", question: "Investeren namens uzelf" }
  ],
  affiliated: [
    { id: "promotie_manier", question: "Promotiewijze" },
    { id: "bereik_netwerk", question: "Bereik of netwerk" }
  ],
  freelancer: [
    { id: "expertise", question: "Expertise of vakgebied" },
    { id: "kvk", question: "KVK-inschrijving" }
  ],
  ondernemer: [
    { id: "bedrijf_naam", question: "Naam bedrijf" },
    { id: "maandelijkse_omzet", question: "Gemiddelde maandelijkse omzet" }
  ],
  artiest: [
    { id: "discipline", question: "Discipline" },
    { id: "eerder_gepubliceerd", question: "Eerder gepubliceerd of opgetreden" }
  ]
};
