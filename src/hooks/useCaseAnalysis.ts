import { useState, useEffect } from "react";
import { useServices } from "@/context/useServices";

interface CaseData {
  id: string;
  lastConsultation: string;
  ageGroup: string;
  gender: string;
  clinicalVignette: string;
  analysis: {
    globalScore: number;
    maxScore: number;
    symptoms: { name: string; value: number }[];
    shapExplanation: [string, number][];
    classificationLabel?: string;
  };
  criteria: {
    dsm5: { id: string; title: string; description: string; met: boolean }[];
    cie11: { id: string; title: string; description: string }[];
  };
}

export const useCaseAnalysis = (caseId?: string) => {
  const [data, setData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { diagnosticosService } = useServices();

  useEffect(() => {
    const fetchData = async () => {
      if (!caseId) return;

      setLoading(true);
      try {
        const realData = await diagnosticosService.getDiagnosticoById(
          Number(caseId),
        );

        // Map backend Diagnostico to frontend CaseData
        // Construir lista combinada de síntomas (ML + Practitioner)
        const diagnosis = realData;
        const mlSymptoms = Array.isArray(
          diagnosis.clasificacion?.ml_sintomas_identificados,
        )
          ? diagnosis.clasificacion.ml_sintomas_identificados.map(
              (s: any) => s.symptom,
            )
          : [];
        const prSymptoms = (realData.sintomas_identificados || []).map((s) =>
          s.name.toLowerCase(),
        );

        const hasSymptom = (mlKey: string, prKeywords: string[]) => {
          if (mlSymptoms.includes(mlKey)) return true;
          return prSymptoms.some((s) =>
            prKeywords.some((kw) => s.includes(kw)),
          );
        };

        const staticDsm5 = [
          {
            id: "A1",
            title: "Criterio A1",
            description:
              "Estado de ánimo deprimido la mayor parte del día, casi todos los días.",
            met: hasSymptom("animo_depresivo", ["deprimido", "tristeza"]),
          },
          {
            id: "A2",
            title: "Criterio A2",
            description:
              "Disminución importante del interés o el placer por todas o casi todas las actividades.",
            met: hasSymptom("anhedonia", ["anhedonia", "interés"]),
          },
          {
            id: "A3",
            title: "Criterio A3",
            description:
              "Pérdida importante de peso sin hacer dieta o aumento de peso, o disminución o aumento del apetito.",
            met: hasSymptom("peso_apetito", ["peso", "apetito"]),
          },
          {
            id: "A4",
            title: "Criterio A4",
            description: "Insomnio o hipersomnia casi todos los días.",
            met: hasSymptom("sueno", ["sueño", "insomnio", "hipersomnia"]),
          },
          {
            id: "A5",
            title: "Criterio A5",
            description: "Agitación o retraso psicomotor casi todos los días.",
            met: hasSymptom("psicomotor", [
              "agitación",
              "retraso",
              "psicomotor",
            ]),
          },
          {
            id: "A6",
            title: "Criterio A6",
            description: "Fatiga o pérdida de energía casi todos los días.",
            met: hasSymptom("fatiga", ["fatiga", "energía"]),
          },
          {
            id: "A7",
            title: "Criterio A7",
            description:
              "Sentimiento de inutilidad o culpabilidad excesiva o inapropiada.",
            met: hasSymptom("culpa_inutibilidad", ["culpa", "inutilidad"]),
          },
          {
            id: "A8",
            title: "Criterio A8",
            description:
              "Disminución de la capacidad para pensar o concentrarse, o para tomar decisiones.",
            met: hasSymptom("concentracion", [
              "concentrar",
              "pensar",
              "decisiones",
            ]),
          },
          {
            id: "A9",
            title: "Criterio A9",
            description:
              "Pensamientos de muerte recurrentes, ideas suicidas, intento de suicidio o un plan específico.",
            met: hasSymptom("suicidio", ["suicida", "muerte", "suicidio"]),
          },
        ];

        const mappedData: CaseData = {
          id: String(realData.id_diagnostico),
          lastConsultation: new Date(realData.fecha).toLocaleDateString(),
          ageGroup:
            diagnosis.paciente?.rango_edad === 1
              ? "Niño"
              : diagnosis.paciente?.rango_edad === 2
                ? "Adolescente"
                : "Adulto",
          gender: diagnosis.paciente?.sexo === 1 ? "Masculino" : "Femenino",
          clinicalVignette: realData.historia_clinica,
          analysis: {
            globalScore:
              (diagnosis.clasificacion?.probabilidad_certeza || 0) * 100,
            maxScore: 100,
            classificationLabel: diagnosis.clasificacion?.nombre_etiqueta,
            symptoms: (Array.isArray(diagnosis.clasificacion?.ml_sintomas_identificados) ? diagnosis.clasificacion.ml_sintomas_identificados : []).map((s: any) => ({

              name: s.symptom
                ? s.symptom.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())
                : "Desconocido",
              value: s.matches || 0,
              intensity: s.intensity
            })),

            shapExplanation: Array.isArray(
              diagnosis.clasificacion?.ml_lime_explicacion,
            )
              ? (diagnosis.clasificacion.ml_lime_explicacion as [
                  string,
                  number,
                ][])
              : [],
          },
          criteria: {
            dsm5: staticDsm5,
            cie11: [],
          },
        };

        setData(mappedData);
      } catch (err: unknown) {
        console.error("Error fetching diagnosis analytics:", err);
        setError("Error al cargar los datos del caso");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [caseId, diagnosticosService]);

  return { data, loading, error };
};
