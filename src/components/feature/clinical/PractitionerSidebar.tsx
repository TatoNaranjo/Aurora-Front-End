import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Eye } from "lucide-react";
import { ModelResultMiniCard } from "./ModelResultMiniCard";
import { AnalysisComparison } from "./AnalysisComparison";
import { SupervisorFeedback } from "./SupervisorFeedback";
import { useServices } from "@/context/useServices";
import type { Clasificacion, SintomaIdentificado, Modelo, Retroalimentacion } from "@/types/BackendTypes";

interface GuidedCommentProps {
  question: string;
}

const GuidedComment = ({ question }: GuidedCommentProps) => (
  <div className="p-4 rounded-xl border border-border hover:bg-muted transition-all flex gap-3">
    <Eye className="w-4 h-4 text-foreground mt-0.5" />
    <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">{question}</p>
  </div>
);

interface PractitionerSidebarProps {
  phase: 'input' | 'results';
  onExecute: () => void;
  onReprocess?: () => void;
  onViewDetails?: () => void;
  onDownloadPDF?: () => void;
  onViewModelComparison?: () => void;
  clasificacion?: Clasificacion;
  userSymptoms?: SintomaIdentificado[];
  retroalimentaciones?: Retroalimentacion[];
  isLoading?: boolean;
}

export const PractitionerSidebar = ({
  phase,
  onExecute,
  onReprocess,
  onViewDetails,
  onDownloadPDF,
  clasificacion,
  userSymptoms,
  retroalimentaciones,
  isLoading
}: PractitionerSidebarProps) => {
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

  if (phase === 'results' || isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
        <ModelResultMiniCard
          clasificacion={clasificacion}
          onReprocess={onReprocess}
          onViewDetails={onViewDetails}
          isLoading={isLoading}
        />
        {phase === 'results' && (
          <>
            <AnalysisComparison clasificacion={clasificacion} userSymptoms={userSymptoms} />
            <SupervisorFeedback retroalimentaciones={retroalimentaciones} />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      {/* Phase 1: Input Controls */}
      <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 transition-colors duration-300">
        <CardHeader className="p-0 mb-6 text-center">
          <CardTitle className="text-md font-bold text-foreground">Acciones</CardTitle>
          <p className="text-[8px] text-muted-foreground font-medium uppercase tracking-widest mt-1 italic leading-relaxed">Este caso se guardará automáticamente al momento de ejecutar el análisis de Machine Learning</p>
        </CardHeader>

        <CardContent className="p-0 space-y-8">
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-foreground text-center uppercase tracking-widest leading-loose">ANÁLISIS DE MACHINE LEARNING</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-foreground uppercase tracking-wider">SELECCIONAR MODELO</label>
                <select className="w-full p-2.5 rounded-lg border border-border text-xs font-medium text-muted-foreground bg-card focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all transition-colors duration-300">
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
                className="w-full py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-[10px] font-bold transition-all shadow-md shadow-primary/10 active:scale-95 transition-colors duration-300"
              >
                Ejecutar Análisis
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-border">
            <button
              onClick={onDownloadPDF}
              className="w-full py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-[10px] font-bold transition-all shadow-md shadow-primary/10 transition-colors duration-300"
            >
              Generar Informe PDF
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Guided Questions */}
      <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 transition-colors duration-300">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-md font-bold text-foreground text-center">Comentarios Guiados</CardTitle>
          <p className="text-[8px] text-primary font-bold text-center uppercase mt-1">Preguntas para reflexionar sobre el caso</p>
        </CardHeader>

        <CardContent className="p-0 space-y-4">
          <GuidedComment question="¿Qué síntomas observas que son más prominentes en este caso?" />
          <GuidedComment question="¿Cómo se relacionan los criterios identificados con los criterios de la CIE-11?" />
          <GuidedComment question="¿Qué factores de riesgo podrían estar contribuyendo a este cuadro?" />
          <GuidedComment question="¿Qué aspectos del caso requieren mayor exploración?" />
        </CardContent>
      </Card>

      {/* Supervisor Feedback for Practitioner */}
      {retroalimentaciones && retroalimentaciones.length > 0 && (
        <SupervisorFeedback retroalimentaciones={retroalimentaciones} />
      )}
    </div>
  );
};
