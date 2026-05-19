import Mind from "@assets/images/mind.svg";
import { Button, Card, CardContent, CardFooter, CardHeader } from "@components/ui";
import { useNavigate } from "react-router-dom";

export const MindIcon = () => {
  return (<img src={Mind} alt="mind icon" />);
};
const caracteristics = [
  {
    title: "Análisis Predictivo",
    subtitle: "Modelos de Machine Learning para clasificación y apoyo al diagnostico.",
    description: "Algoritmos entrenados con datos clínicos que ayudan a identificar patrones y factores de riesgo asociados a trastornos depresivos.",
    buttonText: "Explorar Modelos",
    link: "/researching-panel"
  },
  {
    title: "Gestión de Pacientes",
    subtitle: "Seguimiento integral de casos clínicos y evolución de pacientes.",
    description: "Sistema de registro y seguimiento que permite documentar la evolución de los pacientes y mantener un historial clínico organizado.",
    buttonText: "Gestionar Pacientes",
    link: "/clinical-diagnostic"
  }
]

export const Caracteristics = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-primary/10 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className=" flex justify-center flex-col items-center max-w-[1440px] py-20 px-11 gap-4 w-full">
        <h2 className="text-foreground text-3xl font-bold text-center">Características Principales</h2>
        <p className="text-muted-foreground text-2xl font-semibold text-center mb-10">Herramientas avanzadas para Estudiantes y Profesionales de la Salud Mental</p>
        <div className="flex justify-around w-full flex-wrap gap-5">
          {caracteristics.map((item) => (
              <Card
              className="rounded border border-primary/50 flex flex-col text-center items-center bg-primary/5 max-w-96 min-h-40 px-1 transition-colors duration-300">
                <CardHeader className="flex flex-col gap-2 pb-2">
                  <div className="flex justify-center">
                    <MindIcon/>
                  </div>
                  <h3 className="text-foreground font-semibold text-xl">{item.title}</h3>
                  <h4 className={`text-sm font-normal text-muted-foreground`}>{item.description}</h4>
                </CardHeader>
                <CardContent>
                  {item.description}
                </CardContent>
                <CardFooter>
                  <Button variant={"link_secondary"} size={"xl"} onClick={() => navigate(item.link)}>
                    {item.buttonText}
                  </Button>
                </CardFooter>
              </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
