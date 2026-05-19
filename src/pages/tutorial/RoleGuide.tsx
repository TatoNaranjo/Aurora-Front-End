import { DefaultLayout } from "@/layout/DefaultLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from "@/components/ui";
import {
  GraduationCap,
  Shield,
  Stethoscope,
  ClipboardCheck,
  Users,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks";

interface RoleInfo {
  key: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  permissions: string[];
  color: string;
}

const roles: RoleInfo[] = [
  {
    key: "PRACTICANTE",
    title: "Practicante",
    icon: <GraduationCap className="w-6 h-6" />,
    description:
      "Estudiantes de psicología o áreas afines que utilizan Aurora para practicar el diagnóstico clínico con casos simulados.",
    permissions: [
      "Crear y gestionar casos clínicos",
      "Ejecutar análisis con modelos de IA",
      "Recibir retroalimentación del sistema",
      "Acceder a la biblioteca de recursos",
    ],
    color: "bg-blue-500",
  },
  {
    key: "PSICOLOGO",
    title: "Psicólogo",
    icon: <Stethoscope className="w-6 h-6" />,
    description:
      "Profesionales de la salud mental que supervisan casos, validan diagnósticos y contribuyen al panel de investigación.",
    permissions: [
      "Todas las funciones del Practicante",
      "Revisar y validar diagnósticos de estudiantes",
      "Dejar retroalimentación estructurada",
      "Acceder al panel de investigación",
    ],
    color: "bg-emerald-500",
  },
  {
    key: "EVALUADOR",
    title: "Evaluador",
    icon: <ClipboardCheck className="w-6 h-6" />,
    description:
      "Especialistas encargados de auditar la calidad de los modelos de IA, reportes y la integridad del sistema.",
    permissions: [
      "Auditar reportes generados por el sistema",
      "Validar integridad de modelos de IA",
      "Generar métricas de calidad",
      "Acceder a pruebas de validación",
    ],
    color: "bg-amber-500",
  },
  {
    key: "MODERADOR",
    title: "Moderador",
    icon: <Users className="w-6 h-6" />,
    description:
      "Gestores de la comunidad y del contenido. Supervisan PQRS, usuarios y mantienen el orden en la plataforma.",
    permissions: [
      "Gestionar solicitudes PQRS",
      "Administrar usuarios y roles",
      "Acceder al panel administrativo",
      "Supervisar contenido de investigación",
    ],
    color: "bg-purple-500",
  },
  {
    key: "ADMIN",
    title: "Administrador",
    icon: <Shield className="w-6 h-6" />,
    description:
      "Control total de la plataforma. Configuran el sistema, gestionan modelos de IA y supervisan todas las operaciones.",
    permissions: [
      "Todas las funciones del Moderador",
      "Configurar y entrenar modelos de IA",
      "Gestionar permisos globales",
      "Acceso completo a métricas y auditoría",
    ],
    color: "bg-rose-500",
  },
];

const steps = [
  {
    step: "01",
    title: "Regístrate",
    description:
      "Crea tu cuenta en Aurora. Si recibiste una invitación, podrás registrarte directamente con el rol asignado.",
  },
  {
    step: "02",
    title: "Explora tu rol",
    description:
      "Una vez dentro, revisa las funciones disponibles en tu dashboard según tu perfil de usuario.",
  },
  {
    step: "03",
    title: "Practica o supervisa",
    description:
      "Comienza a crear casos clínicos, revisa análisis de IA, o valida el trabajo de otros usuarios.",
  },
];

export const RoleGuide = () => {
  const navigate = useNavigate();
  const { usuario } = useUser();

  return (
    <DefaultLayout>
      <div className="bg-background min-h-screen font-poppins pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-4 transition-colors duration-300">
              <BookOpen className="w-4 h-4" />
              Documentación
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Guía de Roles y Permisos
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Aurora define cinco perfiles de usuario, cada uno diseñado para una función específica dentro del ecosistema clínico y académico.
            </p>
          </div>

          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {roles.map((role) => (
              <Card
                key={role.key}
                className="rounded-2xl border-border shadow-sm hover:shadow-md transition-all duration-300 bg-card overflow-hidden group"
              >
                <CardHeader className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${role.color} text-white flex items-center justify-center shadow-sm`}
                    >
                      {role.icon}
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground">
                      {role.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <ul className="space-y-2">
                    {role.permissions.map((perm, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{perm}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* How to start */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                ¿Cómo empezar?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Tres pasos simples para comenzar a utilizar Aurora según tu rol.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="relative p-8 rounded-2xl border border-border bg-card transition-colors duration-300"
                >
                  <span className="text-5xl font-bold text-primary/10 absolute top-4 right-4">
                    {s.step}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-2 relative z-10">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-10 rounded-3xl border border-border bg-card transition-colors duration-300">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              ¿Listo para comenzar?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {usuario
                ? "Dirígete a tu dashboard y empieza a explorar las funcionalidades de Aurora."
                : "Regístrate en Aurora y descubre cómo la inteligencia artificial puede potenciar tu práctica clínica."}
            </p>
            <Button
              onClick={() =>
                navigate(usuario ? "/dashboard" : "/register")
              }
              size="lg"
            >
              {usuario ? "Ir al Dashboard" : "Crear Cuenta"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
