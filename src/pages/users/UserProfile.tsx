import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { PersonalInformationCard } from "@/components/feature/profile/PersonalInformationCard";
import { ActivityStatistics } from "@/components/feature/profile/ActivityStatistics";
import { QuickActions } from "@/components/feature/profile/QuickActions";
import { SystemInfoSection } from "@/components/feature/profile/SystemInfoSection";
import { SupportSection } from "@/components/feature/profile/SupportSection";
import { useUser } from "@/hooks";

export const UserProfile = () => {
  const navigate = useNavigate();
  const userState = useUser();
  const user = userState.usuario;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const userData = {
    nombre: user.nombre || "Usuario",
    email: user.correo || "",
    rol: user.tipo_usuario || "PRACTICANTE",
    fechaRegistro: user.last_login ? new Date(user.last_login).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : "Desconocida",
    imagen: user.imagen
  };

  return (
    <DefaultLayout>
      <div className="bg-background min-h-screen font-poppins pb-20 transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              <PersonalInformationCard user={userData} />
              <ActivityStatistics />
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1">
              <QuickActions />
              <SystemInfoSection />
              <SupportSection />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
