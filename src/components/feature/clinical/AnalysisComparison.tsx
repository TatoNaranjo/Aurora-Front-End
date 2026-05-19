import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MedicalDisclaimer } from "./MedicalDisclaimer";
import type { Clasificacion, SintomaIdentificado } from "@/types/BackendTypes";

interface MlSymptom {
  symptom: string;
  matches: number;
  intensity: string;
}

interface AnalysisComparisonProps {
  clasificacion?: Clasificacion;
  userSymptoms?: SintomaIdentificado[];
}

export const AnalysisComparison = ({ clasificacion, userSymptoms = [] }: AnalysisComparisonProps) => {
  if (!clasificacion) return null;
  const sysProbability = (Number(clasificacion.probabilidad_certeza) * 100).toFixed(0);
  const mlSymptoms = (clasificacion.ml_sintomas_identificados as unknown as MlSymptom[]) || [];

  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 mt-8 transition-colors duration-300">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-sm font-bold text-foreground">Comparación: Tu Análisis Vs El Sistema</CardTitle>
        <p className="text-[9px] text-muted-foreground font-medium">Reflexiona sobre las diferencias y aciertos.</p>
      </CardHeader>

      <CardContent className="p-0 space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-muted/50 border border-border">
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Tu Gravedad De Caso</p>
            <p className="text-[10px] font-bold text-foreground">En Evaluación</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/50 border border-border">
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Gravedad del Sistema</p>
            {(() => {
              const label = clasificacion.nombre_etiqueta || (Number(sysProbability) > 50 ? 'Depresión' : 'Control');
              const isDepression = label === 'Depresión';
              const severityText = isDepression
                ? (Number(sysProbability) > 70 ? 'Alto Riesgo' : 'Riesgo Moderado')
                : 'Bajo Riesgo';
              const colorClass = isDepression ? 'text-orange-500' : 'text-emerald-500';
              return (
                <p className={`text-[10px] font-bold ${colorClass}`}>{severityText} ({label})</p>
              );
            })()}
          </div>
        </div>

        <div className="space-y-3">
          <h5 className="text-[9px] font-bold text-foreground uppercase tracking-widest">Tus Síntomas Identificados</h5>
          <div className="w-full p-3 rounded-xl border border-dashed border-border text-[10px] font-medium text-muted-foreground flex flex-wrap gap-2">
            {userSymptoms.length > 0 ? userSymptoms.map((s, i) => (
              <span key={i} className="px-2 py-0.5 bg-muted rounded-md text-muted-foreground">{s.name}</span>
            )) : 'Ninguno registrado'}
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="text-[9px] font-bold text-foreground uppercase tracking-widest">Síntomas Identificados Por Machine Learning</h5>
          <div className="flex flex-wrap gap-2">
            {mlSymptoms.length > 0 ? mlSymptoms.map((sym, i) => (
              <span key={i} className="px-3 py-1 bg-card border border-border rounded-full text-[9px] font-bold text-muted-foreground">
                {sym.symptom ? sym.symptom.replace(/_/g, ' ') : 'Desconocido'}
              </span>
            )) : (
              <span className="text-[9px] text-muted-foreground italic">Ninguno detectado</span>
            )}
          </div>
        </div>

        <MedicalDisclaimer />

        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex gap-3">
          <div className="w-4 h-4 rounded-full bg-card flex items-center justify-center border border-primary/20 text-[8px] font-bold text-primary mt-1 italic">i</div>
          <p className="text-[9px] font-medium text-muted-foreground leading-relaxed italic">
            <span className="font-bold">Reflexión:</span> ¿Qué similitudes y diferencias encuentras entre tu análisis y el del sistema? ¿Qué aspectos de las escalas de tamizaje fueron clave?
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
