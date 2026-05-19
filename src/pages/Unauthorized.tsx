import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-4xl font-bold mb-4 text-foreground">403 - Acceso Denegado</h1>
      <p className="text-lg text-muted-foreground mb-8">No tienes permisos para ver esta página.</p>
      <Button onClick={() => navigate("/")}>Volver al Inicio</Button>
    </div>
  );
};
