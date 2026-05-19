import { Users, Calendar, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const CaseStatsSidebar = () => {
  const stats = [
    { label: "Total Pacientes", value: "24", icon: <Users className="w-5 h-5" /> },
    { label: "Consultas (mes)", value: "18", icon: <Calendar className="w-5 h-5" /> },
    { label: "Diagnósticos", value: "18", icon: <Activity className="w-5 h-5" /> },
  ];

  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 h-fit transition-colors duration-300">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-xl font-bold text-foreground">Estadísticas</CardTitle>
        <p className="text-[10px] text-muted-foreground font-medium">Resumen de actividad reciente</p>
      </CardHeader>

      <CardContent className="p-0 flex flex-col gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-foreground">
                {stat.icon}
              </div>
              <span className="text-[11px] font-bold text-foreground tracking-tight">{stat.label}</span>
            </div>
            <span className="text-sm font-bold text-foreground">{stat.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
