import { Button } from "@/components/ui";
import { useUser, useUpdateUser } from "@/hooks";
import React, { useRef, useState } from "react";

export const ImageChange = () => {
  const userState = useUser();
  const { handleUpdateImage, loading } = useUpdateUser();
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSave = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const success = await handleUpdateImage(file);
      if (success) {
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="max-w-[300px] flex flex-col items-center gap-4 py-5">
      <button type="button" className="relative group cursor-pointer" onClick={onButtonClick}>
        <img
          className="rounded-full w-40 h-40 object-cover border-4 border-primary/10 transition-all hover:border-primary/30 shadow-md"
          src={preview || `${apiUrl}${userState.usuario?.imagen}`}
          alt={userState.usuario?.nombre_usuario}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-xs font-bold">Cambiar</span>
        </div>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <p className="text-center justify-center text-muted-foreground text-sm font-light px-4">
        Haz clic en la imagen para seleccionar una nueva foto de perfil
      </p>
      <div className="flex flex-col gap-2 w-full px-4">
        {preview ? (
          <Button onClick={onSave} size={"lg"} disabled={loading}>
            {loading ? "Guardando..." : "Confirmar Cambio"}
          </Button>
        ) : (
          <Button onClick={onButtonClick} variant="outline" size={"lg"}>
            Seleccionar Imagen
          </Button>
        )}
      </div>
    </div>
  );
};
