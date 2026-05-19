import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Stethoscope, TrendingUp, BookMarked, ListTodo } from "lucide-react";

import { useNavigate } from "react-router-dom";

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  status: 'Completado' | 'Validado' | 'En Revisión';
  icon: React.ReactNode;
}

export const ProfileActivityList = () => {
  const navigate = useNavigate();
  const activities: Activity[] = [
    {
      id: "1",
      title: "Caso Clínico #2024-015",
      description: "Evaluación de estudiante de 20 años con síntomas depresivos",
      time: "Hace 2 Horas",
      status: 'Completado',
      icon: <Stethoscope className="w-5 h-5" />
    },
    {
      id: "2",
      title: "Análisis PHQ-9",
      description: "Revisión de escala de tamizaje para caso #2024-012",
      time: "Hace 5 Horas",
      status: 'Validado',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: "3",
      title: "Supervisión de Caso",
      description: "Caso Registrado Por Estudiante: Karina Vélez",
      time: "Ayer",
      status: 'En Revisión',
      icon: <BookMarked className="w-5 h-5" />
    },
    {
      id: "4",
      title: "Análisis de Viñeta Clínica",
      description: "Revisión de escala de tamizaje para caso #2024-012",
      time: "Hace 5 Horas",
      status: 'Completado',
      icon: <ListTodo className="w-5 h-5" />
    },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Completado': return "border-border text-foreground bg-card";
      case 'Validado': return "border-primary/20 text-primary bg-primary/10";
      case 'En Revisión': return "border-primary/20 text-primary bg-primary/10";
      default: return "";
    }
  };

  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden mt-8 p-8 transition-colors duration-300">
      <CardHeader className="p-0 mb-8">
        <CardTitle className="text-xl font-bold text-foreground">Actividad Reciente</CardTitle>
        <p className="text-xs text-muted-foreground font-medium leading-relaxed">
          Revisa tus últimas acciones dentro de la plataforma y el estado actual de los casos clínicos que supervisas.
        </p>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-all">
            <div className="bg-muted p-3 rounded-xl text-foreground border border-border">
              {activity.icon}
            </div>
            <div className="flex-grow">
              <h4 className="text-sm font-bold text-foreground">{activity.title}</h4>
              <p className="text-[10px] text-muted-foreground font-medium">{activity.description}</p>
              <p className="text-[8px] text-muted-foreground font-bold uppercase mt-1">🕒 {activity.time}</p>
            </div>
            <div className={`px-4 py-1.5 rounded-full border text-[10px] font-bold ${getStatusStyles(activity.status)}`}>
              {activity.status}
            </div>
          </div>
        ))}

        <button
          onClick={() => navigate("/recent-activity")}
          className="w-fit mx-auto mt-6 px-12 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-lg shadow-primary/10 text-xs font-bold transition-all"
        >
          Ver Todo el Historial
        </button>
      </CardContent>
    </Card>
  );
};
