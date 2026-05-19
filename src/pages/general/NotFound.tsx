import { Button } from "@/components/ui";
import NotFoundIllustration from "@assets/images/not_found.svg"
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center md:my-auto gap-20 my-30 mx-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="text-foreground text-6xl md:text-7xl font-bold">Error 404</h2>
        <p className="text-center text-xl md:text-2xl max-w-[600px] text-muted-foreground">Ups, Parece que hubo un error de cálculo. <br/>
          La página a la que estás intentando acceder no existe.</p>
        <div>
          <Button onClick={() => navigate("/")} size={"xl"}>
            Volver al Inicio
          </Button>
        </div>
      </div>
      <img src={NotFoundIllustration} alt="Ilustracion principal" className="w-[300px] md:w-[400px]"/>
    </div>
  );
}
