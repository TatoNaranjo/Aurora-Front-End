import { DefaultLayout } from "@/layout/DefaultLayout";
import { Brain } from "lucide-react";
import { CaseTrackingSystem } from "@/components/feature/clinical/CaseTrackingSystem";
import { CaseStatsSidebar } from "@/components/feature/clinical/CaseStatsSidebar";
import { MLAnalysisCard } from "@/components/feature/clinical/MLAnalysisCard";

export const CaseAssistant = () => {
  return (
    <DefaultLayout>
      <div className="bg-background min-h-screen font-poppins pb-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center gap-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-primary/10 p-4 rounded-full w-fit">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Casos</h1>
            <p className="text-muted-foreground text-sm font-medium">
              Seguimiento integral de casos clínicos y evolución de pacientes.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Column */}
            <div className="lg:col-span-2">
              <CaseTrackingSystem />
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1">
              <CaseStatsSidebar />
              <MLAnalysisCard />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
