import { Card } from "@/components/ui";
import { Clock, CheckCircle, ShieldAlert, Lock, Unlock } from "lucide-react";
import type { Solicitud } from "@/types/BackendTypes";

interface UserRequestCardProps {
  solicitud: Solicitud;
  onResolver: (id: number) => void;
  resolving: boolean;
}

export const UserRequestCard = ({ solicitud, onResolver, resolving }: UserRequestCardProps) => {
  const { usuario_objetivo, fecha_creacion, tipo, estado, motivo } = solicitud;

  const getStatusBadge = () => {
    switch (estado) {
      case 'PENDIENTE': return <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full text-[9px] font-bold text-amber-700 uppercase tracking-widest leading-none"><Clock className="w-3 h-3" /> Pendiente</span>;
      case 'RESUELTA': return <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-[9px] font-bold text-emerald-700 uppercase tracking-widest leading-none"><CheckCircle className="w-3 h-3" /> Resuelta</span>;
      case 'RECHAZADA': return <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-[9px] font-bold text-red-700 uppercase tracking-widest leading-none"><ShieldAlert className="w-3 h-3" /> Rechazada</span>;
    }
  };

  const fechaFormateada = new Date(fecha_creacion).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const isBloqueo = tipo === 'BLOQUEAR';
  const isPendiente = estado === 'PENDIENTE';

  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 hover:shadow-md transition-all transition-colors duration-300">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-foreground">{usuario_objetivo.nombre}</h4>
            <p className="text-[10px] font-medium text-muted-foreground">{usuario_objetivo.correo}</p>
          </div>
          {getStatusBadge()}
        </div>

        {/* Metadata */}
        <div className="space-y-3 mb-8 flex-grow">
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-muted-foreground uppercase tracking-widest">Fecha Solicitud:</span>
            <span className="font-bold text-foreground">{fechaFormateada}</span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-muted-foreground uppercase tracking-widest">Tipo:</span>
            <span className="font-bold text-foreground">{isBloqueo ? 'Bloqueo' : 'Desbloqueo'}</span>
          </div>
          <div className="space-y-1 pt-2">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Motivo:</p>
            <p className="text-[10px] font-medium text-foreground leading-relaxed italic">{motivo}</p>
          </div>
        </div>

        {/* Actions */}
        {isPendiente && (
          <div className="space-y-3">
            <button
              onClick={() => onResolver(solicitud.id)}
              disabled={resolving}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-bold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 ${isBloqueo
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-100'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100'
                }`}
            >
              {isBloqueo ? (
                <><Lock className="w-3.5 h-3.5" /> Bloquear Usuario</>
              ) : (
                <><Unlock className="w-3.5 h-3.5" /> Desbloquear Usuario</>
              )}
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};
