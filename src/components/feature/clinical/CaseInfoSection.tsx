import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useMemo } from "react";

interface CaseInfoSectionProps {
  ageGroup: string;
  gender: string;
  clinicalVignette: string;
  shapExplanation?: [string, number][];
}

const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const CaseInfoSection = ({ ageGroup, gender, clinicalVignette, shapExplanation }: CaseInfoSectionProps) => {
  const highlightedText = useMemo(() => {
    if (!shapExplanation || shapExplanation.length === 0) return clinicalVignette;

    let result = escapeHtml(clinicalVignette);
    // Sort features by length descending so that subset words don't replace longer matches prematurely
    const sortedFeatures = [...shapExplanation].sort((a, b) => b[0].length - a[0].length);

    // Threshold for coloring - if weight is lower than this, it won't have background color
    const COLOR_THRESHOLD = 0.02;

    sortedFeatures.forEach(([feature, weight]) => {
      // Escape feature for regex
      const safeFeature = feature.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Regex boundary for word mapping
      const regex = new RegExp(`\\b(${safeFeature})\\b`, 'gi');

      const isSignificant = Math.abs(weight) >= COLOR_THRESHOLD;
      const percentage = (Math.abs(weight) * 100).toFixed(1);
      const isPositive = weight > 0;
      
      const directionLabel = isPositive ? 'Detección de Depresión' : 'No Depresión / Control';
      const tooltip = `Influencia: ${percentage}% hacia ${directionLabel}`;

      let className = "px-1 py-0.5 rounded transition-all duration-200 cursor-help ";
      
      if (isSignificant) {
        className += isPositive
          ? 'bg-rose-100 text-rose-900 font-bold border-b-2 border-rose-300 dark:bg-rose-900/30 dark:text-rose-200 dark:border-rose-700'
          : 'bg-emerald-100 text-emerald-900 font-bold border-b-2 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-700';
      } else {
        className += 'hover:bg-muted border-b border-dotted border-muted-foreground';
      }

      result = result.replace(regex, `<span class="${className} mx-0.5" title="${tooltip}">$1</span>`);
    });

    return result;
  }, [clinicalVignette, shapExplanation]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="md:col-span-1 rounded-xl shadow-sm border-border transition-colors duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Información del Caso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm font-semibold text-primary">
            Grupo de Edad: <span className="text-muted-foreground font-normal">{ageGroup}</span>
          </p>
          <p className="text-sm font-semibold text-primary">
            Sexo: <span className="text-muted-foreground font-normal">{gender}</span>
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 rounded-xl shadow-sm border-border transition-colors duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Viñeta Clínica</CardTitle>
          <p className="text-xs text-primary font-medium italic">
            Texto analizado para la detección de patrones de depresión
          </p>
        </CardHeader>
        <CardContent>
          <p
            className="text-foreground leading-relaxed text-sm whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
