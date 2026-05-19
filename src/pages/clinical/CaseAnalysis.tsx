import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { CaseHeader } from "@/components/feature/clinical/CaseHeader";
import { CaseInfoSection } from "@/components/feature/clinical/CaseInfoSection";
import { AnalysisTabs } from "@/components/feature/clinical/AnalysisTabs";
import { AnalysisResults } from "@/components/feature/clinical/AnalysisResults";
import { DiagnosticCriteriaView } from "@/components/feature/clinical/DiagnosticCriteriaView";
import { useCaseAnalysis } from "@/hooks/useCaseAnalysis";
import { Loader2 } from "lucide-react";

export const CaseAnalysis = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data, loading, error } = useCaseAnalysis(id!);
  const [activeTab, setActiveTab] = useState<'analysis' | 'criteria'>('analysis');

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
          <p className="text-muted-foreground font-medium font-poppins">Cargando análisis de caso...</p>
        </div>
      </DefaultLayout>
    );
  }

  if (error || !data) {
    return (
      <DefaultLayout>
        <div className="p-8 text-center text-red-500 font-bold font-poppins">
          {error || "No se encontraron datos para este caso."}
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 font-poppins animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CaseHeader id={data.id} lastConsultation={data.lastConsultation} />

        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 md:p-8 transition-colors duration-300">
          <CaseInfoSection
            ageGroup={data.ageGroup}
            gender={data.gender}
            clinicalVignette={data.clinicalVignette}
            shapExplanation={data.analysis.shapExplanation}
          />

          <AnalysisTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === 'analysis' ? (
            <>
              <AnalysisResults
                globalScore={data.analysis.globalScore}
                maxScore={data.analysis.maxScore}
                symptoms={data.analysis.symptoms}
                classificationLabel={data.analysis.classificationLabel}
              />
            </>
          ) : (
            <DiagnosticCriteriaView
              dsm5={data.criteria.dsm5}
            />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};
