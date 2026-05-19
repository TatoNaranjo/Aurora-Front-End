import { Users, FileText, CheckCircle, Clock, BarChart3, Calendar } from "lucide-react";
import { Card } from "@/components/ui";
import { useActivityStatistics } from "@/hooks";
import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard = ({ label, value, icon }: StatCardProps) => (
  <Card className="rounded-2xl border border-border shadow-sm p-6 bg-card overflow-hidden hover:shadow-md transition-shadow transition-colors duration-300">
    <div className="flex justify-between items-center mb-2">
      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{label}</span>
      <div className="p-2 bg-primary/10 rounded-lg text-primary">
        {icon}
      </div>
    </div>
    <span className="text-2xl font-bold text-foreground">{value}</span>
  </Card>
);

export const ActivityStatistics = () => {
  const { statistics, loading } = useActivityStatistics();

  const getRelativeTime = (isoString?: string | null) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    if (diffHours > 0) return `hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffMinutes > 0) return `hace ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
    return "hace un momento";
  };

  if (loading || !statistics) {
    return (
      <div className="mt-8 animate-pulse">
        <h3 className="text-xl font-bold text-foreground mb-1">Estadísticas de Actividad</h3>
        <p className="text-sm text-muted-foreground mb-6 font-light leading-relaxed">Cargando...</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-28 rounded-2xl border border-border shadow-sm p-6 bg-muted transition-colors duration-300" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-foreground mb-1">Estadísticas de Actividad</h3>
      <p className="text-sm text-muted-foreground mb-6 font-light leading-relaxed">Resumen detallado de tu desempeño y contribución en la plataforma.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Diagnósticos Totales" value={statistics.diagnosticos_totales} icon={<FileText className="w-4 h-4" />} />
        <StatCard label="Casos Validados" value={statistics.casos_validados} icon={<CheckCircle className="w-4 h-4" />} />
        <StatCard label="Casos Pendientes" value={statistics.casos_pendientes} icon={<Clock className="w-4 h-4" />} />
        <StatCard label="Tasa de Certeza" value={`${statistics.tasa_certeza}%`} icon={<BarChart3 className="w-4 h-4" />} />
        <StatCard label="Colaboraciones" value={statistics.colaboraciones} icon={<Users className="w-4 h-4" />} />
        <StatCard label="Última Actividad" value={getRelativeTime(statistics.ultima_actividad)} icon={<Calendar className="w-4 h-4" />} />
      </div>
    </div>
  );
};
