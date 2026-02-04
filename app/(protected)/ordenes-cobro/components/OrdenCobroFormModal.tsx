"use client";

import { useEffect, useState } from "react";
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
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { CreateOrdenCobroSchema } from "../schema";
import {
  createOrdenCobro,
  getPlanesByPaciente,
  getFinanciamientosByPaciente,
  getCuotaPendiente,
} from "../actions";
import { toast } from "sonner";
import type { CreateOrdenCobroInput } from "../schema";

export function OrdenCobroFormModal({
  open,
  onOpenChange,
  pacientes = [],
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pacientes: { id: string; nombre: string; apellido: string }[];
  onSuccess: () => void;
}) {
  const form = useForm<CreateOrdenCobroInput>({
    resolver: zodResolver(CreateOrdenCobroSchema),
    defaultValues: {
      pacienteId: "",
      planTratamientoId: null,
      financiamientoId: null,
      monto: 0,
      concepto: "",
    },
  });

  const pacienteId = form.watch("pacienteId");
  const financiamientoId = form.watch("financiamientoId");

  const [planes, setPlanes] = useState<{ id: string; nombre: string }[]>([]);
  const [financiamientos, setFinanciamientos] = useState<{ id: string }[]>([]);

  /* 🔁 Al cambiar paciente */
  useEffect(() => {
    if (!pacienteId) return;

    const cargarDependencias = async () => {

      form.setValue("planTratamientoId", null);
      form.setValue("financiamientoId", null);
      form.setValue("monto", 0);
      form.setValue("concepto", "");

      const [planesDb, financiamientosDb] = await Promise.all([
        getPlanesByPaciente(pacienteId),
        getFinanciamientosByPaciente(pacienteId),
      ]);

      setPlanes(planesDb);
      setFinanciamientos(financiamientosDb);

    };

    cargarDependencias();
  }, [pacienteId, form]);

  /* 💰 Al seleccionar financiamiento */
  useEffect(() => {
    if (!financiamientoId) return;

    const cargarCuota = async () => {
      const cuota = await getCuotaPendiente(financiamientoId);

      if (!cuota) {
        toast.error("El financiamiento no tiene cuotas pendientes");
        form.setValue("financiamientoId", null);
        return;
      }

      form.setValue("monto", Number(cuota.monto));
      form.setValue("concepto", `Cuota ${cuota.numero} de financiamiento`);
    };

    cargarCuota();
  }, [financiamientoId, form]);

  const onSubmit = async (data: CreateOrdenCobroInput) => {
    const result = await createOrdenCobro(data);

    if (result.success) {
      toast.success("Orden de cobro creada");
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
          <DialogTitle>Generar Orden de Cobro</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* PACIENTE */}
          <Field>
            <FieldLabel>Paciente</FieldLabel>
            <FieldContent>
              <Select
                value={pacienteId}
                onValueChange={(v) => form.setValue("pacienteId", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un paciente" />
                </SelectTrigger>
                <SelectContent>
                  {pacientes.map((p: { id: string; nombre: string; apellido: string }) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.nombre} {p.apellido}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
            <FieldError errors={[form.formState.errors.pacienteId]} />
          </Field>

          {/* PLAN */}
          {planes.length > 0 && (
            <Field>
              <FieldLabel>Plan de tratamiento</FieldLabel>
              <Select
                value={form.watch("planTratamientoId") || ""}
                onValueChange={(v) => form.setValue("planTratamientoId", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un plan" />
                </SelectTrigger>
                <SelectContent>
                  {planes.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}

          {/* FINANCIAMIENTO */}
          {financiamientos.length > 0 && (
            <Field>
              <FieldLabel>Financiamiento</FieldLabel>
              <Select
                value={financiamientoId || ""}
                onValueChange={(v) =>
                  form.setValue("financiamientoId", v || null)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un financiamiento" />
                </SelectTrigger>
                <SelectContent>
                  {financiamientos.map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      Financiamiento #{f.id.slice(0, 8)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}

          {/* MONTO */}
          <Field>
            <FieldLabel>Monto (L)</FieldLabel>
            <Input
              type="number"
              disabled={Boolean(financiamientoId)}
              {...form.register("monto", { valueAsNumber: true })}
            />
          </Field>

          {/* CONCEPTO */}
          <Field>
            <FieldLabel>Concepto</FieldLabel>
            <Textarea {...form.register("concepto")} />
          </Field>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear orden</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

