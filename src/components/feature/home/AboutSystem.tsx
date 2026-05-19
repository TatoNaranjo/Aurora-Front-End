import { Button } from "@/components/ui";
import AboutIllustration from "@assets/images/about_ilustration.svg";
import { useNavigate } from "react-router-dom";

export const AboutSystem = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-orange-300/30 py-20">
      <div className="max-w-[1440px] flex mx-auto gap-20 flex-wrap md:flex-nowrap px-5 2xl:px-0">
        <div className="flex flex-col justify-around">
          <h2 className="text-foreground text-3xl font-bold">Acerca Del Sistema</h2>
          <p className="text-foreground text-lg font-normal leading-8">
            Este sistema ha sido desarrollado como parte de un proyecto de investigación en la Universidad de Cundinamarca Extensión Facatativá, con el objetivo de proporcionar a los estudiantes practicantes del programa de Psicología una herramienta de apoyo para el diagnóstico de trastornos depresivos.<br/>
            Utilizando técnicas avanzadas de Machine Learning, el sistema analiza datos clínicos para identificar patrones y factores de riesgo asociados a trastornos depresivos, proporcionando una herramienta complementaria al juicio clínico profesional.
          </p>
          <div>
            <Button onClick={() => navigate("/about")} size={"lg"}>
              Conocer Más sobre el Proyecto
            </Button>
          </div>
        </div>
        <img src={AboutIllustration} alt="Illustration" className="w-full max-w-[90%] md:max-w-[50%]"/>
      </div>
    </div>
  );
}
