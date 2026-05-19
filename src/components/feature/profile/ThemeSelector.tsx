import { useTheme } from "@/hooks";
import { Sun, Moon, Monitor } from "lucide-react";

type ThemeOption = {
  value: 'light' | 'dark' | 'system';
  label: string;
  icon: React.ReactNode;
};

const options: ThemeOption[] = [
  { value: 'light', label: 'Claro', icon: <Sun className="w-4 h-4" /> },
  { value: 'dark', label: 'Oscuro', icon: <Moon className="w-4 h-4" /> },
  { value: 'system', label: 'Sistema', icon: <Monitor className="w-4 h-4" /> },
];

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full bg-card border border-border rounded-2xl p-8 shadow-sm transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold text-foreground mb-1">Apariencia</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Selecciona el tema que prefieras para la interfaz. El modo Sistema se adapta automáticamente a la configuración de tu dispositivo.
      </p>

      <div className="flex gap-3">
        {options.map((opt) => {
          const isActive = theme === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setTheme(opt.value)}
              className={`
                flex-1 flex flex-col items-center gap-2 py-4 px-3 rounded-xl border text-sm font-semibold
                transition-all duration-300
                ${isActive
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
