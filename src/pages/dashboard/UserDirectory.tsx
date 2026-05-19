import { useState, useEffect, useCallback } from "react";
import { DefaultLayout } from "@/layout/DefaultLayout";
import {
  Search,
  Filter,
  MoreVertical,
  Shield,
  Mail,
  Calendar,
  Loader2,
  Trash2,
  UserCheck,
  Edit,
  ChevronLeft,
  ChevronRight,
  X,
  Save,
  AlertTriangle,
  UserPlus,
  Send,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui";
import { useAdminUsuarios } from "@/hooks/useAdminUsuarios";
import type { UserProfile } from "@/types/BackendTypes";
import { UserRole, ALL_ROLES } from "@/types/Roles";

const ESTADO_OPTIONS = ["ACTIVO", "PENDIENTE", "INACTIVO", "SUSPENDIDO", "EN REVISION", "ELIMINADO"];

export const UserDirectory = () => {
  const {
    usuarios,
    pagination,
    getUsuariosPaginated,
    updateUsuario,
    desactivarUsuario,
    invitarUsuario,
    renovarInvitacion,
    loading,
    error: hookError,
  } = useAdminUsuarios();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Edit modal state
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const [saving, setSaving] = useState(false);

  // Deactivate confirm state
  const [confirmDeactivate, setConfirmDeactivate] = useState<number | null>(null);

  // Invitation modal state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>(UserRole.PRACTICANTE);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);
  const [existingPendingUser, setExistingPendingUser] = useState<UserProfile | null>(null);
  const [isInviting, setIsInviting] = useState(false);

  const apiUrl = import.meta.env.VITE_BASE_URL;

  const fetchUsers = useCallback(() => {
    const params: Record<string, string> = { page: String(currentPage) };
    if (searchTerm) params.busqueda = searchTerm;
    if (roleFilter) params.tipo_usuario = roleFilter;
    if (estadoFilter) params.estado = estadoFilter;
    getUsuariosPaginated(params);
  }, [currentPage, searchTerm, roleFilter, estadoFilter, getUsuariosPaginated]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, estadoFilter]);

  const handleOpenEdit = (user: UserProfile) => {
    setEditingUser(user);
    setEditForm({
      nombre: user.nombre,
      nombre_usuario: user.nombre_usuario,
      tipo_usuario: user.tipo_usuario,
      estado: user.estado,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    setSaving(true);
    const result = await updateUsuario(editingUser.id, editForm);
    if (result) {
      setEditingUser(null);
      fetchUsers();
    }
    setSaving(false);
  };

  const handleDeactivate = async (id: number) => {
    const success = await desactivarUsuario(id);
    if (success) {
      setConfirmDeactivate(null);
      fetchUsers();
    }
  };

  const handleOpenInvite = () => {
    setIsInviteModalOpen(true);
    setInviteEmail("");
    setInviteRole(UserRole.PRACTICANTE);
    setInviteError(null);
    setInviteSuccess(null);
    setExistingPendingUser(null);
  };

  const handleSendInvitation = async () => {
    setInviteError(null);
    setInviteSuccess(null);
    setExistingPendingUser(null);
    setIsInviting(true);

    const result = await invitarUsuario(inviteEmail, inviteRole);
    if (result) {
      if (result.existente) {
        setInviteSuccess(`Invitación reenviada correctamente. El usuario ya existía con estado ${result.usuario.estado}.`);
      } else {
        setInviteSuccess("Invitación enviada correctamente.");
      }
      setInviteEmail("");
      setInviteRole(UserRole.PRACTICANTE);
      fetchUsers();
    } else {
      // Manejar error específico de correo existente no pendiente
      if (hookError?.includes("ya está registrado")) {
        setInviteError(hookError);
      } else {
        setInviteError(hookError || "Error al enviar la invitación.");
      }
    }
    setIsInviting(false);
  };

  const handleRenewInvitation = async (correo: string) => {
    setInviteError(null);
    setInviteSuccess(null);
    setIsInviting(true);
    const result = await renovarInvitacion(correo);
    if (result) {
      setInviteSuccess("Invitación renovada y reenviada correctamente.");
      fetchUsers();
    } else {
      setInviteError(hookError || "Error al renovar la invitación.");
    }
    setIsInviting(false);
  };

  const totalPages = Math.ceil(pagination.count / 10);

  const getRoleBadge = (role: string) => {
    const roleStyles: Record<string, string> = {
      [UserRole.ADMIN]: "bg-red-50 text-red-700 border-red-100",
      [UserRole.MODERADOR]: "bg-orange-50 text-orange-700 border-orange-100",
      [UserRole.PSICOLOGO]: "bg-emerald-50 text-emerald-700 border-emerald-100",
      [UserRole.EVALUADOR]: "bg-blue-50 text-blue-700 border-blue-100",
      [UserRole.PRACTICANTE]: "bg-muted text-muted-foreground border-border",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${roleStyles[role] || "bg-muted text-muted-foreground border-border"}`}>
        {role}
      </span>
    );
  };

  const getEstadoBadge = (estado?: string) => {
    const estadoStyles: Record<string, string> = {
      ACTIVO: "bg-emerald-50 text-emerald-700 border-emerald-100",
      PENDIENTE: "bg-violet-50 text-violet-700 border-violet-100",
      INACTIVO: "bg-amber-50 text-amber-700 border-amber-100",
      SUSPENDIDO: "bg-red-50 text-red-700 border-red-100",
      "EN REVISION": "bg-blue-50 text-blue-700 border-blue-100",
      ELIMINADO: "bg-muted text-muted-foreground border-border",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${estadoStyles[estado ?? ""] || "bg-muted text-muted-foreground border-border"}`}>
        {estado ?? "Sin estado"}
      </span>
    );
  };

  return (
    <DefaultLayout>
      <div className="bg-background min-h-screen font-poppins pb-20 transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-foreground">Directorio de Usuarios</h1>
              <p className="text-[11px] font-bold text-muted-foreground tracking-wide uppercase">Gestión Administrativa de Accesos y Roles</p>
            </div>
            <button
              onClick={handleOpenInvite}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              Invitar Usuario
            </button>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nombre, correo o usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-background transition-colors duration-300"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-border text-sm font-medium text-muted-foreground bg-background appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-300"
              >
                <option value="">Todos los roles</option>
                {Object.values(UserRole).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={estadoFilter}
                onChange={(e) => setEstadoFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-border text-sm font-medium text-muted-foreground bg-background appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-300"
              >
                <option value="">Todos los estados</option>
                {ESTADO_OPTIONS.map(est => (
                  <option key={est} value={est}>{est}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end">
              <p className="text-xs text-muted-foreground font-medium">
                Mostrando <span className="text-foreground font-bold">{usuarios.length}</span> de{" "}
                <span className="text-foreground font-bold">{pagination.count}</span> usuarios
              </p>
            </div>
          </div>

          {/* List Content */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-foreground animate-spin" />
              </div>
            ) : usuarios.length > 0 ? (
              usuarios.map((user) => (
                <Card key={user.id} className="rounded-2xl border-border shadow-sm transition-all hover:shadow-md overflow-hidden transition-colors duration-300">
                  <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="h-16 w-16 border-2 border-white shadow-sm flex-shrink-0">
                      <AvatarImage src={`${apiUrl}${user.imagen}`} />
                      <AvatarFallback className="bg-muted text-muted-foreground font-bold">
                        {user.nombre?.substring(0, 2).toUpperCase() || '??'}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 text-center md:text-left space-y-1">
                      <h3 className="font-bold text-foreground text-lg">{user.nombre || "Usuario Sin Nombre"}</h3>
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2 text-xs text-muted-foreground font-medium">
                        <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {user.correo}</span>
                        <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> {user.nombre_usuario}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Último acceso: {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Nunca'}</span>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-3">
                      {getRoleBadge(user.tipo_usuario)}
                      {getEstadoBadge(user.estado)}

                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                          <DropdownMenuItem
                            className="gap-2 p-3 font-medium rounded-lg cursor-pointer"
                            onClick={() => handleOpenEdit(user)}
                          >
                            <Edit className="w-4 h-4" /> Editar usuario
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 p-3 font-medium rounded-lg cursor-pointer">
                            <UserCheck className="w-4 h-4" /> Editar permisos
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.estado !== 'ELIMINADO' && (
                            <DropdownMenuItem
                              className="gap-2 p-3 font-medium text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer"
                              onClick={() => setConfirmDeactivate(user.id)}
                            >
                              <Trash2 className="w-4 h-4" /> Desactivar usuario
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="py-20 text-center text-muted-foreground font-medium">
                No se encontraron usuarios con los criterios seleccionados.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={!pagination.previous}
                className="p-2.5 rounded-xl border border-border hover:bg-muted transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <span className="text-sm font-bold text-foreground">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={!pagination.next}
                className="p-2.5 rounded-xl border border-border hover:bg-muted transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          )}

          {/* Academic Disclaimer */}
          <div className="mt-20 bg-background border border-border rounded-xl p-4 transition-colors duration-300">
            <p className="text-[10px] text-foreground leading-relaxed">
              <span className="font-bold">Nota Administrativa:</span> Las acciones realizadas en este panel quedan registradas en el log de auditoría del sistema Aurora.
            </p>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">Invitar Usuario</h3>
                <p className="text-xs text-muted-foreground mt-1">Envía una invitación por correo para que el usuario se registre con un rol específico.</p>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1.5 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Correo electrónico</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => {
                    setInviteEmail(e.target.value);
                    setInviteError(null);
                    setInviteSuccess(null);
                    setExistingPendingUser(null);
                  }}
                  placeholder="usuario@ejemplo.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Rol asignado</label>
                <select
                  value={inviteRole}
                  onChange={(e) => {
                    setInviteRole(e.target.value as UserRole);
                    setInviteError(null);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm font-medium bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-300"
                >
                  {ALL_ROLES.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {inviteError && (
                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive font-medium">{inviteError}</p>
                </div>
              )}

              {inviteSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{inviteSuccess}</p>
                </div>
              )}

              {existingPendingUser && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-sm text-amber-800 font-medium mb-2">
                    Este correo ya tiene una invitación pendiente.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-amber-700 mb-3">
                    <span>Rol actual: <strong>{existingPendingUser.tipo_usuario}</strong></span>
                  </div>
                  <button
                    onClick={() => handleRenewInvitation(existingPendingUser.correo)}
                    disabled={isInviting}
                    className="text-xs font-bold text-amber-800 hover:text-amber-900 underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Renovar y reenviar invitación
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-border text-sm font-bold text-muted-foreground hover:bg-muted transition-all"
              >
                Cerrar
              </button>
              <button
                onClick={handleSendInvitation}
                disabled={isInviting || !inviteEmail || !inviteEmail.includes('@')}
                className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isInviting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isInviting ? "Enviando..." : "Enviar Invitación"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Editar Usuario</h3>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1.5 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Correo (no editable)</label>
                <input
                  type="text"
                  value={editingUser.correo}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm font-medium bg-muted text-muted-foreground cursor-not-allowed transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Nombre</label>
                <input
                  type="text"
                  value={editForm.nombre ?? ""}
                  onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Nombre de Usuario</label>
                <input
                  type="text"
                  value={editForm.nombre_usuario ?? ""}
                  onChange={(e) => setEditForm({ ...editForm, nombre_usuario: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background transition-colors duration-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Rol</label>
                  <select
                    value={editForm.tipo_usuario ?? ""}
                    onChange={(e) => setEditForm({ ...editForm, tipo_usuario: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border text-sm font-medium bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-300"
                  >
                    {Object.values(UserRole).map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Estado</label>
                  <select
                    value={editForm.estado ?? ""}
                    onChange={(e) => setEditForm({ ...editForm, estado: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border text-sm font-medium bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-300"
                  >
                    {ESTADO_OPTIONS.map(est => (
                      <option key={est} value={est}>{est}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setEditingUser(null)}
                className="flex-1 py-2.5 rounded-xl border border-border text-sm font-bold text-muted-foreground hover:bg-muted transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={saving}
                className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> {saving ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Deactivation Modal */}
      {confirmDeactivate !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 transition-colors duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <AlertTriangle className="w-7 h-7 text-destructive" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">¿Desactivar usuario?</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Esta acción cambiará el estado del usuario a <strong>Eliminado</strong>, borrará su información personal y le impedirá iniciar sesión. Esta acción no se puede deshacer fácilmente.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setConfirmDeactivate(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border text-sm font-bold text-muted-foreground hover:bg-muted transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDeactivate(confirmDeactivate)}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Desactivar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};
