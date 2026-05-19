import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { useServices } from "@/context/useServices";
import { useState, useEffect, useCallback } from "react";
import type { RangoEdad } from "@/types/BackendTypes";

interface CaseData {
  nombre: string;
  rango_edad: number | "";
  sexo: number | "";
  fecha_consulta: string;
}

interface CaseDataFormProps {
  data: CaseData;
  onChange: (data: CaseData) => void;
}

export const CaseDataForm = ({ data, onChange }: CaseDataFormProps) => {
  const { pacientesService } = useServices();
  const [rangosEdad, setRangosEdad] = useState<RangoEdad[]>([]);

  const loadRangosEdad = useCallback(async () => {
    try {
      const resp = await pacientesService.getAllRangosEdad();
      setRangosEdad(resp);
    } catch (err) {
      console.error("Error loading rangos de edad", err);
    }
  }, [pacientesService]);

  useEffect(() => {
    loadRangosEdad();
  }, [loadRangosEdad]);

  const handleChange = (field: keyof CaseData, value: string | number | "") => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden p-8 transition-colors duration-300">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-xl font-bold text-foreground">Datos del Caso</CardTitle>
        <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-md">
          Ingrese aquí la información básica del paciente o caso simulado. Todos los datos serán tratados de forma anónima.
        </p>
      </CardHeader>

      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">NOMBRE DEL CASO</label>
          <input
            type="text"
            value={data.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            placeholder="Escriba aquí..."
            className="w-full p-3 rounded-lg border border-border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-300 placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">RANGO DE EDAD</label>
          <select
            value={data.rango_edad}
            onChange={(e) => handleChange('rango_edad', Number(e.target.value) || "")}
            className="w-full p-3 rounded-lg border border-border text-xs font-medium text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-300 bg-card"
          >
            <option value="">Seleccionar una Opción</option>
            {rangosEdad.map(r => (
              <option key={r.id_rango_edad} value={r.id_rango_edad}>
                {r.nombre_rango} ({r.descripcion})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">GÉNERO</label>
          <select
            value={data.sexo}
            onChange={(e) => handleChange('sexo', Number(e.target.value) || "")}
            className="w-full p-3 rounded-lg border border-border text-xs font-medium text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-300 bg-card"
          >
            <option value="">Seleccionar una Opción</option>
            <option value={1}>Masculino</option>
            <option value={2}>Femenino</option>
          </select>
        </div>

        <div className="space-y-2 md:col-start-2">
          <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">FECHA DE CONSULTA</label>
          <input
            type="date"
            value={data.fecha_consulta}
            onChange={(e) => handleChange('fecha_consulta', e.target.value)}
            className="w-full p-3 rounded-lg border border-border text-xs font-medium text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-300 placeholder:text-muted-foreground"
          />
        </div>
      </CardContent>
    </Card>
  );
};
