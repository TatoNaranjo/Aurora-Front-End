import { useState, useEffect, useCallback } from "react";
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { UserRequestCard } from "./UserRequestCard";
import { useSolicitudes } from "@/hooks/useSolicitudes";

export const UserRequestGrid = () => {
  const {
    solicitudes,
    pagination,
    getSolicitudes,
    resolverSolicitud,
    loading,
  } = useSolicitudes();

  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resolving, setResolving] = useState(false);

  const fetchSolicitudes = useCallback(() => {
    const params: Record<string, string> = { page: String(currentPage) };
    if (searchTerm) params.busqueda = searchTerm;
    if (estadoFilter) params.estado = estadoFilter;
    getSolicitudes(params);
  }, [currentPage, searchTerm, estadoFilter, getSolicitudes]);

  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, estadoFilter]);

  const handleResolver = async (id: number) => {
    setResolving(true);
    const result = await resolverSolicitud(id);
    if (result) {
      fetchSolicitudes();
    }
    setResolving(false);
  };

  const totalPages = Math.ceil(pagination.count / 4);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar Por Usuario o Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all bg-card transition-colors duration-300"
          />
        </div>
        <select
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-border text-xs font-medium text-muted-foreground bg-card min-w-[200px] transition-colors duration-300"
        >
          <option value="">Todos los Estados</option>
          <option value="PENDIENTE">Pendiente</option>
          <option value="RESUELTA">Resuelta</option>
          <option value="RECHAZADA">Rechazada</option>
        </select>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
        </div>
      ) : solicitudes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solicitudes.map((solicitud) => (
            <UserRequestCard
              key={solicitud.id}
              solicitud={solicitud}
              onResolver={handleResolver}
              resolving={resolving}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-muted-foreground font-medium text-sm">
          No se encontraron solicitudes con los filtros seleccionados.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <p className="text-[10px] text-muted-foreground font-medium">
            Mostrando <span className="text-foreground font-bold">{solicitudes.length}</span> de{" "}
            <span className="text-foreground font-bold">{pagination.count}</span> solicitudes
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={!pagination.previous}
              className="p-2 rounded-lg border border-border hover:bg-muted transition-all disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-300"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <span className="text-xs font-bold text-foreground px-3">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={!pagination.next}
              className="p-2 rounded-lg border border-border hover:bg-muted transition-all disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-300"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
