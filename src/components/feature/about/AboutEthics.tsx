import { Subtitle, Title, Card, CardHeader, CardContent } from "@/components/ui";
import Mind from "@assets/images/mind.svg";

export const MindIcon = () => {
  return (<img src={Mind} alt="mind icon" className="w-20 h-20"/>);
};
const ethics = [
  {
    title: "Empatía",
    description: "Entendemos la sensibilidad del tema y diseñamos cada interacción con compasión y respeto hacia nuestros usuarios.",
    icon: <MindIcon/>
  },
  {
    title: "Privacidad",
    description: "La confidencialidad y seguridad de los datos de nuestros usuarios es nuestra máxima prioridad en todo momento.",
    icon: <MindIcon/>
  },
  {
    title: "Evidencia Científica",
    description: "Basamos nuestros algoritmos en investigación científica rigurosa y colaboramos con profesionales de la salud mental.",
    icon: <MindIcon/>
  }
]
export const AboutEthics = () => {
  return (
    <div className="bg-sky-300/20 pt-10 pb-30">
      <div className="flex flex-col items-center gap-5 max-w-[1440px] mx-auto">
          <Title type="secondary">Nuestros Valores</Title>
          <Subtitle type="secondary">Los principios que guían cada decisión y desarrollo en nuestra plataforma</Subtitle>
        <div className="flex justify-evenly pt-10 w-full gap-10 flex-wrap">
          {ethics.map((ethic) => (
            <Card className="rounded border border-indigo-300 flex flex-col text-center items-center bg-sky-300/15 max-w-96 min-h-40 px-1">
              <CardHeader>
                <div className="flex justify-center">
                  {ethic.icon}
                </div>
                <h3 className="text-foreground font-semibold text-3xl">{ethic.title}</h3>
              </CardHeader>
              <CardContent>
                <p>{ethic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
