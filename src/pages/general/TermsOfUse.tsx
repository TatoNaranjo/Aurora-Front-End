import { DefaultLayout } from "@/layout/DefaultLayout";
import { Card, CardContent } from "@/components/ui";

export const TermsOfUse = () => {
  return (
    <DefaultLayout>
      <div className="bg-background min-h-screen font-poppins pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground">Términos de Uso</h1>
            <p className="text-muted-foreground mt-2">Última actualización: 10 de febrero de 2026</p>
          </div>

          <Card className="rounded-[2rem] border-border shadow-sm overflow-hidden transition-colors duration-300">
            <CardContent className="p-8 md:p-12 prose prose-indigo max-w-none">
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Aceptación de los Términos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Al acceder y utilizar la plataforma Aurora, usted acepta cumplir con estos Términos de Uso y todas las leyes aplicables. Si no está de acuerdo con alguno de estos términos, tiene prohibido utilizar o acceder a este sitio.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Uso Académico y Responsabilidad</h2>
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
                  <p className="text-orange-900 font-bold mb-1 uppercase tracking-tight text-xs">Aviso Crítico:</p>
                  <p className="text-orange-800 text-sm">
                    Esta plataforma es una herramienta de apoyo académico. Las hipótesis diagnósticas generadas por la IA no constituyen diagnósticos médicos finales y deben ser siempre revisadas por un profesional colegiado.
                  </p>
                </div>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>El sistema está diseñado para la formación de practicantes de psicología.</li>
                  <li>Aurora no se hace responsable de las decisiones clínicas tomadas sin la debida supervisión profesional.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Conducta del Usuario</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Como usuario de Aurora, usted se compromete a:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Mantener la confidencialidad de su cuenta y contraseña.</li>
                  <li>No introducir datos de pacientes reales.</li>
                  <li>Utilizar el sistema de manera ética y profesional.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Propiedad Intelectual</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Todos los contenidos, algoritmos, diseños y logotipos integrados en Aurora son propiedad intelectual de los desarrolladores del proyecto, protegidos por las leyes de derechos de autor aplicables.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Modificaciones</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Nos reservamos el derecho de modificar o reemplazar estos términos en cualquier momento. El uso continuado de la plataforma tras dichos cambios constituirá la aceptación de los nuevos términos.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitación de Responsabilidad</h2>
                <p className="text-muted-foreground leading-relaxed">
                  En ningún caso Aurora o sus desarrolladores serán responsables de cualquier daño surgido del uso o la imposibilidad de uso de la plataforma.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
}
