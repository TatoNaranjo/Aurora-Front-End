import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Send, CheckCircle2 } from "lucide-react";
import { ReportesService } from "@/services/ReportesService";

export const PQRSForm = () => {
  const [formData, setFormData] = useState<{
    tipo: 'PETICION' | 'QUEJA' | 'RECLAMO' | 'SUGERENCIA';
    asunto: string;
    mensaje: string;
  }>({
    tipo: "PETICION",
    asunto: "",
    mensaje: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reportesService = new ReportesService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await reportesService.createPQRS(formData);
      setSubmitted(true);
    } catch {
      setError("Hubo un error al enviar su solicitud. Por favor intente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="rounded-[2.5rem] border-border shadow-sm overflow-hidden bg-card transition-colors duration-300">
        <CardContent className="p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-foreground">¡Solicitud Enviada!</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Hemos recibido su PQRS satisfactoriamente. Nuestro equipo administrativo revisará su solicitud y le responderá a la brevedad posible.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 px-8 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold transition-all hover:bg-primary/90"
          >
            Enviar otra solicitud
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-[2.5rem] border-border shadow-sm overflow-hidden bg-card transition-colors duration-300">
      <CardHeader className="p-8 border-b border-border">
        <CardTitle className="text-xl font-bold">Enviar PQRS</CardTitle>
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-1">Peticiones, Quejas, Reclamos y Sugerencias</p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">Tipo de Solicitud</label>
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value as "PETICION" | "QUEJA" | "RECLAMO" | "SUGERENCIA" })}
                className="w-full p-3 rounded-xl border border-border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-background transition-colors duration-300"
                required
              >
                <option value="PETICION">Petición</option>
                <option value="QUEJA">Queja</option>
                <option value="RECLAMO">Reclamo</option>
                <option value="SUGERENCIA">Sugerencia</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">Asunto</label>
              <input
                type="text"
                value={formData.asunto}
                onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                placeholder="Ej. Error en reporte clínico"
                className="w-full p-3 rounded-xl border border-border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-background transition-colors duration-300"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">Mensaje / Descripción</label>
            <textarea
              rows={4}
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
              placeholder="Describa detalladamente su solicitud o inquietud..."
              className="w-full p-4 rounded-xl border border-border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none bg-background transition-colors duration-300"
              required
            />
          </div>

          {error && <p className="text-destructive text-[10px] font-bold">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-10 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs font-bold transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2 disabled:opacity-50 transition-colors duration-300"
          >
            {loading ? "Enviando..." : (
              <>
                <Send className="w-4 h-4" /> Enviar Solicitud
              </>
            )}
          </button>
        </form>
      </CardContent>
    </Card>
  );
};
