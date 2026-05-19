import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui";
import { MedicalDisclaimer } from "./MedicalDisclaimer";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface AnalysisResultsProps {
  globalScore: number;
  maxScore: number;
  symptoms: { name: string; value: number }[];
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
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={symptoms}
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 500 }}
                width={100}
              />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar
                dataKey="value"
                fill="#14b8a6"
                radius={[0, 4, 4, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <MedicalDisclaimer className="md:col-span-2" />
    </div>
  );
};
