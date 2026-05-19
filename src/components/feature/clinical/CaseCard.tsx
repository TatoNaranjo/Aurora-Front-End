import { Card } from "@/components/ui";
import { Clock, CheckCircle, FileText, Eye, ArrowRight } from "lucide-react";
import type { Diagnostico, Estado } from "@/types/BackendTypes";

interface CaseCardProps {
  caseData: Diagnostico;
  onView: (id: number) => void;
  onMachineView: (id: number) => void;
}

export const CaseCard = ({ caseData, onView, onMachineView }: CaseCardProps) => {
  const getStatusBadge = () => {
    const rawEstado = caseData.estado;
    let status = "";

    if (typeof rawEstado === 'string') {
      status = rawEstado.toLowerCase();
    } else if (rawEstado && typeof rawEstado === 'object' && 'nombre' in rawEstado) {
      status = (rawEstado as Estado).nombre.toLowerCase();
    } else {
      status = String(rawEstado || "").toLowerCase();
    }

    switch (status) {
      case 'completado':
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-bold text-emerald-700 uppercase tracking-widest leading-none"><CheckCircle className="w-3 h-3" /> Completado</span>;
      case 'en_revision':
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full text-[9px] font-bold text-orange-700 uppercase tracking-widest leading-none"><Clock className="w-3 h-3" /> En Revisión</span>;
      default:
        return <span className="flex items-center gap-1.5 px-3 py-1 bg-muted border border-border rounded-full text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none"><FileText className="w-3 h-3" /> {status || 'Borrador'}</span>;
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-6 hover:shadow-md transition-all group transition-colors duration-300">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{caseData.nombre || `Caso #${caseData.id_diagnostico}`}</h4>
            <p className="text-[10px] font-medium text-muted-foreground">ID Paciente: {caseData.id_paciente}</p>
          </div>
          {getStatusBadge()}
        </div>

        {/* Metadata */}
        <div className="space-y-2 mb-6 flex-grow">
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-muted-foreground uppercase tracking-widest">Fecha:</span>
            <span className="font-bold text-foreground">{formatDate(caseData.fecha)}</span>
          </div>
          <div className="space-y-1 pt-2">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Impresión Clínica:</p>
            <p className="text-[10px] font-medium text-muted-foreground leading-relaxed line-clamp-2 italic">
              {caseData.impresion_clinica || "Sin descripción proporcionada..."}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onView(caseData.id_diagnostico)}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold hover:bg-primary/90 transition-all shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" /> Ver Detalle
          </button>
          <button
            onClick={() => onMachineView(caseData.id_diagnostico)}
            className="p-2 border border-border rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};
