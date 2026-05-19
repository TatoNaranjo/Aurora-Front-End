import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { CaseDataForm } from "@/components/feature/clinical/CaseDataForm";
import { ClinicalNoteSection } from "@/components/feature/clinical/ClinicalNoteSection";
import { MLAnalysisResults } from "@/components/feature/clinical/MLAnalysisResults";
import { DiagnosticEditor } from "@/components/feature/clinical/DiagnosticEditor";
import { DiagnosticSidebar } from "@/components/feature/clinical/DiagnosticSidebar";
import { ScreeningScales, type ScreeningData } from "@/components/feature/clinical/ScreeningScales";
import { PractitionerAnalysis, type AnalysisData } from "@/components/feature/clinical/PractitionerAnalysis";
import { PractitionerSidebar } from "@/components/feature/clinical/PractitionerSidebar";
import { ReviewHeader } from "@/components/feature/clinical/ReviewHeader";
import { ReadOnlyScreening } from "@/components/feature/clinical/ReadOnlyScreening";
import { ReadOnlyAnalysis } from "@/components/feature/clinical/ReadOnlyAnalysis";
import { ReviewSidebar } from "@/components/feature/clinical/ReviewSidebar";
import { ReadOnlyClinicalNote } from "@/components/feature/clinical/ReadOnlyClinicalNote";
import { useUser } from "@/hooks/useAuth";
import { useServices } from "@/context/useServices";
import { UserRole } from "@/types/Roles";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui";
import { PatientSelector } from "@/components/feature/clinical/PatientSelector";
import { useClinicalWorkflow } from "@/hooks/useClinicalWorkflow";
import { useModelos } from "@/hooks/useModelos";
import { InformedConsent } from "@/components/feature/legal/InformedConsent";
import type { Diagnostico, Modelo } from "@/types/BackendTypes";

type ClinicalMode = 'DIAGNOSTIC' | 'REVIEW';
type PractitionerPhase = 'input' | 'results';

export const ClinicalDiagnostic = () => {
  const { usuario } = useUser();
  const { diagnosticosService, pacientesService } = useServices();
  const userRole = usuario?.tipo_usuario as UserRole;
  const { state, actions, loading, error } = useClinicalWorkflow();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reviewId = searchParams.get('id');

  // Form States
  const [caseData, setCaseData] = useState({
    nombre: "",
    rango_edad: "" as number | "",
    sexo: "" as number | "",
    fecha_consulta: new Date().toISOString().split('T')[0]
  });
  const [clinicalNote, setClinicalNote] = useState("");
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    impresion: "",
    sintomas: [],
    factoresRiesgo: "",
    hipotesis: ""
  });
  const [screeningData, setScreeningData] = useState<ScreeningData>({
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0,
    q6: 0,
    q7: 0,
    q8: 0,
    q9: 0
  });

  const isPsychologist = ([UserRole.ADMIN, UserRole.MODERADOR, UserRole.PSICOLOGO, UserRole.EVALUADOR] as UserRole[]).includes(userRole);
  const [mode, setMode] = useState<ClinicalMode>('DIAGNOSTIC');
  const [phase, setPhase] = useState<PractitionerPhase>('input');
  const [isEditing, setIsEditing] = useState(false);

  // Model selection modal state
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [selectedModelVersion, setSelectedModelVersion] = useState<string>("");
  const [availableModels, setAvailableModels] = useState<Modelo[]>([]);
  const { getAllModelos } = useModelos();

  useEffect(() => {
    if (userRole === UserRole.PRACTICANTE && !reviewId) {
      setMode('DIAGNOSTIC');
    } else if (reviewId) {
      setMode('REVIEW');
      const fetchDiagnosis = async () => {
        try {
          const id = Number(reviewId);
          if (isNaN(id)) return;
          const diagnosis = await diagnosticosService.getDiagnosticoById(id);
          if (diagnosis) {
            actions.setCurrentDiagnosis(diagnosis);
            if (diagnosis.clasificacion) {
              setPhase('results');
            }
            setClinicalNote(diagnosis.historia_clinica || "");
            setAnalysisData({
              impresion: diagnosis.impresion_clinica || "",
              sintomas: diagnosis.sintomas_identificados || [],
              factoresRiesgo: "",
              hipotesis: diagnosis.hipotesis_diagnostica || ""
            });
            setScreeningData(diagnosis.tamizaje as unknown as ScreeningData || { q1: 0, q2: 0, q3: 0, q4: 0 });
            if (diagnosis.id_paciente) {
              try {
                const patient = await pacientesService.getPacienteById(diagnosis.id_paciente);
                setCaseData({
                  nombre: diagnosis.nombre,
                  rango_edad: patient.rango_edad,
                  sexo: patient.sexo,
                  fecha_consulta: diagnosis.fecha ? diagnosis.fecha.split('T')[0] : new Date().toISOString().split('T')[0]
                });
                setSelectedPatientId(diagnosis.id_paciente);
              } catch (err) {
                console.error("Error fetching patient:", err);
              }
            }
          }
        } catch (error) {
          console.error("Error fetching diagnosis for review:", error);
          alert("Error al cargar el diagnóstico para revisión.");
        }
      };
      fetchDiagnosis();
    }
  }, [userRole, reviewId, isPsychologist, diagnosticosService, pacientesService, actions]);

  const isReviewMode = isPsychologist && mode === 'REVIEW';
  const [isManagingPatients, setIsManagingPatients] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [isConsentOpen, setIsConsentOpen] = useState(!reviewId);
  const [hasAcceptedConsent, setHasAcceptedConsent] = useState(!!reviewId);

  const handleSaveCase = async () => {
    if (!hasAcceptedConsent) {
      alert("Debe aceptar el consentimiento informado para proceder.");
      setIsConsentOpen(true);
      return;
    }
    try {
      let patientId = selectedPatientId;
      if (!isPsychologist && !patientId) {
        if (!caseData.rango_edad || !caseData.sexo) {
          alert("Por favor complete los datos del paciente (Rango de edad y Sexo).");
          return;
        }
        const newPatient = await actions.createPatient({
          sexo: Number(caseData.sexo),
          rango_edad: Number(caseData.rango_edad)
        }, true);
        if (!newPatient) return;
        patientId = newPatient.id_paciente;
      }
      if (!patientId) {
        alert("Debe seleccionar o crear un paciente.");
        return;
      }
      const diagnosis: Partial<Diagnostico> = {
        nombre: caseData.nombre || `Caso - ${caseData.fecha_consulta}`,
        historia_clinica: clinicalNote,
        impresion_clinica: analysisData.impresion,
        hipotesis_diagnostica: analysisData.hipotesis,
        id_paciente: patientId,
        sintomas_identificados: analysisData.sintomas.filter(s => s.intensity > 0),
        tamizaje: screeningData,
      };
      if (reviewId) {
        await actions.updateDiagnosis(Number(reviewId), diagnosis);
        alert("Diagnóstico actualizado correctamente.");
        setIsEditing(false);
      } else {
        await actions.submitDiagnosis(diagnosis);
        alert("Caso creado exitosamente en la tabla de diagnósticos.");
      }
    } catch (e) {
      console.error(e);
      alert("Error al guardar el caso.");
    }
  };

  const handleViewModelComparison = () => {
    navigate('/researching-panel?tab=modelos');
  };

  const handleDownloadPDF = async () => {
    const id = reviewId || (state.currentDiagnosis as Diagnostico)?.id_diagnostico;
    if (!id) {
      alert("Debe guardar el caso antes de generar un reporte PDF.");
      return;
    }
    const url = await actions.descargarReportePDF(Number(id));
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = `Reporte_Caso_${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formIsDisabled = !!reviewId && !isPsychologist && !isEditing;

  const handleOpenReprocessModal = async () => {
    const models = await getAllModelos();
    setAvailableModels(models);
    setSelectedModelVersion("");
    setIsModelModalOpen(true);
  };

  const handleConfirmReprocess = async () => {
    const id = reviewId || state.currentDiagnosis?.id_diagnostico;
    if (!id) return;
    setIsModelModalOpen(false);
    const result = await actions.ejecutarAnalisisIA(Number(id), selectedModelVersion || undefined);
    if (result && "status" in result && result.status === "processing") {
      alert(result.message || "Análisis encolado en background. Recibirás un correo cuando finalice.");
    } else if (result) {
      setPhase("results");
    }
  };

  return (
    <DefaultLayout>
      <div className="bg-background min-h-screen font-poppins pb-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-foreground transition-all">
                {isReviewMode ? 'Revisión Manual' : 'Diagnóstico Clínico'}
              </h1>
              {!isPsychologist && (
                <p className="text-[11px] font-bold text-muted-foreground tracking-wide uppercase transition-all animate-in fade-in slide-in-from-left-2">Sistema de Práctica con Casos Simulados</p>
              )}
              {isReviewMode && (
                <p className="text-[11px] font-bold text-muted-foreground tracking-wide uppercase">Evaluación de Desempeño Estudiantil</p>
              )}
            </div>

            <div className="flex gap-4 items-center">
              {isPsychologist && (
                <button
                  onClick={() => setIsManagingPatients(true)}
                  className="px-4 py-2 bg-card border border-primary/20 text-primary hover:bg-primary/10 rounded-md text-xs font-bold transition-all shadow-sm"
                >
                  Gestionar Pacientes
                </button>
              )}

              {!isReviewMode && (
                <>
                  {!!reviewId && !isEditing && !isPsychologist && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2.5 bg-muted hover:bg-muted/80 text-foreground border border-border rounded-md text-xs font-bold transition-all shadow-sm"
                    >
                      Actualizar
                    </button>
                  )}
                  {(!reviewId || isEditing || isPsychologist) && (
                    <button
                      onClick={handleSaveCase}
                      disabled={loading || formIsDisabled}
                      className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-xs font-bold transition-all shadow-md shadow-primary/10 disabled:opacity-50"
                    >
                      {loading ? "Guardando..." : (reviewId ? "Guardar Cambios" : "Guardar Caso")}
                    </button>
                  )}
                  {isPsychologist && (
                    <button onClick={async () => {
                      if (reviewId) {
                        const url = await actions.descargarReportePDF(Number(reviewId));
                        if (url) alert("Reporte descargado");
                      }
                    }} className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-xs font-bold transition-all shadow-md shadow-primary/10">
                      Exportar Informe
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          <InformedConsent
            isOpen={isConsentOpen}
            onAccept={() => {
              setHasAcceptedConsent(true);
              setIsConsentOpen(false);
            }}
            onDecline={() => {
              setIsConsentOpen(false);
              navigate(-1);
            }}
          />

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border-l-4 border-destructive text-destructive text-sm">
              {error}
            </div>
          )}

          <Dialog open={isManagingPatients} onOpenChange={setIsManagingPatients}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Gestión de Pacientes</DialogTitle>
                <DialogDescription>
                  Registre nuevos pacientes para el sistema o seleccione uno existente.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <PatientSelector
                  onSelect={(p) => {
                    actions.selectPatient(p);
                    setSelectedPatientId(p.id_paciente);
                    setCaseData({
                      ...caseData,
                      sexo: p.sexo,
                      rango_edad: p.rango_edad
                    });
                    setIsManagingPatients(false);
                    alert(`Paciente #${p.id_paciente} seleccionado.`);
                  }}
                  onCreate={async (p) => {
                    try {
                      const newP = await actions.createPatient(p, true);
                      if (!newP) return;
                      alert("Paciente creado exitosamente.");
                      setSelectedPatientId(newP.id_paciente);
                      setCaseData({
                        ...caseData,
                        sexo: newP.sexo,
                        rango_edad: newP.rango_edad
                      });
                      setIsManagingPatients(false);
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                />
              </div>
            </DialogContent>
          </Dialog>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8 animate-in fade-in duration-500">
              {isReviewMode ? (
                <>
                  <ReviewHeader diagnosis={state.currentDiagnosis as unknown as Diagnostico} />
                  <ReadOnlyClinicalNote note={clinicalNote} />
                  <ReadOnlyScreening data={screeningData} />
                  <ReadOnlyAnalysis analysisData={analysisData} />
                </>
              ) : (
                <>
                  <div className={formIsDisabled ? 'opacity-70 pointer-events-none' : ''}>
                    <CaseDataForm
                      data={caseData}
                      onChange={setCaseData}
                    />
                    <ClinicalNoteSection
                      value={clinicalNote}
                      onChange={setClinicalNote}
                    />
                  </div>

                  {isPsychologist ? (
                    <>
                      <MLAnalysisResults
                        clasificacion={state.currentDiagnosis?.clasificacion}
                        onViewDetails={() => navigate(`/case-analysis?id=${reviewId || state.currentDiagnosis?.id_diagnostico}`)}
                      />
                      <DiagnosticEditor />
                    </>
                  ) : (
                    <>
                      <div className={formIsDisabled ? 'opacity-70 pointer-events-none' : ''}>
                        <ScreeningScales
                          value={screeningData}
                          onChange={setScreeningData}
                        />
                        <PractitionerAnalysis
                          data={analysisData}
                          onChange={setAnalysisData}
                        />
                      </div>
                      {/* AI Analysis visibility for Practitioner */}
                      <MLAnalysisResults
                        clasificacion={state.currentDiagnosis?.clasificacion}
                        onViewDetails={() => navigate(`/case-analysis?id=${reviewId || state.currentDiagnosis?.id_diagnostico}`)}
                      />
                      {phase === 'input' && !formIsDisabled && (
                        <div className="h-20 flex items-center justify-center border-t border-border">
                          <p className="text-[10px] text-muted-foreground font-medium italic">Completa el análisis clínico antes de ejecutar el sistema.</p>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1">
              {isReviewMode ? (
                <ReviewSidebar
                  clasificacion={state.currentDiagnosis?.clasificacion || null}
                  retroalimentaciones={state.currentDiagnosis?.retroalimentaciones || []}
                  userId={usuario?.id}
                  currentStatusId={typeof state.currentDiagnosis?.estado === 'object' ? state.currentDiagnosis?.estado.id_estado : Number(state.currentDiagnosis?.estado)}
                  onViewDetails={() => navigate(`/case-analysis?id=${reviewId || state.currentDiagnosis?.id_diagnostico}`)}
                  onDownloadPDF={handleDownloadPDF}
                  onSaveFeedback={async (title, comment, feedbackId) => {
                    const id = reviewId || state.currentDiagnosis?.id_diagnostico;
                    if (id) await actions.enviarRetroalimentacion(Number(id), title, comment, feedbackId);
                  }}
                  onViewModelComparison={handleViewModelComparison}
                  onApprove={async () => { if (reviewId) await actions.actualizarEstadoCaso(Number(reviewId), 8); }}
                  onReject={async () => { if (reviewId) await actions.actualizarEstadoCaso(Number(reviewId), 18); }}
                  onReport={async () => { if (reviewId) await actions.actualizarEstadoCaso(Number(reviewId), 9); }}
                  loading={loading}
                />
              ) : isPsychologist ? (
                <DiagnosticSidebar
                  onExecute={async () => {
                    const id =
                      reviewId ||
                      (state.currentDiagnosis as Diagnostico)?.id_diagnostico;
                    if (id) {
                      const res = await actions.ejecutarAnalisisIA(Number(id));
                      if (res && "status" in res && res.status === "processing") {
                        alert(res.message || "Análisis encolado en background. Recibirás un correo cuando finalice.");
                      }
                    } else
                      alert(
                        "Guarde el diagnóstico antes de ejecutar el análisis.",
                      );
                  }}
                  onSave={handleSaveCase}
                  onDownloadPDF={handleDownloadPDF}
                  onViewModelComparison={handleViewModelComparison}
                  retroalimentaciones={
                    state.currentDiagnosis?.retroalimentaciones || []
                  }
                />
              ) : (
                <PractitionerSidebar
                  clasificacion={state.currentDiagnosis?.clasificacion}
                  retroalimentaciones={
                    state.currentDiagnosis?.retroalimentaciones
                  }
                  userSymptoms={analysisData.sintomas}
                  phase={phase}
                  isLoading={loading}
                  onDownloadPDF={handleDownloadPDF}
                  onViewDetails={() =>
                    navigate(
                      `/case-analysis?id=${reviewId || state.currentDiagnosis?.id_diagnostico}`,
                    )
                  }
                  onReprocess={handleOpenReprocessModal}
                  onExecute={async () => {
                    const id_to_analyze = reviewId;
                    if (!id_to_analyze) {
                      try {
                        await handleSaveCase();
                      } catch (err) {
                        console.error(err);
                      }
                    } else {
                      const result = await actions.ejecutarAnalisisIA(
                        Number(id_to_analyze),
                      );
                      if (result && "status" in result && result.status === "processing") {
                        alert(result.message || "Análisis encolado en background. Recibirás un correo cuando finalice.");
                      } else if (
                        result &&
                        !("status" in result && result.status === "processing")
                      ) {
                        setPhase("results");
                      }
                    }
                  }}
                />
              )}
            </div>
          </div>

          {/* Model Selection Modal for Reprocess */}
          <Dialog open={isModelModalOpen} onOpenChange={setIsModelModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Seleccionar Modelo para Reprocesar</DialogTitle>
                <DialogDescription>
                  Elija el modelo de IA que desea utilizar para reprocesar este diagnóstico.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">Modelo</label>
                  <select
                    value={selectedModelVersion}
                    onChange={(e) => setSelectedModelVersion(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-border text-xs font-medium text-foreground bg-background focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                  >
                    <option value="">Usar modelo por defecto (más reciente)</option>
                    {availableModels.map((m) => (
                      <option key={m.id_modelo} value={m.nombre_modelo}>
                        {m.nombre_modelo} {m.precision ? `(${(m.precision * 100).toFixed(1)}%)` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setIsModelModalOpen(false)}
                    className="flex-1 py-2.5 bg-muted hover:bg-muted/80 text-foreground rounded-lg text-xs font-bold transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmReprocess}
                    disabled={loading}
                    className="flex-1 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-xs font-bold transition-all shadow-md shadow-primary/10 disabled:opacity-50"
                  >
                    {loading ? "Procesando..." : "Reprocesar"}
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="mt-16 bg-card border border-border rounded-xl p-4 flex items-center justify-between transition-colors duration-300">
            <p className="text-[10px] text-foreground leading-relaxed">
              <span className="font-bold">Uso Académico:</span> Este sistema es únicamente para fines educativos. Los resultados no constituyen diagnósticos médicos reales y no deben usarse para decisiones clínicas en pacientes reales.
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
