import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { SupervisorFeedback } from "./SupervisorFeedback";
import { useServices } from "@/context/useServices";
import type { Modelo, Retroalimentacion } from "@/types/BackendTypes";

const CommentItem = ({ text }: { text: string }) => (
  <div className="p-4 rounded-xl border border-border hover:bg-muted transition-colors flex gap-3">
    <Eye className="w-4 h-4 text-foreground mt-0.5" />
    <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">{text}</p>
  </div>
);

interface DiagnosticSidebarProps {
  onExecute?: () => void;
  onSave?: () => void;
  onDownloadPDF?: () => void;
  onViewModelComparison?: () => void;
  retroalimentaciones?: Retroalimentacion[];
}

export const DiagnosticSidebar = ({
  onExecute,
  onSave,
  onDownloadPDF,
  onViewModelComparison,
  retroalimentaciones = []
}: DiagnosticSidebarProps) => {
  const { diagnosticosService } = useServices();
  const [modelos, setModelos] = useState<Modelo[]>([]);

  useEffect(() => {
    const fetchModelos = async () => {
      try {
        const data = await diagnosticosService.getAllModelos();
        setModelos(data);
      } catch (err) {
        console.error("Error fetching models:", err);
      }
    };
    fetchModelos();
  }, [diagnosticosService]);

  return (
    <div className="space-y-8">
      {/* Actions Card */}
      <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 transition-colors duration-300">
        <CardHeader className="p-0 mb-6 text-center">
          <CardTitle className="text-md font-bold text-foreground">Acciones</CardTitle>
          <p className="text-[8px] text-muted-foreground font-medium uppercase tracking-widest mt-1">Este caso se guardará automáticamente al momento de ejecutar el análisis de Machine Learning</p>
        </CardHeader>

        <CardContent className="p-0 space-y-8">
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-foreground text-center uppercase tracking-widest">ANÁLISIS DE MACHINE LEARNING</h4>
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-foreground uppercase tracking-wider">SELECCIONAR MODELO</label>
              <select className="w-full p-2.5 rounded-lg border border-border text-xs font-medium text-muted-foreground bg-card transition-colors duration-300">
                <option value="">Seleccionar una Opción</option>
                {modelos.map((m) => (
                  <option key={m.id_modelo} value={m.nombre_modelo}>
                    {m.nombre_modelo} {m.precision ? `(${(m.precision * 100).toFixed(0)}%)` : ''}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onExecute}
              className="w-full py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-[10px] font-bold transition-colors duration-300 mb-4"
            >
              Ejecutar Análisis
            </button>
            <button
              type="button"
              onClick={onViewModelComparison}
              className="w-full block text-[9px] text-primary font-bold text-center cursor-pointer hover:underline focus:outline-none focus:underline"
            >
              Ver Comparación de Modelos
            </button>
          </div>

          <div className="space-y-4 pt-4 border-t border-border font-poppins">
            <button
              onClick={onSave}
              className="w-full py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-[10px] font-bold transition-colors duration-300 shadow-md shadow-primary/10"
            >
              Guardar Diagnóstico
            </button>
            <button
              onClick={onDownloadPDF}
              className="w-full py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-[10px] font-bold transition-colors duration-300 shadow-md shadow-primary/10"
            >
              Generar Informe PDF
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Guided Comments Card */}
      <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 transition-colors duration-300">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-md font-bold text-foreground text-center">Comentarios Guiados</CardTitle>
        </CardHeader>

        <CardContent className="p-0 space-y-4">
          <CommentItem text="Considera evaluar factores de riesgo suicida dado el nivel de depresión detectado." />
          <CommentItem text="Verifica criterios de duración según CIE-11 antes de confirmar un diagnóstico." />
        </CardContent>
      </Card>

      {/* Feedback Section */}
      <SupervisorFeedback retroalimentaciones={retroalimentaciones} />
    </div>
  );
};
