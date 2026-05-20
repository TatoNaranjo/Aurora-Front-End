import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui";
import { MedicalDisclaimer } from "./MedicalDisclaimer";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface AnalysisResultsProps {
  globalScore: number;
  maxScore: number;
  symptoms: { name: string; value: number; intensity?: string }[];
  classificationLabel?: string;
  trueLabel?: string;
}

export const AnalysisResults = ({ globalScore, maxScore, symptoms, classificationLabel, trueLabel }: AnalysisResultsProps) => {
  const isDepression = classificationLabel === 'Depresión';
  const isControl = classificationLabel === 'Control';
  const hasMismatch = trueLabel && classificationLabel && trueLabel !== classificationLabel;

  const title = isControl ? 'Bajo Riesgo de Depresión' : 'Nivel de Depresión';
  const scoreLabel = isControl ? 'Certeza del modelo' : 'Puntuación Global';
  const primaryColor = isControl ? '#22c55e' : '#ea580c';

  const chartData = [
    { name: 'Completed', value: globalScore },
    { name: 'Remaining', value: maxScore - globalScore }
  ];

  const getIntensityWidth = (intensity?: string) => {
    const normalized = intensity?.toLowerCase();
    if (normalized === "severo") return 100;
    if (normalized === "moderado") return 66;
    if (normalized === "leve") return 33;
    return 0;
  };
  console.log(symptoms);
  const COLORS = [primaryColor, '#f1f5f9'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="rounded-xl shadow-sm border-border transition-colors duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            {classificationLabel && (
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                isDepression ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
              }`}>
                {classificationLabel}
              </span>
            )}
          </div>
          <p className="text-xs text-primary font-medium">{scoreLabel}: {globalScore}/{maxScore}</p>
          {hasMismatch && trueLabel && (
            <div className="mt-2 flex items-center gap-2 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Etiqueta real: {trueLabel} — Discrepancia con el modelo</span>
            </div>
          )}
        </div>
        <CardContent className="flex justify-center items-center h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                startAngle={220}
                endAngle={-40}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-sm border-border transition-colors duration-300">
        <div className="p-6">
          <CardTitle className="text-xl font-bold mb-1">Síntomas Por Intensidad</CardTitle>
          <p className="text-xs text-primary font-medium">Distribución de síntomas según su severidad</p>
        </div>
        <CardContent className="h-[350px] pb-6">
          <div className="w-full h-full overflow-y-auto pr-2">
            <div className="space-y-8">
              {symptoms.map((sym: { name: string; value: number; intensity?: string }, i: number) => {
                const label = sym.name;
                const width = getIntensityWidth(sym.intensity);
                return (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-[9px] font-bold text-foreground uppercase">
                      <span>{label}</span>
                      <span>{sym.intensity || 'Detectado'}</span>
                    </div>
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${width}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <MedicalDisclaimer className="md:col-span-2" />
    </div>
  );
};
