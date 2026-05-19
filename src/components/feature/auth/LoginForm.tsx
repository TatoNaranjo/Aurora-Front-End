import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Field, FieldError, FieldGroup, FieldLabel, Input } from "@/components/ui";
import { useLogin, useUser } from "@/hooks";
import type { LoginData } from "@/types/AuthType";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  correo: z.string().email("Correo no valido")
    .min(1, "Debe ingresar un correo")
    .toLowerCase().trim(),
  clave: z.string().min(6, "Contraseña muy corta")
})

type LoginFormValues = z.infer<typeof loginSchema>;


export const LoginForm = () => {
  const navigate = useNavigate();
  const userState = useUser();
  const { loading, error, handleLogin } = useLogin();

  // Definición del formulario
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      correo: '',
      clave: '',
    },
    mode: "onBlur"
  });

  useEffect(() => {
    if (userState.usuario != null && !userState.loading) {
      navigate("/dashboard");
    }
  }, [userState, navigate]);

  // Función para hacer la consulta de inicio de sesión y guardar el usuario
  const onSubmit = async (values: LoginFormValues) => {
    const data: LoginData = {
      correo: values.correo,
      clave: values.clave
    }
    const success = await handleLogin(data);
    if (success) {
      navigate("/dashboard");
    }
  }

  return (
    <Card className=" min-w-100 min-h-96 rounded-[5px] md:outline-2 md:outline-offset-[-2px] md:outline-zinc-800/20 flex flex-col items-center justify-between mx-auto">
      <CardHeader>
        <CardTitle className="justify-center text-foreground text-3xl font-bold mb-1 text-center">
          Inicio de Sesión
        </CardTitle>
        <CardDescription className="justify-center text-muted-foreground text-sm font-normal text-center">
          Ingresa tus datos para acceder a la Plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <form className="flex flex-col gap-8" id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="correo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="correo-form-field">
                    CORREO ELECTRÓNICO
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="tu@ejemplo.com"
                    id="correo-form-field"
                    aria-invalid={fieldState.invalid}
                    className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="clave"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="clave-form-field">
                    CONTRASEÑA
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="*******************"
                    type="password"
                    id="clave-form-field"
                    aria-invalid={fieldState.invalid}
                    className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <div className="flex flex-col gap-1">
                    <Button variant={"link"} size={"sm"} onClick={() => navigate("/forgot-password")} type="button">Olvide mi contraseña</Button>
                    {/* Mostrar error del servidor si existe */}
                    {error && (
                      <p className="text-[0.8rem] font-medium text-destructive">
                        {error}
                      </p>
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="login-form" size={"lg"} disabled={loading || form.formState.isSubmitting} >
          {loading || form.formState.isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
      </CardFooter>
    </Card>
  );
}
