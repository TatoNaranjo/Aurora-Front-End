import { Card } from "@/components/ui";

export const ActivityFilters = () => {
  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 mt-8 transition-colors duration-300">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-1">Filtros</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">BUSCAR</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Busca Por Título, Descripción..."
              className="w-full p-3 rounded-lg border border-border text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary bg-background transition-colors duration-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">TIPO DE ACTIVIDAD</label>
            <select className="w-full p-3 rounded-lg border border-border text-xs font-medium text-muted-foreground focus:outline-none bg-background transition-colors duration-300">
              <option>Todos los Tipos</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">ESTADO</label>
            <select className="w-full p-3 rounded-lg border border-border text-xs font-medium text-muted-foreground focus:outline-none bg-background transition-colors duration-300">
              <option>Todos los Estados</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">DESDE</label>
            <select className="w-full p-3 rounded-lg border border-border text-xs font-medium text-muted-foreground focus:outline-none bg-background transition-colors duration-300">
              <option>Seleccionar Fecha</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">HASTA</label>
            <select className="w-full p-3 rounded-lg border border-border text-xs font-medium text-muted-foreground focus:outline-none bg-background transition-colors duration-300">
              <option>Seleccionar Fecha</option>
            </select>
          </div>
        </div>
      </div>
    </Card>
  );
};
