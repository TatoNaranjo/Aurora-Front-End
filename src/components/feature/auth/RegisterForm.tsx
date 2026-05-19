import { useRegister, useInvitationRegister } from "@/hooks";
import type { RegisterData } from "@/types/AuthType";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Field, FieldDescription, FieldError, FieldGroup, FieldLabel, Input } from "@/components/ui";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useServices } from "@/context/useServices";
import { Check, X, Loader2 } from "lucide-react";

const registerSchema = z.object({
  nombre: z.string().min(3, "Nombre muy corto").trim(),
  correo: z.string().email("Correo no valido").min(1, "Correo requerido")
    .toLowerCase().trim(),
  nombreUsuario: z.string().min(3, "Nombre de usuario muy corto").trim(),
  clave: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
    .regex(/[0-9]/, "Debe tener al menos un número")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Debe tener al menos un símbolo"),
  confirmarClave: z.string()
}).refine((data) => data.clave === data.confirmarClave, {
  message: "Las contraseñas no son iguales",
  path: ["confirmarClave"]
});
type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, handleRegister } = useRegister();
  const { loading: invitationLoading, error: invitationError, handleInvitationRegister } = useInvitationRegister();
  const { usuariosService } = useServices();

  // Invitation flow
  const [invitationToken, setInvitationToken] = useState<string | null>(null);
  const [checkingInvitation, setCheckingInvitation] = useState(false);
  const [invitationValid, setInvitationValid] = useState(false);
  const [invitationData, setInvitationData] = useState<{ correo: string; tipo_usuario: string } | null>(null);
  const [invitationCheckError, setInvitationCheckError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre: '',
      correo: '',
      nombreUsuario: '',
      clave: '',
      confirmarClave: '',
    },
    mode: "onBlur"
  });

  const [isUsernameVerified, setIsUsernameVerified] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<'available' | 'taken' | null>(null);

  const { authService } = useServices();

  // Check for invitation token on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('invitation');
    if (token) {
      setInvitationToken(token);
      setCheckingInvitation(true);
      setInvitationCheckError(null);
      usuariosService.checkInvitationToken(token)
        .then((data) => {
          if (data.valid) {
            setInvitationValid(true);
            setInvitationData({
              correo: data.correo || '',
              tipo_usuario: data.tipo_usuario || '',
            });
            form.setValue('correo', data.correo || '');
          } else {
            setInvitationCheckError(data.error || 'Token de invitación inválido o expirado');
          }
        })
        .catch(() => {
          setInvitationCheckError('Error al validar el token de invitación');
        })
        .finally(() => {
          setCheckingInvitation(false);
        });
    }
  }, [location.search, usuariosService, form]);

  const handleVerifyUsername = async () => {
    const username = form.getValues('nombreUsuario');
    if (username.length < 3) return;

    setIsCheckingUsername(true);
    try {
      const { existe } = await authService.checkUsername(username);
      if (existe) {
        setUsernameStatus('taken');
        setIsUsernameVerified(false);
      } else {
        setUsernameStatus('available');
        setIsUsernameVerified(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const usernameValue = form.watch('nombreUsuario');

  useEffect(() => {
    setIsUsernameVerified(false);
    setUsernameStatus(null);
  }, [usernameValue]);

  const onSubmit = async (values: RegisterFormValues) => {
    if (invitationValid && invitationToken) {
      // Register via invitation
      const data = {
        token: invitationToken,
        nombre: values.nombre,
        nombre_usuario: values.nombreUsuario,
        clave: values.clave,
        confirmar_clave: values.confirmarClave,
      };
      const success = await handleInvitationRegister(data);
      if (success) {
        navigate("/register-confirm");
      }
    } else {
      // Normal registration
      const data: RegisterData = {
        nombre: values.nombre,
        correo: values.correo,
        nombre_usuario: values.nombreUsuario,
        clave: values.clave,
        confirmar_clave: values.confirmarClave
      };
      const success = await handleRegister(data);
      if (success) {
        navigate("/register-confirm");
      }
    }
  };

  // Show loading while checking invitation
  if (checkingInvitation) {
    return (
      <Card className="min-w-100 min-h-96 rounded-[5px] md:outline-2 md:outline-offset-[-2px] md:outline-zinc-800/20 flex flex-col items-center justify-center mx-auto">
        <div className="flex flex-col items-center gap-4 py-12">
          <Loader2 className="w-10 h-10 text-foreground animate-spin" />
          <p className="text-sm text-muted-foreground font-medium">Verificando invitación...</p>
        </div>
      </Card>
    );
  }

  // Show error if invitation check failed
  if (invitationToken && invitationCheckError) {
    return (
      <Card className="min-w-100 min-h-96 rounded-[5px] md:outline-2 md:outline-offset-[-2px] md:outline-zinc-800/20 flex flex-col items-center justify-center mx-auto p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
            <X className="w-7 h-7 text-destructive" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Invitación inválida</h3>
          <p className="text-sm text-muted-foreground max-w-xs">{invitationCheckError}</p>
          <Button onClick={() => navigate('/register')} variant="outline" className="mt-2">
            Registro normal
          </Button>
        </div>
      </Card>
    );
  }

  const isLoading = loading || invitationLoading;
  const submitError = error || invitationError;

  return (
    <Card className=" min-w-100 min-h-96 rounded-[5px] md:outline-2 md:outline-offset-[-2px] md:outline-zinc-800/20 flex flex-col items-center justify-between mx-auto">
      <CardHeader>
        <CardTitle className="justify-center text-black text-3xl font-bold mb-1 text-center">
          {invitationValid ? "Completa tu Registro" : "Registro de Usuario"}
        </CardTitle>
        <CardDescription className="justify-center text-muted-foreground text-sm font-normal text-center">
          {invitationValid
            ? `Has sido invitado como ${invitationData?.tipo_usuario}. Completa tus datos para activar tu cuenta.`
            : "Ingresa tus datos para crear una cuenta"}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <form className="flex flex-col gap-5" id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="nombre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="nombre-form-field">
                    NOMBRE
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="Cual es tu nombre?"
                    id="nombre-form-field"
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
                    disabled={invitationValid}
                    className={`rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1 ${invitationValid ? 'bg-muted text-muted-foreground cursor-not-allowed' : ''}`}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  {invitationValid && (
                    <FieldDescription>
                      Correo vinculado a la invitación. No editable.
                    </FieldDescription>
                  )}
                </Field>
              )}
            />
            <Controller
              name="nombreUsuario"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="nombre-usuario-form-field">
                    NOMBRE DE USUARIO
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="Cual es tu nombre de usuario?"
                    id="nombre-usuario-form-field"
                    aria-invalid={fieldState.invalid}
                    className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <FieldDescription>
                    Este sera tu identificador único en el sistema.
                  </FieldDescription>
                </Field>
              )}
            />
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                size={"lg"}
                onClick={handleVerifyUsername}
                disabled={isCheckingUsername || form.getValues('nombreUsuario').length < 3}
                className={isUsernameVerified ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {isCheckingUsername ? "Verificando..." : "Verificar nombre de usuario"}
                {isUsernameVerified && <Check className="ml-2 h-4 w-4" />}
              </Button>
              {usernameStatus === 'taken' && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <X className="h-4 w-4" /> El nombre de usuario ya está en uso
                </p>
              )}
              {usernameStatus === 'available' && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Check className="h-4 w-4" /> Nombre de usuario disponible
                </p>
              )}
            </div>
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
                </Field>
              )}
            />
            <Controller
              name="confirmarClave"
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
                  {/* Mostrar error del servidor si existe */}
                  {submitError && (
                    <p className="text-[0.8rem] font-medium text-destructive">
                      {submitError}
                    </p>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="register-form"
          size={"lg"}
          disabled={isLoading || form.formState.isSubmitting || !isUsernameVerified}
        >
          {isLoading || form.formState.isSubmitting ? "Registrando..." : (invitationValid ? "Completar Registro" : "Regístrate")}
        </Button>
      </CardFooter>
    </Card>
  );
}
