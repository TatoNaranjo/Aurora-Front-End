import { cn } from "@/lib/utils";

interface AnalysisTabsProps {
  activeTab: 'analysis' | 'criteria';
  setActiveTab: (tab: 'analysis' | 'criteria') => void;
}

export const AnalysisTabs = ({ activeTab, setActiveTab }: AnalysisTabsProps) => {
  return (
    <div className="flex bg-muted p-1.5 rounded-xl mb-8 w-full transition-colors duration-300">
      <button
        onClick={() => setActiveTab('analysis')}
        className={cn(
          "flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition-all duration-200",
          activeTab === 'analysis'
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
        )}
      >
        Análisis
      </button>
      <button
        onClick={() => setActiveTab('criteria')}
        className={cn(
          "flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition-all duration-200",
          activeTab === 'criteria'
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
        )}
      >
        Criterios Diagnósticos
      </button>
    </div>
  );
};
