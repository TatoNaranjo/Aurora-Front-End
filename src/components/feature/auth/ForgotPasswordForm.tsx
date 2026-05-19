import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Field, FieldError, FieldGroup, FieldLabel, Input } from "@/components/ui";
import { useForgotPassword } from "@/hooks";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const forgotPasswordSchema = z.object({
  correo: z.string().email("Correo no valido")
    .min(1, "Debe ingresar un correo")
    .toLowerCase().trim(),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { loading, error, handleRequestReset } = useForgotPassword();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Definición del formulario
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      correo: '',
    },
    mode: "onBlur"
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    const success = await handleRequestReset(values.correo);
    if (success) {
      setIsSubmitted(true);
    }
  }

  if (isSubmitted) {
    return (
      <Card className=" min-w-100 min-h-64 rounded-[5px] md:outline-2 md:outline-offset-[-2px] md:outline-zinc-800/20 flex flex-col items-center justify-center mx-auto p-8">
        <CardHeader>
          <CardTitle className="text-foreground text-2xl font-bold mb-2 text-center">
            Correo Enviado
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm font-normal text-center">
            Si el correo está registrado, recibirás un enlace para restablecer tu contraseña en unos momentos.
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-4">
          <Button onClick={() => navigate("/login")} variant="outline">
            Volver al Inicio de Sesión
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className=" min-w-100 min-h-96 rounded-[5px] md:outline-2 md:outline-offset-[-2px] md:outline-zinc-800/20 flex flex-col items-center justify-between mx-auto">
      <CardHeader>
        <CardTitle className="justify-center text-foreground text-3xl font-bold mb-1 text-center">
          Recuperar Contraseña
        </CardTitle>
        <CardDescription className="justify-center text-muted-foreground text-sm font-normal text-center">
          Ingresa tu correo electrónico para recibir un enlace de recuperación
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <form className="flex flex-col gap-8" id="forgot-password-form" onSubmit={form.handleSubmit(onSubmit)}>
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
      <CardFooter className="flex flex-col gap-4 w-full px-6 pb-8">
        <Button type="submit" form="forgot-password-form" size={"lg"} className="w-full" disabled={loading || form.formState.isSubmitting} >
          {loading || form.formState.isSubmitting ? "Enviando..." : "Enviar Enlace"}
        </Button>
        <Button variant={"link"} size={"sm"} onClick={() => navigate("/login")} type="button">
          Volver al Inicio de Sesión
        </Button>
      </CardFooter>
    </Card>
  );
}
