"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, DollarSign } from "lucide-react";
import Link from "next/link";
import { PagoFormModal } from "./PagoFormModal";
import type { FinanciamientoDetalle } from "../schema";
import { ESTADOS_FINANCIAMIENTO } from "../schema";

interface FinanciamientoDetalleClientProps {
  financiamiento: FinanciamientoDetalle;
  pacientes: { id: string; nombre: string; apellido: string }[];
  cotizaciones: { id: string; total: number; pacienteNombre: string }[];
  planes: { id: string; nombre: string; pacienteNombre: string }[];
  financiamientosParaPago: {
    id: string;
    pacienteNombre: string;
    cuotasLista: { id: string; numero: number; monto: number; pagada: boolean }[];
  }[];
}

const getEstadoBadge = (estado: string) => {
  const info = ESTADOS_FINANCIAMIENTO.find((e) => e.value === estado);
  switch (estado) {
    case "ACTIVO":
      return (
        <Badge variant="outline" className="">
          {info?.label ?? estado}
        </Badge>
      );
    case "PAGADO":
      return (
        <Badge variant="outline" className="">
          {info?.label ?? estado}
        </Badge>
      );
    default:
      return <Badge variant="outline">{info?.label ?? estado}</Badge>;
  }
};

export function FinanciamientoDetalleClient({
  financiamiento,
  pacientes,
  financiamientosParaPago,
}: FinanciamientoDetalleClientProps) {
  const router = useRouter();
  const [pagoModalOpen, setPagoModalOpen] = useState(false);

  const cuotas = financiamiento.cuotasLista ?? [];
  const totalPagado = financiamiento.totalPagado ?? financiamiento.anticipo;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/pagos">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                {financiamiento.pacienteNombre}
              </h2>
              <p className="text-sm text-muted-foreground">
                Inicio: {format(financiamiento.fechaInicio, "PPP", { locale: es })}
              </p>
              {getEstadoBadge(financiamiento.estado)}
            </div>
            <Button onClick={() => setPagoModalOpen(true)}>
              <DollarSign className="h-4 w-4 mr-2" />
              Registrar Pago
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Monto total</p>
              <p className="font-mono font-medium">
                L {financiamiento.montoTotal.toLocaleString("es-HN")}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Anticipo</p>
              <p className="font-mono font-medium">
                L {financiamiento.anticipo.toLocaleString("es-HN")}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Saldo pendiente</p>
              <p className="font-mono font-medium text-amber-600">
                L {financiamiento.saldo.toLocaleString("es-HN")}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total pagado</p>
              <p className="font-mono font-medium text-green-600">
                L {totalPagado.toLocaleString("es-HN")}
              </p>
            </div>
          </div>

          <h3 className="font-medium mb-2">Cuotas</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Vencimiento</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cuotas.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.numero}</TableCell>
                    <TableCell className="font-mono">
                      L {c.monto.toLocaleString("es-HN")}
                    </TableCell>
                    <TableCell>
                      {format(c.fechaVencimiento, "PP", { locale: es })}
                    </TableCell>
                    <TableCell>
                      {c.pagada ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Pagada
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-slate-100">
                          Pendiente
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <PagoFormModal
        open={pagoModalOpen}
        onOpenChange={setPagoModalOpen}
        pacienteId={financiamiento.pacienteId}
        financiamientoId={financiamiento.id}
        pacientes={pacientes}
        financiamientos={financiamientosParaPago}
        onSuccess={() => router.refresh()}
      />
    </div>
  );
}
