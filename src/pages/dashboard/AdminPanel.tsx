import { DefaultLayout } from "@/layout/DefaultLayout";
import { AdminStatsSummary } from "@/components/feature/clinical/AdminStatsSummary";
import { UserRequestGrid } from "@/components/feature/clinical/UserRequestGrid";
import { useNavigate } from "react-router-dom";

export const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <div className="bg-background min-h-screen font-poppins pb-20 transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold text-foreground">Panel de Administración</h1>
            <p className="text-[11px] font-bold text-muted-foreground tracking-wide uppercase mt-1">Gestión de Usuarios y Solicitudes</p>
          </div>

          <div className="space-y-12">
            {/* Stats */}
            <AdminStatsSummary />

            {/* Main Content Area */}
            <div className="bg-card border border-border rounded-[2rem] p-4 sm:p-12 shadow-sm transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Solicitudes de Usuario y PQRS</h2>
                  <p className="text-[10px] text-muted-foreground font-medium mt-1">Revisa y gestiona las solicitudes de bloqueo y PQRS de usuarios</p>
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                  <button
                    onClick={() => navigate('/admin/pqrs')}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    Bandeja de PQRS &rarr;
                  </button>
                  <button
                    onClick={() => navigate('/admin/users')}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    Directorio Completo &rarr;
                  </button>
                </div>
              </div>

              <UserRequestGrid />
            </div>
          </div>

          {/* Academic Disclaimer */}
          <div className="mt-20 bg-background border border-border rounded-xl p-4 transition-colors duration-300">
            <p className="text-[10px] text-foreground leading-relaxed">
              <span className="font-bold">Uso Académico:</span> Este sistema es únicamente para fines educativos. Los resultados no constituyen diagnósticos médicos reales y no deben usarse para decisiones clínicas en pacientes reales.
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
