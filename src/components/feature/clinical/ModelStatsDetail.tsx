import { Card, CardHeader, CardTitle } from "@/components/ui";

interface CharacteristicProps {
  text: string;
}

const Characteristic = ({ text }: CharacteristicProps) => (
  <div className="flex items-start gap-3">
    <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
    <span className="text-[11px] font-medium text-muted-foreground leading-relaxed">{text}</span>
  </div>
);

interface VariableImportanceProps {
  label: string;
  value: number;
}

const VariableImportance = ({ label, value }: VariableImportanceProps) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center text-[10px] font-bold text-foreground">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border">
      <div
        className="h-full bg-primary rounded-full transition-all duration-1000"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export const ModelStatsDetail = () => {
  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 mt-6 transition-colors duration-300">
      <CardHeader className="p-0 mb-8 border-b border-border pb-6">
        <CardTitle className="text-xl font-bold text-foreground mb-1">Modelo Random Forest:</CardTitle>
        <p className="text-[10px] text-muted-foreground font-medium">Algoritmo basado en combinar múltiples árboles de decisión que identifica patrones de sentimientos y comportamientos.</p>
      </CardHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-10">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Características del Modelo</h4>
            <div className="space-y-3">
              <Characteristic text="Utiliza 150 árboles de decisión para clasificación" />
              <Characteristic text="Entrenado con 2,000 casos clínicos validados" />
              <Characteristic text="Optimizado para minimizar falsos negativos" />
              <Characteristic text="Actualizaciones en entrenamiento con nuevos datos" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Métricas de Rendimiento</h4>
            <div className="grid grid-cols-2 gap-y-3">
              {[
                { label: "Precisión", value: "85%" },
                { label: "Sensibilidad", value: "82%" },
                { label: "Especificidad", value: "83%" },
                { label: "F1-Score", value: "84%" }
              ].map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span className="text-[10px] font-bold text-foreground">{m.label}</span>
                  <span className="text-[10px] font-medium text-muted-foreground">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-foreground">Importancia de Variables</h4>
            <div className="space-y-4">
              <VariableImportance label="Estado de Ánimo deprimido" value={85} />
              <VariableImportance label="Anhedonia" value={77} />
              <VariableImportance label="Alteraciones del sueño" value={72} />
              <VariableImportance label="Fatiga" value={67} />
              <VariableImportance label="Pensamientos Suicidas" value={85} />
              <VariableImportance label="Otros Factores" value={61} />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Ajuste del Umbral de Predicción</h4>
            <p className="text-[9px] text-muted-foreground font-medium">Ajusta el nivel de confianza para las predicciones. Un umbral bajo permite identificar más casos pero puede aumentar falsos positivos.</p>
            <div className="pt-4 px-2">
              <div className="relative h-2 w-full bg-muted rounded-full">
                <div className="absolute left-[30%] right-[10%] top-0 bottom-0 bg-primary/10 border-x-2 border-primary flex items-center justify-between px-1">
                  <div className="w-4 h-4 rounded-full bg-card border-2 border-primary absolute left-[-8px] top-[-4px]" />
                  <div className="w-4 h-4 rounded-full bg-card border-2 border-primary absolute right-[-8px] top-[-4px]" />
                </div>
              </div>
              <div className="flex justify-between items-center mt-3 text-[10px] font-bold text-foreground">
                <span>50%</span>
                <span className="text-primary">Umbral Predeterminado: 75%</span>
                <span>95%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
