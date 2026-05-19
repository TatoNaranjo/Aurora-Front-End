import { DefaultLayout } from "@/layout/DefaultLayout";
import { Card, CardContent } from "@/components/ui";

export const PrivacyPolicy = () => {
  return (
    <DefaultLayout>
      <div className="bg-background min-h-screen font-poppins pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground">Política de Privacidad</h1>
            <p className="text-muted-foreground mt-2">Última actualización: 10 de febrero de 2026</p>
          </div>

          <Card className="rounded-[2rem] border-border shadow-sm overflow-hidden transition-colors duration-300">
            <CardContent className="p-8 md:p-12 prose prose-indigo max-w-none">
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Introducción</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  En Aurora, nos tomamos muy en serio la privacidad de sus datos. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información personal y clínica procesada a través de nuestra plataforma.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Información que Recopilamos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Recopilamos información necesaria para la prestación del servicio de apoyo al diagnóstico clínico:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Datos de Usuario:</strong> Nombre, correo electrónico y credenciales de acceso.</li>
                  <li><strong>Datos Clínicos:</strong> Historias clínicas, notas de sesiones y resultados de tamizaje (procesados bajo estrictas medidas de seguridad).</li>
                  <li><strong>Uso del Sistema:</strong> Logs de actividad para auditoría y mejora del modelo de IA.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Uso de la Información</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  La información recopilada se utiliza exclusivamente para:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Generar hipótesis diagnósticas mediante modelos de aprendizaje automático.</li>
                  <li>Permitir la supervisión académica de practicantes por parte de psicólogos evaluadores.</li>
                  <li>Garantizar la seguridad y trazabilidad de las operaciones dentro de la plataforma.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Protección de Datos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Implementamos medidas técnicas y organizativas para proteger los datos contra el acceso no autorizado, la alteración o la destrucción. Esto incluye cifrado de datos en reposo y en tránsito.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Sus Derechos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Usted tiene derecho a acceder, rectificar o solicitar la eliminación de sus datos personales de acuerdo con las leyes locales de protección de datos.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Contacto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Si tiene preguntas sobre esta política, puede contactarnos a través del Centro de Ayuda de la plataforma.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
}
