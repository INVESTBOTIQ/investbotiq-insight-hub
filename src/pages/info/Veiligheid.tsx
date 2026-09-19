import React from "react";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import SecurityFeatures from "@/components/veiligheid/SecurityFeatures";
import NoExternalAccess from "@/components/veiligheid/NoExternalAccess";
import SecurityTimeline from "@/components/veiligheid/SecurityTimeline";
import FutureUpdates from "@/components/veiligheid/FutureUpdates";
import SecurityCTA from "@/components/veiligheid/SecurityCTA";

export default function Veiligheid() {
  return (
    <InfoPageLayout 
      title="Veiligheid & Bescherming"
      subtitle="Wij beschermen uw cashflow, data en entiteiten met geavanceerde encryptie en strikte protocollen."
      badge="Beveiligingsarchitectuur"
    >
      {/* Security Features Grid Section */}
      <section className="py-16 px-4 bg-white border-b border-slate-200/80">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Robuuste Kern
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Slimme beveiligingsprincipes
            </h2>
            <p className="text-slate-600 text-sm">
              Ieder onderdeel van het platform is ontworpen volgens defensieve beveiligingsrichtlijnen.
            </p>
          </div>
          <SecurityFeatures />
        </div>
      </section>
      
      {/* No external access section */}
      <section className="py-16 px-4 bg-slate-900 text-white border-b border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <NoExternalAccess />
        </div>
      </section>
      
      {/* Security Measures Timeline */}
      <section className="py-16 px-4 bg-slate-50 border-b border-slate-200/80">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Protocol Uitvoering
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Beveiligingsmaatregelen – Visueel overzicht
            </h2>
          </div>
          <SecurityTimeline />
        </div>
      </section>
      
      {/* Future Updates */}
      <section className="py-16 px-4 bg-white border-b border-slate-200/80">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Continu Verbeteren
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Toekomstige beveiligingsupgrades
            </h2>
          </div>
          <FutureUpdates />
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-3xl">
          <SecurityCTA />
        </div>
      </section>
    </InfoPageLayout>
  );
}
