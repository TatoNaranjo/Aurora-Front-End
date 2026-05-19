import { Button, Card, CardContent, CardFooter, CardHeader } from "@/components/ui";
import Mind from "@assets/images/mind.svg";
import { useNavigate } from "react-router-dom";

const MindIcon = () => {
  return (<img src={Mind} alt="mind icon" />);
};

const resources = [
  {
    title: "Biblioteca de Recursos",
    icon: <MindIcon />,
    subtitle: "Accede a artículos científicos, guías clínicas y material de estudio.",
    description: "Colección curada de recursos académicos y clínicos para profundizar en el conocimiento sobre trastornos depresivos y su diagnóstico.",
    buttonText: "Explorar Biblioteca",
    link: "/library",
    align: "left",
    size: "large",
  },
  {
    title: "Casos de Estudio",
    icon: <MindIcon />,
    subtitle: "Aprende con casos prácticos y simulaciones clínicas para mejorar tus habilidades diagnósticas y terapéuticas.",
    description: "Analiza situaciones clínicas reales y ficticias para desarrollar un enfoque integral en el manejo de trastornos depresivos.",
    buttonText: "Ver Casos",
    link: "/case-assistant",
    align: "left",
    size: "large",
  }
];

export const Resources = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-center flex-col items-center max-w-[1440px] py-20 px-11 gap-4 w-full">
        <h2 className="text-foreground text-3xl font-bold text-center">Recursos Para Estudiantes</h2>
        <p className="text-muted-foreground text-2xl font-semibold mb-10 text-center">Material de apoyo para complementar tu formación clínica</p>
        <div className="flex justify-around w-full flex-wrap gap-5">
          {resources.map((resource) => (
            <Card className="rounded border border-primary/50 flex flex-col text-left items-start max-w-[560px] min-h-30 px-1 transition-colors duration-300">
              <CardHeader className="flex gap-3 mt-5 pb-3">
                <div className="flex justify-start">
                  {resource.icon}
                </div>
                <h3 className="text-foreground font-semibold text-2xl">{resource.title}</h3>
                <h4 className={`text-sm font-normal text-muted-foreground`}>{resource.subtitle}</h4>
              </CardHeader>
              <CardContent className="pb-3">
                <p>{resource.description}</p>
              </CardContent>
              <CardFooter className="pb-3">
                <Button variant={"link_secondary"} size={"xl"} onClick={() => navigate(resource.link)}>
                  {resource.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
