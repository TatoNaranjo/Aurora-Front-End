import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useServices } from "@/context/useServices";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { ApiError } from "@/types/ErrorType";

export const AccountActivation = () => {
  const { authService } = useServices();
  const navigate = useNavigate();

  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const performActivation = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Token de activación no encontrado.");
        return;
      }

      try {
        await authService.activateAccount(token);
        setStatus("success");
        setMessage("¡Tu cuenta ha sido activada exitosamente!");
        // Redirect to login after 5 seconds
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } catch (err: unknown) {
        setStatus("error");
        let errorMessage = "Error al activar la cuenta. El token puede haber expirado.";
        if (err instanceof ApiError) {
          errorMessage = err.message;
        }
        setMessage(errorMessage);
      }
    };

    performActivation();
  }, [token, navigate, authService]);

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center flex-grow p-4">
        <Card className="w-full max-w-md transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Activación de Cuenta</CardTitle>
            <CardDescription>
              {status === "loading" && "Estamos verificando tu token..."}
              {status === "success" && "¡Bienvenido!"}
              {status === "error" && "Hubo un problema"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8 gap-4">
            {status === "loading" && (
              <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
            )}
            {status === "success" && (
              <>
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <p className="text-center font-medium">{message}</p>
                <p className="text-sm text-muted-foreground text-center">
                  Serás redirigido a la página de inicio de sesión en unos segundos.
                </p>
              </>
            )}
            {status === "error" && (
              <>
                <XCircle className="h-16 w-16 text-red-500" />
                <p className="text-center font-medium text-red-600">{message}</p>
              </>
            )}
          </CardContent>
          <CardFooter className="justify-center">
            {status !== "loading" && (
              <Button asChild>
                <Link to="/login">Ir al Inicio de Sesión</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </DefaultLayout>
  );
};
