import { Card } from "@/components/ui";
import { Filter } from "lucide-react";
import type { ResearchFilters as IResFilters, ExportParams } from "@/types/BackendTypes";

interface ResearchFiltersProps {
  filters: IResFilters | null;
  activeFilters: ExportParams;
  updateFilters: (newFilters: Partial<ExportParams>) => void;
}

export const ResearchFilters = ({ filters, activeFilters, updateFilters }: ResearchFiltersProps) => {

  if (!filters) return null;

  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 mb-8 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-8">
        <Filter className="w-5 h-5 text-foreground" />
        <h3 className="text-xl font-bold text-foreground">Filtros de Análisis</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">COHORTE</label>
          <select
            value={activeFilters.cohort || ""}
            onChange={(e) => updateFilters({ cohort: e.target.value || undefined })}
            className="w-full p-2.5 rounded-lg border border-border text-xs font-medium text-muted-foreground bg-card focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all transition-colors duration-300"
          >
            <option value="">Seleccionar una Opción</option>
            {filters.cohorts.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">GÉNERO</label>
          <select
            value={activeFilters.gender || ""}
            onChange={(e) => updateFilters({ gender: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full p-2.5 rounded-lg border border-border text-xs font-medium text-muted-foreground bg-card focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all transition-colors duration-300"
          >
            <option value="">Seleccionar una Opción</option>
            {filters.genders.map(g => (
              <option key={g.id} value={g.id}>{g.nombre}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">RANGO DE EDAD</label>
          <select
            value={activeFilters.age_range || ""}
            onChange={(e) => updateFilters({ age_range: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full p-2.5 rounded-lg border border-border text-xs font-medium text-muted-foreground bg-card focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all transition-colors duration-300"
          >
            <option value="">Seleccionar una Opción</option>
            {filters.age_ranges.map(r => (
              <option key={r.id_rango_edad} value={r.id_rango_edad}>{r.nombre_rango}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2 md:col-start-2">
          <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">MODELO ACTIVO</label>
          <select
            value={activeFilters.model || ""}
            onChange={(e) => updateFilters({ model: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full p-2.5 rounded-lg border border-border text-xs font-medium text-muted-foreground bg-card focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all transition-colors duration-300"
          >
            <option value="">Seleccionar una Opción</option>
            {filters.models.map(m => (
              <option key={m.id_modelo} value={m.id_modelo}>{m.nombre_modelo}</option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
};
