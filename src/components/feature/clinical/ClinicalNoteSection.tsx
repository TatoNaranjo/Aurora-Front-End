import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface ClinicalNoteSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const ClinicalNoteSection = ({ value, onChange }: ClinicalNoteSectionProps) => {
  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 mt-8 transition-colors duration-300">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold text-foreground">Viñeta Clínica</CardTitle>
        <p className="text-xs text-muted-foreground font-medium leading-relaxed">
          Redacte la viñeta clínica incluyendo los principales síntomas, duración, antecedentes relevantes y cualquier detalle que considere importante para el análisis del caso.
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describa la presentación del caso, síntomas observados, contexto, antecedentes relevantes, etc..."
          className="w-full h-40 p-4 rounded-xl border border-border bg-muted/30 text-xs font-medium text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 leading-relaxed overflow-x-hidden"
        />
      </CardContent>
    </Card>
  );
};
