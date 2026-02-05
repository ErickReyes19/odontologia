"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";
import { OrdenCobroFormModal } from "./OrdenCobroFormModal";
import type { OrdenCobroWithRelations } from "../schema";
import { anularOrdenCobro } from "../actions";
import OrdenesCobroListMobile from "./ordenes-cobro-list-mobile";

interface OrdenesCobroPageClientProps {
  ordenes: OrdenCobroWithRelations[];
  pacientes: { id: string; nombre: string; apellido: string }[];
  planes: { id: string; nombre: string; pacienteId: string }[];
  financiamientos: { id: string; pacienteId: string }[];
}

export function OrdenesCobroPageClient({
  ordenes,
  pacientes,
}: OrdenesCobroPageClientProps) {
  const router = useRouter(); 
  const [modalOpen, setModalOpen] = useState(false);

  const handleAnular = async (id: string) => {
    const result = await anularOrdenCobro(id);
    if (result.success) {
      toast.success("Orden anulada");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  };

  const columns = getColumns({ onAnular: handleAnular });

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        <Button onClick={() => setModalOpen(true)}>
          <Receipt className="h-4 w-4 mr-2" />
          Nueva Orden de Cobro
        </Button>
      </div>

      <div className="hidden md:block">
        <DataTable columns={columns} data={ordenes} />
      </div>
      <div className="block md:hidden">
        <OrdenesCobroListMobile ordenes={ordenes} onAnular={handleAnular} />
      </div>

      <OrdenCobroFormModal
        open={modalOpen}
        onOpenChange={(open) => setModalOpen(open)}
        pacientes={pacientes}
        onSuccess={() => {
          setModalOpen(false);
          router.refresh();
        }}
      />
    </>
  );
}
