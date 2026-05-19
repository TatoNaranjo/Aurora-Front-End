import { Check, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MedicalDisclaimer } from "./MedicalDisclaimer";
import type { Clasificacion } from "@/types/BackendTypes";

interface MlSymptom {
  symptom: string;
  matches: number;
  intensity: string;
}

interface SymptomIntensityProps {
  label: string;
  intensity: number;
  highlight?: boolean;
}

const getIntensityPercent = (intensity?: string): number => {
  if (intensity === "Severo") return 100;
  if (intensity === "Moderado") return 66;
  if (intensity === "Leve") return 33;
  return 50;
};

const formatSymptomName = (name: string): string =>
  name ? name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "Desconocido";

  const SymptomIntensity = ({ label, intensity, highlight }: SymptomIntensityProps) => (
  <div className="flex items-center justify-between gap-8 py-2">
    <div className="flex items-center gap-3 min-w-[180px]">
      {highlight ? (
        <AlertTriangle className="w-4 h-4 text-foreground" />
      ) : (
        <Check className="w-4 h-4 text-foreground" />
      )}
      <span className="text-[11px] font-bold text-foreground">{label}</span>
    </div>
    <div className="flex-grow flex items-center gap-4">
      <div className="h-1.5 w-full bg-primary/5 rounded-full overflow-hidden border border-primary/10">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: `${intensity}%` }}
        />
      </div>
      <span className="text-[9px] font-bold text-muted-foreground w-8">{intensity}%</span>
    </div>
  </div>
);

export const MLAnalysisResults = ({
  clasificacion,
  onViewDetails
}: {
  clasificacion?: Clasificacion,
  onViewDetails?: () => void
}) => {
  if (!clasificacion) return null;

  const probability = (Number(clasificacion.probabilidad_certeza) * 100).toFixed(0);

  // Backend sends ml_sintomas_identificados as an array of objects:
  // [{"symptom": "animo_depresivo", "matches": 2, "intensity": "Moderado"}, ...]
  const symptoms = (clasificacion.ml_sintomas_identificados as unknown as MlSymptom[]) || [];
  const dsm5: Record<string, unknown> = clasificacion.ml_dsm5_evaluacion as Record<string, unknown> || {};

  return (
    <Card className="rounded-2xl border-primary/50 shadow-sm bg-card overflow-hidden p-8 mt-8 border-2 transition-colors duration-300">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-xl font-bold text-foreground">Análisis de Machine Learning</CardTitle>
      </CardHeader>

      <CardContent className="p-0 space-y-8">
        {/* Main Progression */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-foreground">
            <span>Probabilidad de Certeza</span>
            <span>{probability}%</span>
          </div>
          <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden border border-primary/20">
            <div className="h-full bg-primary rounded-full" style={{ width: `${probability}%` }} />
          </div>
        </div>

        {/* Symptoms Intensity List */}
        <div className="space-y-1">
          <h4 className="text-[10px] font-bold text-foreground uppercase tracking-widest mb-3">SÍNTOMAS DETECTADOS POR INTENSIDAD</h4>
          {symptoms.length > 0 ? symptoms.map((sym, idx) => (
            <SymptomIntensity
              key={idx}
              label={formatSymptomName(sym.symptom)}
              intensity={getIntensityPercent(sym.intensity)}
            />
          )) : (
            <p className="text-[10px] text-muted-foreground italic">Ningún síntoma detectado</p>
          )}
        </div>

        {/* Comparison Box */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-6 space-y-3">
          <h5 className="text-[10px] font-bold text-foreground flex justify-between">
            Comparación con Criterios CIE-11
          </h5>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground font-bold">Criterio Sugerido:</p>
              <p className="text-[10px] text-foreground font-bold">{dsm5.meets_criteria ? 'Cumple Criterios Mayores' : 'No Cumple Criterios Mayores'}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground font-bold">Coincidencia:</p>
              <p className="text-[11px] text-foreground font-bold">{dsm5.meets_criteria ? 'Aprobado' : 'Revisar'}</p>
            </div>
          </div>
        </div>

        <MedicalDisclaimer className="mt-4" />

        <button
          onClick={onViewDetails}
          className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-lg shadow-primary/10 text-[10px] font-bold transition-all uppercase tracking-widest"
        >
          Ver Detalles de Análisis de Machine Learning
        </button>
      </CardContent>
    </Card>
  );
};
