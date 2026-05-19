import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "@/components/ui";
import { CheckCircle2, XCircle } from "lucide-react";

interface Criterion {
  id: string;
  title: string;
  description: string;
  met: boolean;
}

interface DiagnosticCriteriaViewProps {
  dsm5: Criterion[];
}

export const DiagnosticCriteriaView = ({ dsm5 }: DiagnosticCriteriaViewProps) => {
  const [subTab, setSubTab] = useState<'dsm5'>('dsm5');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex bg-muted p-1 rounded-lg mb-6 w-full md:w-fit ml-auto mr-auto md:ml-0">
        <button
          onClick={() => setSubTab('dsm5')}
          className={cn(
            "py-1.5 px-8 rounded-md font-bold text-xs transition-all",
            subTab === 'dsm5' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >
          DSM-5
        </button>
      </div>

      <Card className="rounded-xl shadow-sm border-border transition-colors duration-300">
        <div className="p-6 border-b border-border">
          <CardTitle className="text-xl font-bold mb-1">
            Criterios DSM-5 Para Trastorno Depresivo Mayor
          </CardTitle>
          <p className="text-xs text-primary font-medium">
            Se requieren al menos 5 síntomas durante un período de 2 semanas, incluyendo al menos uno de los dos primeros
          </p>
        </div>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {dsm5.map((criterion) => (
              <div key={criterion.id} className="p-5 flex items-start gap-4 hover:bg-muted/50 transition-colors">
                <div className="mt-0.5">
                  {criterion.met ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-primary mb-1">{criterion.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">{criterion.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
