import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface ReadOnlyClinicalNoteProps {
  note: string;
}

export const ReadOnlyClinicalNote = ({ note }: ReadOnlyClinicalNoteProps) => {
  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 mt-8 transition-colors duration-300">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold text-foreground">Viñeta Clínica</CardTitle>
        <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
          Descripción del caso presentada por el estudiante para análisis y diagnóstico
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <div className="w-full p-6 rounded-xl border border-border bg-card text-[11px] font-medium text-muted-foreground leading-relaxed italic">
          {note || "Sin historia clínica registrada."}
        </div>
      </CardContent>
    </Card>
  );
};
