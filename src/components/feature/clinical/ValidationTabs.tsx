type ValidationTabType = 'dashboard' | 'upload' | 'reports' | 'performance';

interface ValidationTabsProps {
  activeTab: ValidationTabType;
  onTabChange: (tab: ValidationTabType) => void;
}

export const ValidationTabs = ({ activeTab, onTabChange }: ValidationTabsProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'upload', label: 'Carga de Archivos' },
    { id: 'reports', label: 'Validación de Reportes' },
    { id: 'performance', label: 'Rendimiento de Modelo' },
  ];

  return (
    <div className="bg-muted p-1 rounded-xl flex flex-col sm:flex-row gap-1 mb-12">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as ValidationTabType)}
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
