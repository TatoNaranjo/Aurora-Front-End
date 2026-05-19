import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

interface ProfileGeneralInfoProps {
  user: {
    nombre: string;
    email: string;
    rol: string;
    usuario: string;
    fechaRegistro: string;
  };
}

export const ProfileGeneralInfo = ({ user }: ProfileGeneralInfoProps) => {
  const infoFields = [
    { label: "Nombre", value: user.nombre },
    { label: "Email", value: user.email },
    { label: "Rol", value: user.rol },
    { label: "Usuario", value: user.usuario },
    { label: "Fecha de Registro", value: user.fechaRegistro },
  ];

  return (
    <Card className="flex-grow rounded-2xl border-border shadow-sm bg-card overflow-hidden transition-colors duration-300">
      <CardHeader className="p-8 border-b border-border bg-muted/30">
        <CardTitle className="text-xl font-bold text-foreground">Información General</CardTitle>
        <p className="text-xs text-muted-foreground font-medium">Detalles básicos de tu cuenta en Aurora</p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {infoFields.map((field) => (
            <div key={field.label} className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-primary uppercase tracking-widest">
                {field.label}
              </label>
              <p className="text-base font-semibold text-foreground bg-muted/50 p-3 rounded-xl border border-border">
                {field.value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
