import { Card } from "@/components/ui";
import { Loader2 } from "lucide-react";
import type { CohortData } from "@/types/BackendTypes";

const CohortCard = ({ period, cases, diff }: { period: string, cases: string, diff: string }) => (
  <Card className="rounded-xl border border-border p-6 flex flex-col items-center justify-center space-y-4 hover:shadow-md transition-colors duration-300">
    <div className="space-y-1 text-center">
      <h5 className="text-lg font-bold text-foreground">{period}</h5>
      <p className="text-2xl font-bold text-foreground">{cases}</p>
    </div>
    <div className="space-y-0.5 text-center">
      <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">N-Riesgo IP.2%</p>
      <p className="text-[8px] font-bold text-green-500 uppercase tracking-widest">vs Anterior {diff}</p>
    </div>
  </Card>
);

interface CohortComparisonViewProps {
  data: CohortData[];
  loading: boolean;
}

export const CohortComparisonView = ({ data, loading }: CohortComparisonViewProps) => {
  if (loading || !data) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 transition-colors duration-300">
        <h4 className="text-xl font-bold text-foreground mb-2">Análisis Longitudinal por Cohortes</h4>
        <p className="text-[10px] text-muted-foreground font-medium mb-12">Comparación mensual entre diferentes períodos generacionales</p>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6">
          {data.map((cohort, i) => (
            <CohortCard key={i} period={cohort.period} cases={cohort.cases.toString()} diff={cohort.diff} />
          ))}
          {data.length === 0 && (
            <div className="col-span-full py-8 text-center text-xs text-muted-foreground">
              Aún no hay suficientes cortes transversales de casos
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
