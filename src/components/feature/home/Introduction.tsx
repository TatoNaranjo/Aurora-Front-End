import { Button } from "@/components/ui";
import MainIlustration from "@assets/images/main_ilustration.svg"
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks";

export const Introduction = () => {
  const userState = useUser();
  const navigate = useNavigate();
  return (
    <div className="flex py-20 justify-around max-w-[1440px] mx-auto flex-wrap md:flex-nowrap gap-10 px-5 2xl:px-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex gap-5 flex-col">
        <h2 className="text-primary text-4xl font-bold max-w-250">Sistema de Apoyo al Diagnóstico de Trastornos Depresivos</h2>
        <p className="text-muted-foreground/60 text-xl font-semibold max-w-250">Herramienta avanzada que utiliza modelos de clasificación de Machine Learning para apoyar el diagnóstico de trastornos depresivos en la práctica clínica.</p>
        <div className="flex gap-5">
          <Button onClick={() => navigate(userState.usuario != null && !userState.loading ? "/case-analysis" : "/register")} size="lg">
            Comenzar Diagnostico
          </Button>
          <Button onClick={() => navigate("/role-guide")} size="lg">
            Ver Tutorial
          </Button>
        </div>
      </div>
      <img src={MainIlustration} alt="Ilustracion principal" className="max-w-[90%] md:max-w-[50%]" />
    </div>
  );
}
