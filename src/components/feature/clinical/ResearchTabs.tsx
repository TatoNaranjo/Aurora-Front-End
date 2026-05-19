import { useUser } from "@/hooks";

type TabType = 'poblacional' | 'modelos' | 'patrones' | 'cohortes' | 'gestion_modelos';

interface ResearchTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const ResearchTabs = ({ activeTab, onTabChange }: ResearchTabsProps) => {
  const { usuario } = useUser();
  const tabs = [
    { id: 'poblacional', label: 'Análisis Poblacional' },
    { id: 'modelos', label: 'Evaluación de Modelos' },
    { id: 'patrones', label: 'Patrones Sintomáticos' },
    { id: 'cohortes', label: 'Comparación de Cohortes' },
  ];

  if (usuario?.tipo_usuario === 'ADMIN') {
    tabs.push({ id: 'gestion_modelos', label: 'Gestión de Modelos' });
  }

  return (
    <div className="bg-muted p-1 rounded-xl flex flex-col sm:flex-row gap-1 mb-12">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as TabType)}
          className={`flex-grow py-3 px-6 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.id
            ? 'bg-card text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
