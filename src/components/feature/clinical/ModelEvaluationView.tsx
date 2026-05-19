import { Card } from "@/components/ui";
import { Loader2 } from "lucide-react";
import { useModelos } from "@/hooks";
import { useEffect, useState } from "react";
import type { Modelo } from "@/types/BackendTypes";

const MetricBar = ({ label, percentage }: { label: string, percentage: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[11px] font-bold text-foreground">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
      <div
        className="h-full bg-primary rounded-full transition-all duration-1000"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

export const ModelEvaluationView = () => {
  const { getAllModelos, loading } = useModelos();
  const [modelos, setModelos] = useState<Modelo[] | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const resp = await getAllModelos();
      if (resp) {
        const sorted = [...resp].sort((a, b) => new Date(b.fecha_entrenamiento).getTime() - new Date(a.fecha_entrenamiento).getTime());
        setModelos(sorted);
      }
    };
    fetch();
  }, [getAllModelos]);

  if (loading || !modelos) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const latestModel = modelos.length > 0 ? modelos[0] : null;
  const latestEntrenamiento = latestModel && latestModel.entrenamientos && latestModel.entrenamientos.length > 0
    ? latestModel.entrenamientos[latestModel.entrenamientos.length - 1]
    : null;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 transition-colors duration-300">
          <h4 className="text-sm font-bold text-foreground mb-8">
            Métricas del Modelo: {latestModel ? latestModel.nombre_modelo : "N/A"}
          </h4>
          <div className="space-y-6">
            <MetricBar label="Precisión (Precision)" percentage={latestModel && latestModel.precision ? Number((latestModel.precision * 100).toFixed(1)) : 0} />
            <MetricBar label="Recall" percentage={latestEntrenamiento && latestEntrenamiento.recall ? Number((latestEntrenamiento.recall * 100).toFixed(1)) : 0} />
            <MetricBar label="F1 Score" percentage={latestEntrenamiento && latestEntrenamiento.f_score ? Number((latestEntrenamiento.f_score * 100).toFixed(1)) : 0} />
            <MetricBar label="Sensibilidad" percentage={latestEntrenamiento && latestEntrenamiento.sensibilidad ? Number((latestEntrenamiento.sensibilidad * 100).toFixed(1)) : 0} />
          </div>
        </Card>

        {/* Hyperparameters - Read Only */}
        <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 transition-colors duration-300">
          <h4 className="text-sm font-bold text-foreground mb-8">Ajuste de Hiperparámetros (Experimental)</h4>
          <p className="text-[10px] text-muted-foreground font-medium mb-8">Actualmente entrenando con configuración auto-ajustada</p>

          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold text-foreground">
                <span>Auto-ajuste Learning Rate Activo</span>
              </div>
              <div className="h-1 bg-primary rounded-full w-[100%]" />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">BATCH SIZE PROMEDIO</label>
              <div className="w-full p-2.5 rounded-lg border border-border text-xs font-medium text-muted-foreground bg-muted transition-colors duration-300">
                64 (Optimizado por ML Core)
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold text-foreground">
                <span>Épocas: Automáticas via EarlyStopping</span>
              </div>
              <div className="h-1 bg-primary/70 rounded-full w-[100%]" />
            </div>

            <button className="w-full py-2.5 bg-primary/10 text-primary rounded-lg text-[10px] font-bold transition-colors duration-300 border border-primary/20 uppercase tracking-widest cursor-not-allowed hidden">
              Funcionalidad AutoML
            </button>
          </div>
        </Card>
      </div>

      <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 transition-colors duration-300">
        <h4 className="text-xl font-bold text-foreground mb-8">Historial de Experimentos y Sincronizaciones</h4>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {modelos.map((mod) => (
            mod.entrenamientos?.map(exp => (
              <div key={`${mod.id_modelo}-${exp.id_entrenamiento}`} className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border border-border hover:bg-muted transition-colors gap-4">
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-bold text-muted-foreground">ID: {exp.id_entrenamiento}</span>
                  <div className="space-y-1">
                    <p className="text-[12px] font-bold text-foreground">{mod.nombre_modelo}</p>
                    <p className="text-[9px] text-muted-foreground font-medium">{new Date(exp.fecha_entrenamiento).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-12">
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-foreground uppercase">F1: {exp.f_score ? Number(exp.f_score).toFixed(3) : "N/A"}</p>
                    <p className="text-[8px] text-muted-foreground font-medium">Precision: {exp.precision ? Number(exp.precision).toFixed(3) : "N/A"}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-border text-muted-foreground`}>
                    Completado
                  </span>
                </div>
              </div>
            ))
          ))}
          {modelos.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">No hay historial de modelos sincronizados</p>
          )}
        </div>
      </Card>
    </div>
  );
};
