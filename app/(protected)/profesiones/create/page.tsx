import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import {  ShieldPlus } from "lucide-react";
import { ProfesionFormulario } from "../components/Form";

export default async function Create() {
  const permisos = await getSessionPermisos();

  // Verifica permisos para crear profesiones
  if (!permisos?.includes("crear_profesiones")) {
    return <NoAcceso />;
  }

  // Inicializamos con un valor específico para puesto
  const initialData = {
    nombre: "",
    descripcion: "",
    id: "",
    activo: true,
  };

  return (
    <div>
      <HeaderComponent
        Icon={ShieldPlus}
        description="En este apartado podrá crear una profesión."
        screenName="Crear Profesión"
      />
      <ProfesionFormulario
        isUpdate={false}
        initialData={initialData}
      />
    </div>
  );
}
