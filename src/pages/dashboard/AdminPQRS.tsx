import { useState, useEffect, useCallback } from "react";
import { DefaultLayout } from "@/layout/DefaultLayout";
import {
  Search,
  CheckCircle2,
  Clock,
  MessageCircle,
  Inbox,
  Filter,
  Send,
  Loader2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { usePQRS } from "@/hooks/usePQRS";
import type { PQRS } from "@/types/BackendTypes";

export const AdminPQRS = () => {
  const { pqrsList, getAllPQRS, marcarLeido, responderPQRS, loading } = usePQRS();
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("TODAS");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [respuestaText, setRespuestaText] = useState("");
  const [respondingId, setRespondingId] = useState<number | null>(null);

  useEffect(() => {
    getAllPQRS();
  }, [getAllPQRS]);

  const handleExpand = useCallback(async (pqrs: PQRS) => {
    if (expandedId === pqrs.id_pqrs) {
      setExpandedId(null);
      setRespuestaText("");
    } else {
      setExpandedId(pqrs.id_pqrs);
      setRespuestaText(pqrs.respuesta || "");
      if (!pqrs.leido) {
        await marcarLeido(pqrs.id_pqrs);
      }
    }
  }, [expandedId, marcarLeido]);

  const handleResponder = async (id: number) => {
    if (!respuestaText.trim()) return;
    setRespondingId(id);
    await responderPQRS(id, respuestaText);
    setRespuestaText("");
    setExpandedId(null);
    setRespondingId(null);
  };

  const filteredPqrs = pqrsList.filter((pqrs) => {
    const searchMatch =
      pqrs.asunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pqrs.usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pqrs.usuario.correo.toLowerCase().includes(searchTerm.toLowerCase());

    if (estadoFilter === "LEIDAS") return searchMatch && pqrs.leido;
    if (estadoFilter === "NO_LEIDAS") return searchMatch && !pqrs.leido;
    if (estadoFilter === "RESPONDIDAS") return searchMatch && pqrs.respuesta;
    if (estadoFilter === "EN_ESPERA") return searchMatch && !pqrs.respuesta;
    return searchMatch;
  });

  const getTipoBadge = (tipo: string) => {
    const styles: Record<string, string> = {
      PETICION: "bg-blue-50 text-blue-700 border-blue-100",
      QUEJA: "bg-orange-50 text-orange-700 border-orange-100",
      RECLAMO: "bg-red-50 text-red-700 border-red-100",
      SUGERENCIA: "bg-emerald-50 text-emerald-700 border-emerald-100",
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold border uppercase tracking-widest ${styles[tipo]}`}>
        {tipo}
      </span>
    );
  };

  return (
    <DefaultLayout>
      <div className="bg-background min-h-screen font-poppins pb-20 transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold text-foreground">Bandeja de PQRS</h1>
            <p className="text-[11px] font-bold text-muted-foreground tracking-wide uppercase mt-1">Gestión de Peticiones, Quejas, Reclamos y Sugerencias</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por asunto, usuario o correo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background transition-colors duration-300"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={estadoFilter}
                onChange={(e) => setEstadoFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-border text-sm font-medium text-muted-foreground bg-background appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-300"
              >
                <option value="TODAS">Todos los estados</option>
                <option value="NO_LEIDAS">No leídas</option>
                <option value="LEIDAS">Leídas por revisión</option>
                <option value="EN_ESPERA">Pendientes de respuesta</option>
                <option value="RESPONDIDAS">Respondidas</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
              </div>
            ) : filteredPqrs.length > 0 ? (
              filteredPqrs.map((pqrs) => (
                <Card key={pqrs.id_pqrs} className={`rounded-2xl shadow-sm transition-all overflow-hidden transition-colors duration-300 ${!pqrs.leido ? 'border-l-4 border-l-primary bg-card border-y-border border-r-border' : 'border-border bg-card'}`}>
                  <CardContent className="p-0">
                    {/* Header: Clickable to expand */}
                    <button
                      type="button"
                      className="p-6 cursor-pointer hover:bg-muted transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                      onClick={() => handleExpand(pqrs)}
                    >
                      <div className="space-y-2 flex-grow">
                        <div className="flex items-center gap-3">
                          {getTipoBadge(pqrs.tipo)}
                          {!pqrs.leido && (
                            <span className="flex items-center gap-1 text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 border border-primary/10 rounded-full">
                              <Inbox className="w-3 h-3" /> Nueva
                            </span>
                          )}
                          {pqrs.respuesta && (
                            <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 border border-emerald-100 rounded-full">
                              <CheckCircle2 className="w-3 h-3" /> Respondida
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-foreground text-base">{pqrs.asunto}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground font-medium">
                          <span>{pqrs.usuario.nombre} ({pqrs.usuario.correo})</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(pqrs.fecha_creacion).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end shrink-0">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest md:mr-4">
                          {expandedId === pqrs.id_pqrs ? 'Colapsar Detalles' : 'Ver Detalles / Responder'}
                        </span>
                        {expandedId === pqrs.id_pqrs ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {expandedId === pqrs.id_pqrs && (
                      <div className="px-6 pb-6 bg-muted/50 border-t border-border pt-6">
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Mensaje Original</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed bg-card p-4 rounded-xl border border-border">{pqrs.mensaje}</p>
                          </div>

                          {pqrs.respuesta ? (
                            <div>
                              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                                <h4 className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5"><MessageCircle className="w-3 h-3" /> Respuesta Enviada</h4>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                  Por {pqrs.respondido_por?.nombre || 'Admin'} el {new Date(pqrs.fecha_respuesta!).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">{pqrs.respuesta}</p>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5"><MessageCircle className="w-3 h-3" /> Redactar Respuesta</h4>
                              <textarea
                                rows={4}
                                placeholder="Escribe tu respuesta aquí. El usuario la verá en su panel..."
                                value={respuestaText}
                                onChange={(e) => setRespuestaText(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background resize-none transition-colors duration-300"
                              />
                              <div className="flex justify-end">
                                <button
                                  onClick={() => handleResponder(pqrs.id_pqrs)}
                                  disabled={!respuestaText.trim() || respondingId === pqrs.id_pqrs}
                                  className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs font-bold transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                  {respondingId === pqrs.id_pqrs ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
                                  ) : (
                                    <><Send className="w-4 h-4" /> Enviar Respuesta</>
                                  )}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="py-20 text-center text-muted-foreground font-medium">
                No se encontraron solicitudes que coincidan con los filtros.
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
