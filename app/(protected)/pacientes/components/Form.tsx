"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import * as z from "zod";



import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { MedicoSchema } from "../../medicos/schema";
import { createMedico, updateMedico } from "../../medicos/actions";
import { Empleado } from "../../empleados/schema";
import { Profesion } from "../../profesiones/schema";

export function MedicoFormulario({
  isUpdate,
  initialData,
  empleados,
  profesiones,
}: {
  isUpdate: boolean;
  initialData: z.infer<typeof MedicoSchema>;
  empleados: Empleado[];
  profesiones: Profesion[];
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof MedicoSchema>>({
    resolver: zodResolver(MedicoSchema),
    defaultValues: initialData,
  });

  async function onSubmit(data: z.infer<typeof MedicoSchema>) {
    try {
      let result;
      if (isUpdate) {
        result = await updateMedico(data.idEmpleado, data);
      } else {
        result = await createMedico(data);
      }

      if (result.success) {
        toast.success(
          isUpdate ? "Médico actualizado" : "Médico creado",
          { description: "Los datos se guardaron correctamente." }
        );
        router.push("/medicos");
        router.refresh();
      } else {
        toast.error("Error", { description: result.error || "Intenta nuevamente." });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado", { description: "Intenta nuevamente más tarde." });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto px-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Empleado */}
        <Controller
          name="idEmpleado"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Empleado</FieldLabel>
              <FieldContent>
                <Select
                  value={field.value || ""}
                  onValueChange={(val) => field.onChange(val || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un empleado" />
                  </SelectTrigger>
                  <SelectContent>
                    {empleados.map(emp => (
                      <SelectItem key={emp.id} value={emp.id!}>
                        {emp.nombre} {emp.apellido}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldContent>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Profesion */}
        <Controller
          name="profesionId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Profesión</FieldLabel>
              <FieldContent>
                <Select
                  value={field.value || ""}
                  onValueChange={(val) => field.onChange(val || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la profesión" />
                  </SelectTrigger>
                  <SelectContent>
                    {profesiones.map(prof => (
                      <SelectItem key={prof.id} value={prof.id!}>
                        {prof.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldContent>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Activo */}
        {isUpdate && (
          <Controller
            name="activo"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Médico activo</FieldLabel>
                <FieldContent>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FieldContent>
              </Field>
            )}
          />
        )}

      </div>

      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {isUpdate ? "Actualizar médico" : "Crear médico"}
      </Button>
    </form>
  );
}
