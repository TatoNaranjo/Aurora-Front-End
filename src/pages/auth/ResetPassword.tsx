import { ResetPasswordForm } from "@components/feature/auth"
import LoginIllustration1 from "@assets/images/login_illustration1.svg"
import LoginIllustration2 from "@assets/images/login_illustration2.svg"
import { DefaultLayout } from "@/layout/DefaultLayout";
import { useParams } from "react-router-dom";

export const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();

  return (
    <DefaultLayout>
      <div className="flex items-center align-middle flex-grow">
        <img src={LoginIllustration1} alt="login ilustration" className="hidden lg:w-[200px] xl:w-[300px] lg:block lg:absolute lg:top-30 lg:left-10 xl:top-30 xl:left-20" />
        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <div className="mx-auto text-center bg-card p-8 rounded shadow-md transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-4">Token Inválido</h2>
            <p>No se proporcionó un token válido para restablecer la contraseña.</p>
          </div>
        )}
        <img src={LoginIllustration2} alt="login ilustration" className="hidden lg:w-[200px] xl:w-[300px] lg:block lg:absolute lg:right-10 lg:bottom-30 xl:right-20 xl:bottom-30" />
      </div>
    </DefaultLayout>
  );
}

export default ResetPassword;
