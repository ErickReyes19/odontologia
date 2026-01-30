import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { UserPlus } from "lucide-react";
import { MedicoFormulario } from "../../pacientes/components/Form";
import { getEmpleados } from "../../empleados/actions";
import { getProfesionesActivas } from "../../profesiones/actions";

export default async function CreateMedico() {
  const permisos = await getSessionPermisos();

  // Verifica permisos para crear médicos
  if (!permisos?.includes("crear_medicos")) {
    return <NoAcceso />;
  }

  const empleados = await getEmpleados();
  const profesiones = await getProfesionesActivas();
  // Inicializamos con valores vacíos para el formulario
  const initialData = {
    idEmpleado: "",
    profesionId: "",
    activo: true,
  };

  return (
    <div>
      <HeaderComponent
        Icon={UserPlus}
        description="En este apartado podrá crear un médico."
        screenName="Crear Médico"
      />
      <MedicoFormulario
        isUpdate={false}
        initialData={initialData}
        empleados={empleados}
        profesiones={profesiones}
      />
    </div>
  );
}
