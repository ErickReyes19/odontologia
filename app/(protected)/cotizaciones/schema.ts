import * as z from "zod";

export const ESTADOS_COTIZACION = [
  { value: "borrador", label: "Borrador" },
  { value: "enviada", label: "Enviada" },
  { value: "aceptada", label: "Aceptada" },
  { value: "rechazada", label: "Rechazada" },
  { value: "parcial", label: "Parcial" },
] as const;

export const CotizacionServicioSchema = z.object({
  id: z.string().optional(),
  cotizacionId: z.string().optional(),
  servicioId: z.string().min(1, "El servicio es requerido"),
  precioUnitario: z.number().min(0, "El precio debe ser mayor o igual a 0"),
  cantidad: z.number().min(1, "La cantidad debe ser al menos 1"),
  observacion: z.string().max(255).optional().nullable(),
  // Para mostrar en UI
  servicioNombre: z.string().optional(),
});

export const CotizacionSchema = z.object({
  id: z.string().optional(),
  pacienteId: z.string().min(1, "El paciente es requerido"),
  fecha: z.date({
    required_error: "La fecha es requerida",
    invalid_type_error: "La fecha debe ser válida",
  }),
  estado: z.string().min(1, "El estado es requerido"),
  total: z.number().min(0, "El total debe ser mayor o igual a 0"),
  observacion: z.string().max(255).optional().nullable(),
  detalles: z.array(CotizacionServicioSchema).optional(),
  // Para mostrar en UI
  pacienteNombre: z.string().optional(),
});

export type CotizacionServicio = z.infer<typeof CotizacionServicioSchema>;
export type Cotizacion = z.infer<typeof CotizacionSchema>;
