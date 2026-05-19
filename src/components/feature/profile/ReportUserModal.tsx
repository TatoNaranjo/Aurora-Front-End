import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  Label,
  Textarea
} from "@/components/ui";
import { Search, User, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useAdminUsuarios } from "@/hooks/useAdminUsuarios";
import { useServices } from "@/context/useServices";
import type { UserProfile } from "@/types/BackendTypes";

interface ReportUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportUserModal = ({ isOpen, onClose }: ReportUserModalProps) => {
  const { getUsuariosPaginated, loading: searchLoading } = useAdminUsuarios();
  const { adminService } = useServices();

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<UserProfile[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [motivo, setMotivo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Búsqueda reactiva con debounce manual simple
  useEffect(() => {
    if (searchTerm.length < 3) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      const resp = await getUsuariosPaginated({ busqueda: searchTerm, estado: 'ACTIVO' });
      if (resp) {
        setResults(resp.results);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, getUsuariosPaginated]);

  const handleSubmit = async () => {
    if (!selectedUser || !motivo.trim()) return;

    setSubmitting(true);
    setStatus('idle');
    try {
      await adminService.createSolicitud({
        tipo: 'BLOQUEAR',
        motivo: motivo,
        usuario_objetivo: selectedUser.id as never // Hack for type compatibility with Partial<Solicitud>
      });
      setStatus('success');
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err: unknown) {
      setStatus('error');
      const error = err as { response?: { data?: { detail?: string } } };
      setErrorMessage(error.response?.data?.detail || "Error al crear la solicitud");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSearchTerm('');
    setResults([]);
    setSelectedUser(null);
    setMotivo('');
    setStatus('idle');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-8 overflow-hidden">
        <DialogHeader className="space-y-4">
          <div className="w-12 h-12 bg-destructive/10 rounded-2xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-destructive" />
          </div>
          <div className="space-y-1">
            <DialogTitle className="text-2xl font-bold text-foreground">Reportar Usuario</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Busca al usuario que deseas reportar y describe el motivo detalladamente.
            </DialogDescription>
          </div>
        </DialogHeader>

        {status === 'success' ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-lg font-bold text-foreground">Reporte enviado con éxito</p>
            <p className="text-sm text-muted-foreground text-center">Un administrador revisará la solicitud pronto.</p>
          </div>
        ) : (
          <div className="space-y-6 pt-4">
            <div className="space-y-3">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Buscar Usuario</Label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Nombre de usuario o correo..."
                  className="pl-11 h-12 rounded-xl border-border focus:ring-primary/20 transition-colors duration-300"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (selectedUser) setSelectedUser(null);
                  }}
                />
                {searchLoading && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  </div>
                )}
              </div>

              {results.length > 0 && !selectedUser && (
                <div className="mt-2 max-h-40 overflow-y-auto rounded-xl border border-border bg-muted/50 p-2 space-y-1 animate-in slide-in-from-top-2">
                  {results.slice(0, 5).map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        setSelectedUser(user);
                        setSearchTerm(user.nombre_usuario);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-card hover:shadow-sm transition-all text-left"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-bold text-foreground">{user.nombre || user.nombre_usuario}</p>
                        <p className="text-[10px] text-muted-foreground">{user.correo}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {selectedUser && (
                <div className="mt-2 flex items-center gap-3 p-4 rounded-xl border border-primary/20 bg-primary/10 animate-in fade-in zoom-in-95">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{selectedUser.nombre || selectedUser.nombre_usuario}</p>
                    <p className="text-xs text-primary font-medium">@{selectedUser.nombre_usuario}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => setSelectedUser(null)}
                  >
                    Cambiar
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Motivo del Reporte</Label>
              <Textarea
                placeholder="Explica qué comportamiento o inconveniente has detectado..."
                className="min-h-[100px] rounded-2xl resize-none border-border focus:ring-primary/20 transition-colors duration-300"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              />
            </div>

            {status === 'error' && (
              <p className="text-xs text-destructive font-medium bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                {errorMessage}
              </p>
            )}

            <DialogFooter className="pt-4 gap-3 sm:gap-0">
              <Button
                variant="ghost"
                onClick={handleClose}
                className="rounded-xl font-bold"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!selectedUser || !motivo.trim() || submitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 rounded-xl shadow-lg shadow-primary/10 disabled:bg-muted"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Enviar Reporte"
                )}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
