import { DefaultLayout } from "@/layout/DefaultLayout";
import {
  HelpCircle,
  MessageCircle,
  FileText,
  Search
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui";
import { PQRSForm } from "@/components/feature/help/PQRSForm";
import { useUser } from "@/hooks/useAuth";
import { SUPPORT_EMAIL } from "@/config";

/* ── Importación estática de PDFs (Vite los resuelve como URLs) ── */
import guiaAdmin from "@/assets/guides/guia_admin.pdf";
import guiaPracticante from "@/assets/guides/guia_practicante.pdf";
import guiaModeradorPdf from "@/assets/guides/guia_moderador.pdf";
import guiaPsicologoPdf from "@/assets/guides/guia_psicologo.pdf";
import guiaEvaluadorPdf from "@/assets/guides/guia_evaluador.pdf";
import guiaGeneralPdf from "@/assets/guides/guia_general.pdf";

/**
 * Mapa de tipo de usuario → URL del PDF de guía.
 * Para agregar un nuevo rol basta con añadir una entrada aquí
 * e importar el PDF correspondiente arriba.
 */
const USER_GUIDE_MAP: Record<string, string> = {
  ADMIN: guiaAdmin,
  PRACTICANTE: guiaPracticante,
  MODERADOR: guiaModeradorPdf,
  PSICOLOGO: guiaPsicologoPdf,
  EVALUADOR: guiaEvaluadorPdf,
  GENERAL: guiaGeneralPdf,
};

export const HelpCenter = () => {
  const { usuario } = useUser();

  /** Abre el PDF de guía correspondiente al rol del usuario en una nueva pestaña. */
  const handleOpenGuide = () => {
    const userType = usuario?.tipo_usuario ?? "GENERAL";
    const pdfUrl = USER_GUIDE_MAP[userType] ?? USER_GUIDE_MAP["GENERAL"];
    window.open(pdfUrl, "_blank");
  };

  /** Abre el cliente de correo con el email de soporte preconfigurado. */
  const handleContactSupport = () => {
    window.location.href = `mailto:${SUPPORT_EMAIL}`;
  };

  const faqs = [
    {
      q: "¿Cómo inicio un nuevo diagnóstico?",
      a: "Ve a la sección 'Diagnóstico' desde el menú principal o tu dashboard, selecciona un paciente y completa el formulario clínico."
    },
    {
      q: "¿Qué significan los niveles de certeza?",
      a: "Es la probabilidad estadística devuelta por el modelo de IA basada en los síntomas y notas clínicas ingresadas."
    },
    {
      q: "¿Cómo exporto un informe?",
      a: "Dentro de la vista de análisis de caso, encontrarás un botón de 'Exportar Informe' en la esquina superior derecha."
    }
  ];

  return (
    <DefaultLayout>
      <div className="bg-background min-h-screen font-poppins pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          {/* Hero Section */}
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl font-bold text-foreground">¿Cómo podemos ayudarte?</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Encuentra guías prácticas, tutoriales y respuestas a las dudas más comunes sobre el uso del sistema Aurora.
            </p>
            <div className="max-w-xl mx-auto relative mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Busca un tema, guía o tutorial..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all"
              />
            </div>
          </div>

          <div className="flex justify-center gap-6 mb-16">
            {/* Guías de Usuario → abre PDF según rol */}
            <Card
              className="rounded-2xl border-border shadow-sm hover:shadow-md transition-all cursor-pointer transition-colors duration-300"
              onClick={handleOpenGuide}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Guías de Usuario</h3>
                  <p className="text-xs text-muted-foreground mt-1">Explora la documentación paso a paso.</p>
                </div>
              </CardContent>
            </Card>

            {/* Soporte Técnico → mailto: */}
            <Card
              className="rounded-2xl border-border shadow-sm hover:shadow-md transition-all cursor-pointer transition-colors duration-300"
              onClick={handleContactSupport}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mx-auto">
                  <MessageCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Soporte Técnico</h3>
                  <p className="text-xs text-muted-foreground mt-1">¿Tienes problemas técnicos? Contáctanos.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQs */}
          <div className="space-y-16">
            <Card className="rounded-[2.5rem] border-border shadow-sm overflow-hidden transition-colors duration-300">
              <CardHeader className="bg-muted/50 border-b border-border p-8">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-primary" /> Preguntas Frecuentes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="p-8 hover:bg-muted/30 transition-colors">
                      <h4 className="font-bold text-foreground mb-2">{faq.q}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* PQRS Form Section */}
            <div id="pqrs-section" className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-foreground">¿No encuentras lo que buscas?</h2>
                <p className="text-sm text-muted-foreground mt-2">Envíanos una solicitud formal a través de nuestro sistema de PQRS.</p>
              </div>
              <PQRSForm />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
