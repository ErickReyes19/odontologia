"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { CreatePagoSchema, METODOS_PAGO } from "../schema";
import { createPago } from "../actions";
import { toast } from "sonner";
import type { CreatePagoInput } from "../schema";

interface PagoFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  monto?: number;
  pacienteId?: string;
  consultaId?: string;
  cotizacionId?: string;
  planTratamientoId?: string;
  financiamientoId?: string;
  cuotaId?: string;
  pacientes: { id: string; nombre: string; apellido: string }[];
  // AGREGA ESTA LÍNEA:
  cotizaciones?: { id: string; total: number; pacienteNombre: string; pacienteId: string; numero?: string }[];
  // ACTUALIZA ESTA LÍNEA (agregando pacienteId):
  financiamientos?: { id: string; pacienteId: string; pacienteNombre: string; cuotasLista?: { id: string; numero: number; monto: number; pagada: boolean }[] }[];
  onSuccess?: () => void;
}

export function PagoFormModal({
  open,
  onOpenChange,
  monto: defaultMonto,
  pacienteId: defaultPacienteId,
  consultaId,
  cotizacionId,
  planTratamientoId,
  financiamientoId: defaultFinanciamientoId,
  cuotaId: defaultCuotaId,
  pacientes,
  financiamientos = [],
  onSuccess,
}: PagoFormModalProps) {
  const form = useForm<CreatePagoInput>({
    resolver: zodResolver(CreatePagoSchema),
    defaultValues: {
      monto: defaultMonto ?? 0,
      metodo: "EFECTIVO",
      referencia: "",
      comentario: "",
      pacienteId: defaultPacienteId ?? "",
      consultaId: consultaId ?? "",
      cotizacionId: cotizacionId ?? "",
      planTratamientoId: planTratamientoId ?? "",
      financiamientoId: defaultFinanciamientoId ?? "",
      cuotaId: defaultCuotaId ?? "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        monto: defaultMonto ?? 0,
        metodo: "EFECTIVO",
        referencia: "",
        comentario: "",
        pacienteId: defaultPacienteId ?? "",
        consultaId: consultaId ?? "",
        cotizacionId: cotizacionId ?? "",
        planTratamientoId: planTratamientoId ?? "",
        financiamientoId: defaultFinanciamientoId ?? "",
        cuotaId: defaultCuotaId ?? "",
      });
    }
  }, [open, defaultMonto, defaultPacienteId, consultaId, cotizacionId, planTratamientoId, defaultFinanciamientoId, defaultCuotaId, form]);

  const selectedFinanciamientoId = form.watch("financiamientoId");
  const cuotasDisponibles =
    financiamientos.find((f) => f.id === selectedFinanciamientoId)?.cuotasLista?.filter(
      (c) => !c.pagada
    ) ?? [];

  const onSubmit = async (data: CreatePagoInput) => {
    const payload = {
      ...data,
      monto: Number(data.monto),
      pacienteId: data.pacienteId || null,
      consultaId: data.consultaId || null,
      cotizacionId: data.cotizacionId || null,
      planTratamientoId: data.planTratamientoId || null,
      financiamientoId: data.financiamientoId || null,
      cuotaId: data.cuotaId || null,
      referencia: data.referencia || null,
      comentario: data.comentario || null,
    };

    const result = await createPago(payload);
    if (result.success) {
      toast.success("Pago registrado correctamente");
      form.reset();
      onOpenChange(false);
      onSuccess?.();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Pago</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Field data-invalid={!!form.formState.errors.monto}>
            <FieldLabel>Monto (L)</FieldLabel>
            <FieldContent>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                {...form.register("monto", { valueAsNumber: true })}
              />
            </FieldContent>
            {form.formState.errors.monto && (
              <FieldError errors={[form.formState.errors.monto]} />
            )}
          </Field>

          <Field data-invalid={!!form.formState.errors.metodo}>
            <FieldLabel>Método de pago</FieldLabel>
            <FieldContent>
              <Select
                value={form.watch("metodo")}
                onValueChange={(v) => form.setValue("metodo", v as CreatePagoInput["metodo"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {METODOS_PAGO.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Referencia (opcional)</FieldLabel>
            <FieldContent>
              <Input
                placeholder="No. de transacción, cheque..."
                {...form.register("referencia")}
              />
            </FieldContent>
          </Field>

          {!defaultPacienteId && (
            <Field>
              <FieldLabel>Paciente</FieldLabel>
              <FieldContent>
                <Select
                  value={form.watch("pacienteId") || ""}
                  onValueChange={(v) => form.setValue("pacienteId", v || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {pacientes.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.nombre} {p.apellido}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>
          )}

          {financiamientos.length > 0 && (
            <>
              <Field>
                <FieldLabel>Financiamiento</FieldLabel>
                <FieldContent>
                  <Select
                    value={form.watch("financiamientoId") || ""}
                    onValueChange={(v) => {
                      form.setValue("financiamientoId", v || null);
                      form.setValue("cuotaId", null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Aplicar a financiamiento" />
                    </SelectTrigger>
                    <SelectContent>
                      {financiamientos.map((f) => (
                        <SelectItem key={f.id} value={f.id}>
                          {f.pacienteNombre} - Fin. #{f.id.slice(0, 8)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>

              {cuotasDisponibles.length > 0 && (
                <Field>
                  <FieldLabel>Cuota específica (opcional)</FieldLabel>
                  <FieldDescription>
                    Deje vacío para aplicar al siguiente pendiente
                  </FieldDescription>
                  <FieldContent>
                    <Select
                      value={form.watch("cuotaId") || ""}
                      onValueChange={(v) => form.setValue("cuotaId", v || null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Todas las pendientes" />
                      </SelectTrigger>
                      <SelectContent>
                        {cuotasDisponibles.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            Cuota {c.numero} - L {c.monto.toLocaleString("es-HN")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldContent>
                </Field>
              )}
            </>
          )}

          <Field>
            <FieldLabel>Comentario (opcional)</FieldLabel>
            <FieldContent>
              <Textarea
                placeholder="Notas adicionales"
                {...form.register("comentario")}
              />
            </FieldContent>
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Guardando..." : "Registrar pago"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
