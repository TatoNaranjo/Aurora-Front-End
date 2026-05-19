import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import type { AnalysisData } from "./PractitionerAnalysis";

interface AnalysisDisplayProps {
  label: string;
  content: string;
}

const AnalysisDisplay = ({ label, content }: AnalysisDisplayProps) => (
  <div className="space-y-3">
    <h4 className="text-[12px] font-bold text-foreground">{label}</h4>
    <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
      {content || "---"}
    </p>
  </div>
);
interface ReadOnlyAnalysisProps {
  analysisData: AnalysisData;
}

export const ReadOnlyAnalysis = ({ analysisData }: ReadOnlyAnalysisProps) => {
  const symptoms = analysisData.sintomas
    .filter(s => s.intensity > 0)
    .map(s => `${s.name} (${s.intensity * 100}%)`)
    .join(', ');
  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 mt-8 transition-colors duration-300">
      <CardHeader className="p-0 mb-8">
        <CardTitle className="text-xl font-bold text-foreground">Análisis Clínico del Estudiante</CardTitle>
        <p className="text-[10px] text-muted-foreground font-medium">Evaluación y conclusiones presentadas por el estudiante</p>
      </CardHeader>

      <CardContent className="p-0 space-y-8">
        <AnalysisDisplay
          label="Impresión Clínica General"
          content={analysisData.impresion}
        />
        <AnalysisDisplay
          label="Síntomas Identificados"
          content={symptoms}
        />
        <AnalysisDisplay
          label="Factores de Riesgo Observados"
          content={analysisData.factoresRiesgo}
        />
        <AnalysisDisplay
          label="Hipótesis Diagnóstica"
          content={analysisData.hipotesis}
        />
      </CardContent>
    </Card>
  );
};
