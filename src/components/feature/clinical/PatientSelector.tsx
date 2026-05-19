import { useState, useEffect, useCallback } from "react";
import { Button, Input, Label, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { useServices } from "@/context/useServices";
import type { Paciente, RangoEdad } from "@/types/BackendTypes";
import { useUser } from "@/hooks/useAuth";
import { UserRole } from "@/types/Roles";
import { Search, UserPlus } from "lucide-react";

interface PatientSelectorProps {
  onSelect: (patient: Paciente) => void;
  onCreate: (patient: Partial<Paciente>) => void;
}

export const PatientSelector = ({ onSelect, onCreate }: PatientSelectorProps) => {
  const { pacientesService } = useServices();
  const { usuario } = useUser();
  const [patients, setPatients] = useState<Paciente[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Paciente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [rangosEdad, setRangosEdad] = useState<RangoEdad[]>([]);

  // Permissions
  const canCreate = usuario?.tipo_usuario !== UserRole.PRACTICANTE;

  // New patient state
  const [sexo, setSexo] = useState(1); // 1: Masculino, 2: Femenino
  const [rangoEdadId, setRangoEdadId] = useState<number | undefined>(undefined);

  const loadData = useCallback(async () => {
    try {
      const [pts, rangos] = await Promise.all([
        pacientesService.getAllPacientes(),
        pacientesService.getAllRangosEdad()
      ]);
      setPatients(pts);
      setFilteredPatients(pts);
      setRangosEdad(rangos);
    } catch (err) {
      console.error("Error loading patient data", err);
    }
  }, [pacientesService]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredPatients(patients.filter(p => p.id_paciente.toString().includes(searchTerm)));
    } else {
      setFilteredPatients(patients);
    }
  }, [searchTerm, patients]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rangoEdadId && canCreate) {
      onCreate({
        sexo,
        rango_edad: rangoEdadId
      });
      setIsCreating(false);
      // Reset form
      setSexo(1);
      setRangoEdadId(undefined);
    }
  };

  if (isCreating && canCreate) {
    return (
      <div className="bg-card p-6 rounded-lg shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
          <UserPlus className="w-5 h-5" /> Registrar Nuevo Paciente
        </h3>
        <form onSubmit={handleCreateSubmit} className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="sexo">Sexo</Label>
            <select
              id="sexo"
              value={sexo}
              onChange={(e) => setSexo(Number(e.target.value))}
              className="w-full p-2 border rounded-md transition-colors duration-300"
            >
              <option value={1}>Masculino</option>
              <option value={2}>Femenino</option>
            </select>
          </div>
          <div>
            <Label htmlFor="rango">Rango de Edad</Label>
            <select
              id="rango"
              value={rangoEdadId}
              onChange={(e) => setRangoEdadId(Number(e.target.value))}
              className="w-full p-2 border rounded-md transition-colors duration-300"
              required
            >
              <option value="">Seleccione un rango</option>
              {rangosEdad.map(r => (
                <option key={r.id_rango_edad} value={r.id_rango_edad}>
                  {r.nombre_rango} ({r.descripcion})
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <Button variant="ghost" type="button" onClick={() => setIsCreating(false)}>Cancelar</Button>
            <Button type="submit">Crear Paciente</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        {canCreate && (
          <Button onClick={() => setIsCreating(true)} className="gap-2">
            <UserPlus className="w-4 h-4" /> Nuevo Paciente
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Sexo</TableHead>
              <TableHead>Rango de Edad</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id_paciente}>
                  <TableCell className="font-medium">#{patient.id_paciente}</TableCell>
                  <TableCell>{patient.sexo === 1 ? 'Masculino' : 'Femenino'}</TableCell>
                  <TableCell>{rangosEdad.find(r => r.id_rango_edad === patient.rango_edad)?.nombre_rango || patient.rango_edad}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => onSelect(patient)}>
                      Seleccionar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No se encontraron pacientes.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
