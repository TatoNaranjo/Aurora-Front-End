import { Stethoscope, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();
  const actions = [
    {
      label: "Diagnóstico Clínico",
      desc: "Acceder a Herramientas de Diagnóstico",
      icon: <Stethoscope className="w-5 h-6" />,
      path: "/clinical-diagnostic",
      active: true
    },
    {
      label: "Análisis Clínicos",
      desc: "Ver Análisis Automatizados de Viñetas",
      icon: <Activity className="w-5 h-6" />,
      path: "/cases",
      active: false
    },
  ];

  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-6 hover:shadow-md transition-shadow transition-colors duration-300">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-xl font-bold text-foreground">Acciones Rápidas</CardTitle>
        <p className="text-[10px] text-muted-foreground font-medium leading-tight">
          Comienza un nuevo diagnóstico o revisa casos en curso según tu rol en la plataforma.
        </p>
      </CardHeader>
      <CardContent className="p-0 mt-4 flex flex-col gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all border text-left ${action.active
              ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/10"
              : "bg-card border-border text-muted-foreground hover:bg-muted"
              }`}
          >
            <div className={`${action.active ? "text-primary-foreground" : "text-foreground"}`}>
              {action.icon}
            </div>
            <div>
              <p className={`text-sm font-bold ${action.active ? "text-primary-foreground" : "text-foreground"}`}>
                {action.label}
              </p>
              <p className={`text-[9px] font-medium leading-none ${action.active ? "text-primary-foreground" : "text-muted-foreground"}`}>
                {action.desc}
              </p>
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  );
};
