import { Share2 } from "lucide-react";

interface ModelCardProps {
  name: string;
  precision: number;
  isSelected?: boolean;
}

const ModelCard = ({ name, precision, isSelected }: ModelCardProps) => (
  <button className={`flex-1 rounded-2xl border p-6 transition-colors duration-300 text-left ${isSelected
      ? "bg-primary border-primary shadow-lg shadow-primary/10 ring-4 ring-primary/20"
      : "bg-primary/10 border-primary/20 hover:bg-primary/10"
    }`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${isSelected ? "bg-primary-foreground/20" : "bg-primary"}`}>
        <Share2 className="w-4 h-4 text-primary-foreground" />
      </div>
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
        }`}>
        {isSelected ? "Principal" : "Pruebas"}
      </span>
    </div>
    <p className={`text-sm font-bold mb-1 ${isSelected ? "text-primary-foreground" : "text-foreground"}`}>{name}</p>
    <div className="flex items-center justify-between">
      <span className={`text-[10px] font-medium ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>Precisión</span>
      <span className={`text-xs font-bold ${isSelected ? "text-primary-foreground" : "text-foreground"}`}>{precision}%</span>
    </div>
    <div className={`h-1 w-full rounded-full mt-2 overflow-hidden ${isSelected ? "bg-primary-foreground/20" : "bg-muted"}`}>
      <div
        className={`h-full rounded-full transition-all duration-1000 ${isSelected ? "bg-primary-foreground" : "bg-primary"}`}
        style={{ width: `${precision}%` }}
      />
    </div>
  </button>
);

export const ModelCardsGrid = () => {
  return (
    <div className="flex gap-6 flex-col md:flex-row mb-10">
      <ModelCard name="Random Forest" precision={85} isSelected={true} />
      <ModelCard name="Red Neuronal" precision={82} />
      <ModelCard name="SVM" precision={72} />
      <ModelCard name="Ensemble" precision={90} />
    </div>
  );
};
