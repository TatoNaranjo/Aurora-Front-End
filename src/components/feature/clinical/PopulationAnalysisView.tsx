import { Card, CardHeader, CardTitle } from "@/components/ui";
import { Loader2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import type { PopulationData } from "@/types/BackendTypes";

const COLORS = ['#818cf8', '#34d399', '#fbbf24', '#f87171', '#a78bfa'];

interface PopulationAnalysisViewProps {
  data: PopulationData | null;
  loading: boolean;
}

export const PopulationAnalysisView = ({ data, loading }: PopulationAnalysisViewProps) => {
  if (loading || !data) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 flex flex-col h-[400px] transition-colors duration-300">
          <h4 className="text-sm font-bold text-foreground mb-6">Tendencias Por Grupo Etario</h4>
          <div className="flex-grow flex items-center justify-center bg-muted rounded-xl border border-dashed border-border p-4">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.age_distribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                <XAxis dataKey="rango" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f4f4f5' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#818cf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 flex flex-col h-[400px] transition-colors duration-300">
          <h4 className="text-sm font-bold text-foreground mb-6">Distribución Por Sexo</h4>
          <div className="flex-grow flex flex-col items-center justify-center bg-muted rounded-xl border border-dashed border-border p-4 relative">
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.sex_distribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="sexo"
                  >
                    {data.sex_distribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-[10px] font-bold">
              {data.sex_distribution.map((entry, index) => (
                <div key={entry.sexo} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-muted-foreground uppercase">{entry.sexo} ({entry.count})</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 transition-colors duration-300">
        <CardHeader className="p-0 mb-8">
          <CardTitle className="text-2xl font-bold text-foreground">Casos Anonimizados - Vista de Investigación</CardTitle>
          <p className="text-[10px] text-muted-foreground font-medium">Muestra de {data.anonymized_cases.length} casos recientes omitiendo información identificable (HIPAA compl.)</p>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-4 text-[10px] font-bold text-foreground uppercase tracking-widest">ID Anónimo</th>
                <th className="pb-4 text-[10px] font-bold text-foreground uppercase tracking-widest">Grupo Etario</th>
                <th className="pb-4 text-[10px] font-bold text-foreground uppercase tracking-widest">Sexo</th>
                <th className="pb-4 text-[10px] font-bold text-foreground uppercase tracking-widest">Certeza IA</th>
                <th className="pb-4 text-[10px] font-bold text-foreground uppercase tracking-widest">Clasificación IA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.anonymized_cases.map((row, i) => (
                <tr key={i} className="hover:bg-muted/50 transition-colors">
                  <td className="py-4 text-[10px] font-bold text-foreground">{row.id}</td>
                  <td className="py-4 text-[10px] font-medium text-muted-foreground">{row.age}</td>
                  <td className="py-4 text-[10px] font-medium text-muted-foreground">{row.sex}</td>
                  <td className="py-4 text-[10px] font-bold text-primary">{row.score}</td>
                  <td className="py-4 text-[10px] font-bold text-foreground">
                    <span className="px-2 py-1 bg-muted rounded-md border border-border">{row.class}</span>
                  </td>
                </tr>
              ))}
              {data.anonymized_cases.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs text-muted-foreground">No hay casos registrados aún</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
