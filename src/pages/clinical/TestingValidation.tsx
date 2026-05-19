import { useState } from "react";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { ValidationTabs } from "@/components/feature/clinical/ValidationTabs";
import { ValidationDashboard } from "@/components/feature/clinical/ValidationDashboard";
import { FileUploadModule } from "@/components/feature/clinical/FileUploadModule";
import { ReportValidationView } from "@/components/feature/clinical/ReportValidationView";
import { ModelEvaluationView } from "@/components/feature/clinical/ModelEvaluationView";

type ValidationTabType = 'dashboard' | 'upload' | 'reports' | 'performance';

export const TestingValidation = () => {
  const [activeTab, setActiveTab] = useState<ValidationTabType>('dashboard');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard': return <ValidationDashboard />;
      case 'upload': return <FileUploadModule />;
      case 'reports': return <ReportValidationView />;
      case 'performance': return <ModelEvaluationView />;
      default: return <ValidationDashboard />;
    }
  };

  return (
    <DefaultLayout>
      <div className="bg-background min-h-screen font-poppins pb-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-bold text-foreground leading-tight">Módulo de Pruebas y Validación</h1>
            <p className="text-[11px] font-bold text-muted-foreground tracking-wide uppercase mt-1">Sistema de validación y testing para la plataforma AURORA</p>
          </div>

          <div className="space-y-12">
            {/* Active Environment Banner */}
            <div className="bg-card border border-border rounded-[2rem] p-4 sm:p-12 shadow-sm transition-colors duration-300">
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground">Entorno de Pruebas Activo</h2>
                <p className="text-[11px] text-primary font-medium mt-1">Todas las operaciones se realizan en un entorno aislado que no afecta la trazabilidad de diagnósticos en producción.</p>
              </div>

              <div className="space-y-12">
                <ValidationTabs activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="min-h-[500px]">
                  {renderActiveTab()}
                </div>
              </div>
            </div>
          </div>

          {/* Academic Disclaimer */}
          <div className="mt-20 bg-card border border-border rounded-xl p-4 transition-colors duration-300">
            <p className="text-[10px] text-foreground leading-relaxed">
              <span className="font-bold">Uso Académico:</span> Este sistema es únicamente para fines educativos. Los resultados no constituyen diagnósticos médicos reales y no deben usarse para decisiones clínicas en pacientes reales.
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
