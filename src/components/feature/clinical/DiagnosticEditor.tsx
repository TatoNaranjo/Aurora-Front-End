import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const DiagnosticEditor = () => {
  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 mt-8 transition-colors duration-300">
      <CardHeader className="p-0 mb-8">
        <CardTitle className="text-xl font-bold text-foreground">Editor de Diagnóstico</CardTitle>
      </CardHeader>

      <CardContent className="p-0 space-y-10">
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">DIAGNÓSTICO PRINCIPAL</label>
          <select className="w-full md:w-1/2 p-3 rounded-lg border border-border text-xs font-medium text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 bg-card transition-colors duration-300">
            <option>Seleccionar una Opción</option>
            <option>Episodio Depresivo Leve</option>
            <option>Episodio Depresivo Moderado</option>
            <option>Trastorno de Ansiedad Generalizada</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">NOTAS CLÍNICAS</label>
          <textarea
            placeholder="Justificación del diagnóstico, observaciones clínicas adicionales..."
            className="w-full h-32 p-4 rounded-xl border border-border bg-muted/30 text-xs font-medium text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-300 resize-none leading-relaxed placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">RECOMENDACIONES DE TRATAMIENTO</label>
          <textarea
            placeholder="Plan de Tratamiento, Intervenciones Recomendadas..."
            className="w-full h-32 p-4 rounded-xl border border-border bg-muted/30 text-xs font-medium text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-300 resize-none leading-relaxed placeholder:text-muted-foreground"
          />
        </div>
      </CardContent>
    </Card>
  );
};
