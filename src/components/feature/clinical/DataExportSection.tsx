import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import type { ExportParams } from "@/types/BackendTypes";
import { useState } from "react";

interface DataExportSectionProps {
  handleExport: (params: Partial<ExportParams>) => Promise<void>;
  exporting: boolean;
}

export const DataExportSection = ({ handleExport, exporting }: DataExportSectionProps) => {
  const [format, setFormat] = useState<'csv' | 'json' | 'xlsx'>('csv');
  const [category, setCategory] = useState('completo');

  return (
    <div id="export-section" className="scroll-mt-12">
      <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 mt-12 transition-colors duration-300">
        <CardHeader className="p-0 mb-8">
          <CardTitle className="text-xl font-bold text-foreground">Exportación de Datasets</CardTitle>
          <p className="text-[10px] text-muted-foreground font-medium">Exportar datos anonimizados para análisis externo (requiere consentimiento)</p>
        </CardHeader>

        <CardContent className="p-0 flex flex-col md:flex-row items-end gap-10">
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">FORMATO DE EXPORTACIÓN</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as 'csv' | 'json')}
                className="w-full p-2.5 rounded-lg border border-border text-xs font-medium text-muted-foreground bg-card focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors duration-300"
              >
                <option value="csv">CSV (Análisis Estadístico)</option>
                <option value="xlsx">Excel (XLSX - Reporte)</option>
                <option value="json">JSON (Integración)</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">CATEGORÍA DE DATOS</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-border text-xs font-medium text-muted-foreground bg-card focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors duration-300"
              >
                <option value="completo">Completo (Clínico + ML)</option>
                <option value="demograficos">Solo Datos Demográficos</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => handleExport({ format })}
            disabled={exporting}
            className="px-8 py-3 bg-primary hover:bg-primary/90 disabled:bg-muted text-primary-foreground rounded-lg text-[10px] font-bold transition-colors duration-300 shadow-md shadow-primary/10 uppercase tracking-widest whitespace-nowrap"
          >
            {exporting ? "Generando..." : "Generar Exportación"}
          </button>
        </CardContent>
      </Card>

      <div className="bg-card border border-border rounded-xl p-4 mt-8 transition-colors duration-300">
        <p className="text-[10px] text-foreground leading-relaxed">
          <span className="font-bold">Uso Académico:</span> Este sistema es únicamente para fines educativos. Los resultados no constituyen diagnósticos médicos reales y no deben usarse para decisiones clínicas en pacientes reales.
        </p>
      </div>
    </div>
  );
};
