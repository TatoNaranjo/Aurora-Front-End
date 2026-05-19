import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui";

interface InformedConsentProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const InformedConsent = ({ isOpen, onAccept, onDecline }: InformedConsentProps) => {
  const [hasReadToBottom, setHasReadToBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = contentRef.current;
      // If content fits without scrolling, or if user has scrolled to bottom
      // Allow a small buffer (e.g. 1px) for floating point differences
      if (scrollHeight <= clientHeight || scrollHeight - scrollTop <= clientHeight + 1) {
        setHasReadToBottom(true);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Check immediately after render
      // Small timeout to ensure layout is done
      const timer = setTimeout(() => {
        checkScroll();
      }, 100);

      return () => clearTimeout(timer);
    } else {
      setHasReadToBottom(false);
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScroll = () => {
    checkScroll();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => { /* Prevent closing by default handlers */ }}>
      <DialogContent
        
        className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0 border-none shadow-2xl rounded-[2rem]"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="bg-primary p-8 text-primary-foreground">
          <DialogHeader >
            <DialogTitle className="text-2xl font-bold">Consentimiento Informado - Proyecto AURORA</DialogTitle>
            <DialogDescription className="text-primary-foreground text-xs font-medium uppercase tracking-widest mt-2">
              Privacidad de Datos y Propósitos Académicos
            </DialogDescription>
          </DialogHeader>
        </div>

        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto p-8 space-y-6 bg-card font-poppins"
          onScroll={handleScroll}
        >
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-foreground uppercase">1. Naturaleza del Proyecto</h3>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              El Proyecto AURORA es una herramienta de apoyo al diagnóstico clínico basada en Inteligencia Artificial, desarrollada exclusivamente para fines académicos y de investigación. Los resultados proporcionados por el sistema son sugerencias basadas en modelos estadísticos y no deben ser tomados como diagnósticos médicos definitivos.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-foreground uppercase">2. Tratamiento de Datos Personales</h3>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              En cumplimiento de la Ley 1581 de 2012 (Ley de Protección de Datos Personales en Colombia), informamos que el sistema implementa mecanismos de anonimización automática. Los datos clínicos ingresados son procesados para el entrenamiento y validación de modelos de Machine Learning, garantizando que ninguna información sensible sea vinculada de forma directa con la identidad de pacientes reales.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-foreground uppercase">3. Riesgos y Beneficios</h3>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              El beneficio principal es el fortalecimiento de las competencias diagnósticas de los estudiantes de psicología. Los riesgos son mínimos dado que el sistema opera en un entorno controlado y los datos son anonimizados antes de su persistencia.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-foreground uppercase">4. Voluntariedad</h3>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              Su participación y uso de esta plataforma es estrictamente voluntaria. Usted puede retirar su consentimiento en cualquier momento mediante la eliminación de su cuenta o solicitando la baja de sus datos a través del módulo de PQRS.
            </p>
          </section>
        </div>

        <div className="p-8 bg-muted border-t border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p className="text-[10px] text-muted-foreground font-medium italic mb-4 sm:mb-0">
            {hasReadToBottom ? "Lectura completada." : "Por favor, lea todo el documento para continuar."}
          </p>
          <div className="flex gap-4 w-full sm:w-auto">
            <button
              onClick={onDecline}
              className="px-6 py-2.5 bg-background border border-border text-muted-foreground hover:bg-muted rounded-xl text-xs font-bold transition-all w-full sm:w-auto"
            >
              Declinar
            </button>
            <button
              onClick={onAccept}
              disabled={!hasReadToBottom}
              className={`px-8 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold transition-all shadow-md shadow-primary/10 w-full sm:w-auto ${!hasReadToBottom ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`}
            >
              Acepto los Términos
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
