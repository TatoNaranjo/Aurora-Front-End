import { Mail, User, CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface PersonalInformationCardProps {
  user: {
    nombre: string;
    email: string;
    rol: string;
    fechaRegistro: string;
    imagen?: string;
  };
}

export const PersonalInformationCard = ({ user }: PersonalInformationCardProps) => {
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const imageUrl = user.imagen?.startsWith('http') ? user.imagen : `${apiUrl}${user.imagen}`;

  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 transition-colors duration-300">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-xl font-bold text-foreground">Información Personal</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col md:flex-row items-center md:items-start gap-8">
        <Avatar className="w-24 h-24 border-4 border-border shadow-sm">
          <AvatarImage src={imageUrl} />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
            {user.nombre.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-foreground">{user.nombre}</h2>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{user.email}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{user.rol}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Miembro desde {user.fechaRegistro}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
