import { Card } from "@/components/ui";
import { Loader2 } from "lucide-react";
import type { PatternsData } from "@/types/BackendTypes";

const PatternBar = ({ label, cases, percentage }: { label: string, cases: number, percentage: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-[10px] font-bold">
      <span className="text-foreground">{label}</span>
      <span className="text-muted-foreground">{cases} casos</span>
    </div>
    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden border border-border">
      <div
        className="h-full bg-primary rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
    <div className="text-right">
      <span className="text-[10px] font-bold text-foreground">{percentage}%</span>
    </div>
  </div>
);

interface SymptomPatternsViewProps {
  data: PatternsData | null;
  loading: boolean;
}

export const SymptomPatternsView = ({ data, loading }: SymptomPatternsViewProps) => {
  if (loading || !data) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-in fade-in duration-700">
      <Card className="lg:col-span-2 rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 transition-colors duration-300">
        <h4 className="text-sm font-bold text-foreground mb-8 border-b border-border pb-4">Patrones Más Frecuentes</h4>
        <div className="space-y-6">
          {data.top_patterns.map((pattern, i) => (
            <PatternBar key={i} label={pattern.label} cases={pattern.cases} percentage={pattern.percentage} />
          ))}
          {data.top_patterns.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">No hay patrones detectados suficientes</p>
          )}
        </div>
      </Card>

      <Card className="lg:col-span-3 rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 flex flex-col transition-colors duration-300">
        <h4 className="text-sm font-bold text-foreground mb-8 border-b border-border pb-4">Correlaciones Sintomáticas Sintéticas</h4>
        <div className="flex-grow flex items-center justify-center bg-muted rounded-xl border border-dashed border-border p-8">
          <div className="text-center w-full max-w-sm space-y-6">
            <p className="text-[12px] font-bold text-foreground uppercase tracking-widest">Matriz de correlación Lineal Aproximada</p>
            <div className="space-y-3">
              {Object.entries(data.correlation_matrix).map(([pair, val]) => (
                <div key={pair} className="flex justify-between items-center text-[10px] font-medium p-2 bg-card rounded-md border border-border">
                  <span className="text-muted-foreground font-bold">{pair}</span>
                  <span className="text-primary font-bold">{val.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
