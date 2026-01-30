import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Users } from "lucide-react";
import { getPacientes } from "./actions";
import { PacienteTable } from "./components/paciente-table";
import PacienteListMobile from "./components/seguro-list-mobile";

export default async function PacientesPage() {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("ver_pacientes")) {
    return <NoAcceso />;
  }

  // Cargamos la primera página server-side
  const pacientesPag = await getPacientes({ page: 1, pageSize: 10 });

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={Users}
        description="En este apartado podrá ver todos los pacientes."
        screenName="Pacientes"
      />

      {/* Desktop: tabla con paginación */}
      <div className="hidden md:block">
        <PacienteTable initialData={pacientesPag} />
      </div>

      {/* Mobile: lista filtrable con paginación interna */}
      <div className="block md:hidden">
        <PacienteListMobile
          initialData={pacientesPag.data}
          initialPage={pacientesPag.page}
          initialPageCount={pacientesPag.pageCount}
        />
      </div>
    </div>
  );
}
