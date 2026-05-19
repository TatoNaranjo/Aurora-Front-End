import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { useUser } from "@/hooks";
import packageJson from "../../../../package.json";

export const SystemInfoSection = () => {
  const userState = useUser();
  const lastLogin = userState.usuario?.last_login
    ? new Date(userState.usuario.last_login).toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })
    : "Primera sesión";

  const info = [
    { label: "Último Acceso:", value: lastLogin },
    { label: "Sesiones Activas:", value: "1" },
    { label: "Versión del Sistema:", value: `v${packageJson.version}` },
  ];

  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-6 mt-6 transition-colors duration-300">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold text-foreground">Información del Sistema</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-3">
        {info.map((item) => (
          <div key={item.label} className="flex justify-between items-center text-[11px]">
            <span className="text-muted-foreground font-medium">{item.label}</span>
            <span className="text-foreground font-bold">{item.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
