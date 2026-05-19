import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Field, FieldError, FieldGroup, FieldLabel, Input } from "@/components/ui";
import { useResetPassword } from "@/hooks";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const resetPasswordSchema = z.object({
  clave: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
    .regex(/[0-9]/, "Debe tener al menos un número")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Debe tener al menos un símbolo"),
  confirmar_clave: z.string()
}).refine((data) => data.clave === data.confirmar_clave, {
  message: "Las contraseñas no coinciden",
  path: ["confirmar_clave"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const navigate = useNavigate();
  const { loading, error, handleConfirmReset } = useResetPassword();
  const [isSuccess, setIsSuccess] = useState(false);

  // Definición del formulario
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      clave: '',
      confirmar_clave: '',
    },
    mode: "onBlur"
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    const success = await handleConfirmReset({
      token,
      clave: values.clave,
      confirmar_clave: values.confirmar_clave
    });
    if (success) {
      setIsSuccess(true);
    }
  }

  if (isSuccess) {
    return (
      <Card className=" min-w-100 min-h-64 rounded-[5px] md:outline-2 md:outline-offset-[-2px] md:outline-zinc-800/20 flex flex-col items-center justify-center mx-auto p-8">
        <CardHeader>
          <CardTitle className="text-foreground text-2xl font-bold mb-2 text-center">
            Contraseña Restablecida
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm font-normal text-center">
            Tu contraseña ha sido actualizada exitosamente. Ya puedes iniciar sesión.
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-4">
          <Button onClick={() => navigate("/login")} size="lg">
            Ir al Inicio de Sesión
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className=" min-w-100 min-h-96 rounded-[5px] md:outline-2 md:outline-offset-[-2px] md:outline-zinc-800/20 flex flex-col items-center justify-between mx-auto">
      <CardHeader>
        <CardTitle className="justify-center text-foreground text-3xl font-bold mb-1 text-center">
          Nueva Contraseña
        </CardTitle>
        <CardDescription className="justify-center text-muted-foreground text-sm font-normal text-center">
          Ingresa tu nueva contraseña para acceder a la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <form className="flex flex-col gap-8" id="reset-password-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="clave"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="clave-form-field">
                    NUEVA CONTRASEÑA
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
                </Field>
              )}
            />
            <Controller
              name="confirmar_clave"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmar-clave-form-field">
                    CONFIRMAR CONTRASEÑA
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="*******************"
                    type="password"
                    id="confirmar-clave-form-field"
                    aria-invalid={fieldState.invalid}
                    className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  {error && (
                    <p className="text-[0.8rem] font-medium text-destructive mt-2">
                      {error}
                    </p>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="w-full px-6 pb-8">
        <Button type="submit" form="reset-password-form" size={"lg"} className="w-full" disabled={loading || form.formState.isSubmitting} >
          {loading || form.formState.isSubmitting ? "Actualizando..." : "Actualizar Contraseña"}
        </Button>
      </CardFooter>
    </Card>
  );
}
