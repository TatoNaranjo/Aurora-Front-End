import { Subtitle, Title } from "@/components/ui";

export const AboutImpact = () => {
  return (
    <div className="bg-white pt-10 pb-30">
      <div className="flex flex-col items-center gap-5 max-w-[1440px] mx-auto">
        <Title type="secondary">Nuestro Impacto</Title>
        <Subtitle type="secondary">Desde nuestro lanzamiento, hemos ayudado a miles de personas a reconocer signos tempranos de depresión y buscar la ayuda profesional que necesitan. Cada evaluación realizada es un paso hacia un mundo con mejor salud mental.</Subtitle>
        <div className="flex w-full justify-evenly py-40 flex-wrap gap-20">
          <div className="flex flex-col items-center gap-5">
            <h4 className="text-foreground text-3xl font-bold">1+</h4>
            <p className="text-center justify-start text-foreground text-xl font-normal">Evaluaciones Realizadas</p>
          </div>
          <div className="flex flex-col items-center gap-5">
            <h4 className="text-foreground text-3xl font-bold">95%</h4>
            <p className="text-center justify-start text-foreground text-xl font-normal">Precisión en Detección</p>
          </div>
          <div className="flex flex-col items-center gap-5">
            <h4 className="text-foreground text-3xl font-bold">24/7</h4>
            <p className="text-center justify-start text-foreground text-xl font-normal">Disponibilidad</p>
          </div>
        </div>
      </div>
    </div>
  );
}
