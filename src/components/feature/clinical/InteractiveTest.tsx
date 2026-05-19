import { ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui";

export const InteractiveTest = () => {
  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 mt-10 transition-colors duration-300">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-xl font-bold text-foreground">Prueba Interactiva</CardTitle>
        <p className="text-[10px] text-muted-foreground font-medium">Prueba el modelo seleccionado con datos de ejemplo o introduce tus propios datos para ver cómo funciona.</p>
      </CardHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 items-start">
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-foreground">Configuración</h4>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">SELECCIONAR CONJUNTO DE DATOS</label>
            <div className="relative">
              <select className="w-full p-3 rounded-lg border border-border text-xs font-medium text-muted-foreground focus:outline-none bg-card appearance-none pr-10 transition-colors duration-300">
                <option>Seleccionar conjunto de datos</option>
                <option>Caso de Estudio #1 - Depresión Moderada</option>
                <option>Caso de Estudio #2 - Ansiedad Generalizada</option>
                <option>Caso de Estudio #3 - Sin Patologías</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/50 min-h-[120px] flex flex-col justify-center gap-2 transition-colors duration-300">
            <div className="flex border-b border-border pb-2">
              <span className="text-[10px] font-bold text-muted-foreground w-full">Caso de Estudio #1 - Depresión Moderada</span>
            </div>
            <div className="flex border-b border-border pb-2">
              <span className="text-[10px] font-bold text-muted-foreground w-full">Caso de Estudio #2 - Ansiedad Severa</span>
            </div>
            <div className="flex">
              <span className="text-[10px] font-bold text-muted-foreground w-full">Caso de Estudio #3 - Sin Patologías</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 h-full">
          <h4 className="text-sm font-bold text-foreground">Resultados</h4>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-12 text-center h-[240px] transition-colors duration-300">
            <p className="text-sm font-bold text-foreground mb-1">Ejecuta un análisis para ver resultados</p>
            <p className="text-[10px] text-muted-foreground font-medium max-w-[240px]">Selecciona un conjunto de datos o ajusta los parámetros para realizar un análisis y visualizar los resultados.</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
