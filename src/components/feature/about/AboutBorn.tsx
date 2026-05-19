import AboutIllustration from "@assets/images/about_ilustration.svg";

export const AboutBorn = () => {
  return (
    <div className="bg-primary py-30 text-primary-foreground transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-[1440px] flex mx-auto gap-20 flex-wrap md:flex-nowrap px-5 2xl:px-0">
        <div className="flex flex-col gap-5">
          <h2 className="justify-center text-primary-foreground text-3xl font-bold">Cómo Nació Nuestra Iniciativa?</h2>
          <p className="justify-center text-primary-foreground text-lg font-normal leading-7">
            Todo comenzó cuando nos dimos cuenta de una realidad preocupante: millones de personas sufren de depresión en silencio, sin acceso a herramientas de detección temprana o sin reconocer los síntomas iniciales. <br/>
            En 2023, un grupo de desarrolladores, psicólogos y especialistas en salud mental se unieron con una visión común: crear una plataforma accesible que pudiera ayudar a identificar signos tempranos de depresión utilizando tecnología de vanguardia. <br/>
            Después de meses de investigación, colaboración con profesionales de la salud mental y desarrollo iterativo, nació nuestro sistema de diagnóstico de depresión basado en inteligencia artificial.
          </p>
        </div>
        <img src={AboutIllustration} alt="" />
      </div>
    </div>
  );
}