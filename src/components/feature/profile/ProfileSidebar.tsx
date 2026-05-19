import { useNavigate, Link } from "react-router-dom";
import { User, Settings, Activity, MessageSquare, ShieldQuestion } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";

interface ProfileSidebarProps {
  user: {
    nombre: string;
    rol: string;
    imagen?: string;
  };
}

export const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <User className="w-4 h-4" />, label: "General", path: "/profile" },
    { icon: <Activity className="w-4 h-4" />, label: "Mi Actividad", path: "/recent-activity" },
    { icon: <MessageSquare className="w-4 h-4" />, label: "Mensajes", path: "/messages" },
    { icon: <ShieldQuestion className="w-4 h-4" />, label: "Soporte", path: "/support" },
  ];

  return (
    <div className="w-full md:w-80 flex flex-col gap-6">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-8 flex flex-col items-center text-center transition-colors duration-300">
        <Avatar className="w-24 h-24 mb-4 border-4 border-primary/10 shadow-sm">
          <AvatarImage src={user.imagen} />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
            {user.nombre.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold text-foreground mb-1">{user.nombre}</h2>
        <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-6">
          {user.rol}
        </p>
        <Button
          onClick={() => navigate("/profile/settings")}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-border hover:bg-muted rounded-xl py-6 font-bold"
        >
          <Settings className="w-4 h-4" />
          Editar Perfil
        </Button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden transition-colors duration-300">
        <div className="p-4 border-b border-border">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-2">Menú</h3>
        </div>
        <div className="flex flex-col">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex items-center gap-3 px-6 py-4 text-sm font-bold text-muted-foreground hover:bg-muted hover:text-primary transition-colors border-l-4 border-transparent hover:border-primary"
            >
              <span className="text-muted-foreground">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
