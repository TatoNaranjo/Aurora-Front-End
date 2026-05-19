import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";

export const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[590px] flex flex-col items-center justify-center gap-8 bg-primary/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-foreground text-xl md:text-3xl font-bold text-center">Comienza a usar el Sistema</h3>
      <p className="text-muted-foreground text-xl md:text-3xl font-semibold text-center">Regístrate para acceder a todas las funcionalidades</p>
      <div>
        <Button onClick={() => navigate("/register")} size={"xl"}>
          Registrarse Ahora
        </Button>
      </div>
    </div>
  );
}
