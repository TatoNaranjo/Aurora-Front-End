import { Subtitle, Title, Card, CardHeader, CardContent } from "@/components/ui";
import Mind from "@assets/images/mind.svg";

const MindIcon = () => {
  return (<img src={Mind} alt="mind icon" />);
};
const missions = [
  {
    title: "Misión",
    description: "Democratizar el acceso a herramientas de detección temprana de depresión mediante tecnología innovadora, proporcionando evaluaciones precisas y accesibles que empoderen a las personas a tomar control de su bienestar mental.",
    icon: <MindIcon/>
  },
  {
    title: "Visión",
    description: "Ser la plataforma líder mundial en detección temprana de depresión, contribuyendo a un futuro donde la salud mental sea prioritaria, accesible y libre de estigmas para todas las personas.",
    icon: <MindIcon/>
  }
]
export const AboutMission = () => {
  return (
    <div className="bg-sky-300/20 pt-10 pb-30">
      <div className="flex flex-col items-center gap-5 max-w-[1440px] mx-auto">
        <Title type="secondary">Nuestra Misión y Visión</Title>
        <Subtitle type="secondary">Guiados por el compromiso de mejorar la salud mental global</Subtitle>
        <div className="flex justify-evenly pt-10 w-full flex-wrap gap-10">
          {missions.map((mission) => (
            <Card className="rounded border border-indigo-300 flex flex-col text-left items-start bg-sky-300/15 max-w-[560px] min-h-30 px-1">
              <CardHeader className="flex flex-row gap-3 mt-5 mb-3">
                <div className="flex justify-center">
                  {mission.icon}
                </div>
                <h3 className="text-foreground font-semibold text-2xl">{mission.title}</h3>
              </CardHeader>
              <CardContent>
                <p>{mission.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
