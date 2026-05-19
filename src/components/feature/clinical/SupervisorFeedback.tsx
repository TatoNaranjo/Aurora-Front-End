import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Retroalimentacion } from "@/types/BackendTypes";

interface FeedbackItemProps {
  name: string;
  role: string;
  date: string;
  pic?: string;
  initials: string;
  content: string;
}

const FeedbackItem = ({ name, role, date, pic, initials, content }: FeedbackItemProps) => (
  <div className="p-4 rounded-xl border border-border bg-card space-y-4 transition-colors duration-300">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8 rounded-full border border-border">
          <AvatarImage src={pic} />
          <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h5 className="text-[10px] font-bold text-foreground">{name}</h5>
          <p className="text-[8px] text-muted-foreground font-medium">{role}</p>
        </div>
      </div>
      <span className="text-[8px] text-muted-foreground font-bold uppercase">{date}</span>
    </div>
    <div className="bg-muted/50 rounded-lg p-3 border border-border">
      <p className="text-[9px] text-muted-foreground font-medium leading-relaxed italic">
        "{content}"
      </p>
    </div>
  </div>
);

export const SupervisorFeedback = ({ retroalimentaciones = [] }: { retroalimentaciones?: Retroalimentacion[] }) => {
  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 mt-8 transition-colors duration-300">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-sm font-bold text-foreground">Retroalimentación de supervisores</CardTitle>
        <p className="text-[8px] text-muted-foreground font-medium uppercase tracking-widest mt-1">Comentarios de Psicólogos e Investigadores para el caso</p>
      </CardHeader>

      <CardContent className="p-0 space-y-4">
        {retroalimentaciones.length > 0 ? (
          retroalimentaciones.map((item) => (
            <FeedbackItem
              key={item.id}
              name={item.supervisor_nombre}
              role={item.supervisor_rol}
              date={new Date(item.fecha).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }).toUpperCase()}
              initials={item.supervisor_nombre.split(' ').map(n => n[0]).join('')}
              content={item.comentario}
            />
          ))
        ) : (
          <div className="py-8 text-center border-2 border-dashed border-border rounded-xl">
            <p className="text-[10px] text-muted-foreground font-medium italic">No hay retroalimentaciones registradas para este caso.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
