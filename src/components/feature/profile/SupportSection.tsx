import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { useUser } from "@/hooks";
import { SUPPORT_EMAIL } from "@/config";
import { useState } from "react";
import { ReportUserModal } from "./ReportUserModal";

/* ── Importación de PDFs (Vite) ── */
import guiaAdmin from "@/assets/guides/guia_admin.pdf";
import guiaPracticante from "@/assets/guides/guia_practicante.pdf";
import guiaModeradorPdf from "@/assets/guides/guia_moderador.pdf";
import guiaPsicologoPdf from "@/assets/guides/guia_psicologo.pdf";
import guiaEvaluadorPdf from "@/assets/guides/guia_evaluador.pdf";
import guiaGeneralPdf from "@/assets/guides/guia_general.pdf";

const USER_GUIDE_MAP: Record<string, string> = {
  ADMIN: guiaAdmin,
  PRACTICANTE: guiaPracticante,
  MODERADOR: guiaModeradorPdf,
  PSICOLOGO: guiaPsicologoPdf,
  EVALUADOR: guiaEvaluadorPdf,
  GENERAL: guiaGeneralPdf,
};

export const SupportSection = () => {
  const { usuario } = useUser();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleOpenGuide = () => {
    const userType = usuario?.tipo_usuario ?? "GENERAL";
    const pdfUrl = USER_GUIDE_MAP[userType] ?? USER_GUIDE_MAP["GENERAL"];
    window.open(pdfUrl, "_blank");
  };

  const handleContactSupport = () => {
    window.location.href = `mailto:${SUPPORT_EMAIL}`;
  };

  const links = [
    { label: "Guía de Usuario", action: handleOpenGuide },
    { label: "Contactar Soporte", action: handleContactSupport },
  ];

  return (
    <>
      <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-6 mt-6 hover:shadow-md transition-shadow transition-colors duration-300">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-xl font-bold text-foreground">Ayuda y Soporte</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-col gap-3">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className="w-full text-left p-4 rounded-xl border border-border text-xs font-bold text-foreground hover:bg-muted transition-all hover:border-primary/20"
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="w-full text-center p-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md shadow-primary/10 hover:bg-primary/90 transition-all mt-1"
          >
            Reportar Cuenta de Usuario
          </button>
        </CardContent>
      </Card>

      <ReportUserModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </>
  );
};
