import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface Patient {
  id: string;
  name: string;
  patientId: string;
  lastVisit: string;
  status: 'Nuevo' | 'En Seguimiento';
  initials: string;
}

export const CaseTrackingSystem = () => {
  const patients: Patient[] = [
    { id: "1", name: "Paciente 1", patientId: "100001", lastVisit: "13/4/2025", status: 'Nuevo', initials: 'TN' },
    { id: "2", name: "Paciente 1", patientId: "100001", lastVisit: "13/4/2025", status: 'En Seguimiento', initials: 'TN' },
    { id: "3", name: "Paciente 1", patientId: "100001", lastVisit: "13/4/2025", status: 'Nuevo', initials: 'TN' },
    { id: "4", name: "Paciente 1", patientId: "100001", lastVisit: "13/4/2025", status: 'En Seguimiento', initials: 'TN' },
  ];

  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 h-full transition-colors duration-300">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-xl font-bold text-foreground">Sistema de Registro y Seguimiento</CardTitle>
        <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-md">
          Documenta la evolución de los casos registrados y mantén un historial clínico organizado.
        </p>
      </CardHeader>

      <CardContent className="p-0 flex flex-col gap-4">
        {patients.map((patient, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/20">
              {patient.initials}
            </div>

            <div className="flex-grow">
              <h4 className="text-sm font-bold text-foreground">{patient.name}</h4>
              <p className="text-[10px] text-muted-foreground font-medium">
                ID: {patient.patientId} • Última consulta: {patient.lastVisit}
              </p>
            </div>

            <div className={`px-4 py-1.5 rounded-full border text-[10px] font-bold ${patient.status === 'Nuevo'
                ? "bg-card border-border text-foreground"
                : "bg-card border-border text-muted-foreground"
              }`}>
              {patient.status}
            </div>
          </div>
        ))}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <p className="text-[10px] text-muted-foreground font-bold">Mostrando 1 a 4 de 24 resultados</p>
          <div className="flex gap-4">
            <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold shadow-md shadow-primary/10 opacity-80 cursor-not-allowed transition-colors duration-300">
              Anterior
            </button>
            <button className="px-6 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-bold shadow-md shadow-primary/10 transition-colors duration-300">
              Siguiente
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
