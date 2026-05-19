import { Subtitle, Title } from "@/components/ui";
import { ImageChange, ProfileForm, ThemeSelector } from "@/components/feature/profile/";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { useUser } from "@/hooks";

export const UserProfileSettings = () => {
  const navigate = useNavigate();
  const userState = useUser();
  useEffect(() => {
    if (userState.usuario == null) {
      navigate("/login");
    }
  }, [userState, navigate]);
  return (
    <DefaultLayout>
      <div className="max-w-[1440px] flex flex-col mx-auto gap-5 flex-wrap md:flex-nowrap px-5 2xl:px-0 mt-3">
        <Title type="principal">Configuración de Perfil</Title>
        <Subtitle type="secondary">Actualiza tu información personal y contraseña</Subtitle>
        <div className="flex flex-col md:flex-row gap-5">
          <ImageChange />
          <ProfileForm />
        </div>
        <div className="mb-10">
          <ThemeSelector />
        </div>
      </div>
    </DefaultLayout>
  );
}
