"use client";

import { Info, Pencil, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Medico } from "../schema";

interface MedicoListProps {
  medicos: Medico[];
}

export default function MedicoListMobile({ medicos }: MedicoListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMedicos = medicos.filter(
    (medico) =>
      medico.empleado?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medico.profesion?.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link href={`/medicos/create`} className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Médico
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar por empleado o profesión..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      <div className="space-y-3">
        {filteredMedicos.length > 0 ? (
          filteredMedicos.map((medico) => (
            <Card key={medico.idEmpleado}>
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4">
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{medico.empleado?.nombre || "Empleado desconocido"}</h3>
                      <Badge
                        variant={medico.activo ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {medico.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-sm text-muted-foreground truncate">
                            {medico.profesion?.nombre || "Sin profesión asignada"}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{medico.profesion!.nombre || "Sin profesión asignada"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <Link href={`/medicos/${medico.idEmpleado}/edit`} className="ml-2 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar médico</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 bg-muted/30 rounded-lg">
            <Info className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No se encontraron médicos.</p>
            <p className="text-sm text-muted-foreground mt-1">
              {searchTerm ? "Intenta con otra búsqueda." : "Crea un nuevo médico para comenzar."}
            </p>
          </div>
        )}
      </div>

      {filteredMedicos.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Mostrando {filteredMedicos.length} de {medicos.length} médicos
        </p>
      )}
    </div>
  );
}
