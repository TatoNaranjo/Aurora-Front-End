import { Card } from "@/components/ui";
import { Users, CheckCircle, LogOut, Database, Brain, Network, Download, Loader2 } from "lucide-react";
import { useValidationDashboard, useUser } from "@/hooks";
import type { Auditoria } from "@/types/BackendTypes";

const ValidationStatCard = ({ label, value, subtext, icon }: { label: string, value: string, subtext: string, icon: React.ReactNode }) => (
  <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-6 flex flex-col justify-between h-32 transition-colors duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
        <p className="text-xl font-bold text-foreground">{value}</p>
      </div>
      <div className="p-2 rounded-xl bg-muted border border-border text-foreground">
        {icon}
      </div>
    </div>
    <p className="text-[8px] font-bold text-green-500 uppercase tracking-tight">{subtext}</p>
  </Card>
);

const SystemComponentBar = ({ label, value, percentage, icon }: { label: string, value: string, percentage: number, icon: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="text-foreground">{icon}</div>
        <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">{label}</span>
      </div>
      <span className="px-3 py-1 bg-muted border border-border rounded-full text-[9px] font-bold text-foreground">{value}</span>
    </div>
    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
      <div
        className="h-full bg-primary rounded-full transition-all duration-1000"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

export const ValidationDashboard = () => {
  const { metrics, metricsLoading, health, healthLoading, exportAudits, recentActivity } = useValidationDashboard();
  const { usuario: user } = useUser();

  const canViewActivity = user?.tipo_usuario === 'ADMIN' || user?.tipo_usuario === 'MODERADOR';

  if (metricsLoading || healthLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ValidationStatCard
          label="Archivos Cargados"
          value={metrics?.archivos_cargados?.value || "0"}
          subtext={metrics?.archivos_cargados?.subtext || ""}
          icon={<Users className="w-5 h-5" />}
        />
        <ValidationStatCard
          label="Reportes Generados"
          value={metrics?.pruebas_carga?.value || "0"}
          subtext={metrics?.pruebas_carga?.subtext || ""}
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <ValidationStatCard
          label="Tiempo de Respuesta"
          value={metrics?.tiempo_respuesta?.value || "0ms"}
          subtext={metrics?.tiempo_respuesta?.subtext || ""}
          icon={<LogOut className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System State */}
        <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 transition-colors duration-300">
          <h4 className="text-md font-bold text-foreground mb-2">Estado del Sistema</h4>
          <p className="text-[10px] text-muted-foreground font-medium mb-12">Monitoreo en tiempo real de los componentes críticos</p>

          <div className="space-y-10">
            {health?.components.map((comp, idx) => {
              const icon = comp.label.includes("Datos") ? <Database className="w-4 h-4" /> :
                comp.label.includes("ML") ? <Brain className="w-4 h-4" /> :
                  <Network className="w-4 h-4" />;
              return (
                <SystemComponentBar key={idx} label={comp.label} value={comp.value} percentage={comp.percentage} icon={icon} />
              )
            })}
          </div>
        </Card>

        {/* Recent Activity */}
        {canViewActivity && (
          <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 flex flex-col justify-between transition-colors duration-300">
            <div>
              <h4 className="text-md font-bold text-foreground mb-2">Actividad Reciente</h4>
              <p className="text-[10px] text-muted-foreground font-medium mb-12">Últimas Operaciones Realizadas en el Sistema</p>

              <div className="space-y-6">
                {(recentActivity || []).slice(0, 4).map((activity: Auditoria, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <p className="text-[10px] font-medium text-foreground">
                        {activity.descripcion || activity.tipo_cambio || "Actividad registrada"}
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                      {new Date(activity.fecha_inicio).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {(!recentActivity || recentActivity.length === 0) && (
                  <p className="text-[10px] text-muted-foreground text-center">No hay actividad reciente.</p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border flex justify-end">
              <button onClick={exportAudits} className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-[10px] font-bold text-foreground hover:bg-muted transition-all transition-colors duration-300">
                <Download className="w-3.5 h-3.5" /> Exportar Auditorías
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
