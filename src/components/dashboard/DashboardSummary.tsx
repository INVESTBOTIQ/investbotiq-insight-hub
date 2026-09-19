
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CashflowChart from "./CashflowChart";
import ProgressTimeline from "./ProgressTimeline";
import { Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardSummary: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card className="card-hover hover:shadow-md transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <span>Cashflow Ontwikkeling</span>
            <span className="text-primary text-xs bg-primary/10 px-2 py-1 rounded-md">Automatisch</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Cashflow groeit automatisch naarmate flowlutas worden geactiveerd.
            Elke 3 maanden activeert de IQ Bot een nieuwe flowluta.
          </p>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <ScrollArea className="w-full overflow-x-auto">
              <div className="min-w-[600px] pr-4">
                <CashflowChart />
              </div>
            </ScrollArea>
          ) : (
            <CashflowChart />
          )}
          
          <div className="mt-4 text-sm flex items-center gap-2 text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Je cashflow groeit door flowluta activaties volgens jouw Tier Plan.</span>
          </div>
        </CardContent>
      </Card>
      <Card className="card-hover hover:shadow-md transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg">Maandelijkse Voortgang</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressTimeline />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;
