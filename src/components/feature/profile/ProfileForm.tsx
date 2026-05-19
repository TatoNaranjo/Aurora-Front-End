import { Button } from "@/components/ui";
import React, { useState } from 'react';
import { useUser, useUpdateUser } from "@/hooks";

export const ProfileForm = () => {
  const userState = useUser();
  const { handleUpdateUsername, handleUpdatePassword, loading, error: hookError } = useUpdateUser();
  const [formData, setFormData] = useState({
    nombre: userState.usuario?.nombre || '',
    email: userState.usuario?.correo || '',
    nombreUsuario: userState.usuario?.nombre_usuario || '',
    tipoUsuario: userState.usuario?.tipo_usuario || '',
    claveActual: '',
    nuevaClave: '',
    confirmarNuevaClave: ''
  });
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const error = hookError || localError;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setLocalError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccess(null);

    let profileUpdated = false;
    let passwordUpdated = false;

    // 1. Update Name if changed
    if (formData.nombre !== userState.usuario?.nombre) {
      const updated = await handleUpdateUsername({ nombre: formData.nombre });
      if (updated) {
        setSuccess("Nombre actualizado correctamente");
        profileUpdated = true;
      }
    }

    // 2. Update Password if fields are filled
    if (formData.nuevaClave || formData.confirmarNuevaClave || formData.claveActual) {
      if (!formData.claveActual || !formData.nuevaClave || !formData.confirmarNuevaClave) {
        setLocalError("Todos los campos de contraseña son requeridos para el cambio");
        return;
      }

      const updated = await handleUpdatePassword({
        correo: formData.email,
        clave: formData.claveActual,
        nueva_clave: formData.nuevaClave,
        confirmar_clave: formData.confirmarNuevaClave
      });

      if (updated) {
        setSuccess(prev => prev ? prev + " e contraseña actualizada" : "Contraseña actualizada correctamente");
        setFormData(prev => ({ ...prev, claveActual: '', nuevaClave: '', confirmarNuevaClave: '' }));
        passwordUpdated = true;
      }
    }

    if (!profileUpdated && !passwordUpdated && !error && formData.nombre === userState.usuario?.nombre) {
      setLocalError("No se detectaron cambios para guardar");
    }
  };

  return (
    <div className="w-full bg-card p-8 rounded-2xl shadow-sm border border-border font-poppins transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="nombre" className="text-xs font-bold text-primary uppercase tracking-widest">NOMBRE COMPLETO</label>
          <input
            type="text"
            name="nombre"
            className="w-full p-3 rounded-xl border border-border bg-muted focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-semibold transition-colors duration-300"
            placeholder="¿Cuál es tu nombre?"
            onChange={handleChange}
            value={formData.nombre}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold text-primary uppercase tracking-widest">CORREO ELECTRÓNICO</label>
            <input
              type="text"
              name="email"
              className="w-full p-3 rounded-xl border border-border bg-muted text-muted-foreground text-sm font-semibold cursor-not-allowed transition-colors duration-300"
              disabled={true}
              value={formData.email}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="nombreUsuario" className="text-xs font-bold text-primary uppercase tracking-widest">NOMBRE DE USUARIO</label>
            <input
              type="text"
              name="nombreUsuario"
              className="w-full p-3 rounded-xl border border-border bg-muted text-muted-foreground text-sm font-semibold cursor-not-allowed transition-colors duration-300"
              disabled={true}
              value={formData.nombreUsuario}
            />
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <h3 className="text-lg font-bold text-muted-foreground mb-4">Seguridad</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="claveActual" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">CONTRASEÑA ACTUAL</label>
              <input
                type="password"
                name="claveActual"
                className="w-full p-3 rounded-xl border border-border bg-muted focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm transition-colors duration-300"
                placeholder="********"
                onChange={handleChange}
                value={formData.claveActual}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="nuevaClave" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">NUEVA CONTRASEÑA</label>
                <input
                  type="password"
                  name="nuevaClave"
                  className="w-full p-3 rounded-xl border border-border bg-muted focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm transition-colors duration-300"
                  placeholder="********"
                  onChange={handleChange}
                  value={formData.nuevaClave}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmarNuevaClave" className="text-xs font-bold text-muted-foreground uppercase tracking-widest">CONFIRMAR</label>
                <input
                  type="password"
                  name="confirmarNuevaClave"
                  className="w-full p-3 rounded-xl border border-border bg-muted focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm transition-colors duration-300"
                  placeholder="********"
                  onChange={handleChange}
                  value={formData.confirmarNuevaClave}
                />
              </div>
            </div>
          </div>
        </div>

        {error && <div className="p-4 bg-destructive/10 text-destructive text-xs font-bold rounded-xl border border-destructive/20">{error}</div>}
        {success && <div className="p-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-xl border border-emerald-500/20">{success}</div>}

        <div className="pt-6 flex justify-end gap-4 border-t border-border">
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/10 transition-all"
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}
