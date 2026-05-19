import { Brain } from "lucide-react";

interface CaseHeaderProps {
  id: string;
  lastConsultation: string;
}

export const CaseHeader = ({ id, lastConsultation }: CaseHeaderProps) => {
  return (
    <div className="flex flex-col gap-2 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-primary/20 p-2 rounded-full w-fit">
        <Brain className="w-6 h-6 text-primary" />
      </div>
      <h1 className="text-3xl font-bold text-foreground">Análisis de Caso</h1>
      <p className="text-muted-foreground text-sm font-medium">
        ID: [{id}] • Última Consulta: {lastConsultation}
      </p>
    </div>
  );
};
