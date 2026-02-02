"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Pencil, Plus, Search, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Cotizacion } from "../schema";

interface CotizacionListMobileProps {
  cotizaciones: Cotizacion[];
}

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "borrador":
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
          Borrador
        </Badge>
      );
    case "enviada":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
          Enviada
        </Badge>
      );
    case "aceptada":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
          Aceptada
        </Badge>
      );
    case "rechazada":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
          Rechazada
        </Badge>
      );
    case "parcial":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
          Parcial
        </Badge>
      );
    default:
      return <Badge variant="outline">{estado}</Badge>;
  }
};

export default function CotizacionListMobile({
  cotizaciones,
}: CotizacionListMobileProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCotizaciones = cotizaciones.filter(
    (c) =>
      c.pacienteNombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Link href="/cotizaciones/create" className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nueva Cotización
          <Plus />
        </Button>
      </Link>

      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar cotización..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {filteredCotizaciones.map((cotizacion) => (
        <div
          key={cotizacion.id}
          className="flex items-center justify-between p-4 rounded-lg shadow border"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-medium truncate">
                {cotizacion.pacienteNombre}
              </h3>
              {getEstadoBadge(cotizacion.estado)}
            </div>
            <div className="mt-2 flex flex-col space-y-1">
              <p className="text-xs flex items-center text-muted-foreground">
                <FileText className="h-3 w-3 mr-1" />
                {cotizacion.fecha
                  ? format(new Date(cotizacion.fecha), "PPP", { locale: es })
                  : "-"}
              </p>
              <p className="text-xs flex items-center text-muted-foreground">
                <User className="h-3 w-3 mr-1" />
                {cotizacion.detalles?.length ?? 0} servicio(s)
              </p>
              <p className="text-sm font-semibold">
                Total: L.{" "}
                {cotizacion.total.toLocaleString("es-HN", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 ml-4">
            <Link href={`/cotizaciones/${cotizacion.id}/edit`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}

      {filteredCotizaciones.length === 0 && (
        <p className="text-center text-gray-500">
          No se encontraron cotizaciones.
        </p>
      )}

      {filteredCotizaciones.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Mostrando {filteredCotizaciones.length} de {cotizaciones.length}{" "}
          cotizaciones
        </p>
      )}
    </div>
  );
}
