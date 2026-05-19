import { DefaultLayout } from "@/layout/DefaultLayout";
import Mind from "@assets/images/mind.svg";
import MindUpper from "@assets/images/mind_upper.svg";
import {
  SearchBar,
  Title,
  Subtitle,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Badge
} from "@/components/ui/";

export const MindIcon = () => {
  return (<img src={Mind} alt="mind icon" />);
};
// TODO: Remplazar la data temporal por consultas a la base de datos
const resources = [
  {
    title: "Avances en el Diagnóstico de la Depresión",
    author: "Journal of Psychiatric Research, 2023",
    type: "Artículo",
    description: "Revisión sistemática de los últimos avances en métodos diagnósticos para trastornos depresivos",
  },
  {
    title: "Avances en el Diagnóstico de la Depresión",
    author: "Journal of Psychiatric Research, 2023",
    type: "Artículo",
    description: "Revisión sistemática de los últimos avances en métodos diagnósticos para trastornos depresivos",
  },
  {
    title: "Avances en el Diagnóstico de la Depresión",
    author: "Journal of Psychiatric Research, 2023",
    type: "Artículo",
    description: "Revisión sistemática de los últimos avances en métodos diagnósticos para trastornos depresivos",
  },
  {
    title: "Avances en el Diagnóstico de la Depresión",
    author: "Journal of Psychiatric Research, 2023",
    type: "Artículo",
    description: "Revisión sistemática de los últimos avances en métodos diagnósticos para trastornos depresivos",
  },
  {
    title: "Avances en el Diagnóstico de la Depresión",
    author: "Journal of Psychiatric Research, 2023",
    type: "Artículo",
    description: "Revisión sistemática de los últimos avances en métodos diagnósticos para trastornos depresivos",
  },
  {
    title: "Avances en el Diagnóstico de la Depresión",
    author: "Journal of Psychiatric Research, 2023",
    type: "Artículo",
    description: "Revisión sistemática de los últimos avances en métodos diagnósticos para trastornos depresivos",
  },
  {
    title: "Avances en el Diagnóstico de la Depresión",
    author: "Journal of Psychiatric Research, 2023",
    type: "Artículo",
    description: "Revisión sistemática de los últimos avances en métodos diagnósticos para trastornos depresivos",
  }
];

export const Library = () => {
  return (
    <DefaultLayout>
      <div className="flex justify-center flex-col items-center max-w-[1440px] py-20 px-11 gap-4 w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-primary rounded-full p-4">
          <img src={MindUpper} alt="Upper Mind Icon" />
        </div>
        <Title type="principal">Biblioteca de Recursos</Title>
        <Subtitle type="principal">Accede a artículos científicos, guías clínicas y material de estudio.</Subtitle>
        <div>
          <div>
            <SearchBar
              placeholder="Buscar Recursos..."
              onChange={() => {}}
              name="resourcesSearchBar"
              id="resourcesSearchBar"
              withIcon={true}
              type="primary"
            />
          </div>
          <div className="flex gap-4 my-8 flex-wrap justify-around ">
            {resources.map((item) => (
              <Card
              className="rounded border border-primary py-1 flex flex-col text-left items-start max-w-96 min-h-40 px-1 transition-colors duration-300">
                <CardHeader className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <MindIcon/>
                    <Badge variant={"outline"}><span className="font-bold">{item.type}</span></Badge>
                  </div>
                  <h3 className="text-black font-semibold text-xl">{item.title}</h3>
                  <h4 className={`text-sm font-normal text-muted-foreground`}>{item.description}</h4>
                </CardHeader>
                <CardContent>
                  {item.description}
                </CardContent>
                <CardFooter>
                  <Button variant={"secondary"}>
                    Leer {item.type}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
